import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as Three from 'three'
import "./registerServiceWorker";
import ToggleButton from 'vue-js-toggle-button'

Vue.prototype.$three = Three;
//Vue.prototype.$workbox = wb;


//import ToggleButton from 'vue-js-toggle-button'
import { VueHammer } from 'vue2-hammer'


Vue.use(VueHammer, ToggleButton)


Vue.config.productionTip = false

VueHammer.config.pan= {
  direction: 6, // Enable vertical scroll on touch devices
  threshold: 30
}





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
