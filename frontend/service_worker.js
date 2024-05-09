// Cached core static resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static').then((cache) => {
            return cache.addAll(['./', 'assets/images/logo189x189.png']);
        }),
    );
});

// Fatch resources
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        }),
    );
});
