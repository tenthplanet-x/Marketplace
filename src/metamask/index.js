import Web3 from 'web3'

export const METAMASK = {
    async checkPlugin() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');

            window.web3 = new Web3(Web3.givenProvider);

            return true;
        }
        return false;
    },

    async connetMetamask() {
        let accs = await window.ethereum.request({method: 'eth_requestAccounts'});
        console.log(accs);
        window.web3.defaultAccount = accs[0];
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log(chainId);
        //切换网络事件
        ethereum.on('chainChanged', (chainId) => {
            console.log(chainId);
          //  window.location.reload();
        });
        //切换用户事件
        ethereum.on('accountsChanged', (accs) => {
            console.log(accs);
        });
        return accs[0];
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
