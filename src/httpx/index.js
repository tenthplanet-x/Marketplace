import axios from "axios";
import {CONSTANT} from "../constant";
import {getToken} from "../storage";

/**
 *
 * 全局的 axios 默认值
 */
axios.defaults.baseURL = process.env.VUE_APP_SERVER_HOST;
axios.defaults.timeout = 2500 * 100;


const REG = /^-/;
const DEFAULT_MSG = "请求出错！";

/**
 * 拦截器,在请求或响应被 then 或 catch 处理前拦截它们。
 */
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log("request url ", config.url);
    if (!config) {
        config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    if (!config.headers[CONSTANT.TOKEN]) {
        let token = getToken();
        if (token) {
            config.headers[CONSTANT.TOKEN] = token;
        }
    }
    if (!config.headers[CONSTANT.APP]) {
        config.headers[CONSTANT.APP] = CONSTANT.APP_VALUE;
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    console.error(error.message ? error.message : DEFAULT_MSG);
    error.handled = true;
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.status === 200) {
        let respData = response.data;
        if (respData.state === "000000") {
            return respData.data ? respData.data : null
        } else if (respData.state === "000401") {//后端判断登录状态


        } else if (REG.test(respData.state)) {
            console.error(respData.msg ? respData.msg : DEFAULT_MSG);
            respData.handled = true;
            respData.message = respData.msg;
            return Promise.reject(respData);
        } else {
            respData.message = respData.msg;
            return Promise.reject(respData);
        }
    } else {
        console.error(response.statusText ? response.statusText : response.status);
        response.data.handled = true;
        return Promise.reject(response.data);
    }

}, function (error) {
    console.error(error.message ? error.message : DEFAULT_MSG);
    return Promise.reject({message: error.message, handled: true});
});

const REQUEST_CONFIG = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

const httpx = {};
httpx.get = function (url, params) {
    return axios.get(url, {params: params});
};

httpx.post = function (url, params, isForm, config) {
    if (config) {
        return axios.post(url, params, config);
    } else if (isForm) {
        let form;
        if (params) {
            form = new FormData();
            for (let x in params) {
                form.append(x, params[x]);
            }
        }
        return axios.post(url, form, REQUEST_CONFIG);
    }
    return axios.post(url, params);
};

httpx.axios = axios.create();


export default {
    install: (app) => {
        app.config.globalProperties.$httpx = httpx;
    }
}