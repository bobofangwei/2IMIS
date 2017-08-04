// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/common/scss/index.scss'
import axios from 'axios'
import store from './store/index.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false
Vue.use(ElementUi);
/* eslint-disable no-new */

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
