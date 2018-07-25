let cacheName = 'currencyConverter-v1';
let cacheFiles = [
  '/',
  'index.html',
  '/script/main.js',
  '/style/bootstrap.min.css',
  '/style/jquery-3.3.1.slim.min.js',
  '/style/popper.min.js',
  '/style/bootstrap.min.js',
  //'https://free.currencyconverterapi.com/api/v5/currencies?',
  'README.md'
];



self.addEventListener('install', event=>{
    console.log('[Service worker] installed');
    event.waitUntil(
             caches.open(cacheName).then(cache=> {
              console.log('[ServiceWorker] Caching...');
               return cache.addAll(cacheFiles)
               
             })
             .then(()=>{
               return self.skipWaiting();
             })
           );
})

self.addEventListener('activate', event=>{
  console.log('[Service worker] activated');

  event.waitUntil(
          caches.keys().then(cacheNames=> {
            return Promise.all(
              cacheNames.filter(cacheName=>{
                return cacheName!=cacheName;
              }).map(thisCacheName=> {
              if (thisCacheName !== cacheName) {
                  console.log('Removing old cache files');
                  return caches.delete(cacheName);
              }
              }
            ));
            
          })
        );
  return self.clients.claim();
})



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
            console.log('updating cache from network...');
            return networkResponse;
            
        }).catch(function() {
          console.log('fetched from cache');  
          return cache.match(event.request);
            
           })
    })
  );
});