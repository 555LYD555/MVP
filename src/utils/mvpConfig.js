//------------------将静态资源中的配置对象挂载为全局方法/变量----------------------//


import config from "../../static/mvp.config.js"
let mvpConfig={
    host:{},
    api:{},
}

//初始化配置文件
function load(){
    if(mvpConfig.isLoad) return mvpConfig;
    mvpConfig.isLoad=true;
    mvpConfig.host=config.host;
    mvpConfig.api=config.api;
    return mvpConfig;
}

export default{
    //instance属性用于调用，外部文件导入当前文件import config from "xxxx"后，可以通过config.instance调用拿到mvpConfig配置对象。
    instance:load(),
    //注册插件
    install(Vue){
        if(Vue.prototype.mvpConfig) return;
        load();
        Vue.prototype.mvpConfig=mvpConfig;
    },
}