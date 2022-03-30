<template>
  <div class="header x-flex-x_between-y_center">
    <div class="left x-flex-x_start-y_center">
      <div class="logo" style="font-size: 0">
        <img src="../assets/img/logo.png" class="logo-img">
      </div>
      <div class="nav">
        <nav-tab txt="Collection" @click="tabclick"></nav-tab>
      </div>
      <div class="nav">
        <nav-tab txt="Community"></nav-tab>
      </div>
      <div class="nav">
        <nav-tab txt="Game Trailer"></nav-tab>
      </div>
      <div class="nav">
        <nav-tab txt="Roadmap"></nav-tab>
      </div>
    </div>

    <div class="right x-flex-x_start-y_center">
      <img src="../assets/img/shoubing.png" class="ri-item">
    <!--  <img src="../assets/img/laba.png" class="ri-item">-->
      <img src="../assets/img/login-btn.png" @click="loginWithMetamask" style="width: 205px;height: 72px;">
    </div>
  </div>
</template>

<script>
import Login from "../page/login";
import NavTab from "./NavTab";

export default {
  name: "Header",
  components: {NavTab},
  mixins: [Login],
  methods: {
    tabclick() {
      console.log("xxx");
    },
  }
}
</script>

<style scoped>
.header {
  padding: 0 50px;
  z-index: 200;
}

.left, .right {
  height: 100%;
}

.logo-img {
  width: 218px;
  height: 46px;
}

.nav {
  width: 200px;
  cursor: pointer;
}

.ri-item {
  margin-left: 15px;
  margin-right: 30px;
}

.right img {
  cursor: pointer;
}
</style>
