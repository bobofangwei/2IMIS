// mock获取短信模版的详情
import Mock from 'mockjs';
import baidushengka from './messageData/baidushengka.js';
import baidushenka from './messageData/baidushenka.js';
import weibovka from './messageData/weibovka.js';
import changtaoka from './messageData/changtaoka.js';
import productList from './messageData/productList.js';
const messageData = {
  baidushengka,
  baidushenka,
  weibovka,
  changtaoka
};
export default {
  getMessageDetail: config => {
    let paramObj = JSON.parse(config.body);
    var ret = {
      status: 0,
      res: messageData[paramObj.product][paramObj.type]
    };
    return ret;
  },
  // 获取所有卡系列列表
  getProductList: config => {
    var ret = {
      status: 0,
      res: productList
    };
    return ret;
  }
};
