import {CONSTANT} from "../constant";

const Web3 = require('web3');

export default {
    data() {
        return {
            address: null,
        }
    },
    methods: {
        loginWithMetamask() {
            let done = this.$metamaskx.checkPlugin();
            if (!done) {
                return;
            }
            window.web3 = new Web3(window.web3.currentProvider);
            ethereum.request({method: 'eth_requestAccounts'}).then((result) => {
                console.log(result);
                this.address = result[0];
                this.doLoginWithMetamask();
            }).catch((err) => {
                console.log(err);
            });
        },

        doLoginWithMetamask() {
            this.$httpx.post(this.$urlx.M_SIGN, {address: this.address}).then((data) => {
                console.log(data);
                let hexdata = window.web3.utils.utf8ToHex(data.nonce);
                window.web3.eth.personal.sign(hexdata, this.address, (result, sign) => {
                    console.log(result);
                    console.log(sign);
                    this.$httpx.post(this.$urlx.M_LOGIN, {
                        signature: sign,
                        address: this.address
                    }).then((data) => {
                        this.$eventx.fire(CONSTANT.EVENT.LOGIN_SUCCESS, data);
                        console.log(data);
                    }).catch((err) => {
                        console.log(err);
                    })
                });
            });
        },
    }
}
