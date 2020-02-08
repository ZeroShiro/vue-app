<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="login img" />
    </div>
    <!-- 手机号输入框 -->
    <input-group
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
      @input="phone == ''? errors = {}: ''"
    ></input-group>
    <!-- 验证码 -->
    <input-group type="number" v-model="verifyCode" placeholder="验证码" :errors="errors.code"></input-group>
    <!-- 协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/Login/InputGroup.vue";
export default {
  name: "login",
  data() {
    return {
      phone: "18855552222",
      verifyCode: "000000",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  computed: {
    isClick() {
      if (this.phone && this.verifyCode) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // 获得验证码
    getVerifyCode() {
      if (this.validatePhone()) {
        // 发送请求
        this.validateBtn();
        // this.$axios
        //   .post("/api", {
        //     sid: "d60267f2b2c5102305c4d1802f1ce150",
        //     token: "0c96f2e0cc59c53f71a0e6fc76d763df",
        //     appid: "ebff90436c1c46a99ab91c94c6c1a6ff",
        //     templateid: "523934",
        //     mobile: "18855721573"
        //   })
        //   .then(res => {
        //     console.log(res);
        //   });
      }
    },
    // 验证手机号
    validatePhone() {
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请输入正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    // 验证码按钮
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    handleLogin() {
      this.errors = {};
      // 登陆验证是否正确
      // this.$axios
      //   .post("/api", {
      //     phone: this.phone,
      //     code: this.verifyCode
      //   })
      //   .then(res => {
      //     // 成功 设置登陆状态
      //     localStorage.setItem("isLogin", true);
      //     this.$router.push("/");
      //   })
      //   .catch(err => {
      //     // 错误 设置错误信息
      //     this.errors = {
      //       code: err.response.data.msg
      //     };
      //   });
      localStorage.setItem("isLogin", "5cd437fef7a6970017c415fe");
      this.$router.push({ name: "Index" });
    }
  },
  components: {
    InputGroup
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  .logo {
    text-align: center;
    img {
      width: 150px;
      background-position: center;
    }
  }
  .text_group,
  .login_des,
  .login_btn {
    margin-top: 20px;
    button {
      width: 100%;
      height: 40px;
      background-color: #48ca38;
      border-radius: 4px;
      color: white;
      font-size: 14px;
      border: none;
      outline: none;
    }
    button[disabled] {
      background-color: #8bda81;
    }
  }
  .login_des {
    color: #aaa;
    line-height: 22px;
    span {
      color: #4d90fe;
    }
  }
}
</style>