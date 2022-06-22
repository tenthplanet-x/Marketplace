<template>
  <div class="gallery font-poppinsr">

    <div class="flex flex-row ">
      <div class="left">

        <div class="flex flex-row items-baseline">
          <span class="font-poppinss big-text" style="margin-right: 18px;">Filter</span>
          <div class="cursor-pointer flex flex-row items-baseline">
            <img class="reset-icon" src="../assets/img/gallery_reset@2x.png">
            <span class="reset-text">Reset</span>
          </div>

        </div>

        <div>
          <input class="filter-input" placeholder="Search by id" v-model="search_id" @input="searchById" />
        </div>

        <div style="margin-top: 26px;">

          <div v-for="item in galleryProps" key="item.key">

            <div class="flex flex-row items-center f-p cursor-pointer" @click.stop="togglePropExpand(item)">
              <img class="f-p-icon" src="../assets/img/gallery_sort@2x.png">
              <span class="f-p-text flex-grow" style="margin-left: 12px;">{{ item.key }}</span>
              <img v-if="item.expand" class="f-p-expand"  src="../assets/img/arrow_up@2x.png">
              <img v-else class="f-p-expand" src="../assets/img/arrow_down@2x.png">
            </div>

            <div v-show="item.expand">
              <input class="filter-input" placeholder="Search" v-model.trim="item.input" @input="filterPropVal(item)">
              <div style="padding: 10px 8px;">
                <div v-for="val in item.vals" key="val.val" @click.stop="toggleProp(val)"
                     class="flex flex-row items-center cursor-pointer f-p-v" style="padding: 0 14px;line-height: 58px;" v-show="val.visible">
                  <img v-if="val.selected" class="f-p-icon" src="../assets/img/select_sel@2x.png">
                  <img v-else class="f-p-icon" src="../assets/img/select_nor@2x.png">
                  <div style="margin-left: 14px">{{ val.val }}</div>
                  <div class="f-p-v-count" style="margin-left: 8px;">({{ val.count }})</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
      <div class="right flex-grow" style="margin-left: 46px;">
        <div class="font-poppinss big-text" style="margin-bottom: 16px;">432</div>

        <div class="flex flex-row flex-wrap">
          <div v-for="(prop, idx) in selectedProps" :key="idx" @click="removeProp(prop)" class="flex flex-row items-center sel-p-v">
            <span>{{ prop.key }} : {{ prop.val }}</span>
            <img style="margin-left: 5px;" src="../assets/img/close_nor@2x.png">
          </div>
        </div>

        <div class="flex flex-row flex-wrap" style="margin-top: 22px;">

          <div class="gal-item" v-for="item in galleries" :key="item.idx" @click="showGalItemDetail(item)">
            <div class="gal-item-pic">
              <img src="../assets/img/4179.jpeg">
            </div>
            <div class="gal-item-name" style="margin-top: 10px;">{{ item.name }}</div>
            <div class="gal-item-idx" style="margin-top: 4px;">{{ item.idx }}</div>
          </div>

        </div>
      </div>

      <GalleryPlayer :pic="gallery" ref="GalleryPlayer">
      </GalleryPlayer>
    </div>


  </div>
</template>

<script>

import GalleryPlayer from "../components/GalleryPlayer.vue";

