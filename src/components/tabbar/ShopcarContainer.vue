<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="(item,i) in goodslist" :key="item.id">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h3>{{item.title}}</h3>
              <p>
                <span class="price">¥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品
                <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,总价 
                <span class="red">¥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/Shopcar_numbox.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          } else {
            Toast("获取失败");
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, val) {
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  .mui-card-content-inner {
    display: flex;
    justify-content: space-around;
  }
  background-color: #eee;
  overflow: hidden;
  img {
    width: 60px;
    height: 60px;
  }
  h3 {
    font-size: 14px;
  }
  .info {
    .price {
      color: red;
      font-weight: bold;
    }
  }
}
.mui-card-content-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>