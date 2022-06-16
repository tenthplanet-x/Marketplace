import axios from "axios";
import {CONSTANT} from "../constant";
import {getToken} from "../storage";


axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_HOST;

axios.defaults.timeout = 2500 * 100;


const REG = /^-/;
const DEFAULT_MSG = "something wrong!";

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
    return config;
}, function (error) {
    console.error(error.message ? error.message : DEFAULT_MSG);
    error.handled = true;
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.status === 200) {
        let respData = response.data;
        if (respData.state === "000000") {
            return respData.data ? respData.data : null
        } else if (respData.state === "000401") {


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
