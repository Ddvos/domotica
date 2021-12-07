importScripts("/precache-manifest.67e76fb748ede012c874c4f4676ed5ed.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);

// Force development builds
workbox.setConfig({
     debug: false
    });


 
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//verzameld alle cachenamen 
let currentCacheNames = Object.assign(
    { precacheTemp: workbox.core.cacheNames.precache + "-temp" },
    workbox.core.cacheNames
  );


self.addEventListener('fetch',function(event){
    //console.log("service-worker from vue is working!")   
 })

// clean up old SW caches
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        let validCacheSet = new Set(Object.values(currentCacheNames));
        return Promise.all(
          cacheNames
            .filter(function(cacheName) {
              return !validCacheSet.has(cacheName);
            })
            .map(function(cacheName) {
              //console.log("deleting cache", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
    );
  });
