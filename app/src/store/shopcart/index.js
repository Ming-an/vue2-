import { reqCartList,reqDeleteCart,reqUpdateCheckedByid } from "@/api";


const state = {
    cartList:[]
};

const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
};

const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let res = await reqCartList();
        if(res.code == 200){
            commit('GETCARTLIST',res.data)
        }
    },
    
    //删除商品中的数据
    //返回的数据只有成功 或者失败 没有返回数据
    async deleteCartListBySkuId({commit},skuId){
        let res = await reqDeleteCart(skuId);
        if(res.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },

    //修改购物车 的勾选状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let res = await reqUpdateCheckedByid(skuId, isChecked);
        if(res.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    //点击全选删除按钮后删除选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        // console.log(context)
        // context ：小仓库 commit 提交mutations参数修改state getters计算属性 dispatch派发action state当前仓库的数据
        // console.log(getters.cartList.cartInfoList)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item =>{
            let promise = item.isChecked == 1 ?dispatch('deleteCartListBySkuId',item.skuId) : ' ';
            PromiseAll.push(promise);
        });
        //只要p1|p2..都成功才成功
        return Promise.all(PromiseAll)
    },

    //修改全选按钮的 联动状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = [];
        // console.log(state,isChecked)
        state.cartList[0].cartInfoList.forEach(item=>{
            // 0 全部取消选中  1 全部都选中
            let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll);
    }

};

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}