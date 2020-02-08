const types = {
  SET_LOCATION: 'SET_LOCATION',
  SET_ADDRESS: 'SET_ADDRESS',
  ORDER_INFO: 'ORDER_INFO',
  USER_ADDRESS: 'USER_ADDRESS'
};
export default {
  state: {
    location: {},
    address: '正在获取位置...',
    orderInfo: null,
    userAddress: null
  },
  getters: {
    location: state => state.location,
    address: state => state.address,
    showBar: state => state.showBar,
    orderInfo: state => state.orderInfo,
    userAddress: state => state.userAddress,
    totalPrice: state => {
      let price = 0;
      if (state.orderInfo) {
        const selectFoods = state.orderInfo.selectFoods;
        selectFoods.forEach(food => {
          price += food.activity.fixed_price * food.count;
        });
        price += state.orderInfo.shopInfo.float_delivery_fee;
      }
      return price.toFixed(2);
    }
  },
  mutations: {
    [types.SET_LOCATION](state, location) {
      if (location) {
        state.location = location;
      } else {
        state.location = null;
      }
    },
    [types.SET_ADDRESS](state, address) {
      if (address) {
        state.address = address;
      } else {
        state.address = '';
      }
    },
    [types.ORDER_INFO](state, orderInfo) {
      if (orderInfo) {
        state.orderInfo = orderInfo;
      } else {
        state.orderInfo = nulll;
      }
    },
    [types.USER_ADDRESS](state, userAddress) {
      if (userAddress) {
        state.userAddress = userAddress;
      } else {
        state.userAddress = null;
      }
    }
  },
  actions: {
    setLocation: ({ commit }, location) => {
      commit(types.SET_LOCATION, location);
    },
    setAddress: ({ commit }, address) => {
      commit(types.SET_ADDRESS, address);
    },
    setOrderInfo: ({ commit }, orderInfo) => {
      commit(types.ORDER_INFO, orderInfo);
    },
    setUserAddress: ({ commit }, userAddress) => {
      commit(types.USER_ADDRESS, userAddress);
    }
  }
};
