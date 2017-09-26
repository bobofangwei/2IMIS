import axios from '@/util/axiosService.js';

// 获取产品映射表
export function getProductMap() {
  const url = 'BaseController/products';
  return axios.get(url);
};
// 获取省份映射表
export function getProvinceMap() {
  const url = 'BaseController/provinces';
  return axios.get(url);
}
