//路由配置信息
//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

const foo = ()=>{
    return import('@/pages/Home')
}


export default [
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        //二级路由
        children:[
            {
                path:'myOrder',
                component:MyOrder,
            },
            {
                path:'groupOrder',
                component:GroupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myOrder',
            }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path == "/trade"){
                next();
            }else{
                next(false)
            }
        }
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next) =>{
            //去交易页面必须是从购物车而来
            if(from.path == "/shopcart"){
                next();
            }else{
                //其他的路由的组件而来停留在当前
                next(false);
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        name:"addcartsuccess",
        meta:{show:true}
    },
    {
        path:'/detail/:skuId?',
        component:()=>import("@/pages/Detail"),
        meta:{show:true}
    },
    {
        path:"/home",
        // component:()=>import("@/pages/Home")
        component:foo,
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:"search",
        // props:true
        // props:{
        //     a:1,
        //     b:2
        // }
        // props:($route)=>{
        //     return {
        //         keyword:$route.params.keyword,
        //         k:$route.query.k
        //     }
        // }
    },
    {
        path:'/login',
        component:Login,
        name:'/login',
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        //重定向 在项目跑起来的时候 访问/ 重定向到首页
        path:'*',
        redirect:'/home'
    },
    
]

