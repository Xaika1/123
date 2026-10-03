const fs = require('fs/promises');
const path = require('path');
const { dialog, Notification, shell } = require('electron');
const { pathToFileURL } = require('url');

const DOC_PREFIXES = {
    incoming: 'ПН',
    outgoing: 'РН',
    write_off: 'АС',
    inventory: 'ИНВ',
};

const notifiedLow = new Set();

function toNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function imageUrls(userData, row) {
    if (!row || !row.image_path) return { ...row, image_url: null };
    const abs = path.isAbsolute(row.image_path)
        ? row.image_path
        : path.join(userData, row.image_path);
    return { ...row, image_url: pathToFileURL(abs).href };
}

function friendlySqlError(error) {
    if (error && error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return 'Товар с таким артикулом уже существует';
    }
    if (error && error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
        return 'Ссылка на несуществующую запись';
    }
    return error && error.message ? error.message : 'Ошибка базы данных';
}

function notify(title, body) {
    if (!Notification.isSupported()) return;
    new Notification({ title, body }).show();
}

function notifyLowStock(products) {
    for (const product of products) {
        if (product.min_stock <= 0 || product.current_stock > product.min_stock) continue;
        if (notifiedLow.has(product.id)) continue;
        notifiedLow.add(product.id);
        notify(
            `Товар «${product.name}» заканчивается!`,
            `Остаток ${product.current_stock} при минимуме ${product.min_stock}`
        );
    }
}

function isLow(product) {
    return product.min_stock > 0 && product.current_stock <= product.min_stock;
}

function nextDocumentNumber(db, docType) {
    const prefix = DOC_PREFIXES[docType] || 'ДОК';
    const rows = db.prepare('SELECT number FROM documents WHERE doc_type = ?').all(docType);
    let max = 0;
    for (const { number } of rows) {
        const match = String(number).match(/(\d+)\s*$/);
        if (match) max = Math.max(max, Number(match[1]));
    }
    return `${prefix}-${String(max + 1).padStart(4, '0')}`;
}

