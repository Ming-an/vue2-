//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'
//使用插件
Vue.use(VueRouter);
//配置路由
import routes from './routes';
//先把VueRouter原型对象的push 保存一份
let originPush = VueRouter.prototype.push;
let originRepalce = VueRouter.prototype.replace;
//重写push replace方法
//第一个参数:告诉原来push方法 你往哪里跳转(传递哪些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call apply区别 相同点 都可以调用函数一次 都可以篡改函数的上下文一次
        //不同点 call 传递参数逗号隔开 apply方法执行传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originRepalce.call(this, location, resolve, reject);
    } else {
        originRepalce.call(this, location, () => { }, () => { });
    }
}


let router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    //k v 一致 省略 v
    routes,
    //滚动行为 路由跳转的时候到顶部
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

// 全局守卫 前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    // to :可以获取到你要跳转到哪一个路由的信息
    // from: 可以获取到你从哪个路由来的信息
    // next: 放行 
    // 1. next(); //直接写 放行函数
    // 2. next('/login') //放行到指定路由当中 next(false)
    //为了测试
    next();
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name; //空对象 if判断永远为真 所以写里面的name看看是否存在
    if (token) {
        //用户已经登录了还想去login 不能去了只能停留在首页
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            //登录了但是去的不是登录 是其他页面 [home search] 需要获取用户信息
            //如果用户名已有
            if (name) {
                next();
            } else {
                //派发action
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    console.log(error);
                    //token 失效
                    // 清除token 退出登录
                    await store.dispatch('userlogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录 不能去交易相关的组件  pay paysuccess 不能去个人中心 
        let toPath = to.path;
        if(toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            //把未登录存在query中
            next('/login?redirect='+toPath);
        }else{
            next();
        }
        
    }

});

export default router