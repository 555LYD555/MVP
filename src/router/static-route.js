// import Page404 from '@/views/404.vue'
// import forgetPassword from '@views/forgetPassword.vue'
// import userLogin from '@/views/userLogin'
//写死的静态路由

const staticRounte=[{
    "path":"/",
    "name":"home",
    "redirect":"/login",
},
{
    "path":"/login",
    "name":"login",
    "component":login,
},
{
    "path":"/404",
    "name":"Page404",
    "component":Page404,
},
{
    "path":"/forget",
    "name":"forget",
    "component":forgetPassword,
},]