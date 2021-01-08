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
import VuexCmp from '@/views/Films/Vuex'
import City from '@/views/City/index'
const routes = [{
        path: '/',
        redirect: '/films/nowPlaying'
    },
    {
        path: '/vuex',
        component: VuexCmp
    },
    {
        path: '/city',
        component: City
    },
    ...filmRouter,
    ...centerRouter,
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
import store from "@/store/index";
router.beforeEach((to, from, next) => {
    // console.log(to, from);//to.path
    // 定义权限数组（可以模块化）
    let quanxian = ["/balence", "/settings"];
    // 获取jwt
    let _token = store.state.global._token;
    if (_token) {
        next();
    } else {
        // 可能没登录
        if (quanxian.includes(to.path)) {
            // 登录(加上点功能，让用户登录完之后继续回到刚才想看的页面)
            router.push({ path: "/login", query: { callback: to.path } });
        } else {
            // 不需要登录
            next();
        }
    }
})

export default router