function registerIpc(ipcMain, db, userData) {
    /* ------------------------------ Товары ------------------------------ */

    ipcMain.handle('products:list', (_event, options = {}) => {
        const where = [];
        const params = { search: `%${options.search || ''}%` };

        if (options.search) {
            where.push(`(
                p.name LIKE :search OR p.article LIKE :search
                OR p.location LIKE :search OR c.name LIKE :search
            )`);
        }
        if (options.categoryId) {
            where.push('p.category_id = :categoryId');
            params.categoryId = toNumber(options.categoryId);
        }
        if (!options.includeArchived) where.push('p.is_active = 1');

        const sortColumns = {
            name: 'p.name COLLATE NOCASE',
            stock: 'p.current_stock',
            price: 'p.price',
            last_receipt: 'last_receipt_at',
        };
        const sort = sortColumns[options.sort] || sortColumns.name;
        const direction = options.direction === 'desc' ? 'DESC' : 'ASC';

        const sql = `
            SELECT p.*,
                   c.name AS category_name,
                   u.name AS unit_name,
                   u.short_name AS unit_short,
                   (SELECT MAX(m.created_at)
                      FROM stock_movements m
                     WHERE m.product_id = p.id AND m.movement_type = 'in'
                   ) AS last_receipt_at
              FROM products p
              LEFT JOIN categories c ON c.id = p.category_id
              LEFT JOIN units u ON u.id = p.unit_id
              ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
              ORDER BY ${sort} ${direction}, p.id ASC
        `;

        const rows = db.prepare(sql).all(params)
            .map((row) => imageUrls(userData, { ...row, is_low: isLow(row) ? 1 : 0 }));
        return rows;
    });

    ipcMain.handle('products:get', (_event, id) => {
        const row = db.prepare(`
            SELECT p.*,
                   c.name AS category_name,
                   u.name AS unit_name,
                   u.short_name AS unit_short
              FROM products p
              LEFT JOIN categories c ON c.id = p.category_id
              LEFT JOIN units u ON u.id = p.unit_id
             WHERE p.id = ?
        `).get(toNumber(id));
        if (!row) return null;
        return imageUrls(userData, { ...row, is_low: isLow(row) ? 1 : 0 });
    });

    ipcMain.handle('products:create', (_event, data) => {
        try {
            const info = db.prepare(`
                INSERT INTO products
                    (article, name, category_id, unit_id, description, image_path,
                     current_stock, min_stock, price, location, is_active)
                VALUES
                    (@article, @name, @category_id, @unit_id, @description, @image_path,
                     @current_stock, @min_stock, @price, @location, @is_active)
            `).run({
                article: String(data.article || '').trim(),
                name: String(data.name || '').trim(),
                category_id: data.category_id || null,
                unit_id: data.unit_id || null,
                description: data.description || null,
                image_path: data.image_path || null,
                current_stock: Math.max(0, toNumber(data.current_stock)),
                min_stock: Math.max(0, toNumber(data.min_stock)),
                price: Math.max(0, toNumber(data.price)),
                location: data.location || null,
                is_active: data.is_active === false ? 0 : 1,
            });
            const product = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
            notifyLowStock([product]);
            return { ok: true, id: info.lastInsertRowid };
        } catch (error) {
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    ipcMain.handle('products:update', (_event, id, data) => {
        try {
            db.prepare(`
                UPDATE products
                   SET article = @article,
                       name = @name,
                       category_id = @category_id,
                       unit_id = @unit_id,
                       description = @description,
                       image_path = @image_path,
                       current_stock = @current_stock,
                       min_stock = @min_stock,
                       price = @price,
                       location = @location,
                       is_active = @is_active
                 WHERE id = @id
            `).run({
                id: toNumber(id),
                article: String(data.article || '').trim(),
                name: String(data.name || '').trim(),
                category_id: data.category_id || null,
                unit_id: data.unit_id || null,
                description: data.description || null,
                image_path: data.image_path || null,
                current_stock: Math.max(0, toNumber(data.current_stock)),
                min_stock: Math.max(0, toNumber(data.min_stock)),
                price: Math.max(0, toNumber(data.price)),
                location: data.location || null,
                is_active: data.is_active === false ? 0 : 1,
            });
            const product = db.prepare('SELECT * FROM products WHERE id = ?').get(toNumber(id));
            notifyLowStock([product]);
            return { ok: true };
        } catch (error) {
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    ipcMain.handle('products:archive', (_event, id, archived) => {
        db.prepare('UPDATE products SET is_active = ? WHERE id = ?')
            .run(archived ? 0 : 1, toNumber(id));
        return { ok: true };
    });

    ipcMain.handle('products:delete', (_event, id) => {
        try {
            db.prepare('DELETE FROM products WHERE id = ?').run(toNumber(id));
            return { ok: true };
        } catch (error) {
            if (error && (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY'
                || /FOREIGN KEY/i.test(String(error.message)))) {
                return {
                    ok: false,
                    error: 'По товару есть история движений. Используйте архивирование (is_active = FALSE).',
                };
            }
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    /* ---------------------------- Справочники ---------------------------- */

    ipcMain.handle('categories:list', () => db.prepare(`
        SELECT c.*,
               p.name AS parent_name,
               (SELECT COUNT(*) FROM products pr WHERE pr.category_id = c.id) AS products_count
          FROM categories c
          LEFT JOIN categories p ON p.id = c.parent_id
         ORDER BY c.name COLLATE NOCASE
    `).all());

    ipcMain.handle('categories:create', (_event, data) => {
        const info = db.prepare('INSERT INTO categories (name, parent_id, description) VALUES (?, ?, ?)')
            .run(String(data.name || '').trim(), data.parent_id || null, data.description || null);
        return { ok: true, id: info.lastInsertRowid };
    });

    ipcMain.handle('categories:update', (_event, id, data) => {
        db.prepare('UPDATE categories SET name = ?, parent_id = ?, description = ? WHERE id = ?')
            .run(String(data.name || '').trim(), data.parent_id || null, data.description || null, toNumber(id));
        return { ok: true };
    });

    ipcMain.handle('categories:delete', (_event, id) => {
        try {
            db.prepare('DELETE FROM categories WHERE id = ?').run(toNumber(id));
            return { ok: true };
        } catch (error) {
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    ipcMain.handle('units:list', () => db.prepare(`
        SELECT u.*,
               (SELECT COUNT(*) FROM products pr WHERE pr.unit_id = u.id) AS products_count
          FROM units u
         ORDER BY u.name COLLATE NOCASE
    `).all());

    ipcMain.handle('units:create', (_event, data) => {
        const info = db.prepare('INSERT INTO units (name, short_name) VALUES (?, ?)')
            .run(String(data.name || '').trim(), String(data.short_name || '').trim());
        return { ok: true, id: info.lastInsertRowid };
    });

    ipcMain.handle('units:delete', (_event, id) => {
        try {
            db.prepare('DELETE FROM units WHERE id = ?').run(toNumber(id));
            return { ok: true };
        } catch (error) {
            if (error && (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY'
                || /FOREIGN KEY/i.test(String(error.message)))) {
                return { ok: false, error: 'Единица измерения используется товарами' };
            }
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    ipcMain.handle('counterparties:list', () => db.prepare(
        'SELECT * FROM counterparties ORDER BY name COLLATE NOCASE'
    ).all());

    ipcMain.handle('counterparties:create', (_event, data) => {
        const info = db.prepare(`
            INSERT INTO counterparties (name, type, inn, phone, email, address)
            VALUES (@name, @type, @inn, @phone, @email, @address)
        `).run({
            name: String(data.name || '').trim(),
            type: data.type === 'customer' ? 'customer' : 'supplier',
            inn: data.inn || null,
            phone: data.phone || null,
            email: data.email || null,
            address: data.address || null,
        });
        return { ok: true, id: info.lastInsertRowid };
    });

    ipcMain.handle('counterparties:update', (_event, id, data) => {
        db.prepare(`
            UPDATE counterparties
               SET name = @name, type = @type, inn = @inn,
                   phone = @phone, email = @email, address = @address
             WHERE id = @id
        `).run({
            id: toNumber(id),
            name: String(data.name || '').trim(),
            type: data.type === 'customer' ? 'customer' : 'supplier',
            inn: data.inn || null,
            phone: data.phone || null,
            email: data.email || null,
            address: data.address || null,
        });
        return { ok: true };
    });

    ipcMain.handle('counterparties:delete', (_event, id) => {
        try {
            db.prepare('DELETE FROM counterparties WHERE id = ?').run(toNumber(id));
            return { ok: true };
        } catch (error) {
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    /* ----------------------------- Документы ----------------------------- */

    ipcMain.handle('documents:list', (_event, options = {}) => {
        const where = [];
        const params = {};
        if (options.docType) {
            where.push('d.doc_type = :docType');
            params.docType = options.docType;
        }
        const rows = db.prepare(`
            SELECT d.*, c.name AS counterparty_name, c.type AS counterparty_type,
                   (SELECT COUNT(*) FROM stock_movements m WHERE m.document_id = d.id) AS items_count
              FROM documents d
              LEFT JOIN counterparties c ON c.id = d.counterparty_id
              ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
             ORDER BY d.doc_date DESC, d.id DESC
             LIMIT 300
        `).all(params);
        return rows;
    });

    ipcMain.handle('documents:get', (_event, id) => {
        const doc = db.prepare(`
            SELECT d.*, c.name AS counterparty_name, c.type AS counterparty_type
              FROM documents d
              LEFT JOIN counterparties c ON c.id = d.counterparty_id
             WHERE d.id = ?
        `).get(toNumber(id));
        if (!doc) return null;
        const items = db.prepare(`
            SELECT m.id, m.quantity, m.price_at_moment, m.movement_type, m.comment,
                   p.id AS product_id, p.article, p.name, u.short_name AS unit_short,
                   (m.quantity * m.price_at_moment) AS sum
              FROM stock_movements m
              JOIN products p ON p.id = m.product_id
              LEFT JOIN units u ON u.id = p.unit_id
             WHERE m.document_id = ?
             ORDER BY m.id
        `).all(toNumber(id));
        return { ...doc, items };
    });

    ipcMain.handle('documents:create', (_event, data) => {
        const docType = data.doc_type;
        if (!['incoming', 'outgoing', 'write_off', 'inventory'].includes(docType)) {
            return { ok: false, error: 'Неизвестный тип документа' };
        }
        const items = Array.isArray(data.items) ? data.items : [];
        if (docType !== 'inventory' && items.length === 0) {
            return { ok: false, error: 'Добавьте хотя бы одну позицию' };
        }

        const movementType = { incoming: 'in', outgoing: 'out', write_off: 'write_off' }[docType];
        const number = nextDocumentNumber(db, docType);

        try {
            const create = db.transaction(() => {
                const docInfo = db.prepare(`
                    INSERT INTO documents (number, doc_type, doc_date, counterparty_id, responsible, comment)
                    VALUES (@number, @doc_type, @doc_date, @counterparty_id, @responsible, @comment)
                `).run({
                    number,
                    doc_type: docType,
                    doc_date: data.doc_date || new Date().toISOString().slice(0, 10),
                    counterparty_id: data.counterparty_id || null,
                    responsible: data.responsible || null,
                    comment: data.comment || null,
                });

                const affected = [];
                if (docType !== 'inventory') {
                    const insertMovement = db.prepare(`
                        INSERT INTO stock_movements
                            (product_id, document_id, movement_type, quantity, price_at_moment, comment)
                        VALUES (@product_id, @document_id, @movement_type, @quantity, @price_at_moment, @comment)
                    `);
                    for (const item of items) {
                        const quantity = toNumber(item.quantity);
                        if (quantity <= 0) throw new Error('Количество должно быть больше нуля');
                        insertMovement.run({
                            product_id: toNumber(item.product_id),
                            document_id: docInfo.lastInsertRowid,
                            movement_type: movementType,
                            quantity,
                            price_at_moment: Math.max(0, toNumber(item.price)),
                            comment: item.comment || null,
                        });
                        affected.push(toNumber(item.product_id));
                    }
                }
                return { id: docInfo.lastInsertRowid, affected };
            });

            const { id, affected } = create();

            if (affected.length) {
                const products = db.prepare(
                    `SELECT id, name, current_stock, min_stock FROM products WHERE id IN (${affected.map(() => '?').join(',')})`
                ).all(...affected);
                notifyLowStock(products);
            }

            return { ok: true, id, number };
        } catch (error) {
            return { ok: false, error: friendlySqlError(error) };
        }
    });

    ipcMain.handle('documents:attach-pdf', (_event, id, pdfPath) => {
        db.prepare('UPDATE documents SET pdf_path = ? WHERE id = ?')
            .run(pdfPath || null, toNumber(id));
        return { ok: true };
    });

    /* ---------------------------- Движения ---------------------------- */

    ipcMain.handle('movements:list', (_event, filters = {}) => {
        const where = [];
        const params = {};

        if (filters.type) {
            where.push('m.movement_type = :type');
            params.type = filters.type;
        }
        if (filters.productId) {
            where.push('m.product_id = :productId');
            params.productId = toNumber(filters.productId);
        }
        if (filters.dateFrom) {
            where.push('date(m.created_at) >= date(:dateFrom)');
            params.dateFrom = filters.dateFrom;
        }
        if (filters.dateTo) {
            where.push('date(m.created_at) <= date(:dateTo)');
            params.dateTo = filters.dateTo;
        }

        return db.prepare(`
            SELECT m.*, p.name AS product_name, p.article, u.short_name AS unit_short,
                   d.number AS doc_number, d.doc_type, d.doc_date
              FROM stock_movements m
              JOIN products p ON p.id = m.product_id
              LEFT JOIN units u ON u.id = p.unit_id
              LEFT JOIN documents d ON d.id = m.document_id
              ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
             ORDER BY m.created_at DESC, m.id DESC
             LIMIT 500
        `).all(params);
    });

    ipcMain.handle('movements:by-product', (_event, productId) => db.prepare(`
        SELECT m.*, d.number AS doc_number, d.doc_type, d.doc_date, c.name AS counterparty_name
          FROM stock_movements m
          LEFT JOIN documents d ON d.id = m.document_id
          LEFT JOIN counterparties c ON c.id = d.counterparty_id
         WHERE m.product_id = ?
         ORDER BY m.created_at DESC, m.id DESC
         LIMIT 200
    `).all(toNumber(productId)));

    /* ------------------------------ Статистика ------------------------------ */

    ipcMain.handle('stats:dashboard', () => {
        const totals = db.prepare(`
            SELECT COUNT(*) AS products_total,
                   SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS products_active,
                   SUM(CASE WHEN min_stock > 0 AND current_stock <= min_stock AND is_active = 1
                            THEN 1 ELSE 0 END) AS low_stock,
                   SUM(CASE WHEN is_active = 1 THEN current_stock * price ELSE 0 END) AS stock_value
              FROM products
        `).get();
        const docs = db.prepare(`
            SELECT COUNT(*) AS docs_month
              FROM documents
             WHERE strftime('%Y-%m', doc_date) = strftime('%Y-%m', 'now', 'localtime')
        `).get();
        const lowList = db.prepare(`
            SELECT p.id, p.article, p.name, p.current_stock, p.min_stock, p.location,
                   u.short_name AS unit_short, c.name AS category_name
              FROM products p
              LEFT JOIN units u ON u.id = p.unit_id
              LEFT JOIN categories c ON c.id = p.category_id
             WHERE p.is_active = 1 AND p.min_stock > 0 AND p.current_stock <= p.min_stock
             ORDER BY (p.current_stock - p.min_stock) ASC
             LIMIT 12
        `).all();
        const recent = db.prepare(`
            SELECT m.id, m.movement_type, m.quantity, m.created_at,
                   p.name AS product_name, p.article, u.short_name AS unit_short,
                   d.number AS doc_number
              FROM stock_movements m
              JOIN products p ON p.id = m.product_id
              LEFT JOIN units u ON u.id = p.unit_id
              LEFT JOIN documents d ON d.id = m.document_id
             ORDER BY m.created_at DESC, m.id DESC
             LIMIT 8
        `).all();
        return {
            productsTotal: totals.products_total || 0,
            productsActive: totals.products_active || 0,
            lowStock: totals.low_stock || 0,
            stockValue: totals.stock_value || 0,
            docsMonth: docs.docs_month || 0,
            lowList,
            recent,
        };
    });

    /* ------------------------------ Изображения ------------------------------ */

    ipcMain.handle('images:pick', async (event) => {
        const win = require('electron').BrowserWindow.fromWebContents(event.sender);
        const result = await dialog.showOpenDialog(win, {
            title: 'Выберите изображение товара',
            properties: ['openFile'],
            filters: [
                { name: 'Изображения', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'] },
            ],
        });
        if (result.canceled || !result.filePaths.length) return null;

        const source = result.filePaths[0];
        const imagesDir = path.join(userData, 'images');
        await fs.mkdir(imagesDir, { recursive: true });

        const ext = path.extname(source).toLowerCase() || '.png';
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
        const target = path.join(imagesDir, fileName);
        await fs.copyFile(source, target);

        const relativePath = path.join('images', fileName);
        return {
            path: relativePath,
            url: pathToFileURL(target).href,
            originalName: path.basename(source),
        };
    });

    /* ------------------------------- Уведомления ------------------------------- */

    ipcMain.handle('notify:show', (_event, payload) => {
        notify(payload?.title || 'Складской учёт', payload?.body || '');
        return { ok: true };
    });

    ipcMain.handle('notify:low-stock', () => {
        const low = db.prepare(`
            SELECT id, name, current_stock, min_stock FROM products
             WHERE is_active = 1 AND min_stock > 0 AND current_stock <= min_stock
        `).all();
        notifyLowStock(low);
        return { ok: true, count: low.length };
    });

    /* --------------------------------- PDF --------------------------------- */

    ipcMain.handle('pdf:save', async (event, payload) => {
        // В режиме UI smoke-теста диалог не показываем — пишем во временную папку
        if (process.env.SMOKE_UI === '1') {
            const os = require('os');
            const target = path.join(os.tmpdir(), payload?.defaultName || 'document.pdf');
            await fs.writeFile(target, Buffer.from(payload.data, 'base64'));
            return target;
        }

        const win = require('electron').BrowserWindow.fromWebContents(event.sender);
        const result = await dialog.showSaveDialog(win, {
            title: 'Сохранить документ',
            defaultPath: payload?.defaultName || 'document.pdf',
            filters: [{ name: 'PDF', extensions: ['pdf'] }],
        });
        if (result.canceled || !result.filePath) return null;

        await fs.writeFile(result.filePath, Buffer.from(payload.data, 'base64'));
        return result.filePath;
    });

    ipcMain.handle('pdf:open', (_event, filePath) => {
        if (!filePath) return { ok: false };
        return shell.openPath(filePath).then((err) => ({ ok: !err, error: err || null }));
    });

    ipcMain.handle('pdf:fonts', async () => {
        const candidates = [
            path.join(__dirname, '..', 'assets', 'fonts', 'Roboto-Regular.ttf'),
            'C:\\Windows\\Fonts\\arial.ttf',
            '/System/Library/Fonts/Supplemental/Arial.ttf',
            '/Library/Fonts/Arial.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/TTF/DejaVuSans.ttf',
        ];
        const boldCandidates = [
            path.join(__dirname, '..', 'assets', 'fonts', 'Roboto-Bold.ttf'),
            'C:\\Windows\\Fonts\\arialbd.ttf',
            '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        ];

        const readFirst = async (list) => {
            for (const file of list) {
                try {
                    const data = await fs.readFile(file);
                    return { name: path.basename(file), data: data.toString('base64') };
                } catch { /* пробуем следующий путь */ }
            }
            return null;
        };

        return {
            regular: await readFirst(candidates),
            bold: await readFirst(boldCandidates),
        };
    });

    /* ------------------------- Безопасное хранилище ------------------------- */

    const secureFile = () => path.join(userData, 'secure.json');
    const { safeStorage } = require('electron');

    ipcMain.handle('secure:save', async (_event, payload) => {
        if (!safeStorage.isEncryptionAvailable()) {
            return { ok: false, error: 'Зашифрованное хранилище (safeStorage) недоступно' };
        }
        const current = await readSecure();
        const data = {
            operator: payload.operator || current?.operator || '',
            pin: payload.pin !== undefined ? payload.pin : current?.pin || null,
        };
        const encrypted = safeStorage.encryptString(JSON.stringify(data));
        await fs.writeFile(secureFile(), encrypted.toString('base64'), { mode: 0o600 });
        return { ok: true };
    });

    ipcMain.handle('secure:load', async () => {
        const data = await readSecure();
        if (!data) return null;
        return { operator: data.operator || '', hasPin: Boolean(data.pin) };
    });

    ipcMain.handle('secure:verify', async (_event, pin) => {
        const data = await readSecure();
        if (!data || !data.pin) return true;
        return String(data.pin) === String(pin);
    });

    ipcMain.handle('secure:clear', async () => {
        await fs.rm(secureFile(), { force: true });
        return { ok: true };
    });

    async function readSecure() {
        try {
            const encrypted = await fs.readFile(secureFile(), 'utf8');
            if (!safeStorage.isEncryptionAvailable()) return null;
            return JSON.parse(safeStorage.decryptString(Buffer.from(encrypted, 'base64')));
        } catch (error) {
            if (error.code === 'ENOENT') return null;
            throw error;
        }
    }

    /* -------------------------------- Служебное -------------------------------- */

    ipcMain.handle('app:info', () => ({
        userData,
        dbPath: path.join(userData, 'warehouse.db'),
        version: require('electron').app.getVersion(),
        platform: process.platform,
    }));

    ipcMain.handle('app:report', async (_event, payload) => {
        const products = db.prepare(`
            SELECT p.id, p.article, p.name, p.current_stock, p.price, p.location,
                   u.short_name AS unit_short,
                   COALESCE(SUM(CASE WHEN m.movement_type = 'in'  THEN m.quantity END), 0) AS coming,
                   COALESCE(SUM(CASE WHEN m.movement_type != 'in' THEN m.quantity END), 0) AS going
              FROM products p
              LEFT JOIN units u ON u.id = p.unit_id
              LEFT JOIN stock_movements m
                     ON m.product_id = p.id
                    AND date(m.created_at) >= date(:dateFrom)
                    AND date(m.created_at) <= date(:dateTo)
             WHERE p.is_active = 1
             GROUP BY p.id
            HAVING coming > 0 OR going > 0
             ORDER BY p.name COLLATE NOCASE
        `).all({ dateFrom: payload.dateFrom, dateTo: payload.dateTo });
        return products;
    });
}

module.exports = { registerIpc, notify };
