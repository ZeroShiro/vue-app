<template>
  <div class="addAddress">
    <Header :isLeft="true" :title="title" go />
    <!-- 添加地址 -->
    <div class="viewbody" v-if="title">
      <div class="content">
        <FormBlock label="联系人:" placeholder="输入姓名" v-model="addressInfo.name" />
        <div class="formblock">
          <div class="label-wrap"></div>
          <TabTag :tags="sexes" @checkTag="checkTagSex" :selectTag="addressInfo.sex"></TabTag>
        </div>
        <FormBlock label="电话:" placeholder="输入手机号码" v-model="addressInfo.phone" />
        <FormBlock
          label="地址:"
          @click="showSearch = true"
          v-model="addressInfo.address"
          placeholder="小区/写字楼/学校等"
          icon="angle-right"
        />
        <FormBlock
          label="门牌号:"
          placeholder="详细地址"
          textarea="textarea"
          icon="edit"
          v-model="addressInfo.bottom"
        />
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <TabTag :tags="tags" @checkTag="checkTag" :selectTag="addressInfo.tag"></TabTag>
        </div>
        <!-- 提交btn -->
        <button class="saveBtn" @click="handleSave">确定</button>
      </div>
    </div>
    <!-- 搜索地址 -->
    <add-search :showSearch="showSearch" @close="showSearch = false" :addressInfo="addressInfo"></add-search>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import FormBlock from "@/components/Orders/FormBlock.vue";
import TabTag from "@/components/Orders/TabTag.vue";
import addSearch from "@/components/Orders/AddressSearch.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      title: "",
      tags: ["家", "学校", "公司"],
      sexes: ["先生", "女士"],
      // 所有input输入框内容(地址信息)
      addressInfo: {},
      // 显示搜索列表
      showSearch: false
    };
  },
  watch: {
    // 没有传递title 跳转myaddress
    title(val) {
      if (!val) {
        this.$router.push("myaddress");
      }
    }
  },
  // 从路由中获取地址数据
  beforeRouteEnter(to, from, next) {
    // ...
    next(vm => {
      // 地址信息
      vm.addressInfo = to.params.addressInfo;
      // header 信息
      vm.title = to.params.title;
    });
  },
  methods: {
    //控制活动标签
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    checkTagSex(item) {
      this.addressInfo.sex = item;
    },
    // 验证数据 并保存
    handleSave() {
      if (!this.addressInfo.name) {
        this.showMsg("请输入联系人");
        return;
      }

      if (!this.addressInfo.phone) {
        this.showMsg("请输入手机号");
        return;
      } else if (this.addressInfo.phone.length == 10) {
        this.showMsg("请输入正确手机号");
        return;
      }
      if (!this.addressInfo.address) {
        this.showMsg("请输入收货地址");
        return;
      }

      // 存储数据
      if (this.title == "添加地址") {
        this.addAddress();
      } else {
        this.editAddress();
      }
    },
    // 提示信息
    showMsg(msg) {
      Toast({
        message: msg,
        position: "bottom",
        direction: 2000
      });
    },
    // 调用新增地址api
    addAddress() {
      this.$axios
        .post(`/mockapi/user/add_address/`, this.addressInfo)
        .then(res => {
          this.$store.dispatch("setUserAddress", this.addressInfo);
          this.$router.push({ name: "myaddress" });
        })
        .catch(err => console.log(err));
    },
    // 调用编辑地址api
    editAddress() {
      this.$axios
        .post(`/mockapi/user/edit_address/`, this.addressInfo)
        .then(res => {
          this.$router.push("/myAddress");
        });
    }
  },
  components: {
    Header,
    FormBlock,
    TabTag,
    addSearch
  }
};
</script>

<style lang="scss" scoped>
.addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  .viewbody {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    background-color: #f5f5f5;
    .content {
      background: #fff;
      font-size: 0.94rem;
      height: 96%;
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      .saveBtn {
        width: 100%;
        margin-top: 20px;
        background: #00d762;
        outline: none;
        border: none;
        line-height: 5vh;
        border-radius: 15px;
        color: #fff;
        font-size: 0.94rem;
      }
    }
  }
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>