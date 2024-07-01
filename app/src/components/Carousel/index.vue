<template>
    <!-- 轮播图 -->
    <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in list" :key="item.id">
                <img :src="item.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import "swiper/css/swiper.min.css";
export default {
    name: 'Carousel',
    props:[
        'list'
    ],
    watch: {
        //list数据从来没发生变化 数据是父亲给的一来就有
        list: {
            immediate: true,//代表一上来就监听一次
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.mySwiper, {
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            //点击小球也切换图片
                            clickable: true
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })
                })
            }
        }
    }
}
</script>

<style></style>