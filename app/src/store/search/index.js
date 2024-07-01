import { reqGetSearchInfo  } from "@/api";
//search模块的小仓库
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    //获取search模块中的数据
    //第二个参数是 载荷
    //在dispatch 派发action 的时候第二个参数传递过来的 至少是一个空对象
    async getSearchList({commit},params={}){
        let res = await reqGetSearchInfo(params);
        if(res.code == 200){
            commit('GETSEARCHLIST',res.data)
        }
    }
};

//简化仓库中的数据
//可以把组件中需要用到的数据简化一下 将来组件获取数据就比较方便
const getters = {
    //这个里面的state当前仓库中的state
    goodsList(state){
        //假如网络有问题   返回undefined 所以 返回一个空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}