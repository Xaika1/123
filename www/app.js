import {
    api, setActiveNav, render, navigate, toast, escapeHtml,
} from './ui.js';
import { dashboardPage } from './pages/dashboard.js';
import { productsPage, productFormPage, productDetailPage } from './pages/products.js';
import { movementsPage } from './pages/movements.js';
import { documentsPage, documentFormPage, documentDetailPage } from './pages/documents.js';
import { directoriesPage } from './pages/directories.js';
import { settingsPage } from './pages/settings.js';

const view = () => document.getElementById('root');

async function router() {
    const path = (location.hash.replace(/^#/, '') || '/').split('?')[0];
    const parts = path.split('/').filter(Boolean);
    const root = view();

    try {
        if (!parts.length) {
            setActiveNav('home');
            await dashboardPage(root);
            return;
        }

        switch (parts[0]) {
            case 'products':
                setActiveNav('products');
                if (parts[1] === 'new') await productFormPage(root, {});
                else if (parts[1] && parts[2] === 'edit') await productFormPage(root, { id: Number(parts[1]) });
                else if (parts[1]) await productDetailPage(root, { id: Number(parts[1]) });
                else await productsPage(root);
                break;

            case 'movements':
                setActiveNav('movements');
                await movementsPage(root);
                break;

            case 'documents':
                setActiveNav('documents');
                if (parts[1] === 'new') await documentFormPage(root, {});
                else if (parts[1]) await documentDetailPage(root, { id: Number(parts[1]) });
                else await documentsPage(root);
                break;

            case 'directories':
                setActiveNav('directories');
                await directoriesPage(root);
                break;

            case 'settings':
                setActiveNav('settings');
                await settingsPage(root);
                break;

            default:
                navigate('/');
        }
    } catch (error) {
        console.error(error);
        root.innerHTML = `
            <div class="alert alert-danger mt-3">
                <i class="bi bi-exclamation-octagon me-2"></i>
                Не удалось загрузить раздел: ${escapeHtml(error.message)}
                <div class="mt-2"><a href="#/" class="alert-link">На главную</a></div>
            </div>`;
    }
}

async function showOperator() {
    try {
        const secure = await api.secure.load();
        const label = document.getElementById('operatorLabel');
        if (label && secure && secure.operator) label.textContent = secure.operator;
    } catch { /* хранилище недоступно — метка остаётся пустой */ }
}

/* Тема оформления (Bootstrap data-bs-theme) */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* хранилище недоступно */ }
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.classList.toggle('bi-moon-stars', theme === 'dark');
        icon.classList.toggle('bi-sun', theme === 'light');
    }
}

function initTheme() {
    let saved = 'dark';
    try { saved = localStorage.getItem('theme') || 'dark'; } catch { /* по умолчанию тёмная */ }
    applyTheme(saved);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
}

function boot() {
    initTheme();
    window.addEventListener('hashchange', router);
    showOperator();
    router();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
    boot();
}
