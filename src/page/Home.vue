<template>
    <div ref="Scrollbar">
        <div>
            <div class="page">
                <div class="page-desc page-0-desc" :style="[background, background_0]">
                    <h1>Mech Angel</h1>
                    <h3>Mech Angel is an anime styled
                        MMOARPG game </h3>
                </div>
            </div>
            <div class="page">
                <div class="page-desc page-1-desc" :style="[background, background_0]">
                    <h1>Ancient, Noble Warriors</h1>
                    <h3>Mech Angel is an anime styled
                        MMOARPG game based on a self-developed 3D graphics engine enhanced with isometric
                        perspective.ech Angel is an anime styled MMOARPG game </h3>
                </div>
                <!--    <DescCard style="width: 800px; height: 450px;"></DescCard>-->
            </div>
            <div class="page">

                <div class="page-desc page-2-desc-0" :style="[background, background_2]"
                     style="top: 100px;left: 229px;">
                    <h3 class="page-2-desc-h3">2.Mech-Wings comes with attributes and skills that’d enhance combat power
                        upon activating </h3>
                </div>

                <div class="page-desc page-2-desc-0" :style="[background, background_2]"
                     style="top: 100px;right: 10%;">
                    <h3 class="page-2-desc-h3">1.Mech-Wings is an advanced system that’d drastically incease mobility
                        and agility
                    </h3>
                </div>
                <div class="page-desc page-2-desc-0" :style="[background, background_2]"
                     style="top: 400px;left: 655px;">
                    <h3 class="page-2-desc-h3">
                        3. There are four gear slots embeded in Mech-Wings, armor, chip, carrier, and essence. Each
                        brings extra enhancement</h3>
                </div>
            </div>


            <div class="page">
                <img class="btn-chibang btn-chibang-a" src="../assets/img/btn-chibang-0.png">

                <img class="btn-chibang btn-chibang-b" src="../assets/img/btn-chibang-1.png">
                <div class="page-desc page-3-desc" :style="[background, background_2]">
                    <h1>
                        Heading3
                    </h1>
                    <h3>
                        1.Mech-Wings is an advanced system that’d drastically incease mobility and agility
                    </h3>
                    <h3>
                        2.Mech-Wings comes with attributes and skills that’d enhance combat power upon activating
                    </h3>
                    <h3>
                        3. There are four gear slots embeded in Mech-Wings, armor, chip, carrier, and essence. Each
                        brings
                        extra enhancement
                    </h3>
                </div>
            </div>
            <div class="page">
                <video ref="video1" class="" id="aaaaaa"
                       style="width: 100%; height: 100%; object-fit: fill; position: absolute;top: 0; left: 0;"
                       playsinline autoplay muted loop>
                    <source src="../assets/media/1.mp4" type="video/mp4">
                    Your browser does not support the audio element.
                </video>
                <div class="page-desc page-4-desc" :style="[background, background_0]">
                    <h1 style="margin: 60px 0;">Trailer</h1>
                    <h3>Grow your wings and join the
                        fight!</h3>
                </div>
            </div>
            <div class="page x-flex-col-x_center-y_center" :style="[background, page_5]">
                <ImgSwiper class="page-5-desc"></ImgSwiper>
            </div>
            <div>
                <Footer class="footer"></Footer>
            </div>
        </div>


        <Scrollbar class="scroll-bar" :order="scrollbarOrder"></Scrollbar>
    </div>
</template>

