// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';
//reset css
import '@/assets/css/reset.scss';
//mint-ui
import { Indicator } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';

//mock
import './mock';

Vue.use(InfiniteScroll);

Vue.prototype.$axios = axios;

axios.interceptors.request.use(
  config => {
    // 加载动画
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
