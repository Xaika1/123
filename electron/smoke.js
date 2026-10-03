const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const { openDatabase } = require('./db');

/**
 * Автономная проверка приложения без GUI: схема, сид-данные, CRUD,
 * SQL-триггеры, поиск/сортировка. Запуск: electron . --smoke-test
 */
function runSmokeTest() {
    const results = [];
    const check = (name, fn) => {
        try {
            const info = fn();
            results.push({ name, ok: true, info: info === undefined ? null : info });
        } catch (error) {
            results.push({ name, ok: false, error: error.message });
        }
    };

    const db = openDatabase();
    let productId = null;
    let documentId = null;

    try {
        check('6 таблиц созданы', () => {
            const tables = db.prepare(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
            ).all().map((r) => r.name).sort();
            const required = ['categories', 'counterparties', 'documents', 'products', 'stock_movements', 'units'];
            const missing = required.filter((t) => !tables.includes(t));
            if (missing.length) throw new Error(`нет таблиц: ${missing.join(', ')}`);
            return tables;
        });

        check('индексы созданы', () => {
            const indexes = db.prepare(
                "SELECT name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%'"
            ).all().map((r) => r.name);
            const required = ['ux_products_article', 'ix_products_name', 'ix_products_category',
                'ix_movements_product', 'ix_movements_created'];
            const missing = required.filter((i) => !indexes.includes(i));
            if (missing.length) throw new Error(`нет индексов: ${missing.join(', ')}`);
            return indexes;
        });

        check('SQL-триггеры созданы', () => {
            const triggers = db.prepare(
                "SELECT name FROM sqlite_master WHERE type='trigger'"
            ).all().map((r) => r.name);
            const required = ['trg_movements_apply_stock', 'trg_movements_no_negative', 'trg_products_touch_updated'];
            const missing = required.filter((t) => !triggers.includes(t));
            if (missing.length) throw new Error(`нет триггеров: ${missing.join(', ')}`);
            return triggers;
        });

        check('сид-данные загружены', () => {
            const counts = {
                units: db.prepare('SELECT COUNT(*) c FROM units').get().c,
                categories: db.prepare('SELECT COUNT(*) c FROM categories').get().c,
                products: db.prepare('SELECT COUNT(*) c FROM products').get().c,
                counterparties: db.prepare('SELECT COUNT(*) c FROM counterparties').get().c,
            };
            if (Object.values(counts).some((v) => v < 1)) throw new Error(JSON.stringify(counts));
            return counts;
        });

        check('CREATE товара', () => {
            const info = db.prepare(`
                INSERT INTO products (article, name, unit_id, current_stock, min_stock, price, location)
                VALUES ('SMOKE-001', 'Тестовый товар', 1, 0, 5, 10, 'Тестовый стеллаж')
            `).run();
            productId = Number(info.lastInsertRowid);
            return { id: productId };
        });

        check('READ: поиск товара с JOIN', () => {
            const row = db.prepare(`
                SELECT p.id, p.name, c.name AS category_name, u.short_name AS unit_short
                  FROM products p
                  LEFT JOIN categories c ON c.id = p.category_id
                  LEFT JOIN units u ON u.id = p.unit_id
                 WHERE p.article = ?
            `).get('SMOKE-001');
            if (!row) throw new Error('товар не найден');
            return row;
        });

        check('UPDATE товара + триггер updated_at', () => {
            db.prepare('UPDATE products SET name = ?, price = ? WHERE id = ?')
                .run('Тестовый товар (изм.)', 15, productId);
            const row = db.prepare('SELECT name, price, updated_at FROM products WHERE id = ?').get(productId);
            if (row.name !== 'Тестовый товар (изм.)') throw new Error('данные не обновились');
            return row;
        });

        check('CREATE документа и движения', () => {
            const doc = db.prepare(`
                INSERT INTO documents (number, doc_type, doc_date, responsible)
                VALUES ('ПН-9999', 'incoming', date('now'), 'smoke-test')
            `).run();
            documentId = Number(doc.lastInsertRowid);
            db.prepare(`
                INSERT INTO stock_movements (product_id, document_id, movement_type, quantity, price_at_moment)
                VALUES (?, ?, 'in', 20, 10)
            `).run(productId, documentId);
            const stock = db.prepare('SELECT current_stock FROM products WHERE id = ?').get(productId).current_stock;
            if (stock !== 20) throw new Error(`триггер не сработал, остаток=${stock}`);
            return { documentId, stock };
        });

        check('Триггер запрета отрицательного остатка', () => {
            let raised = false;
            try {
                db.prepare(`
                    INSERT INTO stock_movements (product_id, document_id, movement_type, quantity, price_at_moment)
                    VALUES (?, ?, 'out', 9999, 10)
                `).run(productId, documentId);
            } catch (error) {
                raised = /остатка/i.test(error.message);
            }
            if (!raised) throw new Error('списание 9999 шт не заблокировано');
            return true;
        });

        check('Сортировка по последнему поступлению', () => {
            const rows = db.prepare(`
                SELECT p.id, p.name,
                       (SELECT MAX(m.created_at) FROM stock_movements m
                         WHERE m.product_id = p.id AND m.movement_type = 'in') AS last_receipt_at
                  FROM products p
                 WHERE p.is_active = 1
                 ORDER BY last_receipt_at DESC, p.name COLLATE NOCASE
                 LIMIT 10
            `).all();
            if (!rows.length) throw new Error('пустой результат');
            return { rows: rows.length };
        });

        check('Журнал движений с JOIN по документам', () => {
            const rows = db.prepare(`
                SELECT m.movement_type, m.quantity, p.name AS product_name,
                       d.number AS doc_number, c.name AS counterparty_name
                  FROM stock_movements m
                  JOIN products p ON p.id = m.product_id
                  LEFT JOIN documents d ON d.id = m.document_id
                  LEFT JOIN counterparties c ON c.id = d.counterparty_id
                 ORDER BY m.created_at DESC
                 LIMIT 20
            `).all();
            return { rows: rows.length };
        });

        check('Запрет удаления товара с историей (FK)', () => {
            let blocked = false;
            try {
                db.prepare('DELETE FROM products WHERE id = ?').run(productId);
            } catch (error) {
                blocked = true;
            }
            if (!blocked) throw new Error('удаление с историей не заблокировано');
            return true;
        });
    } finally {
        // Очистка тестовых данных
        try {
            if (productId != null) db.prepare('DELETE FROM stock_movements WHERE product_id = ?').run(productId);
            if (documentId != null) db.prepare('DELETE FROM documents WHERE id = ?').run(documentId);
            if (productId != null) db.prepare('DELETE FROM products WHERE id = ?').run(productId);
        } catch { /* игнорируем ошибки очистки */ }
        db.close();
    }

    const failed = results.filter((r) => !r.ok);
    const report = {
        passed: results.length - failed.length,
        failed: failed.length,
        results,
    };
    const text = JSON.stringify(report, null, 2);
    try {
        fs.writeFileSync(path.join(process.cwd(), 'smoke-result.json'), text, 'utf8');
    } catch { /* нет прав на запись — печатаем в stdout */ }
    process.stdout.write(`${text}\n`);
    app.exit(failed.length ? 1 : 0);
}

module.exports = { runSmokeTest };
