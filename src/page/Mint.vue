<template>
  <div class="full-page background-full mint" :style="[page_5]">

    <div class="mint-desc">
      <div v-show="step_1">
        <h1>
          MechAngel
        </h1>
        <h2>
          dreamcard
        </h2>
        <div class="btn" @click.stop="showMetamask">
          Mint Now
        </div>
      </div>


      <div v-show="step_2">
        <h1>
          Mint Dream
        </h1>
        <h1>
          Card MechAngel
        </h1>
        <div @click.stop="showMetamask" style="font-size: 0;">
          <img src="../assets/img/metamask-btn.png" style="cursor: pointer;" @click="showMintSelect">
        </div>
        <div class="x-flex-x_start-y_center" v-show="step_2_warning">
          <img src="../assets/img/waring-tip.png">
          <h2 style="margin-left: 10px;">Re-directing To Ethereum Network</h2>
        </div>
      </div>


      <div v-show="step_3">
        <div class="x-flex-col-x_center-y_center background-full" :style="[background_0]"
             style="width: 738px;height: 510px;">

          <div class="mint-num">
            0/123
          </div>
          <div class="x-flex-x_start-y_center mint-num" style="margin-top: 30px;">
            <span>-</span> <span style="margin: 0 20px;">2</span> <span>+</span>
          </div>
          <img src="../assets/img/metamask-mint-btn.png" style="cursor: pointer;" @click="mint">
        </div>

        <div class="bg-b-t" style="margin-top: 20px;">
          1 wallet can only mint 3 avatars!
        </div>
      </div>


      <div  v-show="step_4">
        <div class="x-flex-col-x_center-y_center background-full sold-out" :style="[background_0]"
             style="width: 738px;height: 510px;">
          Sold Out
        </div>
      </div>


    </div>

  </div>
</template>

<script>

const Web3 = require('web3');

export default {
  name: "Mint",
  data() {
    return {
      page_5: {
        backgroundImage: 'url(' + require('../assets/img/page-5.png') + ')',
      },
      background_0: {
        backgroundImage: 'url(' + require('../assets/img/outline-0.png') + ')',
      },
      abi: null,
      step_1:true,
      step_2: false,
      step_2_warning: false,
      step_3: false,
      step_4: false,
    };
  },
  mounted() {

  },
  methods: {
    mint() {
      this.$metamaskx.mint(1);

      //1 检查是否metamask连接
      //2-1 连接metamask
      //2-2 查看是否已经卖完了
      //2-3 检查当前账户是否已经达到mint上限
      //2-4 展示mint按钮
      //mint 结果展示
    },
    showMetamask() {
      this.$metamaskx.checkPlugin().then((checkPlugin) => {
        this.doshowMetamask(checkPlugin);
      })

    },
    doshowMetamask(enable_plugin) {
      this.step_1 = false;

      this.step_2 = true;
      this.step_2_warning = !enable_plugin;
    },
    async showMintSelect() {
      let isSoldout = await this.$metamaskx.checkNftSoldOut();
      if (isSoldout) {
        this.showSoldOutView();
        return;
      }

      let minted_count = this.$metamaskx.getMintedCount();
      let max_mint_count = this.$metamaskx.getMaxMintCount();
      if (minted_count >= max_mint_count) {
        this.showReachMaxMintCount();
        return;
      }
      this.showMintCountBtn(max_mint_count - minted_count, max_mint_count);

    },
    showSoldOutView() {
      this.step_2 = false;
      this.step_4 = true;
    },
    showReachMaxMintCount() {
      this.step_2 = false;
      this.step_3 = true;
    },
    showMintCountBtn(max_mint_count) {

    },
    doDevMint() {
      window.web3 = new Web3(window.web3.currentProvider);
      let contract_instance = new web3.eth.Contract(this.abi, '0x8B8150c2C514F6a6c79263E1b23F4027a0eD7C90');
      console.log(contract_instance);
      contract_instance.methods.devMint(1).send({
        from: '0xEc357b87d622D097250bD409139C3cE16e6f8604',
        gas: 3000000,
        value: 1000000000000000000
      }).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

.mint {
  position: relative;
}

.mint-desc {
  position: absolute;
  left: 20%;
  top: 35%;
}

.btn {
  background: #9662BC;
  box-shadow: 0px 0px 40px 4px rgba(150, 98, 188, 0.6);
  border-radius: 61px;

  font-weight: 400;
  font-size: 36px;
  line-height: 54px;

  cursor: pointer;
  text-align: center;
  width: 368px;
  padding: 25px 50px;
  margin-top: 10px;
}

.btn:hover {
  background: #9154BE;
}

.btn[disabled] {
  background: rgba(150, 98, 188, 0.3);
}

.mint-desc {
  color: #FFF;
}

.mint-desc h1 {
  font-weight: 900;
  font-size: 96px;
  line-height: 115px;
  margin: 0;
}

.mint-desc h2 {
  font-weight: 400;
  font-size: 36px;
  line-height: 54px;
  margin: 0;
}

.bg-b-t {
  background: #000000;
  opacity: 0.6;
  border-radius: 12px;
  font-weight: 600;
  font-size: 32px;
  line-height: 58px;
  color: #FFFFFF;
  text-align: center;
}

.sold-out {
  font-weight: 600;
  font-size: 76px;
  line-height: 91px;

  color: #FCE045;
}

.mint-num {

  font-weight: 600;
  font-size: 64px;
  line-height: 77px;


  color: #FFFFFF;

}
</style>
