const menuList = [
    {
        path:'/6',
        name:'Home',
        meta:{
            title:"首页",
            icon:"el-icon-s-home"
        },
    },
   
    {
        path:'/1113',
        // redirect:'/3',
        name:'GaoDeMap',
        component:()=>import('@/components/GaoDeMap'),
        meta: {
            title: "地图",
            icon:"el-icon-map-location"
        },

        children:[
            {
                path:'/3',
                name:'GaoDeMap',
                component:()=>import('@/components/GaoDeMap'),
                meta: {
                    title: "高德地图"
                }
            },
            {
                path:'/4',
                name:'TianDiTuMap',
                component:()=>import('@/components/TianDiTuMap'),
                meta: {
                    title: "天地图"
                }
            },
            {
                path:'/220930',
                name:'VueSuperFlow',
                component:()=>import('@/components/public/VueSuperFlow'),
                meta: {
                    title: "流程图"
                }
            },
            {
                path:'/221020',
                name:'ECharts',
                component:()=>import('@/view/Map/ECharts'),
                meta: {
                    title: "Echarts案例"
                }
            },
        ]
        
    },

    {
        path:'/1115',
        name:'',
        meta:{
            title:"特殊效果",
            icon:"el-icon-message"
        },
        children:[
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
    },

    
]

export default menuList;