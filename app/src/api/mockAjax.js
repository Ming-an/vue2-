//对于axios二次封装
import axios  from "axios";
//引入进度条
import nprogress from "nprogress";
//start 进度条开始  done 进度条结束
//引入进度条的样式
import "nprogress/nprogress.css";


//1.利用axios对象的方法create 创建一个axios实例
const request = axios.create({
    //配置对象
    //基础路径、发送请求的时候、路径当中会出现api
    baseURL:"/mock",
    timeout:5000//设置 5s
});

//请求拦截器:在发送请求之前 请求拦截器可以检测到、可以在请求发出去之后做一些事情
request.interceptors.request.use((config)=>{
    //config 配置对象对象里面有一个属性很重要 header请求头
    nprogress.start();
    return config;
});

//响应拦截器
request.interceptors.response.use(
    (res)=>{
        //进度条结束
        nprogress.done();
        //成功的回调函数
        return res.data
    },
    (error)=>{
        //响应失败的回调函数
        return Promise.reject(new Error('faile'));
    }
)




//对外暴露
export default request;
