const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const Database = require('better-sqlite3');

const SCHEMA = `
PRAGMA foreign_keys = ON;

-- 1. Категории товаров (вложенность через parent_id)
CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(100) NOT NULL,
    parent_id   INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Единицы измерения
CREATE TABLE IF NOT EXISTS units (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR(50) NOT NULL,
    short_name VARCHAR(10) NOT NULL
);

-- 3. Контрагенты
CREATE TABLE IF NOT EXISTS counterparties (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    VARCHAR(200) NOT NULL,
    type    TEXT NOT NULL CHECK (type IN ('supplier', 'customer')),
    inn     VARCHAR(20),
    phone   VARCHAR(20),
    email   VARCHAR(100),
    address TEXT
);

-- 4. Товары (основная сущность)
CREATE TABLE IF NOT EXISTS products (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    article        VARCHAR(50) NOT NULL UNIQUE,
    name           VARCHAR(200) NOT NULL,
    category_id    INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    unit_id        INTEGER REFERENCES units(id) ON DELETE RESTRICT,
    description    TEXT,
    image_path     VARCHAR(500),
    current_stock  INTEGER NOT NULL DEFAULT 0,
    min_stock      INTEGER NOT NULL DEFAULT 0,
    price          DECIMAL(10,2) NOT NULL DEFAULT 0,
    location       VARCHAR(100),
    is_active      INTEGER NOT NULL DEFAULT 1,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Документы
CREATE TABLE IF NOT EXISTS documents (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    number          VARCHAR(50) NOT NULL UNIQUE,
    doc_type        TEXT NOT NULL CHECK (doc_type IN ('incoming', 'outgoing', 'write_off', 'inventory')),
    doc_date        DATE NOT NULL,
    counterparty_id INTEGER REFERENCES counterparties(id) ON DELETE SET NULL,
    responsible     VARCHAR(100),
    comment         TEXT,
    pdf_path        VARCHAR(500),
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Движения товара
CREATE TABLE IF NOT EXISTS stock_movements (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id      INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    document_id     INTEGER NOT NULL REFERENCES documents(id) ON DELETE RESTRICT,
    movement_type   TEXT NOT NULL CHECK (movement_type IN ('in', 'out', 'write_off')),
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    price_at_moment DECIMAL(10,2) NOT NULL DEFAULT 0,
    comment         TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE UNIQUE INDEX IF NOT EXISTS ux_products_article   ON products(article);
CREATE INDEX        IF NOT EXISTS ix_products_name      ON products(name);
CREATE INDEX        IF NOT EXISTS ix_products_category  ON products(category_id);
CREATE INDEX        IF NOT EXISTS ix_movements_product  ON stock_movements(product_id);
CREATE INDEX        IF NOT EXISTS ix_movements_created  ON stock_movements(created_at);

-- Триггер 1: остаток товара обновляется автоматически при записи движения
CREATE TRIGGER IF NOT EXISTS trg_movements_apply_stock
AFTER INSERT ON stock_movements
BEGIN
    UPDATE products
       SET current_stock = current_stock +
           (CASE NEW.movement_type WHEN 'in' THEN NEW.quantity ELSE -NEW.quantity END),
           updated_at = CURRENT_TIMESTAMP
     WHERE id = NEW.product_id;
END;

-- Триггер 2: запрет ухода остатка в минус
CREATE TRIGGER IF NOT EXISTS trg_movements_no_negative
BEFORE INSERT ON stock_movements
WHEN NEW.movement_type IN ('out', 'write_off')
 AND (SELECT current_stock FROM products WHERE id = NEW.product_id) < NEW.quantity
BEGIN
    SELECT RAISE(ABORT, 'Недостаточно остатка товара для списания');
END;

-- Триггер 3: updated_at при любом изменении товара
CREATE TRIGGER IF NOT EXISTS trg_products_touch_updated
AFTER UPDATE ON products
BEGIN
    UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
`;

const SEED_UNITS = [
    ['штука', 'шт'],
    ['килограмм', 'кг'],
    ['литр', 'л'],
    ['упаковка', 'упак'],
    ['метр', 'м'],
];

const SEED_CATEGORIES = [
    ['Крепёж', 'Болты, гайки, саморезы'],
    ['Электроника', 'Кабели, розетки, автоматика'],
    ['Расходные материалы', 'Краски, растворители, диски'],
    ['Инструмент', 'Ручной и электроинструмент'],
];

