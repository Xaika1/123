// Генерирует «АНАЛИТИКА ПРОЕКТА.docx» по шаблону из примера
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const bold = (text) => new Paragraph({ children: [new TextRun({ text, bold: true })] });
const line = (text) => new Paragraph({ text });
const bullet = (text) => new Paragraph({ text, bullet: { level: 0 } });

const doc = new Document({
    sections: [{
        children: [
            bold('АНАЛИТИКА ПРОЕКТА'),
            line('Автор: Цветков Игорь (Xaika1)'),
            line(''),

            bold('1. ЧТО ЭТО'),
            line('Десктоп-приложение «Складской учёт»: учёт товаров, остатков, '
                + 'приходных и расходных документов. Работает офлайн на Windows, '
                + 'данные хранятся в локальной базе SQLite. Интерфейс на русском, '
                + 'есть тёмная и светлая тема.'),
            line(''),

            bold('2. СТЕК'),
            bullet('Electron 35 — десктоп-оболочка'),
            bullet('JavaScript + Vite — интерфейс'),
            bullet('Nunjucks — HTML-шаблоны'),
            bullet('Bootstrap 5 — оформление'),
            bullet('SQLite (better-sqlite3) — база данных'),
            bullet('jsPDF — печать документов в PDF'),
            bullet('electron-builder — сборка portable exe'),
            line(''),

            bold('3. Компоненты'),
            bullet('Обзор — сводка: низкие остатки, последние движения'),
            bullet('Товары — список с фото и поиском, карточка, форма, архив'),
            bullet('Документы — приход, расход, списание, подпись PIN-кодом'),
            bullet('Движения — журнал операций с фильтрами'),
            bullet('Справочники — контрагенты, категории, единицы измерения'),
            bullet('Настройки — оператор, PIN, проверка низких остатков'),
            bullet('PDF — накладная и отчёт по обороту'),
            line(''),
            line('База: 7 таблиц, связи и триггеры (запрет остатка в минус).'),
            line('Тесты: npm run smoke и UI-смоук. Сборка: npm run dist → portable exe.'),
        ],
    }],
});

const out = path.join(__dirname, '..', 'АНАЛИТИКА ПРОЕКТА.docx');
Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync(out, buf);
    console.log(`ok: ${out} (${buf.length} B)`);
});
