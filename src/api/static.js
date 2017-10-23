import axios from '@/util/axiosService.js';

// 根据区域编码获取产品日报信息
export function queryVisualizeInfo(selectedProduct) {
  const url = 'ReportFormsController/visualizedProduct';
  // console.log('请求数据：selectedProduct 90065148');
  return axios.post(url, { 'selectedProduct': selectedProduct });
};
