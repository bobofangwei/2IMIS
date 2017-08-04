import axios from '@/util/axiosService.js';
const loginUrl = '/api/login';
const logoutUrl = '/api/logout';
const getInfoUrl = '/api/getUserInfo';

export function login(username, password) {
  return axios.post(loginUrl, { username, password });
};
export function getUserInfo(token) {
  return axios.request({
    url: getInfoUrl,
    params: { token },
    method: 'GET'
  });
};
export function logout(token) {
  return axios.post(logoutUrl, { token });
};
