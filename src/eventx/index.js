export const EVENTX = {

    /**
     * bind listener
     * @param name
     * @param listener
     */
    bind(name, listener) {
        window.removeEventListener(name, listener);
        window.addEventListener(name, listener);
    },

    /**
     * unbind listener
     * @param name
     * @param listener
     */
    unbind(name, listener) {
        window.removeEventListener(name, listener);
    },


    fire(name, params) {
        window.dispatchEvent(new CustomEvent(name, {detail: params}));
    }

};


export default {
    install: (app) => {
        app.config.globalProperties.$eventx = EVENTX;
    }
}
