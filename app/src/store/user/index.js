import { reqGetCode, reqUserRegister,reqUserLogin,  reqUserInfo,reqLogout } from "@/api";
import { setToken,getToken, removeToken } from "@/utils/token";
//登录与注册的模块
const state = {
    code: "",
    token:getToken(),
    userInfo:{},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },

    USERLOGIN(state,token){
        state.token = token
    },

    GETUSERINFO(state,userInfo){
        state.userInfo  = userInfo;
    },

    CLEARUSERINFO(state){
        state.token = '';
        state.userInfo = {};
        removeToken()
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码这个接口 把验证码返回，但是正常情况下，应该后端发送给用户手机验证码
        let res = await reqGetCode(phone);
        // console.log(res)
        if (res.code == 200) {
            commit('GETCODE', res.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }

    },

    //进行用户注册
    async userRegister({ commit }, user) {
        let res = await reqUserRegister(user);
        // console.log(res);
        if(res.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },

    //登录业务 token
    async userLogin({commit},data){
        let res = await reqUserLogin(data);
        // console.log(res);
        if(res.code == 200){
            //用户已经登录成功且获取到token
            commit('USERLOGIN',res.data.token);
            // localStorage.setItem("TOKEN",res.data.token);
            setToken(res.data.token)
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },

    //获取用户信息
    async getUserInfo({commit}){
        let res =await reqUserInfo();
        // console.log(res)
        if(res.code == 200){
            commit("GETUSERINFO",res.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },

    async userlogout({commit}){
        let res = await reqLogout();
        // console.log(res)
        if(res.code == 200){
            commit("CLEARUSERINFO");
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
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