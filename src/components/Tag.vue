<template>
    <div class="tag x-flex-x_start-y_center">
    {{val}}
    </div>
</template>

<script>
    export default {
        name: "Tag",
        props: {
            key: String,
            val: String,
        }
    }
</script>

<style scoped>
    .tag {
        border-radius: 50%;
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
        font-size: 14px;
        line-height: 20px;
        min-width: 30px;
    }
</style>
