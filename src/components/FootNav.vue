<template>
  <div class="foot flex flex-col justify-center">
    <div class="flex">
        <div class="grow"></div>
      <div class="flex flex-row items-center">
        <img class="logo" src="../assets/img/logo.png" />
        <div class="flex flex-row">
          <a><img class="icon" src="../assets/img/icon_twitter@2x.png" /></a>
          <a><img class="icon" src="../assets/img/icon_2@2x.png" /></a>
          <a><img class="icon" src="../assets/img/icon_3@2x.png" /></a>
          <a><img class="icon" src="../assets/img/icon_ins@2x.png" /></a>
          <a><img class="icon" src="../assets/img/icon_yotube@2x.png" /></a>
        </div>
      </div>
       <div class="grow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FootNav",
};
</script>
<style scoped>
.foot {
  height: 160px;
  background: #0f0c1d;
}
.logo {
  height: 30px;
  margin-right: 61px;
}

.icon {
  width: 38px;
  cursor: pointer;
  margin-right: 18px;
}
</style>
