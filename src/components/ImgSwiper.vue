<template>
    <div class="x-flex-col-x_center-y_center">
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

            <li>
                <img src="../assets/img/swiper-3.jpg">
            </li>

            <div class="leftBox" @click="showPrev"></div>
            <div class="rightBox" @click="showNext"></div>

        </div>

        <div style="color: #fff">
            <h1 style="font-weight: 600;
font-size: 64px;
line-height: 77px;margin: 0">
                Roadmap
            </h1>
            <h3 style="font-weight: 400;
font-size: 32px;
line-height: 48px;margin: 10px 0;">
                1.Mech-Wings is an advanced system that’d drastically incease mobility
            </h3>
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
                        this.items[i].className = "";
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

        border-radius: 6px;
        overflow: hidden;
        box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);

        width: 800px;
        height: 360px;

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
        transform: translate(-50%, -50%) scale(1.2);
    }

    .swiper li.next {
        z-index: 6;
        transform: translate(-10%, -50%);
    }

    .swiper li.prev {
        z-index: 6;
        transform: translate(-90%, -50%);
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
