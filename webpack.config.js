// webpack配置文件，webpack运行时加载
const path = require('path')  //引用path模块
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {   
    //入口文件
    entry:"./src/main.js",
    //打包后的出口文件
    output:{
        //输出的路径 是绝对路径（导入path模块） 这里是用node来做的
        path:path.resolve(__dirname,'build'),
        filename:'bulid.js',
    },
    //配置webpack开发服务功能
    devServer:{
        contentBase:"./src",
        host:"localhost",
        inline:true, //实时刷新
        compress:true,  //是否压缩
        port:8080,
    },
    mode:"development",
    module:{
        rules:[
        {test:/\.vue$/,use:'vue-loader'},
        {test:/\.css$/,use:'css-loader'},
        {
            test:/\.jpg|png|gif$/,
            loader:'url-loader',
            options:{
              limit:12*1024
            }
          }
        ]
      },
      plugins:[
        new VueLoaderPlugin(),
      ]

}