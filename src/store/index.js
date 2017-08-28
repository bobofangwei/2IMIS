import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './module/userinfo.js';
import provinceInfo from './module/provinceInfo.js';
import productInfo from './module/productInfo.js';
import permission from './module/permission.js';
import getters from './getters.js';

Vue.use(Vuex);
var store = new Vuex.Store({
    modules: {
        userInfo: userInfo,
        permission: permission,
        provinceInfo: provinceInfo,
        productInfo: productInfo
    },
    getters
});
export default store;
