import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { createHead } from '@vueuse/head'

const head = createHead()

createApp(App).use(router, head).mount('#app')
