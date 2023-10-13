self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('fox-store').then((cache) => cache.addAll([
            '/packlist/',
            '/packlist/index.html',
            '/packlist/index.js',
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});