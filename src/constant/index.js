const EVENT_BASE = {
    EXT: 400,
};

export const CONSTANT = {
    TOKEN: "TOKEN",
    ACCID: "ACCID",
    APP: "APP",
    APP_VALUE: "WEB",//WEB,浏览器 WEB-MOBILE,移动端浏览器
    EVENT: {
        LOGIN_PAGE: EVENT_BASE.EXT + 1,//登陆页面
        REGISTER_PAGE: EVENT_BASE.EXT + 2,//注册页面
        LOGIN_SUCCESS: EVENT_BASE.EXT + 3,//登陆成功
    }
};

export default {
    install: (app) => {
        app.config.globalProperties.$constant = CONSTANT;
    }
};
