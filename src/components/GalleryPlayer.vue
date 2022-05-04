<template>
  <div v-show="visible" class="gal-player" @click="displayit(false)">

    <div class="gal-player-c">
      <div class="x-flex-x_start-y_start">
        <div class="gal-pic x-flex-item-shrink0">
          <img src="../assets/img/4179.jpeg">
        </div>
        <div class="gal-desc x-flex-item-grow">
          <div class="x-flex-x_start-y_center">
            <div class="gal-name x-flex-item-grow">{{pic.name}}</div>
            <img src="../assets/img/float_looksrare.png">
            <img src="../assets/img/float_opensea.png"  style="margin-left: 10px;">
            <img src="../assets/img/float_x2y2.png"  style="margin-left: 10px;">
          </div>

          <div class="">
            <div v-for="(val, key) in pic.props" :key="key"  class="prop-item x-flex-x_start-y_start">
              <div class="p-k">{{ key }}</div>
              <div class="p-v"> {{ val }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
export default {
  name: "GalleryPlayer",
  props: {
    pic: {
      type: Object,
      default() {
        return {
          name: ""
        };
      }
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    displayit(visible) {
      this.visible = visible;
    }
  }
}
</script>

<style scoped>

.gal-player {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  left: 0;
  top: 0;
}

.gal-player-c {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate3d(-50%, -50%, 0px);
  border-radius: 10px;
  background: #FFF;
  padding: 20px;
  width: 926px;
}

.gal-pic {
  width: 350px;
  height: 350px;
  border-radius: 10px;
}
 .gal-pic img {
   height: 100%;
   width: 100%;
   border-radius: inherit;
   object-fit: cover;
   display: block;
 }

 .gal-desc {
   margin-left: 20px;
   padding-top: 20px;
 }

 .prop-item {
/*   width: 220px;*/
   height: 49px;
   padding: 8px 12px;
   border-radius: 10px;
   background-color: rgba(255,255,255,0.1);
   margin: 6px;
   border-color: rgba(0,0,0,1);
 }

.prop-key-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.gal-name {
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;

  color: #000000;
}

.p-k {
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;

  color: #8D93A4;
}
.p-v {
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;

  color: #262626;
  margin-left: 14px;
}

</style>