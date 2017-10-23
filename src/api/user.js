import axios from '@/util/axiosService.js';

export function login(username, password) {
  const loginUrl = 'BaseController/login';
  return axios.post(loginUrl, {
    username,
    password
  });
  // return rawAxios.post(loginUrl, qs.stringify({ username, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};
export function getUserInfo() {
  const getInfoUrl = 'BaseController/getUserInfo';
  return axios.request({
    url: getInfoUrl,
    method: 'GET'
  });
};
export function logout(token) {
  const logoutUrl = 'BaseController/logout';
  return axios.get(logoutUrl);
};
// 理论上需要后台生成返回，这里先前台随机生成一个吧
export function getVerifyCode() {
  const url = '';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return Promise.resolve({
    'verifyCode': result
  });
};
// 重置密码
export function resetPassword() {

}
