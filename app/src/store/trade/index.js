import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
    address:[],
    orderInfo:{}
};
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address
    },

    GETORDER(state,orderInfo){
        state.orderInfo = orderInfo
    }
};
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let res = await reqAddressInfo();
        // console.log(res)
        if(res.code == 200){
            commit('GETUSERADDRESS',res.data);
        }
    },

    //获取商品清单的信息
    async getOrderInfo({commit}){
        let res = await reqOrderInfo();
        if(res.code == 200){
            commit('GETORDER',res.data)
        }
    }
};
const getters = {};


export default {
    state,
    mutations,
    actions,
    getters
}