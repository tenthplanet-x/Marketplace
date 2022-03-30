import abi from "../assets/contract/ZLTxus.json"

const Web3 = require('web3');

const CONTRACT_ADDRESS = process.env.VUE_APP_CONTRACT_ADDRESS;
let CONTRACT_INSTANCE = null;

const _CHECK_CONTRACT_INSTANCE = () => {
    if(!CONTRACT_INSTANCE) {
        CONTRACT_INSTANCE  = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    }
}


export const METAMASK = {
    contract_address: CONTRACT_ADDRESS,
    async checkPlugin() {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            web3.eth.defaultAccount = await web3.eth.getCoinbase();
            console.log(web3.eth.defaultAccount);
            return true
        }
        return false;
    },
    mint(num) {
        _CHECK_CONTRACT_INSTANCE();
        CONTRACT_INSTANCE.methods.devMint(num).send({
            from: web3.eth.defaultAccount,
            gas: 3000000,
            value: 1000000000000000000
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    },

     async checkNftSoldOut() {
        _CHECK_CONTRACT_INSTANCE();
        console.log(CONTRACT_INSTANCE);
        //总量
        let max_supply = await CONTRACT_INSTANCE.methods.MAX_SUPPLY().call();
         console.log(max_supply);
         //已卖出的量
        let totalSupply = await CONTRACT_INSTANCE.methods.totalSupply().call();
         console.log(totalSupply);
        return totalSupply >= max_supply;
    },

    async getMintedCount() {
        return await CONTRACT_INSTANCE.methods.totalSupply().call();;
    },
    async getMaxMintCount() {
        return await CONTRACT_INSTANCE.methods.MAX_SUPPLY().call();;
    }
};

export default {
    install: (app) => {
        app.config.globalProperties.$metamaskx = METAMASK;
    }
};
