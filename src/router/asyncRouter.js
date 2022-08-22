// 引入公共路由
import {staticRounte} from '../router';
//

export function getAsyncRoutes(routes){
    const res=[]
    const keys=['path','name','children','redirect','meta','hidden']
    //遍历后端传过来的路由数组，重组成为可用的前端路由
    routes.forEach(item=>{
        const newItem={};
        // if(item.component){
        //     newItem.component=item.component;
        // }
        
        // 遍历当前项路由的所有属性，如果包含关键字属性，给newItem对象添加关键字属性
        for(const key in item){
            if(keys.includes(key)){
                newItem[key]=item[key]
            }
        }

        //遍历当前项路由包含子路由，则对当前项路由递归遍历
        if(newItem.children && newItem.children.length){
            newItem.children=getAsyncRoutes(item.children)
        }

        res.push(newItem)
    })
    // 返回处理好的可用路由
    return res;
}



