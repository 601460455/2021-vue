import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
    // import Films from '@/views/Films/index'
    // import NowPlaying from '@/views/Films/NowPlaying'
    // import ComingSoon from '@/views/Films/ComingSoon'
    // import Detail from '@/views/Films/Detail'
    // import Cinemas from '@/views/Cinemas/index'
    // import Center from '@/views/Center/index'          
import filmRouter from './routers/film'
import centerRouter from './routers/center'
import cinemasRouter from './routers/cinema'
import nofoundRouter from './routers/nofound'
const routes = [{
        path: '/',
        redirect: '/films/nowPlaying'
    },

    ...filmRouter,
    centerRouter,
    cinemasRouter,
    nofoundRouter
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    //      电影模块
    // 	        电影模块父			/films
    // 		    正在热映			/films/nowPlaying
    // 		    即将上映			/films/comingSoon
    // 	    电影详情			/film/:filmId
    // {
    //     path: '/films',
    //     component: Films,
    //     children: [
    //         { path: 'nowPlaying', component: NowPlaying },
    //         { path: 'comingSoon', component: ComingSoon }
    //     ]
    // },
    // {
    //     path: '/film/:flimId',
    //     component: Detail
    // },
    // 影院模块 cinemas
    // {
    //     path: '/cinemas',
    //     comonent: Cinemas
    // },
    // 我的模块 center
    // {
    //     path: '/center',
    //     component: Center
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router