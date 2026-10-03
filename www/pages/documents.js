import {
    api, render, qs, qsa, toast, showFormError, navigate,
    monthStartISO, todayISO,
} from '../ui.js';
import { generateDocumentPdf, generateReportPdf } from '../pdf.js';

const filters = { docType: '' };

export async function documentsPage(root) {
    const period = { from: monthStartISO(), to: todayISO() };
    root.innerHTML = render('documents.html', { filters, period });

    const refresh = async () => {
        const rows = await api.documents.list({ docType: filters.docType });
        qs('#documentsBody', root).innerHTML = render('partials/documents_tbody.html', { documents: rows });
        qs('#documentsCount', root).textContent = `Документов: ${rows.length}`;
    };

    qs('#docTypeFilter', root).addEventListener('change', (event) => {
        filters.docType = event.target.value;
        refresh();
    });

    qs('#reportBtn', root).addEventListener('click', async () => {
        const from = qs('#reportFrom', root).value;
        const to = qs('#reportTo', root).value;
        if (!from || !to) {
            toast('Укажите период для отчёта', 'warning');
            return;
        }
        await generateReportPdf({ from, to });
    });

    qs('#documentsBody', root).addEventListener('click', async (event) => {
        const button = event.target.closest('[data-action="pdf"]');
        if (!button) return;
        const documentRow = await api.documents.get(Number(button.dataset.id));
        if (!documentRow) return;
        const path = await generateDocumentPdf(documentRow);
        if (path) refresh();
    });

    await refresh();
}

function collectItems(root) {
    return qsa('#itemsBody tr[data-item-row]', root).map((row) => ({
        product_id: Number(row.querySelector('.productSelect').value),
        quantity: Number(row.querySelector('.qtyInput').value),
        price: Number(row.querySelector('.priceInput').value),
    }));
}

function recalcTotals(root) {
    let total = 0;
    qsa('#itemsBody tr[data-item-row]', root).forEach((row) => {
        const qty = Number(row.querySelector('.qtyInput').value || 0);
        const price = Number(row.querySelector('.priceInput').value || 0);
        const sum = qty * price;
        row.querySelector('.sumCell').textContent = sum.toLocaleString('ru-RU', {
            minimumFractionDigits: 2, maximumFractionDigits: 2,
        });
        total += sum;
    });
    qs('#itemsTotal', root).textContent = total.toLocaleString('ru-RU', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    });
}

function applyTypeRules(root, type) {
    const isInventory = type === 'inventory';
    qs('#itemsSection', root).classList.toggle('d-none', isInventory);
    qs('#inventoryNote', root).classList.toggle('d-none', !isInventory);

    const select = qs('#counterparty', root);
    const hint = qs('#counterpartyHint', root);
    const wanted = type === 'incoming' ? 'supplier' : type === 'outgoing' ? 'customer' : null;

    qsa('#counterparty option', root).forEach((option) => {
        if (!option.value) return;
        option.hidden = Boolean(wanted) && option.dataset.type !== wanted;
    });
    if (select.selectedOptions[0] && select.selectedOptions[0].hidden) select.value = '';

    hint.textContent = type === 'incoming' ? 'Для прихода выбирайте поставщика'
        : type === 'outgoing' ? 'Для расхода выбирайте покупателя'
            : 'Контрагент необязателен';
}

export async function documentFormPage(root) {
    const [products, counterparties, secure] = await Promise.all([
        api.products.list({ sort: 'name' }),
        api.counterparties.list(),
        api.secure.load(),
    ]);

    root.innerHTML = render('document_form.html', {
        today: todayISO(),
        counterparties,
        operator: (secure && secure.operator) || '',
    });

    const form = qs('#documentForm', root);
    const errorBox = qs('#formError', root);

    const addRow = () => {
        qs('#itemsBody', root).insertAdjacentHTML(
            'beforeend',
            render('partials/document_item_row.html', { products, row: {} })
        );
        recalcTotals(root);
    };

    applyTypeRules(root, qs('#docType', root).value);

    qs('#docType', root).addEventListener('change', (event) => {
        applyTypeRules(root, event.target.value);
        showFormError(errorBox, '');
    });

    qs('#addItem', root).addEventListener('click', addRow);

    qs('#itemsBody', root).addEventListener('click', (event) => {
        const remove = event.target.closest('.removeItem');
        if (remove) {
            remove.closest('tr').remove();
            recalcTotals(root);
        }
    });

    qs('#itemsBody', root).addEventListener('input', (event) => {
        const row = event.target.closest('tr[data-item-row]');
        if (row && event.target.classList.contains('productSelect')) {
            const option = event.target.selectedOptions[0];
            const priceInput = row.querySelector('.priceInput');
            if (option && option.dataset.price && Number(priceInput.value) === 0) {
                priceInput.value = option.dataset.price;
            }
        }
        recalcTotals(root);
    });

    qs('#itemsBody', root).addEventListener('change', (event) => {
        if (event.target.classList.contains('productSelect')) {
            const row = event.target.closest('tr[data-item-row]');
            const option = event.target.selectedOptions[0];
            const priceInput = row.querySelector('.priceInput');
            if (option && option.dataset.price && Number(priceInput.value) === 0) {
                priceInput.value = option.dataset.price;
            }
            recalcTotals(root);
        }
    });

    if (qs('#docType', root).value !== 'inventory') addRow();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        showFormError(errorBox, '');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const docType = qs('#docType', root).value;
        const items = collectItems(root).filter((item) => item.product_id > 0);

        if (docType !== 'inventory') {
            if (!items.length) {
                showFormError(errorBox, 'Добавьте хотя бы одну позицию документа');
                return;
            }
            const invalid = items.find((item) => !(item.quantity > 0));
            if (invalid) {
                showFormError(errorBox, 'Количество каждой позиции должно быть больше нуля');
                return;
            }
        }

        const payload = {
            doc_type: docType,
            doc_date: qs('#docDate', root).value,
            counterparty_id: qs('#counterparty', root).value
                ? Number(qs('#counterparty', root).value)
                : null,
            responsible: qs('#responsible', root).value.trim() || null,
            comment: qs('#docComment', root).value.trim() || null,
            items: docType === 'inventory' ? [] : items,
        };

        const result = await api.documents.create(payload);
        if (result.ok) {
            toast(`Документ ${result.number} проведён`);
            navigate(`/documents/${result.id}`);
        } else {
            showFormError(errorBox, result.error);
        }
    });
}

export async function documentDetailPage(root, { id }) {
    const documentRow = await api.documents.get(id);
    if (!documentRow) {
        toast('Документ не найден', 'danger');
        navigate('/documents');
        return;
    }

    documentRow.total = documentRow.items.reduce(
        (sum, item) => sum + Number(item.quantity) * Number(item.price_at_moment),
        0
    );

    root.innerHTML = render('document_detail.html', { document: documentRow });

    qs('#makePdfBtn', root).addEventListener('click', async () => {
        const path = await generateDocumentPdf(documentRow);
        if (path) navigate(`/documents/${id}`);
    });

    const openButton = qs('#openPdfBtn', root);
    if (openButton && documentRow.pdf_path) {
        openButton.addEventListener('click', () => api.pdf.open(documentRow.pdf_path));
    }
}
