const windowLoadHandle = () => {
    const url = new URL('scripts/service-worker.js', import.meta.url);

    navigator.serviceWorker
        .register(url)
        .then(reg => {
            console.log('Service worker registered! 😎', reg);
        })
        .catch(err => {
            console.log('😥 Service worker registration failed: ', err);
        });
};

export const initServiceWorker = () => {
    const isServiceWorker = 'serviceWorker' in navigator;

    if (!isServiceWorker) {
        return;
    }

    window.addEventListener('load', windowLoadHandle);
};
