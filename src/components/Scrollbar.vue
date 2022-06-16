<template>
  <div class="scroll-bar flex flex-col justify-start justify-self-center">
    <img :src="fixImg(0)" class="item" />
    <img :src="fixImg(1)" class="item" />
    <img :src="fixImg(2)" class="item" />
    <img :src="fixImg(3)" class="item" />
    <img :src="fixImg(4)" class="item" />
    <img :src="fixImg(5)" class="item" />
  </div>
</template>

<script>
import slide_nor from "../assets/img/slide_nor@2x.png";
import slide_sel from "../assets/img/slide_sel@2x.png";

export default {
  name: "Scrollbar",
  props: {
    order: Number,
  },
  computed: {
    fixImg() {
      return (idx) => {
        let img = slide_nor;
        if (idx === this.order) {
          img = slide_sel;
        }
        return img;
      };
    },
  },
};
</script>

<style scoped>
.item {
  margin-top: -30px;
  width: 62px;
  height: 88px;
}
.scroll-bar {
  z-index: 200;
}
</style>
