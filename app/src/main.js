import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//三级联动组件 全局注册
import TypeNav from '@/components/TypeNav';
//第一个参数 全局组件的名字 第二个参数哪个组件
Vue.component(TypeNav.name, TypeNav);
//封装组件 carousel 轮播图组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel);
//全局注册分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false;

//引入仓库
import store from '@/store'
//引入MockServer.js
import '@/mock/mockServe';

/* 统一接口api文件夹里面的全部请求函数 */
import * as API from '@/api'
// 这个API 包含所有的暴露的接口 对象


//按需引入
import { Button, Loading, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
// Vue.component(MessageBox.name, MessageBox);

//使用的时候也可以挂载
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert

import png from '@/assets/logo.png'
//引入图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:png
});

//引入自定义事件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
})

//引入表单校验的插件
import "@/plugins/validate";




new Vue({
  render: h => h(App),
  //配置全局事件总线 $bus
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    
  },
  //注册路由 k v 一致
  //注册路由信息 当这里书写router的时候 组件身上都拥有$route $router属性
  router,
  //注册仓库 组件实例 的身上会多一个属性$store
  store
}).$mount('#app')
