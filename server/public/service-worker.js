importScripts("/precache-manifest.3c287de8351bae7646e73f2b8dd9ce1c.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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


