<template>
  <div class="city">
    <div class="input">
      <div class="input-box">
        <i class="fa fa-search"></i>
        <input type="text" v-model="city_val" placeholder="请输入地址" />
      </div>
    </div>
    <alphabet-box
      ref="alphabet"
      @selectCity="selectCity"
      :city="city"
      :cityInfo="cityInfo"
      :keys="keys"
      v-if="!city_val"
    ></alphabet-box>
    <div class="search_list" v-else>
      <ul>
        <li @click="selectCity(item)" v-for="(item,index) in searchList" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AlphabetBox from "@/components/City/Alphabet.vue";
export default {
  data() {
    return {
      //搜索值
      city_val: "",
      //全城市信息
      cityInfo: {},
      keys: [],
      // 全部城市
      allCityList: [],
      // 搜索显示城市
      searchList: []
    };
  },
  computed: {
    city() {
      return this.$route.params.city;
    }
  },
  watch: {
    city_val() {
      this.searchCity();
    }
  },
  created() {
    this.getCityInfo();
  },
  methods: {
    // 请求城市名称
    getCityInfo() {
      this.$axios.get(`/api/city`).then(res => {
        res = res.data;
        this.cityInfo = res.data;
        //A -- Z
        this.keys = Object.keys(res.data.cities);
        this.$refs.alphabet.initScroll();
        //保存全部城市
        for (let key in this.cityInfo.cities) {
          this.cityInfo.cities[key].forEach(city => {
            this.allCityList.push(city.name);
          });
        }
      });
    },
    //切换城市
    selectCity(item) {
      this.$router.push({ name: "address", params: { city: item } });
    },
    searchCity() {
      const self = this;
      if (this.city_val !== "") {
        this.searchList = this.allCityList.filter(item => {
          return item.indexOf(self.city_val) !== -1;
        });
        if (this.searchList.length == 0) {
          this.searchList = ["没有找到相关城市～"];
        }
        console.log(this.searchList);
      }
    }
  },
  components: {
    AlphabetBox
  }
};
</script>

<style lang="scss" scoped>
.city {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .input {
    position: fixed;
    width: 100%;
    padding: 5px;
    max-height: 35px;
    background-image: linear-gradient(-90deg, #276ace 0%, #29bdd9 100%);
    box-sizing: border-box;
    .input-box {
      width: 85%;
      font-size: 12px;
      margin: 0 auto;
      border: 1px solid #eee;
      border-radius: 15px;
      background-color: #fff;
      max-height: 23px;
      line-height: 23px;
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
      }
    }
  }
  .search_list {
    background: #fff;
    padding: 5px 16px;
    margin-top: 35px;
    li {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>