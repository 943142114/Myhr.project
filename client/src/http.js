import axios from 'axios'
import {Loading} from 'element-ui';
import {Message} from 'element-ui';
import router from './router'


let loading;

function startloading() {
    loading = Loading.service({
        lock: true,
        text: "加载中",
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endloading() {
    loading.close();
}


//请求拦截
axios.interceptors.request.use(config => {
    startloading();
    if (localStorage.eletoken){
        //设置统一的请求header
        config.headers.Authorization = localStorage.eletoken
    }
    return config;
}, error => {
    return Promise.reject(error)
})


//响应拦截
axios.interceptors.response.use(response => {
    endloading();
    return response;
}, error => {
    endloading();
    Message.error(error.response.data);
    //获取错误状态码
    //token过期处理
    const {status} = error.response
    if (status == 401){
        Message.error("账号信息失效，请重新登录");
        localStorage.removeItem('eletoken');
        //跳转到登录页面
        router.push('/login');
    }
    return Promise.reject(error)
})




export default axios

