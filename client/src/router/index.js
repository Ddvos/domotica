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
    path:'/jean',
    name: 'jean',
    component:() => import(/* webpackChunkName: "livestream" */ '../views/Jean'),
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
{
  path:'/raspberrypi',
  name: 'raspberrypi',
  component:() => import(/* webpackChunkName: "livestream" */ '../views/raspberrypi'),
},
{
  path:'/controller',
  name: 'controller',
  component:() => import(/* webpackChunkName: "livestream" */ '../views/Controller'),
},
{
  path:'/chris',
  name: 'chris',
  component:() => import(/* webpackChunkName: "livestream" */ '../views/chris'),
},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
