export const api = window.api;

export const TYPE_LABELS = {
    incoming: 'Приходная накладная',
    outgoing: 'Расходная накладная',
    write_off: 'Акт списания',
    inventory: 'Акт инвентаризации',
};

export const TYPE_BADGES = {
    incoming: 'success',
    outgoing: 'primary',
    write_off: 'danger',
    inventory: 'secondary',
};

export const MOVEMENT_LABELS = { in: 'Приход', out: 'Расход', write_off: 'Списание' };

export function render(name, context) {
    return window.renderPage(name, context || {});
}

export function navigate(path) {
    const hash = path.startsWith('#') ? path : `#${path}`;
    if (location.hash === hash) {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
        location.hash = hash;
    }
}

export function qs(selector, root = document) {
    return root.querySelector(selector);
}

export function qsa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
}

export function debounce(fn, ms = 200) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

export function confirmAction(message) {
    return window.confirm(message);
}

export function toast(message, variant = 'success') {
    const host = document.getElementById('toastHost');
    if (!host) return;
    const el = document.createElement('div');
    el.className = `toast align-items-center text-bg-${borderVariant(variant)} border-0`;
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${escapeHtml(message)}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>`;
    host.appendChild(el);
    el.addEventListener('hidden.bs.toast', () => el.remove(), { once: true });
    window.bootstrap.Toast.getOrCreateInstance(el, { delay: 3500 }).show();
}

function borderVariant(variant) {
    return ['success', 'danger', 'warning', 'info', 'primary', 'secondary'].includes(variant)
        ? variant : 'secondary';
}

export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function showFormError(element, message) {
    if (!element) return;
    if (!message) {
        element.classList.add('d-none');
        element.textContent = '';
        return;
    }
    element.textContent = message;
    element.classList.remove('d-none');
}

export function setActiveNav(section) {
    document.querySelectorAll('[data-nav]').forEach((link) => {
        link.classList.toggle('active', link.dataset.nav === section);
    });
}

/* ------------------------------ Модальные окна (нативный Bootstrap) ------------------------------ */

export function modalOpen(id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.bootstrap.Modal.getOrCreateInstance(el).show();
}

export function modalClose(id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.bootstrap.Modal.getOrCreateInstance(el).hide();
}

/* --------------------------- Подтверждение PIN-кодом --------------------------- */

export function askPin() {
    return new Promise((resolve) => {
        const input = document.getElementById('pinInput');
        const error = document.getElementById('pinError');
        const submit = document.getElementById('pinSubmit');
        if (!input || !submit) { resolve(true); return; }

        input.value = '';
        error.classList.add('d-none');
        modalOpen('pinModal');
        setTimeout(() => input.focus(), 50);

        function cleanup() {
            submit.removeEventListener('click', onSubmit);
            input.removeEventListener('keydown', onKey);
            modalClose('pinModal');
        }

        async function finish() {
            const ok = await api.secure.verify(input.value);
            if (ok) {
                cleanup();
                resolve(true);
            } else {
                error.classList.remove('d-none');
                input.select();
            }
        }

        function onSubmit() { finish(); }
        function onKey(event) {
            if (event.key === 'Enter') { event.preventDefault(); finish(); }
        }

        submit.addEventListener('click', onSubmit);
        input.addEventListener('keydown', onKey);
    });
}

/* --------------------------------- Форматирование --------------------------------- */

export function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function monthStartISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}

export function formatDate(value) {
    return value ? String(value).slice(0, 10) : '—';
}

export function formatMoney(value) {
    return Number(value || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
