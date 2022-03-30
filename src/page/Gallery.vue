<template>
    <div class="gallery">

        <div class="x-flex-x_start-y_start">
            <div class="x-flex-item-shrink0">
                <div class="filter-title x-flex-x-start-y-end">
                    <span class="item filter-h1">Filter</span>
                    <img class="item" src="../assets/img/reset.png">
                    <span class="item">Reset</span>
                </div>
                <div>
                    <input class="filter-input" placeholder="Search">
                </div>
                <div class="filter-cate">
                    <div>
                        <span class="filter-h2">CLASS</span>
                    </div>

                    <div>
                        <div>class1</div>
                        <div>class2</div>
                    </div>

                </div>


                <div class="filter-cate">
                    <div>
                        <span class="filter-h2">FACE</span>
                    </div>

                    <div>
                        <div>FACE1</div>
                        <div>FACE2</div>
                    </div>

                </div>
            </div>
            <div class="x-flex-item-grow">
                <div>
                    <span>432</span>
                </div>
                <div class="x-flex-wrap-x_start-y_start">

                </div>

                <div class="x-flex-wrap-x_start-y_start">

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Gallery",
        data() {
            return {}
        },
        mounted() {
            this.initIt();
        },
        methods: {
            initIt() {
                this.initCates();
                this.findWithFilter();
            },

            initCates() {

            },
            findWithFilter() {

            }
        }
    }
</script>

<style scoped>

    .filter-title .item {
        margin-right: 10px;
    }

    .filter-input {
        width: 100%;
        line-height: 44px;
        border-radius: 5px;
        border: 1px solid transparent;
        background: gray;
        padding: 0 5px;
    }

    .filter-input:hover, .filter-input:focus {
        border: 1px solid transparent;
    }
</style>
