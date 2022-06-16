<template>
  <div>
    <div>metamask demo</div>
    <div>
      <button @click.stop="connectMetamask">connect wallat</button>
    </div>

    <div>
      <button @click.stop="nonceForMetamask">login</button>
    </div>
  </div>
</template>

<script>
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
      ethereum.request({method: 'eth_requestAccounts'}).then((result) => {
        console.log(result);
        this.address = result[0];
        console.log("connected!");
        console.log(this.address);
      }).catch((err) => {
        console.log(err);
      });
    },

    nonceForMetamask() {
      this.$http.post(this.$urlx.LOGIN_METAMASK_NONCE, {address: this.address}).then(data => {
        console.log(data);
        this.signdataForLogin(data.nonce);
      });
    },
    signdataForLogin(nonce) {
      this.$metamaskx.sign(nonce, this.address).then((result, signature) => {
        console.log(result);
        console.log(signature);
        this.loginWithMetamask();
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
    }
  }
}
</script>

<style scoped>

</style>
