// import Mock from 'mockjs';
import city from './city.js';
import searchFood from './searchFood.js';
import swipe from './swipe.js';
import filter from './filter.js';
import shopList from './shopList.js';
import shopInfo from './shopInfo.js';
import comments from './comments.js';
import seller from './seller.js';
import address from './address.js';
import addOder from './addOrder.js';
//设置请求延时
Mock.setup({
  timeout: '100-200'
});
// 城市列表
Mock.mock(/\/api\/city/, 'get', city.getCity);
// 搜索食物列表
Mock.mock(/\/api\/profile\/typeahead/, 'get', searchFood.getSearchFood);

// 滑动组件
Mock.mock(/\/api\/profile\/shopping/, 'get', swipe.getSwipe);

// 筛选组件
Mock.mock(/\/api\/profile\/filter/, 'get', filter.getFilter);

// home商品列表组件
Mock.mock(/\/api\/profile\/shopList/, 'post', shopList.getShopInfo);

//goods商品详情列表
Mock.mock(/\/api\/profile\/shopInfo/, 'get', shopInfo.getShopInfo);

// comments评价列表
Mock.mock(/\/api\/profile\/comments/, 'get', comments.getComments);
// 商家历史
Mock.mock(/\/api\/profile\/seller/, 'get', seller.getSeller);

// 用户mock地址相关
Mock.mock(/\/mockapi\/user\/user_info/, 'get', address.getAddressList);
Mock.mock(/\/mockapi\/user\/add_address/, 'post', address.addList);
Mock.mock(/\/mockapi\/user\/edit_address/, 'post', address.editList);
Mock.mock(/\/mockapi\/user\/del_info/, 'get', address.delList);

// 订单相关
Mock.mock(/\/api\/user\/orders/, 'get', addOder.getOrder);
Mock.mock(/\/api\/user\/add_order/, 'post', addOder.setOrder);
