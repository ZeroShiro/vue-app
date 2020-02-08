<template>
  <div class="area" ref="area_scroll">
    <div class="scroll_wrap">
      <div class="title">
        <div class="header">当前定位</div>
        <div class="des">
          <i class="fa fa-location-arrow"></i>
          <span>{{ city }}</span>
        </div>
      </div>
      <!-- 热门城市 -->
      <div class="hot_wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot_city">
          <li
            @click="$emit('selectCity',item.name)"
            v-for="(item,index) in cityInfo.hotCities"
            :key="index"
          >{{item.name}}</li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city_wrap">
        <!-- 循环按字母排序的key -->
        <div class="city_content citylist" v-for="(item,index) in keys" :key="index">
          <div class="title">{{item}}</div>
          <!-- 根据字母key展示城市名 -->
          <ul>
            <li
              @click="$emit('selectCity',city.name)"
              v-for="(city,index) in cityInfo.cities[item]"
              :key="index"
            >{{city.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area_keys">
      <ul>
        <li @click="selectKey(0)">#</li>
        <li @click="selectKey(index + 1)" v-for="(item , index) in keys" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    // 存放A-Z
    keys: Array,
    // 城市信息
    cityInfo: Object,
    // 当前城市
    city: String
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    // 使用better 防止超出屏幕
    initScroll() {
      this.scroll = new BScroll(this.$refs.area_scroll, {
        click: true
      });
    },
    //滚动 到对应dom
    selectKey(index) {
      let citylist = this.$refs.area_scroll.getElementsByClassName("citylist");
      let el = citylist[index];
      this.scroll.scrollToElement(el, 250);
    }
  }
};
</script>

<style lang="scss" scoped>
.area {
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  margin-top: 35px;
  height: calc(100% - 35px);
  .scroll_wrap {
    background: #fff;
    .title {
      width: 100%;
      .header {
        height: 15px;
        padding: 8px 12px;
        line-height: 15px;
        font-size: 13px;
        background-color: #eeeeee;
        color: #757575;
      }
      .des {
        color: #333;
        padding: 12px;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        i {
          margin-right: 5px;
        }
        span {
          display: inline-block;
          width: 90%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .hot_wrap {
      .title {
        color: #aaa;
        padding: 15px 0;
      }
      .hot_city {
        display: flex;
        flex-wrap: wrap;
        padding: 0 16px;
        li {
          padding: 10px;
          width: 30%;
          text-align: center;
          margin: 0 10px 10px 0;
          background: #f1f1f1;
          box-sizing: border-box;
        }
      }
    }
    .city_wrap {
      .city_content {
        .title {
          color: #999;
          padding: 10px 15px;
          background-color: #f1f1f1;
        }
        li {
          padding: 15px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
  .area_keys {
    position: fixed;
    right: 0;
    padding: 0 5px;
    top: 15%;
    text-align: center;
    color: #aaa;
    font-size: 12px;
    line-height: 1.4;
    li {
      padding: 1px 5px;
      // margin-top: 2px;
    }
  }
}
</style>