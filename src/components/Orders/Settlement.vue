<template>
  <div class="settlement">
    <Header isLeft title="确认订单" btn="goods" blue></Header>

    <div class="view-body" v-if="orderInfo">
      <div>
        <!-- 收货地址 -->
        <section class="cart-address">
          <p class="title">
            订单配送至
            <span class="address-tag" v-if="userAddress && userAddress.tag">{{userAddress.tag}}</span>
          </p>
          <p class="address-detail">
            <span @click="toRouter" v-if="userAddress">{{userAddress.address}}{{userAddress.bottom}}</span>
            <span v-else>
              <span v-if="haveAddress" @click="toRouter">{{showAddress}}</span>
              <span v-else @click="addAddress">{{showAddress}}</span>
            </span>
            <i class="fa fa-angle-right"></i>
          </p>
          <h2 v-if="userAddress" class="address-name">
            <span>{{userAddress.name}}</span>
            <span v-if="userAddress.sex">({{userAddress.sex}})</span>
            <span class="phone">{{userAddress.phone}}</span>
          </h2>
        </section>
        <!-- 送达时间 支付 -->
        <Delivery v-if="orderInfo" :shopInfo="orderInfo.shopInfo"></Delivery>
        <!-- 点餐信息 -->
        <CartGroup :orderInfo="orderInfo" :totalPrice="totalPrice"></CartGroup>

        <!-- 备注信息 -->
        <section class="checkout-section">
          <CartItem title="餐具份数" :subHead="'未选择'" />
          <CartItem title="订单备注" :subHead="'口味 偏好'" />
          <CartItem title="发票信息" subHead="不需要开发票" />
        </section>

        <!-- 底部 -->
        <footer class="action-bar">
          <span>¥{{totalPrice}}</span>
          <button @click="handlePay()">去支付</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Delivery from "@/components/Orders/Delivery.vue";
import CartGroup from "@/components/Orders/CartGroup.vue";
import CartItem from "@/components/Orders/CartItem.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // 判断有没有收货地址
      haveAddress: false,
      showAddress: "",
      shopname: null
    };
  },
  computed: {
    userAddress() {
      return this.$store.getters.userAddress;
    },
    // 商品数据
    orderInfo() {
      return this.$store.getters.orderInfo;
    },
    // 总价格
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    toRouter() {
      this.$router.push({ name: "myaddress", params: { settlement: true } });
    },
    // 添加地址跳转
    addAddress() {
      this.$router.push({
        name: "addaddress",
        params: {
          title: "添加地址",
          addressInfo: {
            name: "",
            sex: "",
            phone: "",
            address: "",
            bottom: "",
            tag: ""
          }
        }
      });
    },
    // 获取数据
    getData() {
      this.$axios(`/mockapi/user/user_info/`).then(res => {
        res = res.data;
        if (res.data.myAddress.length > 0) {
          this.haveAddress = true;
          this.showAddress = "选择收货地址";
        } else {
          this.haveAddress = false;
          this.showAddress = "新增收货地址";
        }
      });
    },
    handlePay() {
      if (!this.userAddress) {
        Toast({
          message: "请选泽收货地址",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.$router.push({
        name: "pay"
      });
    }
  },
  components: {
    Header,
    Delivery,
    CartGroup,
    CartItem
  }
};
</script>

<style lang="scss" scoped>
.settlement {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 44px;
}

.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #333;
  padding-bottom: 14.133333vw;
  padding-left: 1.6vw;
  padding-right: 1.6vw;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #009eef, #009eef);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.cart-address {
  background-color: transparent;
  padding: 4.266667vw 2.133333vw 2.933333vw 2.133333vw;
  min-height: 22.133333vw;
  color: #fff;
  overflow: hidden;
}
.cart-address .title {
  font-size: 0.9rem;
  line-height: 1.21;
  color: hsla(0, 0%, 100%, 0.8);
}
.cart-address .address-detail {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.88;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.address-detail > span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 4vw);
}
.address-detail > i {
  margin-left: 2.133333vw;
}

/* 显示送货地址 */
.address-name {
  font-size: 0.86rem;
  line-height: 1.21;
  margin-bottom: 1.333333vw;
}
.address-name .phone {
  margin-left: 2.133333vw;
}
.address-tag {
  border: 1px solid hsla(0, 0%, 100%, 0.8);
  margin-left: 1.6vw;
  display: inline-block;
  padding: 0.533333vw;
  white-space: nowrap;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}

.checkout-section {
  margin-bottom: 2.133333vw;
  padding: 0 5.333333vw;
  background: #fff;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
}

/* 底部支付样式 */
.action-bar {
  height: 11.733333vw;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #3c3c3c;
  z-index: 2;
}
.action-bar > span {
  color: #fff;
  font-size: 1.2rem;
  line-height: 11.733333vw;
  padding-left: 2.666667vw;
  vertical-align: middle;
}
.action-bar > button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: #00e067;
  min-width: 28vw;
  padding: 0 1.333333vw;
  border: none;
  color: #fff;
  font-size: 1.2rem;
}
</style>