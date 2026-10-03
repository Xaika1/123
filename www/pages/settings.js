import { api, render, qs, toast, navigate } from '../ui.js';

export async function settingsPage(root) {
    const [secure, info] = await Promise.all([api.secure.load(), api.app.info()]);
    const current = secure || {};

    root.innerHTML = render('settings.html', { secure: current, info });

    qs('#secureForm', root).addEventListener('submit', async (event) => {
        event.preventDefault();

        const operator = qs('#operatorInput', root).value.trim();
        const newPin = qs('#pinNewInput', root).value;

        if (newPin && newPin.length < 4) {
            toast('PIN-код должен содержать минимум 4 символа', 'warning');
            return;
        }

        const payload = { operator };
        if (newPin) payload.pin = newPin;

        const result = await api.secure.save(payload);
        if (result.ok) {
            const label = document.getElementById('operatorLabel');
            if (label) label.textContent = operator;
            toast('Настройки сохранены (зашифрованы через safeStorage)');
            navigate('/settings');
        } else {
            toast(result.error, 'danger');
        }
    });

    qs('#clearPinBtn', root).addEventListener('click', async () => {
        const result = await api.secure.save({
            operator: qs('#operatorInput', root).value.trim(),
            pin: null,
        });
        if (result.ok) {
            toast('PIN-код снят');
            navigate('/settings');
        } else {
            toast(result.error, 'danger');
        }
    });

    qs('#notifyTestBtn', root).addEventListener('click', async () => {
        await api.notify.show('Складской учёт', 'Системные уведомления работают');
        const low = await api.notify.lowStock();
        toast(`Уведомление отправлено, товаров ниже минимума: ${low.count}`, 'info');
    });
}
