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
