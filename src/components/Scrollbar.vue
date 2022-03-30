<template>
    <div class="scroll-bar x-flex-col-x_start-y_center">
        <img :src="fixImg(0)" class="item">
        <img :src="fixImg(1)" class="item">
        <img :src="fixImg(2)" class="item">
        <img :src="fixImg(3)" class="item">
        <img :src="fixImg(4)" class="item">
        <img :src="fixImg(5)" class="item">
    </div>
</template>

<script>
    export default {
        name: "Scrollbar",
        props: {
            order: Number,
        },
        computed: {
            fixImg() {
                return (idx) => {
                    let img = "xingxing.png";
                    if (idx === this.order) {
                        img = "yueliang.png";
                    }
                    return require("../assets/img/" + img);
                }
            }
        },

    }
</script>

<style scoped>
.item {
    margin: 10px 0;
}
    .scroll-bar {
        z-index: 200;
    }
</style>
