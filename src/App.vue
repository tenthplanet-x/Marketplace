<template>
    <div id="app">
        <HeadNav class="head-nav"/>
        <div class="page-white"></div>
        <router-view/>
        <FootNav style="z-index: 100"/>
    </div>
</template>


<script>
    import HeadNav from "./components/HeadNav.vue";
    import FootNav from "./components/FootNav.vue";

    export default {
        components: {HeadNav, FootNav},
    };
</script>

<style>
    .head-nav {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .page-white {
        height: 66px;
    }
</style>
