<template>
    <div class="flex flex-col justify-center items-center">
        <div style="" class="swiper" ref="itemContainer">
            <li class="prev">
                <img src="../assets/img/swiper-0.jpg">
            </li>

            <li class="now">
                <img src="../assets/img/swiper-2.jpg">
            </li>

            <li class="next">
                <img src="../assets/img/swiper-1.jpg">
            </li>

            <li class="hide">
                <img src="../assets/img/swiper-3.jpg">
            </li>

            <div class="leftBox" @click="showPrev"></div>
            <div class="rightBox" @click="showNext"></div>

        </div>
    </div>

</template>

<script>

    export default {
        name: "ImgSwiper",
        data() {
            return {
                items: null,
                idx: 0,
            }
        },
        mounted() {
            this.initIt();
        },
        methods: {
            initIt() {
                let itemContainer = this.$refs.itemContainer;
                this.items = itemContainer.querySelectorAll("li");
                this.setNow(0);
            },
            showPrev() {
                let idx = this.idx - 1;
                if (idx < 0) {
                    idx = this.items.length - 1;
                }
                this.setNow(idx);
            },
            showNext() {
                let idx = this.idx + 1;
                if (idx >= this.items.length) {
                    idx = 0;
                }
                this.setNow(idx);
            },
            setNow(idx) {
                let now = idx;
                let pre = now - 1;
                if (pre < 0) {
                    pre = this.items.length - 1;
                }
                let next = now + 1;
                if (next >= this.items.length) {
                    next = 0;
                }
                for (let i = 0; i < this.items.length; i++) {
                    if (i === now) {
                        this.items[i].className = "now";
                    } else if (i === pre) {
                        this.items[i].className = "prev";
                    } else if (i === next) {
                        this.items[i].className = "next";
                    } else {
                        this.items[i].className = "hide";
                    }
                }
                this.idx = idx;
            }
        }
    }
</script>

<style scoped>
    .swiper {
        width: 100%;
        height: 500px;
        position: relative;
    }


    .swiper li {
        transition: all 0.8s;

       
        overflow: hidden;
        /**
        box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);

        width: 800px;
        height: 360px;
 border-radius: 6px;
 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .swiper li img {
        width: 100%;
        height: 100%;
    }

    .swiper li.now {
        z-index: 9;
    /**    transform: translate(-50%, -50%) scale(1.2); */ 
transform: translate(-50%, -50%);
        width: 870px;
        height: 500px;
border-radius: 10px;
border: 1px solid;
border-image: linear-gradient(180deg, rgba(209, 16, 0, 1), rgba(214, 0, 124, 1), rgba(255, 249, 116, 1), rgba(0, 150, 4, 1), rgba(0, 200, 194, 1)) 1 1;

    }

    .swiper li.next {
        z-index: 6;
        transform: translate(-10%, -50%);

width: 744px;
height: 428px;
background: linear-gradient(270deg, #1D0943 0%, rgba(33, 9, 78, 0) 100%);
border-radius: 10px;

    }

    .swiper li.prev {
        z-index: 6;
        transform: translate(-90%, -50%);

        width: 744px;
height: 428px;
background: linear-gradient(90deg, #1D0943 0%, rgba(33, 9, 78, 0) 100%);
border-radius: 10px;
    }

    .swiper li.hide {
display: none;
    }

    .leftBox,
    .rightBox {
        z-index: 7;
        width: 800px;
        height: 360px;
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .leftBox {
        transform: translate(-90%, -50%);
    }

    .rightBox {
        transform: translate(-10%, -50%);
    }
</style>
