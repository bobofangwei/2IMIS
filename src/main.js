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
import {
  getToken
} from '@/util/auth.js';

Vue.config.productionTip = false
Vue.use(ElementUi);
/* eslint-disable no-new */

// 无需登录即可访问的页面
const whiteList = ['/login', '/manage/userManage'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    console.log('getToken');
    if (to.path === '/login') {
      next({
        path: '/'
      });
    } else
    if (store.getters.roles.length === 0) {
      store.dispatch('getUserInfo').then(res => {
        const roles = res.roles;
        store.dispatch('generateRouters', roles).then(() => {
          router.addRoutes(store.getters.addRouters);
          next({ ...to
          });
        });
      })
    } else {
      next();
    }
  } else {
    // cookie中没有存储用户信息
    if (whiteList.indexOf(to.path) >= 0) {
      next();
    } else {
      // 如果不使用白名单判断的话，就一直死循环了
      next({
        path: '/login'
      });
    }
    NProgress.done();
  }
});
router.afterEach(() => {
  NProgress.done();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
