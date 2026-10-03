import {
    api, render, navigate, toast, confirmAction, debounce, qs,
} from '../ui.js';

const filters = { search: '', sort: 'name', direction: 'asc', categoryId: '', includeArchived: false };

function decorate(product) {
    return {
        ...product,
        receipt: product.last_receipt_at ? String(product.last_receipt_at).slice(0, 10) : '',
    };
}

export async function productsPage(root) {
    const categories = await api.categories.list();
    root.innerHTML = render('products.html', { categories, filters });

    const refresh = async () => {
        const rows = await api.products.list(filters);
        qs('#productsBody', root).innerHTML = render('partials/products_tbody.html', {
            products: rows.map(decorate),
        });
        qs('#productsCount', root).textContent = `Найдено позиций: ${rows.length}`;
    };

    qs('#searchInput', root).addEventListener('input', debounce((event) => {
        filters.search = event.target.value.trim();
        refresh();
    }, 250));
    qs('#categoryFilter', root).addEventListener('change', (event) => {
        filters.categoryId = event.target.value;
        refresh();
    });
    qs('#sortSelect', root).addEventListener('change', (event) => {
        filters.sort = event.target.value;
        refresh();
    });
    qs('#directionSelect', root).addEventListener('change', (event) => {
        filters.direction = event.target.value;
        refresh();
    });
    qs('#archivedToggle', root).addEventListener('change', (event) => {
        filters.includeArchived = event.target.checked;
        refresh();
    });

    qs('#productsBody', root).addEventListener('click', async (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) return;
        const id = Number(button.dataset.id);

        if (button.dataset.action === 'archive') {
            const archived = button.dataset.archived === '1';
            const result = await api.products.archive(id, archived);
            if (result.ok) {
                toast(archived ? 'Товар перемещён в архив' : 'Товар восстановлен из архива');
                refresh();
            }
        }

        if (button.dataset.action === 'delete') {
            const confirmed = confirmAction(
                `Удалить товар «${button.dataset.name}»?\n\nУдаление невозможно, если по товару есть история движений — тогда используйте архивирование.`
            );
            if (!confirmed) return;
            const result = await api.products.remove(id);
            if (result.ok) {
                toast('Товар удалён');
                refresh();
            } else {
                toast(result.error, 'danger');
            }
        }
    });

    await refresh();
}

function showImage(root, url, path) {
    const placeholder = qs('#imagePlaceholder', root);
    const preview = qs('#imagePreview', root);
    const label = qs('#imagePathLabel', root);

    if (url) {
        preview.src = url;
        preview.classList.remove('d-none');
        if (placeholder) placeholder.classList.add('d-none');
    } else {
        preview.removeAttribute('src');
        preview.classList.add('d-none');
        if (placeholder) placeholder.classList.remove('d-none');
    }
    if (label) label.textContent = path || '';
}

export async function productFormPage(root, { id }) {
    const [product, categories, units] = await Promise.all([
        id ? api.products.get(id) : Promise.resolve(null),
        api.categories.list(),
        api.units.list(),
    ]);

    if (id && !product) {
        toast('Товар не найден', 'danger');
        navigate('/products');
        return;
    }

    root.innerHTML = render('product_form.html', { product, isNew: !id, categories, units });
    const form = qs('#productForm', root);

    qs('#pickImage', root).addEventListener('click', async () => {
        const picked = await api.images.pick();
        if (!picked) return;
        qs('#imagePath', root).value = picked.path;
        showImage(root, picked.url, picked.path);
    });

    qs('#clearImage', root).addEventListener('click', () => {
        qs('#imagePath', root).value = '';
        showImage(root, null, '');
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const payload = {
            article: qs('#article', root).value.trim(),
            name: qs('#name', root).value.trim(),
            category_id: qs('#categoryId', root).value ? Number(qs('#categoryId', root).value) : null,
            unit_id: Number(qs('#unitId', root).value),
            description: qs('#description', root).value.trim() || null,
            image_path: qs('#imagePath', root).value || null,
            current_stock: Number(qs('#currentStock', root).value || 0),
            min_stock: Number(qs('#minStock', root).value || 0),
            price: Number(qs('#price', root).value || 0),
            location: qs('#location', root).value.trim() || null,
            is_active: qs('#isActive', root).checked,
        };

        const result = id
            ? await api.products.update(id, payload)
            : await api.products.create(payload);

        if (result.ok) {
            toast(id ? 'Изменения сохранены' : 'Товар создан');
            navigate('/products');
        } else {
            toast(result.error, 'danger');
        }
    });
}

export async function productDetailPage(root, { id }) {
    const [product, movements] = await Promise.all([
        api.products.get(id),
        api.movements.byProduct(id),
    ]);

    if (!product) {
        toast('Товар не найден', 'danger');
        navigate('/products');
        return;
    }

    root.innerHTML = render('product_detail.html', { product, movements });

    qs('#archiveBtn', root).addEventListener('click', async () => {
        const archived = qs('#archiveBtn', root).dataset.archived === '1';
        const result = await api.products.archive(id, archived);
        if (result.ok) {
            toast(archived ? 'Товар перемещён в архив' : 'Товар восстановлен из архива');
            navigate(`/products/${id}`);
        }
    });

    qs('#deleteBtn', root).addEventListener('click', async () => {
        if (!confirmAction(`Удалить товар «${product.name}»?`)) return;
        const result = await api.products.remove(id);
        if (result.ok) {
            toast('Товар удалён');
            navigate('/products');
        } else {
            toast(result.error, 'danger');
        }
    });
}
