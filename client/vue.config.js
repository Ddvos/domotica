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
        themeColor: "#42b983",
        msTileColor: "#42b983",
        appleMobileWebAppCache: "yes",
        manifestOptions: {
          background_color: "#42b983"
        }
      },
}