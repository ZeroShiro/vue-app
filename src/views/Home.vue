<template>
  <div class="home" ref="open">
    <div class="header">
      <div class="address_map" @click="$router.push({name: 'address' , params: {city: city}})">
        <div class="map_top">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span>{{address}}</span>
        </div>
        <div class="ibtn">
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div
      class="search_wrap"
      :class="{fixedview:showFilter}"
      @click="$router.push({name:'searchShop'})"
    >
      <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
      <!-- 轮播图 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
          <img :src="img" alt />
        </mt-swipe-item>
      </mt-swipe>
      <!-- 图标菜单 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entry,i) in entries" :key="i" class="entry_wrap">
          <div class="entries-box" v-for="(item , index) in entry" :key="index">
            <div class="img-box">
              <img :src="item.image" alt />
            </div>
            <span>{{ item.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="shoplist-title shop_late">
      <div class="title">推荐商家</div>
      <div class="line"></div>
    </div>
    <!-- 导航 -->
    <filter-view :filterData="filterData" @searchFixed="showFilterView" @updata="updata"></filter-view>
    <!-- 商家列表 -->
    <mt-loadmore
      :bottom-method="loadMore"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      :bottomPullText="bottomPullText"
      ref="loadmore"
    >
      <div class="shopList">
        <shop-list v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"></shop-list>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Loadmore } from "mint-ui";
import filterView from "@/components/Home/FilterView.vue";
import ShopList from "@/components/Home/ShopList.vue";
export default {
  name: "home",
  data() {
    return {
      //轮播图
      swipeImgs: [],
      //轮播图标
      entries: [],
      //商家排序
      filterData: null,
      //导航fixed
      showFilter: false,
      //商家信息
      restaurants: [],
      //控制是否能再次刷新
      allLoaded: false,
      bottomPullText: "上拉加载更多",
      // 排序规则传递
      data: {},
      page: 1,
      size: 5
    };
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      const self = this;
      // 滑动组建数据
      this.$axios("/api/profile/shopping").then(res => {
        // console.log(res.data);
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios("/api/profile/filter").then(res => {
        this.filterData = res.data;
      });
      this.loadData();
    },
    // 列表滚动
    showFilterView(show) {
      let home = this.$refs.open;
      home.scrollTop = 345;
      // this.showFilter = show;
    },
    // 获取商家列表数据 下啦刷新
    loadData(flag = false) {
      // :top-method="loadData"
      this.page = 1;
      this.allLoaded = false;
      // this.bottomPullText = "上拉加载更多";
      this.$axios
        .post(`/api/profile/shopList/${this.page}/${this.size}`, this.data)
        .then(res => {
          this.$refs.loadmore.onTopLoaded();
          this.restaurants = res.data;
        })
        .then(() => {
          if (flag) {
            let compare = function(obj1, obj2) {
              return obj1.restaurant.distance - obj2.restaurant.distance;
            };
            this.restaurants.sort(compare);
          }
        });
    },
    loadMore() {
      // 判断是否全部完成加载
      if (!this.allLoaded) {
        // this.page++;

        // 拉取商家信息
        this.$axios
          .post(`/api/profile/shopList/${this.page}/${this.size}`)
          .then(res => {
            //  加载完之后重新渲染
            this.$refs.loadmore.onBottomLoaded();
            // 全部加载
            this.allLoaded = true;
            this.bottomPullText = "没有更多了哦";
            // if (res.data.length > 0) {
            //   res.data.forEach(item => {
            //     this.restaurants.push(item);
            //   });
            //   if (res.data < this.size) {
            //     this.allLoaded = true;
            //     this.bottomPullText = "没有更多了哦";
            //   }
            // } else {
            //   // 数据为空
            //   this.allLoaded = true;
            //   this.bottomPullText = "没有更多了哦";
            // }
          });
      }
    },
    // 排序并且更新数据
    updata(condition) {
      console.log(condition.condition);

      if (condition.condition == "distance") {
        this.loadData(true);
      } else if (condition.condition == "is_premium") {
        let ss = this.restaurants.filter(item => {
          return item.restaurant.is_premium;
        });
        this.restaurants = ss;
      } else {
        this.loadData();
      }
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Loadmore.name]: Loadmore,
    filterView,
    ShopList
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  transition: all 0.5s linear;
  .header {
    background-color: #009eef;
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    .address_map {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      color: #fff;
      .map_top {
        width: 90%;
        font-weight: bold;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        i {
          margin: 0 3px;
        }
      }
      .ibtn {
        width: 10%;
        i {
          font-size: 15px;
          margin: 0 10px;
          padding: 2px;
        }
      }
    }
  }
  .search_wrap {
    background-color: #009eef;
    padding: 8px 16px;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-sizing: border-box;
    .shop_search {
      width: 100%;
      background-color: #fff;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      color: #aaa;
    }
  }
  #container {
    .swiper {
      height: 100px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .entries {
      /deep/.mint-swipe-indicator.is-active {
        background-color: #009eef;
      }
      height: 47.2vw;
      width: 100%;
      background-color: #ffffff;
      text-align: center;
      overflow: hidden;
      .entries-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        float: left;
        width: 20%;
        margin-top: 2.933333vw;
        box-sizing: border-box;
        img {
          width: 12vw;
          height: 12vw;
        }
        span {
          font-size: 12px;
          display: block;
          color: #666;
        }
        &:after {
          content: "";
          clear: both;
          display: block;
          visibility: hidden;
        }
      }
    }
  }
  .shoplist-title {
    position: relative;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    .line {
      height: 1px;
      background-color: #999;
      width: 120px;
    }
    .title {
      position: absolute;
      text-align: center;
      width: 98px;
      background-color: #fff;
    }
  }
  .fixedview {
    width: 100%;
    position: fixed;
    top: 0px;
    z-index: 1000;
  }
  .mint-loadmore {
    height: calc(100% - 91px);
    overflow: auto;
  }
}
</style>