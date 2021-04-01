import Vue from 'vue'
import Router from 'vue-router'


//import Home from '@/vieuws/Home'
// import Signify from '@/vieuws/Signify'
// import Broadcast from '@/vieuws/Broadcast'
// import Livestream from '@/vieuws/Livestream'
// import Robeco from '@/vieuws/Robeco'
// import Carcontrol from '@/vieuws/Carcontrol'
// import Peterplantenbak from '@/vieuws/Peterplantenbak'
// import Caroverview from '@/vieuws/Caroverview'
 //import Lottietest from '@/vieuws/Lottietest'



Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name: '/Home',
            component:() => import(/* webpackChunkName: "home" */ '@/vieuws/Home'),
        },
        {
            path:'/jean',
            name: '/Jean',
            component:() => import(/* webpackChunkName: "home" */ '@/vieuws/Jean'),
        },
        {
            path:'/broadcast/:id',
            name: '/Broadcast',
            component:() => import(/* webpackChunkName: "broadcast" */ '@/vieuws/Broadcast'),
            props: true,
        },
        {
            path:'/livestream',
            name: '/Livestream',
            component:() => import(/* webpackChunkName: "livestream" */ '@/vieuws/Broadcast'),
        },    
        {
            path:'/smart2Tech',
            name: '/smart2Tech',
            component:() => import(/* webpackChunkName: "livestream" */ '@/vieuws/Smart2Tech'),
        },   
        

    ]
})