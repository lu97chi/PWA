self.addEventListener('install', function(event){
    console.log('[ServiceWorker] installing serviceWorker', event);
});

self.addEventListener('activate', function(event){
    console.log('[ServiceWorker] Activating serviceWorker', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event){
    console.log('[ServiceWorker] Fetching something', event);
    event.respondWith(fetch(event.request))
});