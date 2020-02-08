<template>
  <div class="shop" v-if="shopdata">
    <!-- 头部 -->
    <nav class="header-nav">
      <div class="nav_bg">
        <img src="https://fuss10.elemecdn.com/3/a2/cf556dccdeb82e83b1acac988c160png.png" alt />
      </div>
      <div class="nav_back">
        <i @click="$router.push('/home')" class="fa fa-chevron-left"></i>
      </div>
      <div class="shop_image">
        <img :src="shopdata.image_path" alt />
      </div>
    </nav>

    <!-- 商家信息 -->
    <div class="index-rst">
      <div class="rst-name">
        <span @click="showInfoModel = true">{{ shopdata.name }}</span>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 弹窗组件 -->
      <model-info @close="showInfoModel = false" :rst="shopdata" :showInfoModel="showInfoModel"></model-info>
      <!-- 评分月售 -->
      <div class="rst-order">
        <span>评分{{shopdata.rating}}</span>
        <span>月售{{shopdata.recent_order_num}}单</span>
        <span>蜂鸟专送约{{shopdata.order_lead_time}}分钟</span>
      </div>
      <!-- 优惠Popup -->
      <pop-up :activities="shopdata.activities" />
      <!-- 公告 -->
      <p class="rst-promotion">公告: {{shopdata.promotion_info}}</p>
    </div>
    <!-- 导航 -->
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ModelInfo from "@/components/Shops/ModeInfo.vue";
import PopUp from "@/components/Shops/PopUp.vue";
import NavBar from "@/components/Shops/NavBar.vue";
export default {
  name: "shop",
  data() {
    return {
      // 商品信息
      shopdata: null,
      //商家信息弹窗显隐
      showInfoModel: false
    };
  },
  created() {
    this.shopdata = JSON.parse(localStorage.getItem("shopdata"));
  },
  components: {
    ModelInfo,
    PopUp,
    NavBar
  }
};
</script>

<style lang='scss' scoped>
.shop {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header-nav {
  position: relative;
}
.nav_bg img {
  width: 100%;
  height: 26.666667vw;
}
.nav_back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26.666667vw;
  background: rgba(0, 0, 0, 0.5);
}
.nav_back i {
  color: #fff;
  font-size: 1.3rem;
  margin-left: 1.333333vw;
  margin-top: 1.333333vw;
}
.shop_image {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -10vw;
  margin-top: 11vw;
}
.shop_image img {
  width: 20vw;
  height: 20vw;
  border-radius: 0.8vw;
}

.index-rst {
  padding: 8vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: inset 0 -0.666667vw 0.666667vw hsla;
}
.index-rst .rst-name {
  flex: 1;
  width: 72vw;
  font-size: 1.3rem;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 2.666667vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6vw 0;
}
.rst-name span {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

.index-rst .rst-order {
  white-space: nowrap;
  height: 3.2vw;
  margin-top: 1.733333vw;
  color: #666;
  text-align: center;
  font-size: 0.6rem;
}
.rst-order span {
  margin: 0 3px;
}
.index-rst .rst-promotion {
  width: 80vw;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2.266667vw auto 2.666667vw;
  padding: 0;
  white-space: nowrap;
}
</style>