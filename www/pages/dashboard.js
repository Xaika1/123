import { render } from '../ui.js';

export async function dashboardPage(root) {
    const stats = await window.api.stats.dashboard();
    root.innerHTML = render('home.html', { stats });
}
