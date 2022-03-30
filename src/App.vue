<template>
    <div>
     <!--   <div id="layaContainer"></div>-->
        <Header class="header"></Header>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import Storage from "./storage";
    export default {
        name: 'App',
        components: {Header},
        mounted() {
            Storage.init();
        },
        unmounted() {
            Storage.destroy();
        }
    }
</script>

<style>
    @import "./assets/css/index.css";
</style>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 120px;
    }
</style>
