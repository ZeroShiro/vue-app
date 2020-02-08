<template>
  <div class="header" :class="{blue:blue ,isLeft:!isLeft}">
    <!-- 左侧返回 -->
    <div class="header-button is-left" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button v-if="!go" @click="$router.push(btn)">返回</button>
      <button v-if="go" @click="$router.go(-1)">返回</button>
    </div>
    <!-- 中间标题 -->
    <div class="header-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    // 返回按钮
    isLeft: {
      type: Boolean,
      default: false
    },
    btn: {
      type: String,
      default: "home"
    },
    go: {
      type: Boolean,
      default: false
    },
    blue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    city() {
      return this.$route.query.city;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
  color: #000;
  display: flex;
  height: 45px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  padding-right: 40px;
  top: 0;
  z-index: 99;
  &.blue {
    background-color: #009eef;
  }
  &.isLeft {
    padding: 0;
    margin: 0;
  }
  .header-button {
    button {
      background-color: transparent;
      border: 0;
      box-shadow: none;
      color: inherit;
      display: inline-block;
      padding: 0;
      font-size: inherit;
      outline: none;
    }
  }
  .header-title {
    flex: 1;
  }
  .is-left {
    text-align: left;
  }
}
</style>
