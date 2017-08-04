import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './module/userinfo.js';
import getters from './getters.js';

Vue.use(Vuex);
var store = new Vuex.Store({
    modules: {
        userInfo: userInfo
    },
    getters
});
export default store;
