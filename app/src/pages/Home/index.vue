<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav></TypeNav>
        <ListContainer/>
        <Recommend/>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand/>
        <!-- <button @click="add">点击我加1</button>
        仓库的数据{{count}}
        <button>点击我-1</button> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
export default {
    name:'Home',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted(){
        //派发action 获取floor数据
        this.$store.dispatch("getFloorList");

        //获取用户信息 在路由守卫中判断
        // this.$store.dispatch("getUserInfo")

    },
    computed:{
        ...mapState({
            floorList:(state)=>{
                return state.home.floorList
            }
        })
    }
}
</script>

<style>

</style>