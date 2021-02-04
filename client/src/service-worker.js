self.__precacheManifest = [].concat(self.__precacheManifest || []);

// Force development builds
workbox.setConfig({
     debug: true 
    });
    
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

