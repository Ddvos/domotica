import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/about',
    name: 'about',
    component:() => import(/* webpackChunkName: "livestream" */ '../views/About'),
}, 
  {
    path:'/broadcast/:id',
    name: 'Broadcast',
    component:() => import(/* webpackChunkName: "livestream" */ '../views/Broadcast'),
}, 
{
  path:'/webrtctest',
  name: 'webrtctest',
  component:() => import(/* webpackChunkName: "livestream" */ '../views/Webrtctest'),
},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
