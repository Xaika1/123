import { jsPDF } from 'jspdf';
import { api, askPin, toast, TYPE_LABELS } from './ui.js';

const ORG = {
    name: 'ООО «Склад-Сервис»',
    inn: '7701234567',
    address: 'г. Москва, ул. Складская, 12',
    phone: '+7 (495) 111-22-33',
};

const PAGE = { left: 14, right: 196, bottom: 278 };

let fontsPromise = null;
let boldAvailable = false;

function money(value) {
    return Number(value || 0).toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

async function createPdf() {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    if (!fontsPromise) fontsPromise = api.pdf.fonts();
    const fonts = await fontsPromise;
    boldAvailable = false;

    if (fonts && fonts.regular) {
        doc.addFileToVFS(fonts.regular.name, fonts.regular.data);
        doc.addFont(fonts.regular.name, 'AppFont', 'normal');
        if (fonts.bold) {
            try {
                doc.addFileToVFS(fonts.bold.name, fonts.bold.data);
                doc.addFont(fonts.bold.name, 'AppFont', 'bold');
                boldAvailable = true;
            } catch { boldAvailable = false; }
        }
    }
    return doc;
}

function setFont(doc, bold = false) {
    if (bold && boldAvailable) {
        doc.setFont('AppFont', 'bold');
        return;
    }
    try {
        doc.setFont('AppFont', 'normal');
    } catch {
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
    }
}

function drawPageHeader(doc, { title, metaLeft, metaRight }) {
    setFont(doc, true);
    doc.setFontSize(13);
    doc.text(title, 105, 18, { align: 'center' });

    setFont(doc, false);
    doc.setFontSize(9);
    doc.setTextColor(70, 76, 90);
    doc.text(ORG.name, PAGE.left, 14);
    doc.text(`${ORG.address} · ${ORG.phone}`, PAGE.left, 19);
    doc.text(`ИНН ${ORG.inn}`, PAGE.left, 24);

    let y = 32;
    for (const line of metaLeft || []) {
        doc.text(line, PAGE.left, y);
        y += 5;
    }
    y = 32;
    setFont(doc, false);
    for (const line of metaRight || []) {
        doc.text(line, PAGE.right, y, { align: 'right' });
        y += 5;
    }

    doc.setTextColor(20, 20, 20);
    return Math.max(y, 42);
}

function drawTable(doc, { columns, rows, startY, rowHeight = 7 }) {
    const width = PAGE.right - PAGE.left;
    let y = startY;

    const drawHead = () => {
        setFont(doc, true);
        doc.setFontSize(8.5);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(52, 58, 64);
        doc.rect(PAGE.left, y, width, 7, 'F');
        let x = PAGE.left;
        for (const col of columns) {
            const align = col.align || 'left';
            const tx = align === 'right' ? x + col.width - 1.5
                : align === 'center' ? x + col.width / 2
                    : x + 1.5;
            doc.text(String(col.title), tx, y + 4.7, { align });
            x += col.width;
        }
        y += 7;
    };

    drawHead();
    setFont(doc, false);
    doc.setFontSize(8.5);
    doc.setTextColor(25, 25, 25);

    rows.forEach((row, index) => {
        if (y > PAGE.bottom - 10) {
            doc.addPage();
            y = 16;
            drawHead();
            setFont(doc, false);
            doc.setFontSize(8.5);
            doc.setTextColor(25, 25, 25);
        }

        if (index % 2 === 1) {
            doc.setFillColor(244, 246, 249);
            doc.rect(PAGE.left, y, width, rowHeight, 'F');
        }

        let x = PAGE.left;
        for (const col of columns) {
            const raw = String(col.value(row, index) ?? '');
            const lines = doc.splitTextToSize(raw, col.width - 3);
            const text = lines.length > 1 ? `${lines[0]}…` : raw;
            const align = col.align || 'left';
            const tx = align === 'right' ? x + col.width - 1.5
                : align === 'center' ? x + col.width / 2
                    : x + 1.5;
            doc.text(text, tx, y + 4.7, { align });
            x += col.width;
        }

        doc.setDrawColor(225, 228, 234);
        doc.line(PAGE.left, y + rowHeight, PAGE.right, y + rowHeight);
        y += rowHeight;
    });

    return y;
}

function drawSignatures(doc, y, { responsible, operator }) {
    const bottom = Math.min(y + 18, PAGE.bottom);
    setFont(doc, false);
    doc.setFontSize(9);
    doc.text(`Отпустил: ${operator || responsible || '___________________'}`, PAGE.left, bottom);
    doc.text('Получил: ___________________', 110, bottom);
    doc.text('Бухгалтер: ___________________', PAGE.left, bottom + 8);
    return bottom + 8;
}

function rowsColumnsForDocument() {
    return [
        { title: '№', width: 8, align: 'center', value: (row, i) => i + 1 },
        { title: 'Артикул', width: 26, value: (row) => row.article || '' },
        { title: 'Наименование', width: 66, value: (row) => row.name || row.product_name || '' },
        { title: 'Ед.', width: 14, value: (row) => row.unit_short || '' },
        { title: 'Кол-во', width: 18, align: 'right', value: (row) => row.quantity ?? row.current_stock },
        { title: 'Цена', width: 24, align: 'right', value: (row) => money(row.price_at_moment ?? row.price) },
        { title: 'Сумма', width: 26, align: 'right', value: (row) => money((row.quantity ?? row.current_stock) * (row.price_at_moment ?? row.price)) },
    ];
}

async function confirmOperator() {
    try {
        const secure = await api.secure.load();
        if (!secure || !secure.hasPin) return true;
    } catch { return true; }
    return askPin();
}

function toBase64(doc) {
    const bytes = new Uint8Array(doc.output('arraybuffer'));
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
}

function safeFileName(name) {
    return String(name).replace(/[\\/:*?"<>|]/g, '-').trim();
}

/** PDF приходной/расходной накладной или акта списания */
export async function generateDocumentPdf(document) {
    const confirmed = await confirmOperator();
    if (!confirmed) return null;

    const doc = await createPdf();
    const isInventory = document.doc_type === 'inventory';

    const metaLeft = [
        `Документ № ${document.number} от ${document.doc_date}`,
        `Тип: ${TYPE_LABELS[document.doc_type] || document.doc_type}`,
    ];
    if (document.counterparty_name) {
        metaLeft.push(`Контрагент: ${document.counterparty_name}`);
        if (document.comment) metaLeft.push(`Комментарий: ${document.comment}`);
    }

    const metaRight = [
        `Ответственный: ${document.responsible || '—'}`,
        `Сформирован: ${new Date().toLocaleString('ru-RU')}`,
    ];

    const title = {
        incoming: 'ПРИХОДНАЯ НАКЛАДНАЯ',
        outgoing: 'РАСХОДНАЯ НАКЛАДНАЯ',
        write_off: 'АКТ О СПИСАНИИ',
        inventory: 'АКТ ИНВЕНТАРИЗАЦИИ',
    }[document.doc_type] || 'ДОКУМЕНТ';

    let y = drawPageHeader(doc, { title, metaLeft, metaRight });
    let rows = document.items || [];
    let total = 0;

    if (isInventory) {
        const products = await api.products.list({ includeArchived: false, sort: 'name' });
        rows = products;
        y = drawTable(doc, { columns: rowsColumnsForDocument(), rows, startY: y + 2 });
        total = rows.reduce((sum, row) => sum + row.current_stock * row.price, 0);
    } else {
        y = drawTable(doc, { columns: rowsColumnsForDocument(), rows, startY: y + 2 });
        total = rows.reduce((sum, row) => sum + row.quantity * row.price_at_moment, 0);
    }

    setFont(doc, true);
    doc.setFontSize(10);
    doc.text(`Итого: ${money(total)} руб.`, PAGE.right, y + 8, { align: 'right' });
    setFont(doc, false);

    drawSignatures(doc, y + 20, {
        responsible: document.responsible,
        operator: document.responsible,
    });

    const defaultName = safeFileName(`${document.number}.pdf`);
    const base64 = toBase64(doc);
    const savedPath = await api.pdf.save(defaultName, base64);
    if (!savedPath) return null;

    if (document.id) await api.documents.attachPdf(document.id, savedPath);
    toast(`PDF сохранён: ${savedPath}`, 'success');
    return savedPath;
}

/** PDF отчёта по обороту за период */
export async function generateReportPdf(period) {
    const confirmed = await confirmOperator();
    if (!confirmed) return null;

    const rows = await api.app.report({ dateFrom: period.from, dateTo: period.to });
    if (!rows.length) {
        toast('За выбранный период оборотов нет', 'warning');
        return null;
    }

    const doc = await createPdf();
    const y = drawPageHeader(doc, {
        title: 'ОТЧЁТ ПО ОБОРОТУ ЗА ПЕРИОД',
        metaLeft: [`Период: ${period.from} — ${period.to}`],
        metaRight: [`Сформирован: ${new Date().toLocaleString('ru-RU')}`],
    });

    const columns = [
        { title: 'Артикул', width: 26, value: (row) => row.article },
        { title: 'Наименование', width: 64, value: (row) => row.name },
        { title: 'Ед.', width: 14, value: (row) => row.unit_short || '' },
        { title: 'Приход', width: 20, align: 'right', value: (row) => row.coming },
        { title: 'Расход', width: 20, align: 'right', value: (row) => row.going },
        { title: 'Остаток', width: 18, align: 'right', value: (row) => row.current_stock },
        { title: 'Сумма остатка', width: 20, align: 'right', value: (row) => money(row.current_stock * row.price) },
    ];

    const tableEnd = drawTable(doc, { columns, rows, startY: y + 2 });
    const totalSum = rows.reduce((sum, row) => sum + row.current_stock * row.price, 0);

    setFont(doc, true);
    doc.setFontSize(10);
    doc.text(`Стоимость остатков: ${money(totalSum)} руб.`, PAGE.right, tableEnd + 8, { align: 'right' });
    setFont(doc, false);
    drawSignatures(doc, tableEnd + 20, { responsible: '', operator: '' });

    const savedPath = await api.pdf.save(
        safeFileName(`Оборот_${period.from}_${period.to}.pdf`),
        toBase64(doc)
    );
    if (savedPath) toast(`PDF сохранён: ${savedPath}`, 'success');
    return savedPath;
}

// Точка входа для автотестов (UI smoke)
window.__pdf = { generateDocumentPdf, generateReportPdf };
