<template>
  <div style="background: black;">
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

/*https://www.frank.hk/blog/metamask-login/
    https://demo.frank.hk/demo/metamasklogin*/


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
      this.$httpx.post(this.$urlx.LOGIN_METAMASK_NONCE, {address: this.address}).then(data => {
        console.log(data);
        this.signdataForLogin(data.nonce);
      });
    },
    signdataForLogin(nonce) {
      this.$metamaskx.sign(nonce, this.address).then((signature) => {
        console.log(signature);
        this.loginWithMetamask(signature,nonce);
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
