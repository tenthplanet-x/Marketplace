<template>
  <div class="page-item">
    <video class="video" playsinline autoplay muted loop>
      <source src="../assets/media/1.mp4" type="video/mp4" />
      Your browser does not support the audio element.
    </video>
  </div>
</template>

<script>
export default {
  name: "Trailer"
}
</script>

<style scoped>
.page-item {
  height: calc(100vh - 66px);
  position: relative;
  z-index: 2;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
