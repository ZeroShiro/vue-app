<template>
  <div id="app">
    <div v-if="flag">
      <router-view />
    </div>
    <div v-else>
      <h2 style="font-size:18px;">请使用移动端打开页面</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      flag: false
    };
  },
  created() {
    if (!this.isMobile()) {
      alert("请使用移动端打开页面");
      return;
    } else {
      this.flag = true;
      this.getLocation();
    }
  },
  computed: {
    info() {
      return this.$store.state.site.location;
    }
  },
  methods: {
    // 判断移动端
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    // 移动端定位
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // 距离 lng lat
          // let getGT = [data.position.lng, data.position.lat];
          // self.$store.dispatch("setLocation", {
          //   addressComponent: {
          //     city: data.addressComponent.city,
          //     province: data.addressComponent.province,
          //     formattedAddress: data.formattedAddress
          //   },
          //   lnglat: getGT
          // });
          self.$store.dispatch("setLocation", data);
          self.$store.dispatch("setAddress", data.formattedAddress);
        }

        function onError(data) {
          // 定位出错    使用ip定位可能有误
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      const self = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // console.log(result);
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  localStorage.setItem("city", result.city);
                  self.$store.dispatch("setLocation", {
                    addressComponent: {
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress,
                    lnglat: lnglat
                  });
                  self.$store.dispatch(
                    "setAddress",
                    data.regeocode.formattedAddress
                  );
                }
              });
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f1f1f1;
}
</style>