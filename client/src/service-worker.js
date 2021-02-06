self.__precacheManifest = [].concat(self.__precacheManifest || []);

// Force development builds
workbox.setConfig({
     debug: true 
    });

self.addEventListener('activate', evt=>{

    evt.waitUntil(
        caches.keys().then(keys=>{
            console.log(keys);
        })
    )
})
    
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

