const { contextBridge, ipcRenderer } = require('electron');

/**
 * Безопасный мост между Renderer и Main процессами.
 * Renderer не получает доступа к Node.js API — только к методам window.api.
 */
contextBridge.exposeInMainWorld('api', {
    products: {
        list: (options) => ipcRenderer.invoke('products:list', options),
        get: (id) => ipcRenderer.invoke('products:get', id),
        create: (data) => ipcRenderer.invoke('products:create', data),
        update: (id, data) => ipcRenderer.invoke('products:update', id, data),
        archive: (id, archived) => ipcRenderer.invoke('products:archive', id, archived),
        remove: (id) => ipcRenderer.invoke('products:delete', id),
    },

    categories: {
        list: () => ipcRenderer.invoke('categories:list'),
        create: (data) => ipcRenderer.invoke('categories:create', data),
        update: (id, data) => ipcRenderer.invoke('categories:update', id, data),
        remove: (id) => ipcRenderer.invoke('categories:delete', id),
    },

    units: {
        list: () => ipcRenderer.invoke('units:list'),
        create: (data) => ipcRenderer.invoke('units:create', data),
        remove: (id) => ipcRenderer.invoke('units:delete', id),
    },

    counterparties: {
        list: () => ipcRenderer.invoke('counterparties:list'),
        create: (data) => ipcRenderer.invoke('counterparties:create', data),
        update: (id, data) => ipcRenderer.invoke('counterparties:update', id, data),
        remove: (id) => ipcRenderer.invoke('counterparties:delete', id),
    },

    documents: {
        list: (options) => ipcRenderer.invoke('documents:list', options),
        get: (id) => ipcRenderer.invoke('documents:get', id),
        create: (data) => ipcRenderer.invoke('documents:create', data),
        attachPdf: (id, pdfPath) => ipcRenderer.invoke('documents:attach-pdf', id, pdfPath),
    },

    movements: {
        list: (filters) => ipcRenderer.invoke('movements:list', filters),
        byProduct: (productId) => ipcRenderer.invoke('movements:by-product', productId),
    },

    stats: {
        dashboard: () => ipcRenderer.invoke('stats:dashboard'),
    },

    images: {
        pick: () => ipcRenderer.invoke('images:pick'),
    },

    notify: {
        show: (title, body) => ipcRenderer.invoke('notify:show', { title, body }),
        lowStock: () => ipcRenderer.invoke('notify:low-stock'),
    },

    pdf: {
        save: (defaultName, data) => ipcRenderer.invoke('pdf:save', { defaultName, data }),
        open: (filePath) => ipcRenderer.invoke('pdf:open', filePath),
        fonts: () => ipcRenderer.invoke('pdf:fonts'),
    },

    secure: {
        save: (payload) => ipcRenderer.invoke('secure:save', payload),
        load: () => ipcRenderer.invoke('secure:load'),
        verify: (pin) => ipcRenderer.invoke('secure:verify', pin),
        clear: () => ipcRenderer.invoke('secure:clear'),
    },

    app: {
        info: () => ipcRenderer.invoke('app:info'),
        report: (period) => ipcRenderer.invoke('app:report', period),
    },
});
