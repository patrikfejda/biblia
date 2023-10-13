self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('biblia-cache').then((cache) => cache.addAll([
            '/biblia/',
            '/biblia/index.html',
            '/biblia/index.js',
            '/biblia/bible.js',
            '/biblia/public/icon.png',
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});