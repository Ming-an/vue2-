//vuex 
import Vue from 'vue';
import Vuex from 'vuex';

//使用插件一次
Vue.use(Vuex);
//vuex模块化开发
//引入小仓库
import home from './home'
import search  from './search';
import detail from './detail'
import shopcart from './shopcart';
import user from './user';
import trade from './trade'
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});

//这个是一个演示
//state 仓库存储数据的地方
// const state = {
//     count:1
// };
// //mutations 修改state的唯一手段
// const mutations = {
//     ADD(state,count){
//         state.count++;
//     }
// };
// //action 处理action 可以书写自己的业务逻辑 也可以处理异步
// const actions = {
//     //这里可以书写业务逻辑 但不能修改state 需要给mutations处理
//     add({commit}){
//         commit("ADD")
//     }
// };
// //getters 理解为计算属性 用于简化仓库数据 让组件获取仓库的数据更加方便
// const getters = {};
// //对外暴露Store类的一个实例
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// });








