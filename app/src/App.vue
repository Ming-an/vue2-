<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <MyHeader></MyHeader>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home Search显示Footer -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import MyHeader from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  data(){
    return {
      // msg:'abc'
    }
  },
  components:{
    MyHeader,
    Footer
  },
  mounted(){
    //派发一个action 获取商品三级列表的数据
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>

</style>
