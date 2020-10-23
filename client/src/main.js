import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as Three from 'three'


Vue.prototype.$three = Three;

//import ToggleButton from 'vue-js-toggle-button'
import { VueHammer } from 'vue2-hammer'


Vue.use(VueHammer)


Vue.config.productionTip = false

VueHammer.config.pan= {
  direction: 6, // Enable vertical scroll on touch devices
  threshold: 30
}





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
