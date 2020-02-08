<template>
  <div class="index" :class="{show:show}">
    <router-view></router-view>
    <tab-bar :data="tabBarData" v-if="show"></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "index",
  data() {
    return {
      tabBarData: [
        { title: "首页", icon: "home", path: "/home" },
        { title: "订单", icon: "book", path: "/order" },
        { title: "我的", icon: "user", path: "/myroom" }
      ],
      menuScroll: {}
    };
  },
  components: {
    TabBar
  },
  computed: {
    show() {
      let path = ["home", "order", "myroom"];
      if (path.includes(this.$route.name)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  &.show {
    height: calc(100% - 45px);
  }
}
</style>