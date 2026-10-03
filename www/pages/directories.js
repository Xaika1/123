import {
    api, render, qs, toast, confirmAction, modalOpen, modalClose,
} from '../ui.js';

export async function directoriesPage(root) {
    let counterparties = await api.counterparties.list();
    let categories = await api.categories.list();
    let units = await api.units.list();

    const draw = () => {
        root.innerHTML = render('directories.html', { counterparties, categories, units });
        bind();
    };

    const reload = async () => {
        counterparties = await api.counterparties.list();
        categories = await api.categories.list();
        units = await api.units.list();
        draw();
    };

    function bind() {
        /* ------------------------- Контрагенты ------------------------- */
        qs('#addCounterparty', root).addEventListener('click', () => {
            qs('#cpId').value = '';
            qs('#cpName').value = '';
            qs('#cpType').value = 'supplier';
            qs('#cpInn').value = '';
            qs('#cpPhone').value = '';
            qs('#cpEmail').value = '';
            qs('#cpAddress').value = '';
            qs('#counterpartyModalTitle').textContent = 'Новый контрагент';
            modalOpen('counterpartyModal');
        });

        qs('#counterpartiesBody', root).addEventListener('click', async (event) => {
            const button = event.target.closest('[data-action]');
            if (!button) return;
            const id = Number(button.dataset.id);

            if (button.dataset.action === 'edit-counterparty') {
                const item = counterparties.find((c) => c.id === id);
                if (!item) return;
                qs('#cpId').value = item.id;
                qs('#cpName').value = item.name;
                qs('#cpType').value = item.type;
                qs('#cpInn').value = item.inn || '';
                qs('#cpPhone').value = item.phone || '';
                qs('#cpEmail').value = item.email || '';
                qs('#cpAddress').value = item.address || '';
                qs('#counterpartyModalTitle').textContent = 'Редактирование контрагента';
                modalOpen('counterpartyModal');
            }

            if (button.dataset.action === 'delete-counterparty') {
                if (!confirmAction(`Удалить контрагента «${button.dataset.name}»?`)) return;
                const result = await api.counterparties.remove(id);
                if (result.ok) {
                    toast('Контрагент удалён');
                    reload();
                } else {
                    toast(result.error, 'danger');
                }
            }
        });

        qs('#counterpartyForm', root).addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = Number(qs('#cpId').value);
            const payload = {
                name: qs('#cpName').value.trim(),
                type: qs('#cpType').value,
                inn: qs('#cpInn').value.trim(),
                phone: qs('#cpPhone').value.trim(),
                email: qs('#cpEmail').value.trim(),
                address: qs('#cpAddress').value.trim(),
            };
            const result = id
                ? await api.counterparties.update(id, payload)
                : await api.counterparties.create(payload);
            if (result.ok) {
                modalClose('counterpartyModal');
                toast(id ? 'Контрагент обновлён' : 'Контрагент добавлен');
                reload();
            } else {
                toast(result.error, 'danger');
            }
        });

        /* --------------------------- Категории --------------------------- */
        qs('#addCategory', root).addEventListener('click', () => {
            qs('#catId').value = '';
            qs('#catName').value = '';
            qs('#catParent').value = '';
            qs('#catDescription').value = '';
            qs('#categoryModalTitle').textContent = 'Новая категория';
            modalOpen('categoryModal');
        });

        qs('#categoriesBody', root).addEventListener('click', async (event) => {
            const button = event.target.closest('[data-action]');
            if (!button) return;
            const id = Number(button.dataset.id);

            if (button.dataset.action === 'edit-category') {
                const item = categories.find((c) => c.id === id);
                if (!item) return;
                qs('#catId').value = item.id;
                qs('#catName').value = item.name;
                qs('#catParent').value = item.parent_id || '';
                qs('#catDescription').value = item.description || '';
                qs('#categoryModalTitle').textContent = 'Редактирование категории';
                modalOpen('categoryModal');
            }

            if (button.dataset.action === 'delete-category') {
                if (!confirmAction(`Удалить категорию «${button.dataset.name}»?`)) return;
                const result = await api.categories.remove(id);
                if (result.ok) {
                    toast('Категория удалена');
                    reload();
                } else {
                    toast(result.error, 'danger');
                }
            }
        });

        qs('#categoryForm', root).addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = Number(qs('#catId').value);
            const payload = {
                name: qs('#catName').value.trim(),
                parent_id: qs('#catParent').value ? Number(qs('#catParent').value) : null,
                description: qs('#catDescription').value.trim() || null,
            };
            const result = id
                ? await api.categories.update(id, payload)
                : await api.categories.create(payload);
            if (result.ok) {
                modalClose('categoryModal');
                toast(id ? 'Категория обновлена' : 'Категория добавлена');
                reload();
            } else {
                toast(result.error, 'danger');
            }
        });

        /* ------------------------ Единицы измерения ------------------------ */
        qs('#unitForm', root).addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = qs('#unitName').value.trim();
            const shortName = qs('#unitShort').value.trim();
            if (!name || !shortName) return;
            const result = await api.units.create({ name, short_name: shortName });
            if (result.ok) {
                toast('Единица измерения добавлена');
                reload();
            } else {
                toast(result.error, 'danger');
            }
        });

        qs('#unitsBody', root).addEventListener('click', async (event) => {
            const button = event.target.closest('[data-action="delete-unit"]');
            if (!button) return;
            if (!confirmAction(`Удалить единицу «${button.dataset.name}»?`)) return;
            const result = await api.units.remove(Number(button.dataset.id));
            if (result.ok) {
                toast('Единица удалена');
                reload();
            } else {
                toast(result.error, 'danger');
            }
        });
    }

    draw();
}
