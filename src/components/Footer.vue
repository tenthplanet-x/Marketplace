<template>
    <div class="footer x-flex-col-x_center-y_start">
        <div class="footer-body x-flex-x_between-y_center">
            <img src="../assets/img/logo-footer.png">
            <div class="x-flex-x_start-y_center">
                <img src="../assets/img/xiaoniao.png" class="item-img">
                <img src="../assets/img/yuanbing.png" class="item-img">
                <img src="../assets/img/shoubing.png" class="item-img">
                <img src="../assets/img/yuanquan.png" class="item-img">
                <img src="../assets/img/shipin.png" class="item-img">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

    .footer {
        background: #000;
    }

    .footer-body {
        width: 100%;
        padding: 0 200px;
    }

    .item-img {
        width: 50px;
        height: 50px;
        margin-left: 5px;
        cursor: pointer;
    }

</style>
