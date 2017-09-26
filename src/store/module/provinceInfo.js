import * as types from '@/store/types.js';
import { getProvinceMap } from '@/api/basicInfo.js';
const provinceInfo = {
  state: {
    provinceMap: []
  },
  mutations: {
    [types.SET_PROVINCEMAP]: (state, provinceMap) => {
        state.provinceMap = provinceMap;
    }
  },
  actions: {
    provinceMapAsycn: ({commit}) => {
        return getProvinceMap().then((res) => {
            console.log('请求获取的省分列表', res);
            commit(types.SET_PROVINCEMAP, res);
        });
    }
  }
};
export default provinceInfo;
