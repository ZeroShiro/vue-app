<template>
  <div :class="{'open':isSort || isScreen}" class="wrapper-box" @click.self="hideView">
    <div v-if="filterData" class="filter_wrap">
      <!-- 导航 -->
      <aside class="filter">
        <div
          class="filter-nav"
          v-for="(item,index) in filterData.navTab"
          :key="index"
          :class="{bold :current == index}"
          @click="fiterSort(index)"
        >
          <span>{{item.name}}</span>
          <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
        </div>
      </aside>
      <!-- 列表内容 -->
      <section class="filter_extend" v-if="isSort">
        <ul>
          <li
            v-for="(item , index) in filterData.sortBy"
            :key="index"
            @click="selectSort(item ,index)"
            class="sortBy"
          >
            <span :class="{selectName:currentSort == index}">{{ item.name }}</span>
            <i class="fa fa-check" v-show="currentSort == index" />
          </li>
        </ul>
      </section>
      <!-- 筛选 -->
      <section class="filter_extend" v-if="isScreen">
        <div class="filter-sort">
          <div class="morefilter" v-for="(screen , index) in filterData.screenBy" :key="index">
            <p>{{ screen.title }}</p>
            <ul>
              <li
                v-for="(item , i) in screen.data"
                :class="{selectName:item.select}"
                :key="i"
                @click="selectScreen(item,screen)"
              >
                <div>
                  <img v-if="item.icon" :src="item.icon" alt />
                </div>
                <div>
                  <span>{{item.name}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- btn -->
        <div class="morefilter-btn" v-if="isScreen">
          <span @click="clearScreen" :class="{edit:edit}" class="morefilter-clear">清空</span>
          <span @click="fiterOk" class="morefilter-ok">确定</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterData: Object
  },
  data() {
    return {
      //列表加粗
      current: undefined,
      //显示蒙层
      isSort: false,
      //筛选active
      isScreen: false,
      //列表active区域
      currentSort: 0,
      //清空active
      edit: false
    };
  },
  methods: {
    // header功能
    fiterSort(i) {
      this.current = i;
      switch (i) {
        case 0:
          this.$emit("searchFixed", true);
          this.isSort = true;
          break;
        case 1:
          this.$emit("updata", {
            condition: this.filterData.navTab[1].condition
          });
          break;
        case 2:
          this.$emit("updata", {
            condition: this.filterData.navTab[2].condition
          });
          break;
        case 3:
          this.isScreen = true;
          this.isSort = false;
          this.$emit("searchFixed", true);
          break;
        default:
          break;
      }
    },
    // 关闭所有朦层
    hideView() {
      this.isSort = false;
      this.isScreen = false;
      this.$emit("searchFixed", false);
    },
    // 综合列表筛选选项
    selectSort(item, index) {
      this.currentSort = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hideView();
      // 更新数据
      this.$emit("updata", { condition: item.code });
    },
    // 控制点击 单选多选
    selectScreen(item, screen) {
      if (screen.id !== "MPI") {
        // 单选
        screen.data.forEach(ele => {
          ele.select = false;
        });
      }
      // 根据data中select 控制active
      item.select = !item.select;
    },
    // 清空btn
    clearScreen() {
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          item.select = false;
        });
      });
      this.hideView();
    },
    // 完成btn
    fiterOk() {
      // 发送过滤规则主对象
      let screenData = {
        MPI: "",
        offer: "",
        per: ""
      };
      // 后端过滤规则
      let mpiStr = "";
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          if (item.select) {
            if (screen.id !== "MPI") {
              // 单选
            } else {
              mpiStr += item.code + ",";
              screenData[screen.id] = mpiStr;
            }
          }
        });
      });
      //更新
      this.$emit("updata", { condition: screenData });
      this.hideView();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-box {
  position: sticky;
  top: 50px;
  height: 41px;
  overflow: hidden;
  width: 100%;
}
.filter_wrap {
  background: #fff;
  width: 100%;
  position: relative;
  z-index: 100;
  .filter {
    border-bottom: 1px solid #ddd;
    line-height: 10.4vw;
    z-index: 101;
    height: 10.666667vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    .filter-nav {
      text-align: center;
      color: #666;
      font-size: 12px;
      align-self: center;
      &.bold {
        font-weight: bold;
        color: #000;
      }
      i {
        width: 1.6vw;
        height: 0.8vw;
        margin-left: 1.333333vw;
        margin-bottom: 0.533333vw;
        fill: #333;
        will-change: transform;
      }
    }
  }
  .filter_extend {
    background-color: #fff;
    color: #333;
    padding-top: 2.133333vw;
    position: absolute;
    width: 100%;
    z-index: 4;
    left: 0;
    top: 6.2vh;
    .sortBy {
      position: relative;
      padding-left: 5.333333vw;
      line-height: 10.666667vw;
      overflow: hidden;
    }
    .fa-check {
      float: right;
      color: #009eef;
      margin-right: 3.733333vw;
      line-height: 10.666667vw;
    }
    .selectName {
      background-color: #9aceff !important;
    }
    .filter-sort {
      .morefilter {
        width: 100%;
        padding-bottom: 12px;
        box-sizing: border-box;
        p {
          font-size: 12px;
          padding: 8px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 5px 10px;
        }
        li {
          display: flex;
          width: 31%;
          height: 10vw;
          line-height: 10vw;
          margin: 0.8vw 1%;
          background: #fafafa;
          justify-content: center;
          img {
            width: 3.466667vw;
            height: 3.466667vw;
            vertical-align: middle;
            margin-right: 0.8vw;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
  }
  .morefilter-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
    line-height: 11.466667vw;
    box-sizing: border-box;
    .morefilter-clear {
      color: #ddd;
      background: #fff;
    }
    .morefilter-ok {
      color: #fff;
      background-color: #009eef;
      border: 0.133333vw solid #009eef;
    }
    span {
      font-size: 0.826667rem;
      text-align: center;
      text-decoration: none;
      flex: 1;
    }
    .edit {
      color: #333 !important;
    }
  }
}

.open {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}
</style>