const SEED_PRODUCTS = [
    ['BLT-M8-050', 'Болт М8х50 оцинкованный', 1, 1, 145, 50, 3.5, 'Стеллаж А-1, полка 2', 'Комплект 100 шт, оцинковка'],
    ['BLT-M6-030', 'Болт М6х30 оцинкованный', 1, 1, 260, 50, 2.4, 'Стеллаж А-1, полка 1', ''],
    ['CBL-VVG-325', 'Кабель ВВГнг-LS 3x2.5', 2, 5, 42, 20, 68.0, 'Бухта, стеллаж Б-3', 'Медь, 100 м в бухте'],
    ['RKT-16', 'Розетка внутренняя 16А', 2, 1, 18, 30, 145.0, 'Стеллаж Б-1, полка 4', ''],
    ['CRK-WH-5', 'Краска белая матовая 5 кг', 3, 2, 6, 10, 1290.0, 'Склад ГСМ, ячейка 7', 'Ведро 5 кг'],
    ['DSC-125-1', 'Отрезной диск 125x1.2', 3, 1, 9, 25, 62.0, 'Стеллаж В-2, полка 3', 'По металлу'],
    ['KLM-PER-001', 'Клещи переставные 250 мм', 4, 1, 11, 5, 780.0, 'Инструментальная, ящик 2', ''],
    ['DRL-800', 'Дрель электрическая 800 Вт', 4, 1, 4, 3, 4450.0, 'Инструментальная, стеллаж', 'С кейсом'],
];

// Фото товаров из resources/seed-images — копируются в <userData>/images при посеве
const SEED_IMAGES = {
    'BLT-M8-050': 'bolt-m8x50.jpg',
    'BLT-M6-030': 'bolt-m6x30.jpg',
    'CBL-VVG-325': 'cable-vvg.jpg',
    'RKT-16': 'socket-16a.jpg',
    'CRK-WH-5': 'paint-5l.jpg',
    'DSC-125-1': 'disc-125.jpg',
    'KLM-PER-001': 'pliers-250.jpg',
    'DRL-800': 'drill-800.jpg',
};

function copySeedImages() {
    try {
        const src = path.join(__dirname, '..', 'resources', 'seed-images');
        const dest = path.join(app.getPath('userData'), 'images');
        fs.mkdirSync(dest, { recursive: true });
        for (const file of Object.values(SEED_IMAGES)) {
            const from = path.join(src, file);
            const to = path.join(dest, file);
            if (fs.existsSync(from) && !fs.existsSync(to)) fs.copyFileSync(from, to);
        }
        return true;
    } catch (error) {
        console.error('Не удалось скопировать фото товаров:', error);
        return false;
    }
}

const SEED_COUNTERPARTIES = [
    ['ООО «Крепёж-Сервис»', 'supplier', '7712345678', '+7 (495) 111-22-33', 'sales@krepezh.ru', 'г. Москва, ул. Складская, 12'],
    ['ИП Иванов И.И.', 'supplier', '770987654321', '+7 (925) 555-44-33', 'ivanov@mail.ru', 'г. Москва, промзона, стр. 4'],
    ['Магазин «СтройДом»', 'customer', '77111222333', '+7 (495) 777-88-99', 'zakaz@stroydom.ru', 'г. Москва, проспект Мира, 45'],
    ['ООО «Ремонт-Групп»', 'customer', '77444555666', '+7 (903) 222-11-00', 'info@remontgroup.ru', 'г. Химки, ул. Заводская, 3'],
];

function seed(db) {
    if (db.prepare('SELECT COUNT(*) AS c FROM units').get().c > 0) return;

    const insertUnit = db.prepare('INSERT INTO units (name, short_name) VALUES (?, ?)');
    const insertCategory = db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)');
    const insertCounterparty = db.prepare(
        'INSERT INTO counterparties (name, type, inn, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const insertProduct = db.prepare(`
        INSERT INTO products (article, name, category_id, unit_id, current_stock, min_stock, price, location, description, image_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const imagesReady = copySeedImages();

    const setup = db.transaction(() => {
        SEED_UNITS.forEach((row) => insertUnit.run(...row));
        SEED_CATEGORIES.forEach((row) => insertCategory.run(...row));
        SEED_COUNTERPARTIES.forEach((row) => insertCounterparty.run(...row));
        SEED_PRODUCTS.forEach((row) => {
            const imageFile = imagesReady ? SEED_IMAGES[row[0]] : null;
            insertProduct.run(...row, imageFile ? path.join('images', imageFile) : null);
        });
    });
    setup();
}

function openDatabase() {
    const dir = app.getPath('userData');
    fs.mkdirSync(dir, { recursive: true });

    const db = new Database(path.join(dir, 'warehouse.db'));
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.exec(SCHEMA);
    seed(db);
    return db;
}

module.exports = { openDatabase, SCHEMA };
