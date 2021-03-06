import axios from 'axios';
import config from './config.js';
import {
  Message
} from 'element-ui';
import {
  getToken
} from './auth.js';
import store from '@/store/index.js';

const axiosService = axios.create(config);

axiosService.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken();
  }
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

axiosService.interceptors.response.use((res) => {
  console.log('axiosService response', res);
  if (res.data.status != '0') {
    Message({
      message: res.data.msg,
      type: 'error'
    });
    // 其他类型的错误，直接reject
    return Promise.reject(res.data);
  } else {
    return res.data.res;
  }
}, (error) => {
  return Promise.reject(error);
});
export default axiosService;
