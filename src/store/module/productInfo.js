import * as types from '../types.js';
import { getProductMap } from '@/api/basicInfo.js';
const productInfo = {
  state: {
    productMap: []
  },
  mutations: {
    [types.SET_PRODUCTMAP]: (state, productMap) => {
      state.productMap = productMap;
    }
  },
  actions: {
    productMapAsync: function({ commit }) {
      // 向远端服务器请求产品列表
      return new Promise(function(resolve, reject) {
        getProductMap().then(function(res) {
          // console.log('action请求得到产品映射表', res);
          commit(types.SET_PRODUCTMAP, res);
          resolve(res);
        }).catch(function(error) {
          reject(error);
        });
      });
    }
  }
};
export default productInfo;
