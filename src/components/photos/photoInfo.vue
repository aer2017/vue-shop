<template>
  <div class="photoInfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.add_time}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </p>
    <hr />
    <div class="thumbs">
        <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
    </div>
    <div class="content" v-html="photoInfo.content"></div>
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(resule => {
        if (resule.body.status === 0) {
          this.photoInfo = resule.body.message[0];
          console.log(this.photoInfo);
        } else {
          Toast("获取失败");
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(resule => {
        if (resule.body.status === 0) {
          resule.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.list = resule.body.message;
        } else {
          Toast("获取失败");
        }
      });
    },
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoInfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>