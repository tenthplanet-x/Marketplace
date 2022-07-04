<template>
  <div style="background: black;">
    <div>
      <div>metamask demo</div>
      <div>
        <button @click.stop="connectMetamask">connect wallat</button>
      </div>

      <div>
        <button @click.stop="nonceForMetamask">login</button>
      </div>

    </div>
    <div>
      <button @click.stop="initContract">xxxxx</button>
    </div>

  </div>
</template>

<script>

/*
 * https://www.frank.hk/blog/metamask-login
 * https://demo.frank.hk/demo/metamasklogin
*/
import ABI_RXGLD from "../assets/contract/RXGLD.json"

export default {
  name: "Metamask",
  data() {
    return {
      address: null,
    }
  },
  methods: {

    connectMetamask() {
      this.$metamaskx.checkPlugin().then((data) => {
        if (data) {
          this.doConnectMetamask();
        } else {
          console.log("没有metamask");
        }
      });
    },

    doConnectMetamask() {
      this.$metamaskx.connetMetamask().then((account) => {
        console.log(account);
        this.address = account;
      }).catch((err) => {
        console.log(err);
      });
    },

    nonceForMetamask() {
      this.$httpx.post(this.$urlx.LOGIN_METAMASK_NONCE, {address: this.address}).then(data => {
        console.log(data);
        this.signdataForLogin(data.nonce);
      });
    },
    signdataForLogin(nonce) {
      this.$metamaskx.sign(nonce, this.address).then((signature) => {
        console.log(signature);
        this.loginWithMetamask(signature, nonce);
      });
    },

    loginWithMetamask(signature, nonce) {
      let d = {
        signature: signature,
        nonce: nonce,
        address: this.address
      };
      this.$httpx.post(this.$urlx.LOGIN_METAMASK, d).then(data => {
        console.log(data);
      });
    },
    initContract() {
      let myContract = new web3.eth.Contract(ABI_RXGLD, '0x5E3E0473217b3A813Ed226AC9509A818fEDebb9B');
      console.log("xx");
      myContract.methods.getBalance().call().then(console.log);
    }
  }
}
</script>

<style scoped>

</style>
