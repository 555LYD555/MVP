import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeV2 from '@/components/HomeV2'
import NavGroup from '@/components/NavGroup'
// import GaoDeMap from '@/components/GaoDeMap'
// import TianDiTuMap from '@/components/TianDiTuMap'
// import CoolPage from '@/components/CoolPage'
// import Login from '@/view/Login'
// import ParallaxScrolling from '@/view/otherView/parallaxScrolling'
// import FreeAPI from '@/view/otherView/freeAPI/freeAPI'
// import ParallaxScrollingQQ from '@/view/special/parallaxScrolling'
// import Animation from '@/view/otherView/animation/animation'
// import VueSuperFlow from '@/components/public/VueSuperFlow'
// import ECharts from '@/view/Map/ECharts'

import Special from '@/router/modules/special';
import Amap from '@/router/modules/Amap';

Vue.use(Router)

// export const staticRounte=[{
//   "path":"/",
//   "name":"home",
//   "redirect":"/login",
// },
// {
//   path:"/login",
//   component:()=>import('@/views/login'),
//   hidden:true
// },
// {
//   path:"/404",
//   component:()=>import('@/views/404'),
//   hidden:true
// },
// ]

// const createRouter=()=>new ReadableStreamDefaultController({
//   mode:'history',
//   scrollBehavior:()=>({y:0}),
//   routes:staticRounte
// })
// const router=createRouter()

// export function resetRouter(){
//   const newRouter=createRouter()
//   router.matcher=newRouter.matcher
// }

// export default router

export default new Router({
  routes: [
    {
      path: '/1',
      name: 'Home',
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/2',
      name: 'NavGroup',
      component: NavGroup,
      meta: {
        title: "导航"
      }
    },

    {
      path: '/6',
      name: 'HomeV2',
      component: HomeV2,
      meta: {
        title: "首页V2"
      }
    },




    {
      path: '/',
      redirect: '/6',
    },
    // {
    //   path:'/404',
    //   name:'页面未找到',
    //   component:()=>import("@/views/NotFound.vue"),
    // }
    // {
    //   path: '/6',
    //   name: 'NavCard',
    //   component: NavCard
    // }

    ...Amap,
    ...Special,

  ],
  
  //vue路由模式有两种，hash和history,默认为hash模式（路径带#）
  //
  mode: 'history',
})
