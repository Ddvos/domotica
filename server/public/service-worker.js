importScripts("/precache-manifest.fe96afafebcd8c0ed58f945ad6cca76b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);

// Force development builds
workbox.setConfig({
     debug: true 
    });
    
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


