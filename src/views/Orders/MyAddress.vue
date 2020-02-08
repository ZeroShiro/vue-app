<template>
  <div class="myAddress">
    <Header :isLeft="isLeft" :title="title" :btn="btn" />

    <!-- 显示收货地址 -->
    <div class="address-view">
      <div v-for="(address,index) in allAddress" :key="index">
        <div class="address-card" v-if="address.name">
          <div class="address-card-select">
            <i class="fa fa-check-circle" v-if="selectIndex == index"></i>
          </div>

          <div class="address-card-body" @click="setAddressInfo(address,index)">
            <p class="address-card-title">
              <span class="username">{{address.name}}</span>
              <span v-if="address.sex" class="gender">{{address.sex}}</span>
              <span class="phone">{{address.phone}}</span>
            </p>
            <p class="address-card-address">
              <span class="tag" v-if="address.tag">{{address.tag}}</span>
              <span class="address-text">{{address.address}}</span>
            </p>
          </div>
          <div class="address-card-edit">
            <i @click="handleEdit(address)" class="fa fa-edit"></i>
            <i @click="handleDelete(address,index)" class="fa fa-close"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增收货地址 -->
    <div class="address-view-bottom" @click="addAddress">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  data() {
    return {
      title: "我的地址",
      // 用户的全部地址数据
      allAddress: null,
      // 控制使用地址Icon显示
      selectIndex: 0
    };
  },
  components: {
    Header
  },
  computed: {
    // 控制返回按钮
    isLeft() {
      if (this.$route.params.settlement) {
        return false;
      } else {
        return true;
      }
    },
    btn() {
      let flag = JSON.parse(localStorage.getItem("toRouter"));
      if (flag) {
        return "settlement";
      } else {
        return "myroom";
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // ... 设置跳转路由
    if (from.name == "myroom") {
      next(vm => {
        localStorage.setItem("toRouter", false);
      });
    } else if (from.name == "settlement") {
      next(vm => {
        localStorage.setItem("toRouter", true);
      });
    }
    next();
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取我的地址数据
    getData() {
      this.$axios(`/mockapi/user/user_info/${localStorage.isLogin}`).then(
        res => {
          res = res.data;
          this.allAddress = res.data.myAddress;
        }
      );
    },
    // 新增地址 跳转路由 传递空数据
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
    // address为getData获取
    // 编辑当前地址 跳转路由 传递已有数据
    handleEdit(address) {
      this.$router.push({
        name: "addaddress",
        params: {
          title: "编辑地址",
          addressInfo: address
        }
      });
    },
    // 删除地址api
    handleDelete(address, index) {
      console.log(address._id);
      this.$axios
        .get(`/mockapi/user/del_info/`, {
          params: {
            id: address._id
          }
        })
        .then(res => {
          this.allAddress.splice(index, 1);
        })
        .then(res => {
          this.$store.dispatch("setUserAddress");
        });
    },
    //设置index 保存用户地址
    setAddressInfo(address, index) {
      this.selectIndex = index;
      this.$store.dispatch("setUserAddress", address);
      let flag = JSON.parse(localStorage.getItem("toRouter"));
      if (flag) {
        this.$router.push("/settlement");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.myAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  .address-view-bottom {
    position: fixed;
    height: 43px;
    bottom: 0;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.266667vw solid #ddd;
    color: #3190e8;
    font-size: 1rem;
    i {
      font-size: 1.3rem;
      margin-right: 8px;
    }
  }
}
.address-view {
  height: calc(100% - 89px);
  overflow-y: auto;
  padding-bottom: 13.866667vw;
}
.address-card {
  background-color: #fff;
  padding: 4vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  min-height: 18.133333vw;
}
.address-card-body {
  flex: 1;
  overflow: hidden;
  align-self: center;
}
.address-card-title {
  font-size: 1rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1.066667vw;
}
.address-card-title .username {
  color: #333;
  font-weight: 700;
}
.address-card-title .gender {
  padding: 0 1.6vw 0 0.8vw;
}
.address-card-address {
  color: #666;
  font-size: 0.84rem;
  display: flex;
  align-items: center;
}
.address-card-address .tag {
  display: inline-block;
  position: relative;
  margin-right: 0.8vw;
  padding: 0.533333vw;
  color: #ff5722;
  white-space: nowrap;
  border: 1px solid #ff5722;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}
.address-text {
  line-height: 4.533333vw;
}

/* 编辑和删除 */
.address-card-edit {
  flex-basis: 13.066667vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.address-card-edit > i {
  color: #aaa;
  font-size: 1.2rem;
}

/*  选中图标 */
.address-card-select {
  flex-basis: 7.333333vw;
  min-width: 7.333333vw;
  display: flex;
  align-items: center;
}
.address-card-select > i {
  font-size: 1.5rem;
  color: #4cd964;
}
</style>