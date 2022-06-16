export const URLX = {
    REGISTER_SEND_CODE : "/account/noauth/send-code",
    REGISTER_ACCOUNT : "/account/noauth/register",
    LOGIN: "/account/noauth/login",
    M_LOGIN: '/account/noauth/metamask/login',
    M_SIGN: '/account/noauth/metamask/sign',
    LOGIN_METAMASK_NONCE: "",
    LOGIN_METAMASK: "",
    Gallery_Props: "gallery/props",
    Gallery_List: "gallery/list",

};

export default {
    install: (app) => {
        app.config.globalProperties.$urlx = URLX;
    }
};
