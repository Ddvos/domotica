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
        themeColor: "#03566b",
        msTileColor: "#03566b",
        orientation:  "landscape",
        appleMobileWebAppCache: "yes",
        appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions: {
          description: 'With this app you can control a remote car',
          background_color: "#03566b",
          icons: [
            {
              src: `/img/logo.png`,
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            },
            {
                src: `/img/logosmall.png`,
                sizes: "144x144",
                type: "image/png",
                purpose: "maskable"
              },
          ],
        }
      },
}