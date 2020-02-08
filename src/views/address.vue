<template>
  <div class="address">
    <box-header title="选择地址" isLeft />
    <div class="city_search">
      <div class="city-box" @click="$router.push({name:'city' , params: {city: city || appCity}})">
        <div class="city">{{ city || appCity }}</div>
        <div class="btn">
          <i class="fa fa-angle-down"></i>
        </div>
      </div>
      <div class="input-box">
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_val" placeholder="请输入地址" />
      </div>
    </div>
    <div class="title" v-show="!search_val">
      <div class="header">当前定位</div>
      <div class="des">
        <i class="fa fa-location-arrow"></i>
        <span>{{ address }}</span>
      </div>
    </div>
    <div class="area" v-show="search_val">
      <ul class="area_list" v-for="(item , index) in areaList" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import boxHeader from "@/components/Header.vue";
export default {
  data() {
    return {
      search_val: "",
      areaList: [],
      appCity: localStorage.getItem("city")
    };
  },
  components: {
    boxHeader
  },
  watch: {
    search_val(val) {
      if (val) {
        this.searchPlace();
      } else {
        this.areaList = [];
      }
    }
  },
  computed: {
    city() {
      return this.$route.params.city;
    },
    address() {
      return this.$store.getters.address;
    }
  },
  methods: {
    // 搜索显示城市列表
    searchPlace() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          self.areaList = result.tips.filter(item => {
            return item.adcode !== "";
          });
          // self.areaList = result.tips.map(item => {
          //   let p2 = [item.location.lng, item.location.lat];
          //   item.lnglat = p2;
          //   return item;
          // });
        });
      });
    },
    // 地址点击
    selectAddress(item) {
      //拼接名字
      const self = this;
      this.$store.dispatch(
        "setAddress",
        item.district + item.address + item.name
      );
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: item.adcode
        });

        var lnglat = [item.location.lng, item.location.lat];
        console.log(item);
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            let province = result.regeocode.addressComponent.province;
            let city = result.regeocode.addressComponent.city;
            console.log(city);
            self.$store.dispatch("setLocation", {
              addressComponent: {
                city: city || province
              }
            });
            self.$router.push({
              name: "home",
              params: {
                city: city || province
              }
            });
          } else {
            if (
              item.name.indexOf("省") !== -1 ||
              item.name.indexOf("市") !== -1
            ) {
              self.$store.dispatch("setLocation", {
                addressComponent: {
                  city: item.name
                }
              });
              self.$router.push({ name: "home", params: { city: item.name } });
            }
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
  border-top: 1px solid #eeeeee;
  .city_search {
    background-color: #fff;
    padding: 10px 10px;
    display: flex;
    .city-box {
      width: 25%;
      display: flex;
      justify-content: center;
      align-content: center;
      .city {
        padding: 8px 0px;
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        box-sizing: border-box;
      }
      .btn {
        padding: 8px 0px;
        margin-left: 3px;
      }
    }

    .input-box {
      width: 80%;
      border: 1px solid #eee;
      border-radius: 3px;
      padding: 4px 0px;
      background: #f1f1f1;
      max-height: 20px;
      line-height: 20px;
      i {
        color: #cccccc;
        margin-left: 10px;
        margin-right: 3px;
      }
      input {
        width: 80%;
        outline: none;
        border: none;
        padding: 2px;
        background: #f1f1f1;
      }
    }
  }
  .title {
    .header {
      height: 20px;
      padding: 10px 12px;
      line-height: 20px;
      font-size: 13px;
    }
    .header {
      color: #757575;
    }
    .des {
      color: #333;
      padding: 12px;
      background-color: #fff;
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
  .area {
    background-color: #fff;
    padding: 5px 10px;
    padding-bottom: 12px;
    .area_list {
      padding: 6px;
      margin-top: 5px;
      min-height: 30px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      h4 {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      p {
        font-size: 13px;
        color: #757575;
      }
    }
  }
}
</style>