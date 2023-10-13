if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/homescreen/sw.js')
        .then(() => { console.log('Service Worker Registered'); });
}