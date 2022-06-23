import Web3 from 'web3'

export const METAMASK = {
    async checkPlugin() {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            web3.eth.defaultAccount = await web3.eth.getCoinbase();
            console.log(web3.eth.defaultAccount);
            return true
        }
        return false;
    },
    sign(data, address) {
      //  let hexdata = window.web3.utils.utf8ToHex(data);
        return window.web3.eth.personal.sign(data, address);
    }
};

export default {
    install: (app) => {
        app.config.globalProperties.$metamaskx = METAMASK;
    }
};
