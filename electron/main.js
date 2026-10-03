const { app, BrowserWindow, ipcMain, safeStorage } = require('electron');
const fs = require('fs/promises');
const path = require('path');
const { openDatabase } = require('./db');
const { registerIpc, notify } = require('./ipc');
const { runSmokeTest } = require('./smoke');

let db;

/* ------------------------------------------------------------------------
 * Хранение токенов: electron.safeStorage + userData/auth.json (зашифровано)
 * ---------------------------------------------------------------------- */
const authFile = () => path.join(app.getPath('userData'), 'auth.json');

function registerTokenStorage() {
    ipcMain.handle('auth:load', async () => {
        try {
            const encrypted = await fs.readFile(authFile(), 'utf8');
            if (!safeStorage.isEncryptionAvailable()) {
                throw new Error('Зашифрованное хранилище недоступно');
            }
            return JSON.parse(safeStorage.decryptString(Buffer.from(encrypted, 'base64')));
        } catch (error) {
            if (error.code === 'ENOENT') return null;
            throw error;
        }
    });

    ipcMain.handle('auth:save', async (_event, tokens) => {
        if (!safeStorage.isEncryptionAvailable()) {
            throw new Error('Зашифрованное хранилище недоступно');
        }
        const encrypted = safeStorage.encryptString(JSON.stringify(tokens));
        await fs.mkdir(app.getPath('userData'), { recursive: true });
        await fs.writeFile(authFile(), encrypted.toString('base64'), { mode: 0o600 });
    });

    ipcMain.handle('auth:clear', async () => {
        await fs.rm(authFile(), { force: true });
    });
}

/* ------------------------------------------------------------------------
 * Окно приложения
 * ---------------------------------------------------------------------- */
function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 840,
        minWidth: 980,
        minHeight: 600,
        title: 'Складской учёт',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
            backgroundThrottling: false,
        },
    });

    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }

    // Безопасность: не даём рендереру открывать внешнюю навигацию
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https?:/i.test(url)) require('electron').shell.openExternal(url);
        return { action: 'deny' };
    });
    win.webContents.on('will-navigate', (event) => event.preventDefault());
    return win;
}

/**
 * Headless-проверка рендерера: открывает окно, собирает ошибки консоли
 * и убеждается, что приложение отрисовалось. Запуск: SMOKE_UI=1 electron .
 */
