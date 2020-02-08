const data = {
  orderlist: []
};

export default {
  getOrder: () => {
    return data;
  },
  setOrder: config => {
    const { orderInfo, userAddress, totalPrice, shopData } = JSON.parse(
      config.body
    );
    data.orderlist.unshift({
      orderInfo: orderInfo,
      userAddress: userAddress,
      totalPrice: totalPrice,
      shopData: shopData,
      code: 200
    });
    return {
      code: 200,
      message: '成功'
    };
  }
};
