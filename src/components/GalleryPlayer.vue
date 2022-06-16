<template>
  <div v-show="visible" class="gal-player" @click="displayit(false)">

    <div class="gal-player-c" @click.stop="">

      <div class="flex flex-row">
        <div class="gal-pic shrink-0">
          <img src="../assets/img/4179.jpeg">
        </div>
        <div class="gal-desc grow">
          <div class="flex flex-row items-center">
            <div class="gal-name grow">{{ pic.name }}</div>
            <img class="p-icon" src="../assets/img/float_looksrare@2x.png">
            <img class="p-icon" src="../assets/img/float_opensea@2x.png" style="margin-left: 10px;">
            <img class="p-icon" src="../assets/img/float_x2y2@2x.png" style="margin-left: 10px;">
          </div>

          <div class="" style="margin-top: 20px;">
            <div v-for="(val, key) in pic.props" :key="key" class="prop-item flex">
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
  padding: 20px;

  width: 926px;
  height: 434px;
  background: #2F214A;
  box-shadow: 0px 0px 60px 10px rgba(14, 14, 14, 0.4);
  border-radius: 14px;
}


.gal-pic {
  width: 394px;
  height: 394px;
  border-radius: 20px;
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
  padding-left: 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  line-height: 50px;
  margin-bottom: 16px;
}

.prop-key-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.gal-name {
  font-size: 30px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 46px;
}

.p-k {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.p-v {
  margin-left: 16px;

  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
}

.p-icon {
  width: 34px;
  height: 34px;
}

</style>
