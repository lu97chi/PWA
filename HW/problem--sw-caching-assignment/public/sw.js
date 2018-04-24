var CACHE_STATIC_NAME = 'static-v3'
var CACHE_DYNAMIC_NAME = 'dynamic-v3'
self.addEventListener('install', function(e){
    console.log('[service Worker] installing')
    e.waitUntil(caches.open(CACHE_STATIC_NAME).then(function(cache){
        cache.addAll([
            '/',
            '/index.html',
            '/src/js/main.js',        
            '/src/css/main.css',
            '/src/css/app.css',    
            '/src/js/material.min.js',    
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ])
    }))
})

self.addEventListener('activate', function(e){
    console.log('[service Worker] activating')
    e.waitUntil(caches.keys().then(function(keys){
        return Promise.all(keys.map(function(key){
            if(key !== CACHE_STATIC_NAME){
                return caches.delete(key)
            }
        }))
    }))
})

self.addEventListener('fetch', function(e){
    console.log('[service Worker] fetching')
    e.respondWith(caches.match(e.request).then(function(response){
        if(response){
            return response
        }else{
            return fetch(e.request).then(function(res){
                return caches.open(CACHE_DYNAMIC_NAME).then(function(cache){
                    cache.put(e.request.url, res.clone());
                    return res;
                })
            }).catch(function(err){

            })
        }
    }))
})