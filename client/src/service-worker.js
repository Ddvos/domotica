self.__precacheManifest = [].concat(self.__precacheManifest || []);

// Force development builds
workbox.setConfig({
     debug: true
    });


 
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


self.addEventListener('fetch',function(event){
    console.log("service-worker from vue is working!")   
 })

self.addEventListener('activate', evt=>{

    evt.waitUntil(
        caches.keys().then(keys=>{
            console.log("keys: "+keys);
        })
    )
})