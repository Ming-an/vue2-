import {reqCategoryList, reqGetBannerList,reqFloorList} from '@/api';

//home模块的小仓库
const state = {
    //服务器返回什么数据类型就初始化什么类型
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    //通过api 里面的接口函数调用,向服务器发送请求 获取服务器的数据
    async categoryList({commit}){
        let res = await reqCategoryList();
        if(res.code == 200){
            commit("CATEGORYLIST",res.data)
        }
    },
    
    //获取轮播图的数据
    async getBannerList({commit}){
        let res = await reqGetBannerList();
        if(res.code == 200){
            commit("GETBANNNERLIST",res.data)
        }
    },

    //获取floor数据
    async getFloorList({commit}){
        let res = await reqFloorList();
        if(res.code == 200){
            commit("GETFLOORLIST", res.data)
        }
    }
};
const getters = {};

export default{
    state,
    mutations,
    actions,
    getters
}