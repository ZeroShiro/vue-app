<template>
  <div class="search">
    <!-- header -->
    <header-box :isLeft="true" title="搜索"></header-box>
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="key_word" placeholder="只能搜索-> '汉堡' (暂时没有接口信息)" />
        <button @click.prevent="searchHandle">搜索</button>
      </form>
    </div>
    <!-- 搜索内容为空 -->
    <div class="empty_wrap" v-if="empty">
      <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt />
      <div class="empty_txt">
        <h4>附近没有搜索结果</h4>
        <span>换个关键词试试吧</span>
      </div>
    </div>
    <!-- 搜索内容展示 -->
    <div class="shop" v-if="result && !empty && !showShop ">
      <div>
        <search-main @shopItemClick="$router.push({name:'shop'})" :data="result.restaurants"></search-main>
        <search-main @shopItemClick="shopItemClick" :data="result.words"></search-main>
      </div>
    </div>
    <!-- 点击后显示列表 -->
    <div class="container" v-if="showShop">
      <filter-view :filterData="filterData" @updata="updata"></filter-view>
      <div class="shopList" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading">
        <shop-list v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"></shop-list>
      </div>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
import HeaderBox from "@/components/Header.vue";
import SearchMain from "@/components/SearchShop/SearchMain.vue";
import filterView from "@/components/Home/FilterView.vue";
import ShopList from "@/components/Home/ShopList.vue";
export default {
  data() {
    return {
      key_word: "",
      // 美食信息
      result: null,
      // 找不到信息页面显隐
      empty: false,
      // 搜索商品显隐
      showShop: false,
      // home组件内容
      filterData: null,
      restaurants: [],
      page: 1,
      size: 5,
      loading: false,
      cont: 0
    };
  },
  watch: {
    key_word(item) {
      // console.log(item);
      // 自己接口使用
      this.empty = false;
      this.showShop = false;
      if (item == "汉堡") {
        this.keyWordChange();
      }
    }
  },
  created() {
    this.$axios("/api/profile/filter").then(res => {
      this.filterData = res.data;
    });
  },
  methods: {
    // 搜索内容发送请求
    keyWordChange() {
      this.$axios.get(`/api/profile/typeahead/`).then(res => {
        this.result = res.data;
      });
    },
    //搜索Btn
    searchHandle() {
      if (!this.key_word) return;
      // 搜索Btn
      if (
        this.result &&
        (this.result.restaurants.length > 0 || this.result.words.length)
      ) {
        this.shopItemClick();
      } else {
        console.log("sdf");
        this.empty = true;
      }
    },
    // 点击后商品信息展示
    shopItemClick() {
      this.cont = 0;
      this.restaurants = [];
      this.showShop = true;
    },
    //更新排序
    updata(condition) {
      console.log(condition);
      // this.shopItemClick();
      if (condition.condition == "distance") {
        this.shopItemClick();
        this.loadMore(true);
      } else if (condition.condition == "is_premium") {
        let ss = this.restaurants.filter(item => {
          return item.restaurant.is_premium;
        });
        this.restaurants = ss;
      } else {
        this.shopItemClick();
        this.loadMore();
      }
    },
    // 到底部发送请求
    loadMore(flag = false) {
      // this.page++;
      this.cont++;
      if (this.cont < 2) {
        this.$axios
          .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
          .then(res => {
            // this.restaurants = res.data;
            console.log(res);
            if (res.data.length > 0) {
              res.data.forEach(item => {
                this.restaurants.push(item);
              });
            } else {
              this.loading = true;
            }
          })
          .then(() => {
            if (flag) {
              let compare = function(obj1, obj2) {
                return obj1.restaurant.distance - obj2.restaurant.distance;
              };
              this.restaurants.sort(compare);
            }
          });
      }
    }
  },
  components: {
    HeaderBox,
    SearchMain,
    filterView,
    ShopList,
    InfiniteScroll
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .search_header {
    margin-top: 45px;
    background: #fff;
    padding: 0 4.266667vw;
    .search_wrap {
      padding: 2.933333vw 2.933333vw 2.933333vw 0;
      display: flex;
      align-items: center;
      position: relative;
      .fa-search {
        width: 2.933333vw;
        height: 2.933333vw;
        color: #888;
        position: absolute;
        top: 4.6666666vw;
        left: 2.933333vw;
      }
      input {
        flex-grow: 1;
        border-radius: 0.266667vw;
        background-color: #f8f8f8;
        padding: 1.733333vw 4vw 1.733333vw 8.8vw;
        color: #666;
        border: none;
        border-radius: 15px;
        outline: none;
      }
      button {
        outline: none;
        border: none;
        color: #333;
        font-size: 0.426667rem;
        background: #fff;
        font-weight: 700;
        margin-left: 2.933333vw;
        font-size: 14px;
      }
    }
  }
  .empty_wrap {
    width: 100%;
    height: calc(100% - 95px);
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: center;
    img {
      width: 35vw;
      height: 35vw;
    }
    .empty_txt {
      height: 131px;
      h4 {
        color: #666;
        font-size: 1rem;
        margin: 12vw 0 2vw 0;
      }
      span {
        color: #999;
        font-size: 0.8rem;
      }
    }
  }
  .shop {
    width: 100%;
    height: calc(100% - 95px);
    overflow: auto;
  }
  .container {
    .wrapper-box {
      top: 44px;
    }
  }
}
</style>
<style scoped>
.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}

.empty_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty_wrap img {
  width: 35vw;
  height: 35vw;
}
.empty_txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty_txt span {
  color: #999;
  font-size: 0.8rem;
}
</style>
