import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: 'home',
    component: () => import('@/views/index.vue'),
    children: [
      // {
      //   path: '',
      //   redirect: '/home'
      // },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'searchShop',
        name: 'searchShop',
        component: () => import('@/views/SearchShop.vue')
      },
      {
        path: 'myroom',
        name: 'myroom',
        component: () => import('@/views/Myroom.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/Order.vue')
      },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/address.vue')
      },
      {
        path: 'city',
        name: 'city',
        component: () => import('@/views/City.vue')
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/Shops/Shop.vue'),
        redirect: '/goods',
        children: [
          {
            path: '/goods',
            name: 'goods',
            component: () => import('@/views/Shops/Goods.vue')
          },
          {
            path: '/comments',
            name: 'comments',
            component: () => import('@/views/Shops/Comments.vue')
          },
          {
            path: '/seller',
            name: 'seller',
            component: () => import('@/views/Shops/Seller.vue')
          }
        ]
      },
      {
        path: '/myaddress',
        name: 'myaddress',
        component: () => import('@/views/Orders/MyAddress.vue')
      },
      {
        path: '/addaddress',
        name: 'addaddress',
        component: () => import('@/views/Orders/AddAddress.vue')
      },
      {
        path: '/settlement',
        name: 'settlement',
        component: () => import('@/components/Orders/Settlement.vue')
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('@/components/Orders/Pay.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
];

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

export default router;
