const path = require('path');

module.exports={
    outputDir: path.resolve(__dirname,'../server/public'),
    filenameHashing: false,
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:5000'
            }
        }
    },
    pwa: {
        name: 'Car control',
        themeColor: "#051b2c",
        msTileColor: "#051b2c",
        orientation:  "landscape",
        appleMobileWebAppCache: "yes",
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          // swSrc is required in InjectManifest mode.
          swSrc: 'src/service-worker.js',
          // ...other Workbox options...
        },
        manifestOptions: {
          description: 'With this app you can control a remote car',
          background_color: "#051b2c",
          icons: [
            {
              src: `/img/logo.png`,
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: `/img/logo.svg`,
              sizes: "144x144",
              type: "image/svg",
              purpose: "any"
            },
            {
              src: `/img/logo.svg`,
              sizes: "192x192",
              type: "image/svg",
              purpose: "any"
            },
          ],
        }
      },
}