function runUiSmoke() {
    const errors = [];
    const win = createWindow();

    win.webContents.on('console-message', (...args) => {
        const event = args[0];
        const level = typeof args[1] === 'number' ? args[1] : Number(event.level ?? 0);
        const message = typeof args[2] === 'string' ? args[2] : String(event.message ?? '');
        const line = typeof args[3] === 'number' ? args[3] : Number(event.lineNumber ?? 0);
        if (level >= 3) errors.push({ message, line });
    });
    win.webContents.on('did-fail-load', (_event, code, description) => {
        errors.push({ message: `did-fail-load: ${description} (${code})` });
    });
    win.webContents.on('preload-error', (_event, preloadPath, error) => {
        errors.push({ message: `preload-error ${preloadPath}: ${error.message}` });
    });

    const js = (code) => win.webContents.executeJavaScript(code, true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let smokeDocumentId = null;

    const cleanupSmokeDocument = () => {
        if (smokeDocumentId == null || !db) return;
        try {
            const movements = db.prepare(
                'SELECT product_id, quantity, movement_type FROM stock_movements WHERE document_id = ?'
            ).all(smokeDocumentId);
            for (const movement of movements) {
                const delta = movement.movement_type === 'in' ? movement.quantity : -movement.quantity;
                db.prepare('UPDATE products SET current_stock = current_stock - ? WHERE id = ?')
                    .run(delta, movement.product_id);
            }
            db.prepare('DELETE FROM stock_movements WHERE document_id = ?').run(smokeDocumentId);
            db.prepare('DELETE FROM documents WHERE id = ?').run(smokeDocumentId);
        } catch (error) {
            errors.push({ message: `cleanup: ${error.message}` });
        }
    };

    let finished = false;
    const finish = (probe, extra = {}) => {
        if (finished) return;
        finished = true;
        cleanupSmokeDocument();
        const pdfOk = Boolean(extra.pdf && extra.pdf.valid);
        const searchOk = Boolean(extra.search && extra.search.rows >= 1);
        const tabsOk = Boolean(extra.tabs && extra.tabs.ok);
        const imagesOk = Boolean(extra.images && extra.images.total > 0
            && extra.images.loaded === extra.images.total);
        const ok = !errors.length
            && probe.every((p) => p.rootChildren > 0)
            && pdfOk && searchOk && tabsOk && imagesOk;
        process.stdout.write(`${JSON.stringify(
            { ok, probe, search: extra.search, tabs: extra.tabs, images: extra.images, pdf: extra.pdf, errors },
            null, 2
        )}\n`);
        app.exit(ok ? 0 : 1);
    };

    setTimeout(() => finish([{ error: 'timeout' }]), 45000);

    win.webContents.on('did-finish-load', async () => {
        await delay(1200);
        const ids = await js(`(async () => {
            const products = await window.api.products.list({});
            const documents = await window.api.documents.list({});
            let documentId = documents.length ? documents[0].id : null;
            let created = null;
            if (!documentId && products.length) {
                const res = await window.api.documents.create({
                    doc_type: 'incoming',
                    doc_date: new Date().toISOString().slice(0, 10),
                    counterparty_id: null,
                    responsible: 'smoke-ui',
                    comment: 'Временный документ UI smoke-теста',
                    items: [{ product_id: products[0].id, quantity: 1, price: products[0].price }],
                });
                if (res.ok) { documentId = res.id; created = res.id; }
            }
            return [products.length ? products[0].id : null, documentId, created];
        })()`).catch(() => [null, null, null]);

        const [productId, documentId, createdId] = ids;
        smokeDocumentId = createdId;
        const routes = [
            '#/',
            '#/products',
            ...(productId ? [`#/products/${productId}`, `#/products/${productId}/edit`] : []),
            '#/products/new',
            '#/movements',
            '#/documents',
            ...(documentId ? [`#/documents/${documentId}`] : []),
            '#/documents/new',
            '#/directories',
            '#/settings',
        ];

        const probe = [];
        for (const route of routes) {
            await js(`location.hash = ${JSON.stringify(route)}`);
            await delay(800);
            const state = await js(`({
                route: location.hash,
                rootChildren: document.getElementById('root').children.length,
                heading: (document.querySelector('#root h4') || {}).textContent || '',
            })`).catch((error) => ({ route, rootChildren: 0, heading: error.message }));
            probe.push(state);
        }

        // Переключение вкладок справочников (Bootstrap tabs)
        await js(`location.hash = '#/directories'`);
        await delay(800);
        await js(`(() => {
            const tab = document.querySelector('[data-bs-target="#tabCategories"]');
            if (tab) tab.click();
        })()`);
        const tabs = await js(`(async () => {
            const pane = document.querySelector('#tabCategories');
            for (let i = 0; i < 50; i += 1) {
                if (pane.classList.contains('show') && pane.classList.contains('active')) break;
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            return {
                ok: Boolean(pane.classList.contains('show') && pane.classList.contains('active')),
                pane: pane.className,
            };
        })()`).catch(() => ({ ok: false }));

        // Поиск в реальном времени по товарам
        await js(`location.hash = '#/products'`);
        await delay(800);

        // Картинки товаров (seed-фото должны загрузиться в списке)
        const images = await js(`(() => {
            const imgs = [...document.querySelectorAll('#productsBody img')];
            return {
                total: imgs.length,
                loaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
            };
        })()`).catch(() => ({ total: 0, loaded: 0 }));

        await js(`(() => {
            const input = document.getElementById('searchInput');
            input.value = 'Болт';
            input.dispatchEvent(new Event('input', { bubbles: true }));
        })()`);
        await delay(800);
        const search = await js(`({
            rows: document.querySelectorAll('#productsBody tr').length,
            count: (document.getElementById('productsCount') || {}).textContent || '',
        })`).catch(() => ({ rows: 0, count: '' }));

        // Сквозная генерация PDF (накладная + отчёт по обороту)
        let pdf = await js(`(async () => {
            const docs = await window.api.documents.list({});
            if (!docs.length || !window.__pdf) return { error: 'нет документов или хука' };
            const doc = await window.api.documents.get(docs[0].id);
            const docPath = await window.__pdf.generateDocumentPdf(doc);
            const reportPath = await window.__pdf.generateReportPdf({ from: '2000-01-01', to: '2100-01-01' });
            return { docPath, reportPath };
        })()`).catch((error) => ({ error: error.message }));

        if (pdf && pdf.docPath) {
            try {
                const head = require('fs').readFileSync(pdf.docPath).slice(0, 4).toString('latin1');
                pdf.valid = head === '%PDF' && Boolean(pdf.reportPath);
                if (!pdf.valid) pdf.error = `не PDF: ${head}`;
            } catch (error) {
                pdf.valid = false;
                pdf.error = error.message;
            }
        } else {
            pdf = { valid: false, ...(pdf || {}) };
        }

        finish(probe, { search, tabs, images, pdf });
    });
}

function notifyStartupLowStock() {
    const low = db.prepare(`
        SELECT name, current_stock, min_stock FROM products
         WHERE is_active = 1 AND min_stock > 0 AND current_stock <= min_stock
         ORDER BY (current_stock - min_stock) ASC
    `).all();

    if (!low.length) return;
    const names = low.slice(0, 3).map((p) => `«${p.name}»`).join(', ');
    notify(
        'Складской учёт: товары ниже минимума',
        `${low.length} позиц.: ${names}${low.length > 3 ? '…' : ''}`
    );
}

/* ------------------------------------------------------------------------
 * Запуск
 * ---------------------------------------------------------------------- */
app.whenReady().then(() => {
    if (process.argv.includes('--smoke-test')) {
        runSmokeTest();
        return;
    }

    db = openDatabase();
    registerTokenStorage();
    registerIpc(ipcMain, db, app.getPath('userData'));

    if (process.env.SMOKE_UI === '1') {
        runUiSmoke();
        return;
    }

    createWindow();
    setTimeout(notifyStartupLowStock, 2500);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
