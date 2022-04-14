const cacheName = 'app-cache';
const cacheFiles = ['/main.js', '/vendors.js', '/runtime.js', '/myWorker.js'];

const fromCache = request =>
    caches
        .open(cacheName)
        .then(cache =>
            cache.match(request).then(matching => matching || Promise.reject('no-match'))
        );

const preCache = () => caches.open(cacheName).then(cache => cache.addAll(cacheFiles));

self.addEventListener('install', event => {
    event.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    if (url.origin !== location.origin) {
        return;
    }

    console.log('Fetch intercepted for:', request.url);
    event.respondWith(
        fetch(request).catch(e => {
            console.error('Fetch failed; returning offline page instead.', e);

            return fromCache(request);
        })
    );
});
