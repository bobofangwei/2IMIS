import axios from '@/util/axiosService.js';

// 根据区域编码获取产品日报信息
export function getMessageDetail(product, type) {
  const url = 'message/messageDetail';
  return axios.post(url, {
    product,
    type
  });
};

export function getProductList() {
  const url = 'message/productList';
  return axios.get(url);
}
