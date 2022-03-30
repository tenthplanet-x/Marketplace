export const URLX = {
    REGISTER_SEND_CODE : "/account/noauth/send-code",
    REGISTER_ACCOUNT : "/account/noauth/register",
    LOGIN: "/account/noauth/login",
    M_LOGIN: '/account/noauth/metamask/login',
    M_SIGN: '/account/noauth/metamask/sign',

};

export default {
    install: (app) => {
        app.config.globalProperties.$urlx = URLX;
    }
};
