import axios from '@/util/axiosService.js';
const loginUrl = 'BaseController/login';
const logoutUrl = 'BaseController/logout';
const getInfoUrl = 'BaseController/getUserInfo';

export function login(username, password) {
    return axios.post(loginUrl, {
        username,
        password
    });
// return rawAxios.post(loginUrl, qs.stringify({ username, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};
export function getUserInfo() {
    return axios.request({
        url: getInfoUrl,
        method: 'GET'
    });
};
export function logout(token) {
    return axios.get(logoutUrl);
};
