import { EVENTX } from "../eventx";
import { CONSTANT } from "../constant";

export default {

    init: () => {
        EVENTX.bind(CONSTANT.EVENT.LOGIN_SUCCESS, saveToken);
    },
    destroy: () => {
        EVENTX.unbind(CONSTANT.EVENT.LOGIN_SUCCESS, saveToken);
    },
};

export const getToken = () => {
    return localStorage.getItem(CONSTANT.TOKEN);
};

const saveToken = (data) => {
    let params = data.detail;
    localStorage.setItem(CONSTANT.TOKEN, params.token);
    localStorage.setItem(CONSTANT.ACCID, params.accId);
};


