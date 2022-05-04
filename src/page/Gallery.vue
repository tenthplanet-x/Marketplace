<template>
  <div class="gallery full-page x-flex-col-x_start-y_start">
    <div style="height: 120px;width: 100%;" class="x-flex-item-shrink0">
    </div>

    <div class="x-flex-x_start-y_start x-flex-item-grow" style="background: #FFF;width: 100%;padding: 20px;">
      <div class="x-flex-item-shrink0" style="width: 380px;">
        <div class="filter-title x-flex-x-start-y-end">
          <span class="item filter-h1">Filter</span>
          <div class=" x-flex-x-start-y-end" style="margin-left: 14px; cursor: pointer;">
            <img class="item filter-reset-icon" src="../assets/img/reset.png">
            <span class="item filter-reset-txt">Reset</span>
          </div>

        </div>
        <div style="margin-top: 15px;margin-bottom: 15px;">
          <input class="filter-input" placeholder="Search by serial...">
        </div>
        <div>

          <div class="filter-cate" v-for="item in galleryProps" key="item.key">
            <div @click.stop="togglePropExpand(item)" class="filter-prop-key x-flex-x_start-y_center">
              <img src="../assets/img/gallery_sort.png" class="x-flex-item-shrink0">
              <span class="filter-h2 x-flex-item-grow" style="margin-left: 10px;">{{ item.key }}</span>
              <div v-if="item.expand" class="x-flex-item-shrink0 filter-reset-txt">{{item.count}}</div>
              <img v-else src="../assets/img/arrow_down.png" class="x-flex-item-shrink0">
            </div>

            <div v-show="item.expand" style="padding-left: 20px;">
              <div v-for="val in item.vals" key="val.val" @click.stop="toggleProp(val)"
                   class="filter-prop-val x-flex-x_start-y_center">
                <img v-if="val.selected" src="../assets/img/select_sel.png">
                <img v-else src="../assets/img/select_nor.png">
                <div style="margin-left: 10px;margin-right: 15px;">{{ val.val }}</div>
                <div class="filter-reset-txt">({{val.count}})</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="x-flex-item-grow" style="margin-left: 50px;">
        <div class="mech-title">
          mech angel
        </div>
        <div class="x-flex-wrap-x_start-y_start" style="margin-top: 5px;">
          <div style="margin-right: 10px;">Filter</div>
          <div v-for="(prop, idx) in selectedProps" :key="idx" @click="removeProp(prop)" class="x-flex-x_start-y_center sel-prop">
            <span style="margin-right: 5px;">{{ prop.key }} : {{ prop.val }}</span>
            <img src="../assets/img/close_nor.png">
          </div>
        </div>

        <div class="x-flex-wrap-x_start-y_start" style="margin-top: 10px;">

          <div class="gal-item" v-for="item in galleries" :key="item.idx" @click="showGalItemDetail(item)">
            <div class="gal-item-pic">
              <img src="../assets/img/4179.jpeg">
            </div>
            <div class="gal-item-name">{{ item.name }}</div>
            <div class="gal-item-idx">{{ item.idx }}</div>
          </div>
        </div>
      </div>
    </div>

    <GalleryPlayer :pic="gallery" ref="GalleryPlayer">
    </GalleryPlayer>

  </div>
</template>

<script>
import GalleryPlayer from "@/components/GalleryPlayer";

export default {
  name: "Gallery",
  components: {GalleryPlayer},
  data() {
    return {
      galleryProps: null,
      galleries: null,
      gallery: {},
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
    document.getElementById("layaContainer").style.display = "none";
    Laya.stage.renderingEnabled = false;
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
          }
          for (let vs of pp.vals) {
            let va = {
              val: vs,
              selected: false,
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
      let countmap  = {};
      for(let pic of this.galleries) {
        for(let prop in pic.props) {
          if(!countmap[prop]) {
            countmap[prop] = {
              count: 0,
            };
          }
          let v = pic.props[prop];
          let pp = countmap[prop];
          if(!pp[v]) {
            pp[v] = 0;
          }
          countmap[prop].count++;
          countmap[prop][v]++;
        }
      }
      return countmap;
    },
    resetFilterCount(countmap) {
      for(let x of this.galleryProps) {
        if(countmap[x.key]) {
          x.count =countmap[x.key].count;
        } else {
          x.count = 0;
        }
        for(let xx of x.vals) {
          if(countmap[x.key] && countmap[x.key][xx.val]) {
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
  background: #FFF;
  padding: 0 5px;
}

.filter-input:hover, .filter-input:focus {
  border: 1px solid transparent;
}

.gal-item-pic {
  transition-duration: .3s;
  cursor: pointer;

}

.gal-item {
  width: 230px;
  margin-right: 20px;
}

.gal-item img {
  width: 100%;
  object-fit: cover;
  height: 100%;
  max-width: 100%;
  display: block;
  border-radius: inherit;
}

.gal-item-pic {
  border-radius: 10px;
  aspect-ratio: 1/1;
}

.gal-item:hover .gal-item-pic {
  transform: scaleX(1.05) scaleY(1.05);
}
.gal-item-name {
  margin-top: 10px;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: #262626;
}

.gal-item-idx {
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #8D93A4;
}

.filter-h1 {
  font-weight: 600;
  font-size: 36px;
  line-height: 36px;
  color: #262626;
}

.filter-reset-icon {
  margin-right: 14px;
  display: block;
}

.filter-reset-txt {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #8D93A4;
}
.filter-cate {
  margin-top: 20px;
}

.filter-prop-key {
  cursor: pointer;
}

.filter-h2 {
  font-weight: 500;
  font-size: 32px;
  line-height: 70px;
  color: #262626;
}

.filter-prop-val{
  font-weight: 400;
  font-size: 28px;
  line-height: 66px;
  color: #262626;
  cursor: pointer;
}
.sel-prop{
  margin-right: 15px;
  cursor: pointer;
}

.mech-title {
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;

  color: #000000;
}

</style>
