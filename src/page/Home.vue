<template>
  <div style="position: relative;">

    <div style="width: 100vw; height: calc(100vh - 66px);background:red; position: fixed;top: 66px;left: 0;" class="xx">

    </div>

    <div class="page-item page-item-0">
      <div class="page-item-0-text-pos">
        <div class="page-item-text-big">
          <span class="font-mma">mech angel</span>
        </div>
        <div class="page-item-text-small">
          Mech Angel is an anime styled MMOARPG game
        </div>
      </div>
    </div>

    <div class="page-item page-item-1">
      <div class="page-item-1-text-pos">
        <div class="page-item-text-big">
          <span class="font-mma">mech angel</span>
        </div>
        <div class="page-item-text-small">
          Mech Angel is an anime styled MMOARPG game
        </div>
      </div>
    </div>

    <div class="page-item page-item-2">
      <div class="page-item-2-pos1">
        <img class="b-icon" src="../assets/img/icon_sel@2x.png" />
        <div class="absolute text-line" style="top: 10px; left: 90px">
          Mech-Wings is an advanced system
        </div>
        <div class="absolute text-line" style="top: 30px; left: 110px">
          that’d drastically incease mobility and agility
        </div>
      </div>
    </div>

    <div class="page-item page-item-3">
      <div class="page-item-3-pos1">
        <button class="mech-angle-btn">Get Mech Angel</button>
      </div>
    </div>

    <div class="page-item page-item-4">
      <video class="video" playsinline autoplay muted loop>
        <source src="../assets/media/1.mp4" type="video/mp4" />
        Your browser does not support the audio element.
      </video>
      <div class="page-item-4-pos1">
        <div class="page-item-text-big">
          <span class="font-mma">trailer</span>
        </div>
        <div class="page-item-text-small">
          Grow your wings and join the fight!
        </div>
      </div>
    </div>

    <div class="page-item page-item-5" style="background: black">
      <div style="height: 80px"></div>
      <img-swiper />
      <div class="page-item-5-pos1" style="bottom: 10%">
        <div class="page-item-text-big">
          <span class="font-mma">roadmap</span>
        </div>

        <div class="page-item-text-small">
          Mech-Wings is an advanced system that’d drastically incease mobility
        </div>
      </div>
    </div>

    <Scrollbar class="scroll-bar" :order="scrollbarOrder"></Scrollbar>

<!--    <iframe class="page-item" style="width: 100%" src="http://sanguo3.h5.tpulse.cn/rgame/"></iframe>-->
  </div>
</template>

<script>
import ImgSwiper from "../components/ImgSwiper.vue";
import Scrollbar from "../components/Scrollbar.vue";

import {gsap, ScrollTrigger} from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default {
  components: { ImgSwiper, Scrollbar },
  name: "Home",
  data() {
    return {
      scrollbarOrder: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.fixStyle);
    window.addEventListener("resize", this.fixStyle);
    gsap.to(".xx", {
      //y:"-(calc(100vh - 66px))",
      y: "-100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".page-item-4",
        start: "top bottom",
        end: "top 66px",
        scrub: true,
      }
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.fixStyle);
    window.removeEventListener("resize", this.fixStyle);
  },
  methods: {
    fixStyle() {
      //0 0.23 0.53 1
      this.scrollbarOrder = Math.round(window.scrollY / window.innerHeight);
    },
  },
};
</script>


<style scoped>

.page-item {
  height: calc(100vh - 66px);
  position: relative;
  z-index: 2;
}
.page-item-0, .page-item-1, .page-item-2, .page-item-3 {
/*  opacity: 0.3;*/
}
.page-item-text-big {
  font-size: 60px;
  line-height: 60px;
  letter-spacing: 5px;
  width: fit-content;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px 15px rgb(0, 0, 0, 0.2);
}

.page-item-text-small {
  font-size: 20px;
}

.page-item-0 {
/*  background: linear-gradient(180deg, #3d0b97 0%, #190939 100%);*/
  background: linear-gradient(180deg, rgba(61,11,151,0), RGB(25,9,57,1));
}

.page-item-0-text-pos {
  position: absolute;
  top: 280px;
  left: 310px;
}

.page-item-1-text-pos {
  position: absolute;
  top: 280px;
  right: 310px;
}
.page-item-1 {
/*  background: linear-gradient(180deg, #3d0b97 0%, #190939 100%);*/
  background: linear-gradient(180deg, rgba(61,11,151,0), RGB(25,9,57,1));
}
.page-item-2, .page-item-3 {
  background: linear-gradient(180deg, rgba(61,11,151,0), RGB(25,9,57,1));
}

.page-item-2-pos1 {
  position: absolute;
  top: 180px;
  left: 310px;
}

.page-item-2-pos1 .b-icon {
  width: 130px;
  height: 101px;
}

.page-item-2 {
  font-size: 16px;
  line-height: 24px;
}

.text-line {
  white-space: nowrap;
}

.page-item-3 {
}

.page-item-3-pos1,
.page-item-5-pos1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
}

.page-item-4-pos1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
}

.mech-angle-btn {
  width: 340px;
  height: 66px;
  background: #5a3bff;
  border-radius: 6px;
  font-size: 26px;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
  top: 0;
  left: 0;
}

.scroll-bar {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
