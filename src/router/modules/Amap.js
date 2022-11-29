const AmapRouter = [
    // {
    //     path:'/map',
    //     name:'Map',
    //     component:()=>import('@/components/GaoDeMap'),
    //     redirect:'/3',
    //     meta:{
    //         title:"地图"
    //     },
    //     children:[
    //         {
    //             path:'/3',
    //             name:'GaoDeMap',
    //             component:()=>import('@/components/GaoDeMap'),
    //             meta: {
    //                 title: "高德地图"
    //             }
    //         },
    //         {
    //             path:'/4',
    //             name:'TianDiTuMap',
    //             component:()=>import('@/components/TianDiTuMap'),
    //             meta: {
    //                 title: "天地图"
    //             }
    //         },
    //         {
    //             path:'/220930',
    //             name:'VueSuperFlow',
    //             component:()=>import('@/components/public/VueSuperFlow'),
    //             meta: {
    //                 title: "流程图"
    //             }
    //         },
    //         {
    //             path:'/221020',
    //             name:'ECharts',
    //             component:()=>import('@/view/Map/ECharts'),
    //             meta: {
    //                 title: "Echarts案例"
    //             }
    //         },

    //     ]

    // },
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

export default AmapRouter;