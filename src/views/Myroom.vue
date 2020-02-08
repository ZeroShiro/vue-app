<template>
  <div class="me">
    <div class="headInfo">
      <div class="head-img"></div>
      <div class="head-profile">
        <p class="user-id" v-if="userInfo">{{userInfo._id}}</p>
        <p v-else class="user-id" @click="handleLogin">登录/注册</p>
        <p class="user-phone">
          <i class="fa fa-mobile"></i>
          <span v-if="userInfo">{{encryptPhone(userInfo.phone)}}</span>
          <span v-else>登录后享受更多特权</span>
        </p>
      </div>
      <i class="fa fa-angle-right"></i>
    </div>
    <div v-if="userInfo">
      <div class="address-cell">
        <i class="fa fa-map-marker"></i>
        <div class="address-index" @click="myAddress">
          <span>我的地址</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <button @click="handleLogin" class="loginOut-btn">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    handleLogin() {
      localStorage.removeItem("isLogin");
      this.$router.push("/login");
    },
    // 获取数据
    getdata() {
      // const user_id = localStorage.getItem("isLogin");
      this.$axios(`/mockapi/user/user_info/`).then(res => {
        res = res.data;
        this.userInfo = res.data;
      });
    },
    //隐藏部分号码
    encryptPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    myAddress() {
      this.$router.push("/myaddress");
    }
  }
};
</script>

<style lang="scss" scoped>
.me {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .headInfo {
    display: flex;
    background-image: linear-gradient(90deg, #0af, #0085ff);
    padding: 6.666667vw 4vw;
    color: #fff;
    align-items: center;
    i {
      font-size: 1.2rem;
    }
  }
  .head-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-position: 0px 0px;
    background-size: 60px;
    background-image: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
  }
  .head-profile {
    overflow: hidden;
    margin-left: 4.8vw;
    flex-grow: 1;
    .user-id {
      max-width: 40vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1.3rem;
      margin-bottom: 2.133333vw;
      font-weight: 700;
      display: flex;
      align-items: center;
    }
    .user-phone {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      i {
        margin-right: 0.666667vw;
        font-size: 1rem;
      }
    }
  }
  .address-cell {
    margin-top: 2.666667vw;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 1rem;
    line-height: 4.533333vw;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 6.666667vw;
    color: #333;
    i {
      font-size: 1.3rem;
      color: rgb(74, 165, 240);
      margin-right: 2.666667vw;
    }
    .address-index {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 3.733333vw 2.666667vw 3.733333vw 0;
      align-content: center;
      i {
        font-size: 1.3rem;
        color: #ccc;
      }
    }
  }
  .loginOut-btn {
    display: block;
    width: 100%;
    text-align: center;
    padding: 3.733333vw 0;
    margin: 5.333333vw 0;
    color: #ff5339;
    border-radius: 0.8vw;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    border: 0;
  }
}
</style>