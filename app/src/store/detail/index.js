import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID(),

};
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //reqGoodsInfo 
    async getGoodInfo({commit}, skuId){
        let res = await reqGoodsInfo(skuId);
        if(res.code == 200){
            commit('GETGOODINFO', res.data)
        }
    },

    //点击添加购物车
    async addOrUpdateShopCart({commit},{skuId, skuNum}){
        let res = await reqAddOrUpdateShopCart(skuId, skuNum);
        //加入购物车后，发请求 将前台参数带给服务器
        //服务器写入数据成功， 并没有返回其他的数据 
        if(res.code == 200){
            return 'Ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }

};
const getters = {
    categoryView(state){
        //goodInfo 初始是一个空对象 空对象的categoryview 为undefined
        //会报错
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
};

export default{
    state,
    mutations,
    actions,
    getters,
}
