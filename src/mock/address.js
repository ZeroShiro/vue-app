// 处理url
// import Mock from 'mockjs';
function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
// 数据列表
let data = {
  _id: '5cd437fef7a6970017c415fe',
  phone: '18011112222',
  myAddress: [
    {
      _id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      sex: '先生',
      phone: '18011112222',
      address: Mock.mock('@county(true)'),
      bottom: '',
      tag: '公司'
    }
  ]
};
export default {
  //获取全部数据
  getAddressList: config => {
    return {
      data
    };
  },
  // 新增数据
  addList: config => {
    const { name, sex, phone, address, bottom, tag } = JSON.parse(config.body);
    data.myAddress.unshift({
      _id: Mock.Random.guid(),
      name: name,
      sex: sex,
      phone: phone,
      address: address,
      bottom: bottom,
      tag: tag
    });
    return {
      code: 200,
      message: '成功'
    };
  },
  //编辑数据
  editList: config => {
    const { name, sex, phone, address, bottom, tag, _id } = JSON.parse(
      config.body
    );
    data.myAddress.some(item => {
      if (item._id == _id) {
        item.name = name;
        item.sex = sex;
        item.phone = phone;
        item.address = address;
        item.bottom = bottom;
        item.tag = tag;
        return true;
      }
    });
    return {
      code: 200,
      message: '成功'
    };
  },
  //删除数据
  delList: config => {
    const { id } = param2Obj(config.url);
    data.myAddress = data.myAddress.filter(item => {
      return item._id !== id;
    });
    return {
      code: 200,
      message: '删除成功'
    };
  }
};
