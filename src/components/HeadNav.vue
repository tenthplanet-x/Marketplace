<template>
  <div class="flex flex-row items-center hder">
    <router-link to="/">  <img class="logo" src="../assets/img/logo.png" /> </router-link>

    <router-link class="btn" :class="{'btn-curr': navs.gallery.selected}" :to="navs.gallery.path">{{navs.gallery.name}}</router-link>

    <router-link class="btn" :class="{'btn-curr': navs.community.selected}" :to="navs.community.path">{{navs.community.name}}</router-link>

    <router-link class="btn" :class="{'btn-curr': navs.gameTrailer.selected}" :to="navs.gameTrailer.path">{{navs.gameTrailer.name}}</router-link>

    <router-link class="btn" :class="{'btn-curr': navs.roadmap.selected}" :to="navs.roadmap.path">{{navs.roadmap.name}}</router-link>

    <div class="grow"></div>
    <div class="flex flex-row items-center metamask">
      <img class="metamask-logo" src="../assets/img/homepage_metamask@2x.png" />
      <span>Metamask</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadNav",
  data() {
    return {
      navs: {
        gallery: {
          name: 'Gallery',
          path: "/gallery",
          selected: false,
        },
        community: {
          name: 'Community',
          path: "/gallery1",
          selected: false,
        },
         gameTrailer: {
          name: 'Game Trailer',
          path: "/trailer",
          selected: false,
        },
         roadmap: {
          name: 'Roadmap',
          path: "/gallery1",
          selected: false,
        },

      },
    };
  },
  watch: {
    $route(to) {
      let toPath = to.path;
      console.log(to);
      this.fixSelectedNav(toPath);
    },
  },
  methods: {
    fixSelectedNav(path) {
      console.log(path);
      for(let nav in this.navs) {
        console.log(nav);
        if(path === this.navs[nav].path) {
          this.navs[nav].selected = true;
        } else {
            this.navs[nav].selected = false;
        }
      }
    },
  },
};
</script>


<style scoped>
.hder {
  background: #0f0c1d;
}

.logo {
  margin: 18px 50px 18px 100px;
  height: 30px;
}

.btn {
  border: 1px transparent;
  font-size: 18px;
  line-height: 29px;
  text-shadow: 0px 0px 10px #ff22f7;
  margin-left: 30px;
  width: 137px;
  text-align: center;
}

.btn-curr {
  background: linear-gradient(180deg, #423279 0%, #352765 54%, #1b0f2f 100%);
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(231, 23, 255, 1),
      rgba(99, 55, 255, 1),
      rgba(168, 49, 255, 1)
    )
    1 1;
}

.metamask {
  background: #5a3bff;
  border-radius: 2px;
  padding: 7px 26px;
  cursor: pointer;
  margin-right: 100px;
}

.metamask-logo {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
