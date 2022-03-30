<template>
     <div>
         <div class="card-body">
             <img src="../assets/img/outline-1.png" class="item">
             <div class="item">
                 <div class="desc-body">
                     <h1>fffefe fefefef</h1>
                     <div>
                         fefewfew fwefwfwe
                         fwfewfw
                         fwfewfwefwefwefwef
                     </div>
                 </div>

             </div>

         </div>
     </div>

</template>

<script>
    export default {
        name: "DescCard",
        data() {
            return {
                background: require('../assets/img/outline.png')
            }
        }
    }
</script>

<style scoped>

    .card-body {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .item {
        width: 100%;
        height: 100%;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
    }

    .desc-body {
        color: #fff;
        padding: 30px;
    }

   .card-bg {
        background: linear-gradient(180deg, rgba(35, 38, 50, 0.6) 0%, rgba(151, 60, 91, 0.6) 100.23%);
    }

</style>
