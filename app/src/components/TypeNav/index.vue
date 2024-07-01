<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件的委派 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList.slice(0,15)" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="chageIndex(index)" >
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                    <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                </h3>
                                <!-- 二级 三级分类 -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index? 'block':'none'} ">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
//引入方式为将lodash全部功能函数引入
// import _ from 'lodash';
//按需引入
import throttle from 'lodash/throttle';//默认暴露 
export default {
    //三级导航栏
    name:'TypeNav',
    data(){
        return {
            //存储用户鼠标移动上哪个一级分类
            currentIndex:-1,
            show:true,
        }
    },
    methods:{
        // //一级更换背景颜色
        //ES6写法
        // chageIndex(index){
        //     // console.log(index)
        //     // index :鼠标移入的编号
        //     this.currentIndex = index;
        //     //正常情况下，用户慢慢进入分类每一个都会触发鼠标进入事件
        //     //不正常情况下：用户快速进入 不能每一个都会触发鼠标进入事件
        //     //回调函数有大量的业务有可能出现卡顿
        // },

        //ES5写法
        //throttle不能用箭头函数

        chageIndex:throttle(function(index){
            this.currentIndex = index;
            // console.log(index)
        },50),
        leaveShow(){
            this.currentIndex = -1;
            if(this.$route.path !== '/home'){
                this.show=false
            }
        },

        //路由的跳转
        goSearch(event){
            //最好的解决方法 编程式导航+事件委派
            //缺点：点击的一定是a标签？如何获取参数
            /* 
                1.a 标签加上自定义属性 data-categoryName
                2.获取event.target中带有data-categoryName属性的节点
                3.节点有一个属性dataset属性 可以获取节点的自定义属性与属性值
            */
            let element = event.target;
            //浏览器自动解析
            let {categoryname,category1id,category2id,category3id} = element.dataset;
            if(categoryname){
                //整理路由跳转的参数
                let location = {name:'search'};
                let query = {categoryName:categoryname};
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else if(category3id){
                    query.category3Id = category3id
                }
                location.query = query;
                //判断：如果路由跳转的时候，带有params参数 一起传递过去
                if(this.$route.params){
                    location.params = this.$route.params
                    this.$router.push(location);
                }
            }

        },

        //当鼠标移入的时候将商品列表进行展示
        enterShow(){
            this.show=true
        }
    },
    //组件挂载完毕,可以向服务器发送请求
    mounted(){
        //通知vuex 发送请求 获取数据 存储于仓库服务器中
        // this.$store.dispatch('categoryList');


        //当组件挂载完毕 让show=false
        if(this.$route.path !== '/home'){
            this.show=false;
        }
    },
    computed:{
        ...mapState({
            //state 为大仓库中的数据
            categoryList:(state)=>state.home.categoryList
        })
    }
}
</script>

<style scoped lang="less">
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;
            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                            // &:hover{
                            //     background-color: pink;
                            // }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                       /* &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                        */
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }

            //过渡动画开始状态
            .sort-enter{
                height: 0;
            }
            //过渡动画结束状态
            .sort-enter-to{
                height: 461px;
            }
            //定义动画时间，速率
            .sort-enter-active{
                transition: all .3s linear;
            }

        }
    }
</style>