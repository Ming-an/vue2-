import VeeValidate from "vee-validate";

let myPlugins = {};

myPlugins.install = function(Vue,options){
    // console.log('自定义插件')
    //Vue.prototype.$bus 任何组件都可以使用
    //Vue.directive 全局指令
    //Vue.component 全局组件
    //Vue.filter 过滤器
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase();
    })
}



export default myPlugins;