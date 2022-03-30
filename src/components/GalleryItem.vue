<template>
    <div>
        <div class="img-container">
            <img/>
        </div>
        <div>标题</div>
        <div>价格</div>
    </div>
</template>

<script>
    export default {
        name: "GalleryItem",
        props: {
            val: Object
        }
    }
</script>

<style scoped>
    .img-container {
        border-radius: 0.75rem;
        box-shadow: 0 1px 1px hsl(0, 0%, 0.075%),
        0 2px 2px hsl(0, 0%, 0.075%),
        0 4px 4px hsl(0, 0%, 0.075%),
        0 8px 8px hsl(0, 0%, 0.075%),
        0 16px 16px hsl(0, 0%, 0.075%);
        transition-duration: .3s;
    }

    .img-container:hover {
        transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1.05) scaleY(1.05);
    }
</style>
