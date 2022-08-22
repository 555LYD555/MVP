import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getToken } from '@/'
import { getAsyncRoutes } from './src/router/asyncRouter'

const whiteList=['/login'];
router.beforEach(async (to,from,next)=>{
    NProgress.start()
    document.title=to.meta.title;
    //获取当前用户token，判断用户是否登录
    const haToken=getToken()
    // 登录状态时
    if(hasToken){
        // 跳向登录页面，直接放行，进度条结束
        if(to.path === '/login'){
            next({path:'/'})
            NProgress.done()
        }else{
            //异步获取store中的路由（已经处理好的完整动态路由）
            let route=await store.state.addRoutes;
            const hasRouters=route && route.length>0;
            //判断store是否有路由，若有，next放行;没有，则
            if(hasRouters){
                next()
            }else{
                try{
                    //调用方法处理后端传过来的原始格式路由
                    const accessRoutes=getAsyncRoutes(await store.state.addRoutes);
                    //动态添加格式化过的路由
                    router.addRoutes(accessRoutes);
                    next({...to,replace:true})
                }catch(error){
                    next('/login?redirect=${to.path}')
                    NProgress.done()
                }
            }
        }
        

    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login?redirect=${to.path}')
            NProgress.done()
        }
    }
})

router.afterEach(()=>{
    NProgress.done()
})