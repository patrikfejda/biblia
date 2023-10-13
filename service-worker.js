if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service Worker registration failed:', error);
        });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('biblia-cache').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/stylesheet/tailwindcss.css',
                '/index.js',
                '/bible.js',
                'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
                '/public/icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
