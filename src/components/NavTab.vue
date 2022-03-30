<template>
    <div class="nav-tab">
        {{txt}}
    </div>
</template>

<script>
    export default {
        name: "NavTab",
        props: {
            txt: String,
        }
    }
</script>

<style scoped>

    .nav-tab {
        font-size: 18px;
        line-height: 27px;
        color: #FFFFFF;
        opacity: 0.8;
        border: 1px solid transparent;
        border-radius: 61px;
        text-align: center;
        cursor: pointer;
    }

    .nav-tab:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #FFFFFF;
        text-shadow: 0px 0px 13px #FFFFFF;
        font-weight: 600;
    }
    .nav-tab:disabled {
        opacity: 0.3
    }
</style>
