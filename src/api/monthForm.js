import axios from '@/util/axiosService.js';

// 根据区域编码获取产品日报信息
export function queryMonthformByProvince(selectedProvince, selectedDate) {
  const url = 'ReportFormsController/getMonthReportFormsByRegion';
  console.log('请求数据：', {selectedProvince, selectedDate});
  return axios.post(url, {selectedProvince, selectedDate});
};

// 根据产品编码获取区域日报信息
export function queryMonthformByProduct(selectedProduct, selectedDate) {
  const url = 'ReportFormsController/getMonthReportFormsByProduct';
  console.log('请求数据：', {selectedProduct, selectedDate});
  return axios.post(url, {selectedProduct, selectedDate});
};
