<template>
  <section class="index-container">
    <div class="index-shopInfo" v-if="restaurant" @click="oPush">
      <!-- 左 -->
      <div class="logo_container">
        <img :src="restaurant.image_path" alt />
      </div>
      <!-- 右 -->
      <div class="index_main">
        <!-- 第一行 品牌 -->
        <div class="index_shopname">
          <i v-if="restaurant.is_premium">品牌</i>
          <span>{{restaurant.name}}</span>
        </div>
        <!-- 第二行 星级 -->
        <div class="index-rateWrap">
          <div>
            <rating-box :rating="restaurant.rating"></rating-box>
            <span class="rate">{{restaurant.rating}}</span>
            <span>月售{{restaurant.recent_order_num}}单</span>
          </div>
          <div v-if="restaurant.delivery_mode.text" class="delivery">
            <span class="icon-hollow">{{restaurant.delivery_mode.text}}</span>
          </div>
        </div>

        <!-- 第三行 配送 -->
        <div class="index-moneylimit">
          <div>
            <span>¥{{restaurant.float_minimum_order_amount}}起送</span>
            |
            <span>配送费¥{{restaurant.float_delivery_fee}}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{(restaurant.distance / 1000).toFixed(2)}}km</span>
            |
            <span>{{restaurant.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RatingBox from "@/components/Rating.vue";
export default {
  props: {
    restaurant: Object
  },
  components: {
    RatingBox
  },
  methods: {
    oPush() {
      let data = JSON.stringify(this.restaurant);
      this.$router.push({ name: "goods" });
      localStorage.setItem("shopdata", data);
    }
  }
};
</script>


<style lang="scss" scoped>
.index-container {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
  font-size: 12px;
  .index-shopInfo {
    display: flex;
    justify-content: flex-start;
    padding: 0 2.666667vw;
    align-items: stretch;
    .logo_container .index_main {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      flex-direction: column;
      padding-left: 2.666667vw;
      flex-grow: 1;
    }
    .logo_container {
      width: 17.333333vw;
      height: 17.333333vw;
      img {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 0.133333vw solid rgba(0, 0, 0, 0.08);
        border-radius: 0.533333vw;
      }
    }
    .index_main {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      flex-direction: column;
      padding-left: 2.666667vw;
      flex-grow: 1;
      .index_shopname {
        align-items: center;
        color: #333;
        font-weight: 700;
        i {
          background: #ffe800;
          margin-right: 1.333333vw;
          padding: 0.266667vw 0.666667vw;
          text-align: center;
          white-space: nowrap;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .index-rateWrap {
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: space-between;
        .rate {
          margin-right: 1.066667vw;
        }
        .delivery {
          display: flex;
          align-items: center;
          margin-left: 1.066667vw;
        }
        .delivery .icon-hollow {
          color: #fff;
          background-color: #2395ff;
          padding: 2px;
          box-sizing: border-box;
        }
      }
      .index-moneylimit {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .index-distanceWrap {
          color: #999;
        }
      }
    }
  }
}
</style>
