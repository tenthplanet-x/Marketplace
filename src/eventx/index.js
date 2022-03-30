export const EVENTX = {

    /**
     * 注册事件监听器
     * @param name
     * @param listener
     */
    bind(name, listener) {
        window.removeEventListener(name, listener);//有效
        window.addEventListener(name, listener);
    },

    /**
     * 取消事件监听器 （注册和取消时 listener 要用同一个对象）
     * @param name
     * @param listener
     */
    unbind(name, listener) {
        window.removeEventListener(name, listener);//有效
    },

    /**
     * 触发事件
     * @param name 事件名称
     * @param params 事件参数
     */
    /*  fire(name, params, timeout) {
          let theT = timeout;
          if(!theT) {
              theT = 3000;
          }
          //延迟3秒
          setTimeout(function () {
              window.dispatchEvent(new CustomEvent(name, {detail: params}));
          }, theT);
      },*/

    fire(name, params) {
        window.dispatchEvent(new CustomEvent(name, {detail: params}));
    }

};


export default {
    install: (app) => {
        app.config.globalProperties.$eventx = EVENTX;
    }
}
