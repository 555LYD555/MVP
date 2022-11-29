const specialRouter = [
    {
        path:'/5',
        name:'CoolPage',
        component:()=>import('@/components/CoolPage'),
        meta: {
            title: "边框特效"
        }
    },
    {
        path:'/7',
        name:'Login',
        component:()=>import('@/view/Login'),
        meta: {
            title: "登录"
        }
    },
    {
        path:'/8',
        name:'ParallaxScrolling',
        component:()=>import('@/view/otherView/parallaxScrolling'),
        meta: {
            title: "视察滚动"
        }
    },
    {
        path:'/10',
        name:'parallaxScrollingQQ',
        component:()=>import('@/view/special/parallaxScrolling'),
        meta: {
            title: "QQ视差滚动"
        }
    },
    {
        path:'/9',
        name:'FreeAPI',
        component:()=>import('@/view/otherView/freeAPI/freeAPI'),
        meta: {
            title: "免费API"
        }
    },
    {
        path:'/11',
        name:'animation',
        component:()=>import('@/view/otherView/animation/animation'),
        meta: {
            title: "CSS动画"
        }
    },


]

export default specialRouter