let cacheName = 'currencyConverter-v1';
let cacheFiles = [
  '/',
  'index.html',
  '/script/main.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.3.1.slim.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
  'https://free.currencyconverterapi.com/api/v5/currencies?',
  'README.md'
];



self.addEventListener('install', event=>{
    console.log('[Service worker] installed');
    event.waitUntil(
             caches.open(cacheName).then(cache=> {
              console.log('[ServiceWorker] Caching');
               return cache.addAll(cacheFiles)
               
             }).then(()=>{
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




self.addEventListener('fetch', e=> {
  console.log('[Service Worker] Fetch', e.request.url);
  
  e.respondWith(fromCache(e.request));
  
  e.waitUntil(update(e.request));
});




fromCache = (request) => {
  return caches.open(cacheFiles).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


update = (request)=> {
  console.log('updating...');
  return caches.open(cacheFiles).then( cache=> {
    return fetch(request).then(response=> {
      return cache.put(request, response);
    });
  });
}



