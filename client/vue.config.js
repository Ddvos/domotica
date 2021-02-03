const path = require('path');

module.exports={
    outputDir: path.resolve(__dirname,'../server/public'),
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
          background_color: "#03566b",
          icons: [
            {
              src: "./src/assets/logo.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            },
          ],
        }
      },
}