export default {
  name: "Gallery",
  components: {GalleryPlayer},
  data() {
    return {
      galleryProps: null,
      galleries: null,
      gallery: {},
      search_id: null,
    }
  },
  computed: {
    selectedProps() {
      let selvals = [];
      if (this.galleryProps) {
        for (let gps of this.galleryProps) {
          for (let val of gps.vals) {
            if (val.selected) {
              selvals.push({key: gps.key, val: val.val});
            }
          }
        }
      }
      return selvals;
    },
    /*    the_galleries() {
          if(!this.galleries) {
            return [];
          }
          if(!this.selectedProps || this.selectedProps.length === 0) {
            return this.galleries;
          }
          let gs = [];
          for(let g of this.galleries) {
            let done = true;
            for(let spv of this.selectedProps) {
              if(!g.props[spv.key] || g.props[spv.key] !== spv.val) {
                done = false;
                break;
              }
            }
            if(done) {
              gs.push(g);
            }
          }
          return gs;
        }*/
  },
  mounted() {
    this.initIt();
  },
  methods: {
    initIt() {
      this.initGalleryProp();
    },

    initGalleryProp() {
      this.$httpx.get(this.$urlx.Gallery_Props).then((data) => {
        let gpps = [];
        for (let pp of data) {
          let pvs = {
            key: pp.key,
            vals: [],
            expand: false,
            input: null,
          }
          for (let vs of pp.vals) {
            let va = {
              val: vs,
              selected: false,
              visible: true,
            }
            pvs.vals.push(va);
          }
          gpps.push(pvs);
        }
        this.galleryProps = gpps;
        this.initGallerys().then(() => {
          let countmap = this.initCountByProp();
          this.resetFilterCount(countmap);
        });
      });
    },
    buildParams() {
      let ppps = [];
      for (let ppvs of this.galleryProps) {
        let vals = [];
        for (let valsd of ppvs.vals) {
          if (valsd.selected) {
            vals.push(valsd.val);
          }
        }
        if (vals.length > 0) {
          ppps.push({
            key: ppvs.key,
            vals: vals,
          });
        }
      }
      return {
        props: ppps
      }
    },
    async initGallerys() {
      let params = this.buildParams();
      let data = await this.$httpx.post(this.$urlx.Gallery_List, params);
      this.galleries = data;
    },
    initCountByProp() {
      let countmap = {};
      for (let pic of this.galleries) {
        for (let prop in pic.props) {
          if (!countmap[prop]) {
            countmap[prop] = {
              count: 0,
            };
          }
          let v = pic.props[prop];
          let pp = countmap[prop];
          if (!pp[v]) {
            pp[v] = 0;
          }
          countmap[prop].count++;
          countmap[prop][v]++;
        }
      }
      return countmap;
    },
    resetFilterCount(countmap) {
      for (let x of this.galleryProps) {
        if (countmap[x.key]) {
          x.count = countmap[x.key].count;
        } else {
          x.count = 0;
        }
        for (let xx of x.vals) {
          if (countmap[x.key] && countmap[x.key][xx.val]) {
            xx.count = countmap[x.key][xx.val];
          } else {
            xx.count = 0;
          }
        }
      }
    },
    toggleProp(pp) {
      pp.selected = !pp.selected;
      this.initGallerys();
    },
    removeProp(pp) {
      for (let gps of this.galleryProps) {
        if (gps.key === pp.key) {
          for (let val of gps.vals) {
            if (val.val === pp.val) {
              val.selected = false;
            }
          }
        }
      }
      this.initGallerys();
    },
    showGalItemDetail(item) {
      this.gallery = item;
      this.$refs.GalleryPlayer.displayit(true);
    },
    togglePropExpand(prop) {
      prop.expand = !prop.expand;
    },



    searchById() {
    },
    filterPropVal(item) {
      let reg = new RegExp(item.input, 'i');
      for (let m of item.vals) {
        if (reg.test(m.val)) {
          m.visible = true;
        } else {
          m.visible = false;
        }
      }
    }
  }
}
</script>

<style scoped>


.gallery {
  background: #160832;
  min-height: calc(100vh - 66px);
}

.left {
  width: 395px;
  margin-left: 20px;
}

.big-text {
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
}

.reset-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
}

.reset-icon {
  width: 14px;
  height: 14px;
}

.filter-input {
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  line-height: 44px;
  font-size: 14px;
  width: 100%;
  padding: 0 12px;
  background: inherit;
}

.filter-input:hover {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.filter-input:focus {
  border: 1px solid #5C46FF;
}

.f-p {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  line-height: 62px;
}

.f-p-v:hover {
  background: rgba(255,255,255, 0.07);
  border-radius: 4px;
}

.f-p-icon {
  width: 12px;
  height: 12px;
}

.f-p-text {
  font-size: 16px;
  font-weight: 400;
}

.f-p-expand {
  width: 14px;
  height: 14px;
}

.f-p-v-count {
  color: rgba(255, 255, 255, 0.6);
}

.sel-p-v {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.8);
  padding: 0 14px;
  cursor: pointer;
  margin-right: 10px;
}

.sel-p-v img {
  width: 12px;
  height: 12px;
  margin-left: 6px;
}

.gal-item {
  margin-right: 26px;
  margin-bottom: 26px;
  cursor: pointer;
}

.gal-item-pic {
  width: 230px;
  height: 230px;
  border-radius: 10px;
  transition: .2s;
}
.gal-item-pic img {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.gal-item:hover .gal-item-pic {
  transform: scaleX(1.05) scaleY(1.05);
}

.gal-item-name {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 18px;
}

.gal-item-idx {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 21px;
}
</style>
