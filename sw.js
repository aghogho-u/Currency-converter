
let cacheName = 'v1';
let cacheFiles = [
  '/',
  '/index.html',
  '/scripts/main.js',
  '/README.md'
];


self.addEventListener('install', function(event){
    console.log('[Service worker] installed');
    event.waitUntil(
             caches.open(cacheName).then(function(cache) {
                 console.log('[ServiceWorker] Caching');
               return cache.addAll(cacheFiles);
             })
           );
})

self.addEventListener('activate', function(event){
    console.log('[Service worker] activated');

    event.waitUntil(
            caches.keys().then(function(cacheNames) {
              return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('Removing old cache files');
                    return caches.delete(key);
                }
              }));
            })
          );
})

self.addEventListener('fetch', function(event){
    console.log('[Service worker] fetching', event.request.url);

    event.respondwith(
        caches.match(event.request).then(function (response){
            if (response){
                console.log('[service worker] found match', event.request.url);
                return response;
            } 
            let requestClone = event.request.clone();
            fetch(requestClone).then(function(response){
              if(!response){
                console.log('No response from cache');
                return response;
              }

              let responseClone = response.clone();
              caches.open(cacheName).then(function(cache) {
                cache.put(event.request, responseClone);
                return response;
              });
            })
            .catch(function(err){
              console.log('[service worker] fetch and cache error', err)
            })
        })
    )

})



