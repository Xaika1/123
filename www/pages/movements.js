import { api, render, qs, formatMoney } from '../ui.js';

const filters = { dateFrom: '', dateTo: '', type: '', productId: '' };

export async function movementsPage(root) {
    const products = await api.products.list({ sort: 'name' });
    root.innerHTML = render('movements.html', { filters, products });

    const refresh = async () => {
        const rows = await api.movements.list(filters).then((items) => items.map((item) => ({
            ...item,
            sum: Number(item.quantity) * Number(item.price_at_moment),
        })));

        qs('#movementsBody', root).innerHTML = render('partials/movements_tbody.html', { movements: rows });

        let incoming = 0;
        let outgoing = 0;
        for (const row of rows) {
            const sum = Number(row.quantity) * Number(row.price_at_moment);
            if (row.movement_type === 'in') incoming += sum;
            else outgoing += sum;
        }

        qs('#movementsCount', root).textContent = `Записей: ${rows.length}`;
        qs('#movementsTotals', root).textContent =
            `Приход: ${formatMoney(incoming)} руб. · Расход: ${formatMoney(outgoing)} руб.`;
    };

    qs('#dateFrom', root).addEventListener('change', (event) => {
        filters.dateFrom = event.target.value;
        refresh();
    });
    qs('#dateTo', root).addEventListener('change', (event) => {
        filters.dateTo = event.target.value;
        refresh();
    });
    qs('#typeFilter', root).addEventListener('change', (event) => {
        filters.type = event.target.value;
        refresh();
    });
    qs('#productFilter', root).addEventListener('change', (event) => {
        filters.productId = event.target.value;
        refresh();
    });
    qs('#resetFilters', root).addEventListener('click', () => {
        filters.dateFrom = '';
        filters.dateTo = '';
        filters.type = '';
        filters.productId = '';
        qs('#dateFrom', root).value = '';
        qs('#dateTo', root).value = '';
        qs('#typeFilter', root).value = '';
        qs('#productFilter', root).value = '';
        refresh();
    });

    await refresh();
}