<script>
    import Scrollbar from "../components/Scrollbar";
    import Footer from "../components/Footer";
    import ImgSwiper from "../components/ImgSwiper";
    import DescCard from "../components/DescCard";


    export default {
        name: "Home",
        components: {DescCard, ImgSwiper, Footer, Scrollbar},
        data() {
            return {
                scrollbarOrder: 0,
                layaCanvas: null,
                background: {
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "100% 100%",
                },
                background_0: {
                //    backgroundImage: 'url(' + require('../assets/img/outline-0.png') + ')',
                },
                background_2: {
                  //  backgroundImage: 'url(' + require('../assets/img/outline-2.png') + ')',
                },
                page_5: {
                    backgroundImage: 'url(' + require('../assets/img/page-5.png') + ')',
                }

            }
        },
        mounted() {
            this.layaCanvas = window.document.body.querySelector("#layaCanvas");
            /*   this.$refs.Scrollbar.addEventListener('scroll', this.fixScrollbar);
               this.$refs.Scrollbar.addEventListener('resize', this.fixScrollbar);*/
            window.addEventListener('scroll', this.fixStyle);
            window.addEventListener('resize', this.fixStyle);


        },
        methods: {

            fixStyle() {
                //0 0.23 0.53 1
                this.scrollbarOrder = Math.round(window.scrollY / window.innerHeight);

                if (window.scrollY <= (window.innerHeight * 3)) {
                    this.layaCanvas.style.top = window.scrollY + "px";
                    if (window.scrollY <= window.innerHeight) {
                        window.setBg(window.scrollY / window.innerHeight * 0.23);

                    } else if (window.scrollY <= (window.innerHeight * 2)) {
                        window.setBg(0.23 + (window.scrollY / window.innerHeight - 1) * 0.3);
                    } else {
                        window.setBg(0.53 + (window.scrollY / window.innerHeight - 2) * 0.47);
                    }
                } else {
                    this.layaCanvas.style.top = (window.innerHeight * 3) + "px";
                    window.setBg(1);
                }

            },

        }
    }
</script>

<style scoped>

    .page {
        width: 100vw;
        height: 100vh;
        z-index: 100;
        position: relative;
    }

    .page-desc {
        color: #ffffff;
        padding: 0 80px;
    }

    .page-desc h1 {
        margin: 20px 0;
    }

    .page-desc h3 {
        margin: 20px 0;
    }

    .page-0-desc {
        position: absolute;
        bottom: 100px;
        left: 200px;
        width: 878px;
        height: 468px;
    }

    .page-0-desc h1 {
      font-size: 96px;
      font-weight: 900;
      line-height: 115px;
    }

    .page-0-desc h2 {
      font-size: 36px;
      font-weight: 400;
      line-height: 54px;
    }


    .page-1-desc h1 {
      font-size: 76px;
      font-weight: 600;
      line-height: 91px;
    }

    .page-1-desc h2 {
      font-size: 24px;
      font-weight: 400;
      line-height: 36px;
    }

    .page-1-desc {
        position: absolute;
        bottom: 150px;
        right: 200px;
        width: 878px;
        height: 483px;
    }

    .page-2-desc-0 {
        position: absolute;
        width: 458px;
        height: 509px;
    }



    .page-2-desc h1， .page-3-desc h1 {
      font-size: 64px;
      font-weight: 600;
      line-height: 77px;
    }

    .page-2-desc h2， .page-3-desc h2 {
      font-size: 24px;
      font-weight: 400;
      line-height: 36px;
    }


    .page-3-desc {
        position: absolute;
        top: 80px;
        right: 200px;
        width: 600px;
        height: 818px;
    }

    .scroll-bar {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .footer {
        height: 350px;
    }


    .btn-chibang {
        position: absolute;
        cursor: pointer;
        z-index: 300;
    }

    .btn-chibang-a {
        top: 150px;
        left: 30%;
    }

    .btn-chibang-b {
        top: 150px;
        right: 30%;
    }

    .page-2-desc-h3 {
        margin-top: 80px !important;
    }

    .page-4-desc h1 {
      font-size: 76px;
      font-weight: 600;
      line-height: 91px;
    }

    .page-4-desc h2 {
      font-size: 24px;
      font-weight: 400;
      line-height: 36px;
    }

    .page-4-desc {
        position: absolute;
        top: 300px;
        left: 268px;
        width: 878px;
        height: 411px;
    }


    .page-5-desc h1 {
      font-size: 64px;
      font-weight: 600;
      line-height: 77px;
    }

    .page-5-desc h2 {
      font-size: 24px;
      font-weight: 400;
      line-height: 36px;
    }
</style>
