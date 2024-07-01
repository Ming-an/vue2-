//所有的api接口进行统一的管理
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动接口
// /api/product/getBaseCategoryList
// GET
//发请求 axios发请求返回结果Promise对象
export const reqCategoryList = ()=>{
    return  requests(
        {
            url:'/product/getBaseCategoryList',
            method:'get'
        }
    )
}

//获取首页轮播图 banner Home首页轮播图接口
export const reqGetBannerList = ()=>mockRequests.get('/banner');

//获取floor
export const reqFloorList = ()=>mockRequests.get('/floor');

//获取搜索模块的数据 /api/list post 
//带参数
//当这个接口(获取搜索模块的数据),给服务器传递一个默认参数（至少是一个空对象）
// reqGetSearchInfo({})
export const reqGetSearchInfo = (params)=>{
    return requests(
        {
            url:'/list',
            method:'post',
            data:params
        }
    )
};

// 获取商品详细信息的接口数据  URL:/api/item/{ skuId } GET
export const reqGoodsInfo = (skuId)=>{
    return requests(
        {
            url:`/item/${skuId}`,
            method:'GET'
        }
    )
};

//将产品添加到购物车当中(获取更新某一个产品的个数)
// /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>{
    return requests(
        {
            url:`/cart/addToCart/${ skuId }/${ skuNum }`,
            method:'POST'
        }
    )
};

//获取购物车列表数据的接口
export const reqCartList = ()=>{
    return requests(
        {
            url:'/cart/cartList',
            method:'GET'
        }
    )
}

//删除购物车中的商品
// /api/cart/deleteCart/{skuId}
// DELETE
export const reqDeleteCart = (skuId)=>{
    return requests(
        {
            url:`/cart/deleteCart/${skuId}`,
            method:'DELETE'
        }
    )
}

// 修改商品选中的状态
// /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedByid = (skuId, isChecked)=>{
    return requests(
        {
            url:`/cart/checkCart/${skuId}/${isChecked}`,
            method:'GET'
        }
    )
}

//获取验证码接口
// /api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone)=>{
    return requests(
        {
            url:`/user/passport/sendCode/${phone}`,
            method:'GET'
        }
    )
}

//注册接口 
// /api/user/passport/register  POST phone,password,code
export const reqUserRegister = (data)=>{
    return requests(
        {
            url:'/user/passport/register',
            data,
            method:'POST'
        }
    )
}

//登录接口
// /api/user/passport/login POST
export const reqUserLogin = (data)=>{
    return requests(
        {
            url:'/user/passport/login',
            data,
            method:'POST'
        }
    )
}

// home组件中的导航栏登录 获取用户信息 带token
// /api/user/passport/auth/getUserInfo GET
export const reqUserInfo = ()=>{
    return requests(
        {
            url:'/user/passport/auth/getUserInfo',
            method:'GET'
        }
    )
}

//退出登录
// /api/user/passport/logout GET
export const reqLogout = ()=>{
    return requests(
        {
            url:'/user/passport/logout',
            method:'GET'
        }
    )
}

// 获取用户信息地址信息的接口
// /api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = ()=>{
    return requests(
        {
            url:'/user/userAddress/auth/findUserAddressList',
            method:'GET'
        }
    )
}

// 获取商品清单
// /api/order/auth/trade GET
export const reqOrderInfo = ()=>{
    return requests(
        {
            url:'/order/auth/trade',
            method:'GET'
        }
    )
}

//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests(
        {
            url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
            // data:data k v 一致
            data,
            method:"POST"
        }
    )
}

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId)=>{
    return requests(
        {
            url:`/payment/weixin/createNative/${orderId}`,
            method:'GET'
        }
    )
}

// 获取订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=>{
    return requests(
        {
            url:`/payment/weixin/queryPayStatus/${orderId}`,
            method:'GET'
        }
    )
}

//获取个人中心的数据 几页 限制数量
// /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit)=>{
    return requests(
        {
            url:`/order/auth/${page}/${limit}`,
            method:'GET'
        }
    )
}