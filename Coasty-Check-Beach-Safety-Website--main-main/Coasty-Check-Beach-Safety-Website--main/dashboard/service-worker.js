// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open('coasty-cache-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                // Add other assets you want to cache
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    const title = data.notification.title;
    const options = {
        body: data.notification.body,
        icon: data.notification.icon || '/path/to/default/icon.png',
        badge: '/path/to/badge-icon.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('https://your-website-url.com/notifications')
    );
});