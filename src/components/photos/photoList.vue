<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/'+item.id" tag="li" v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h3 class="info-title">{{item.title}}</h3>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          let re=result.body.message.reverse();
          re.unshift({ title: "全部", id: 0 });
          this.cates = re;
        } else {
          Toast("获取失败");
        }
      });
    },
    getPhotoListByCateId(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("获取失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  margin: 0;
  padding: 10px;
  list-style: none;
  li {
    position: relative;
    background-color: #ccc;
    margin-bottom: 10px;
    list-style: none;
    text-align: center;
    box-shadow: 0 0 9px #999;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
.info {
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 0;
  color: white;
  text-align: left;
  max-height: 84px;
  .info-title {
    font-size: 14px;
  }
  .info-body {
    font-size: 13px;
  }
}
</style>