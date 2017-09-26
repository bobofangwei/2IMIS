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
const whiteList = ['/login', '/test'];
// 需要省分列表的页面
const provincePages = ['/dayForm/productDayForm', '/monthForm/productMonthForm'];
// 需要产品列表的页面
const productPages = ['/dayForm/provinceDayForm', '/monthForm/provinceMonthForm'];
router.beforeEach((to, from, next) => {
  // console.log('router.beforeEach to', to);
  NProgress.start();
  if (getToken()) {
    // debugger
    console.log('getToken');
    if (to.path === '/login') {
      // 调用 next('/')或者next({path: ''}),跳转到一个不同的地址，当前的导航被终止，然后进行一个新的导航
      next({
        path: '/'
      });
    }
    // 如果用户角色为空，获取用户角色，并根据用户角色动态生成侧边栏
    // if (store.getters.roles.length === 0) {
    //   store.dispatch('getUserInfo').then(res => {
    //     const roles = res.roles;
    //     return store.dispatch('generateRouters', roles).then(() => {
    //       router.addRoutes(store.getters.addRouters);
    //       next({ ...to
    //       });
    //     });
    //   });
    // } else {
    //   next();
    // }

    var promises = [];
    // 如果用户角色为空，获取用户角色，并根据用户角色动态生成侧边栏
    if (store.getters.roles.length === 0) {
      let promise = store.dispatch('getUserInfo').then(res => {
        const roles = res.roles;
        return store.dispatch('generateRouters', roles).then(() => {
          router.addRoutes(store.getters.addRouters);
        });
      });
      promises.push(promise);
    }
    // 如果产品列表长度为空，获取产品列表
    if (store.getters.productMap.length === 0) {
      let promise = store.dispatch('productMapAsync');
      promises.push(promise);
    }
    // 说明省分列表长度为空，获取省分列表
    if (store.getters.productMap.length === 0) {
      let promise = store.dispatch('provinceMapAsycn');
      promises.push(promise);
    } 
    
    // 哪怕以上的判断都不成立，也就是说所有的信息：侧边栏，省分列表，产品列表都不为空，则Promises为空，promise.all立即触发
    if (promises.length) {
      Promise.all(promises).then((values) => {
        // 重新发起导航
        next({ ...to });
      });
    } else {
      next();
    }
  } else {
    // cookie中没有存储用户信息 
    // 白名单中存储着无需登录即可访问的信息
    if (whiteList.indexOf(to.path) >= 0) {
      console.log('to.path', to.path);
      next();
    } else {
      // 如果不使用白名单判断的话，就一直死循环了
      // console.log('login');
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
