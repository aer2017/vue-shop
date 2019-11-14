<template>
  <div>
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist" href="#">
          <img src="../../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/Swiper.vue";
export default {
  data() {
    return {
      lunbotuList: [{id:1,img:'./images/001.jpg'},{id:2,img:'./images/002.jpg'},{id:3,img:'./images/003.jpg'}]
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    // getLunbotu() {
    //   this.$http.get("api/getlunbo").then(result => {
    //     if (result.body.status === 0) {
    //       this.lunbotuList = result.body.message;
    //     } else {
    //       Toast("获取信息失败");
    //     }
    //   });
    // }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>