import Vue from 'vue'
import Router from 'vue-router'
const login = (resolve) => require(['../components/pages/login/login.vue'], resolve);
const home = (resolve) => require(['../components/common/home/home.vue'], resolve);
const basicInfo = (resolve) => require(['../components/pages/basicInfo/basicInfo.vue'], resolve);
const productDayForm = (resolve) => require(['../components/pages/productDayForm/productDayForm.vue'], resolve);
const provinceDayForm = (resolve) => require(['../components/pages/provinceDayForm/provinceDayForm.vue'], resolve);
const monthData = (resolve) => require(['../components/pages/monthData/monthData.vue'], resolve);
// 测试用
const dashboard = (resolve) => require(['../components/pages/dashboard/dashboard.vue'], resolve);
const errorPage = (resolve) => require(['../components/pages/404/404.vue'], resolve);
Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  component: login,
  hidden: true,
  name: 'login',
  meta: {
    hidden: true
  }
}, {
  path: '/',
  component: home,
  redirect: '/dayForm/productDayForm',
  name: 'home',
  hidden: true,
  meta: {
    hidden: true
  },
  children: [{
    path: 'test',
    component: dashboard,
    name: 'test',
    meta: { hidden: true }
  }]
}];

export const asyncRouterMap = [{
  path: '/dayForm',
  component: home,
  redirect: '/dayForm/productDayForm',
  name: 'dayForm',
  meta: {
    title: '日报表',
    icon: 'el-icon-document'
  },
  children: [{
    path: 'productDayForm',
    component: productDayForm,
    name: 'productDayForm',
    meta: {
      title: '产品发展报表'
    }
  }, {
    path: 'provinceDayForm',
    component: provinceDayForm,
    name: 'productDayForm',
    meta: {
      title: '区域发展报表'
    }
  }]
}, {
  path: '/detail',
  component: home,
  redirect: '/detail/basicInfo',
  name: 'detail',
  meta: {
    title: '明细',
    icon: 'el-icon-menu'
  },
  children: [{
    path: 'basicInfo',
    component: basicInfo,
    name: 'basicInfo',
    meta: {
      role: ['admin'],
      title: '基本信息'
    }
  }]
}, {
  path: '*',
  component: errorPage,
  name: '404',
  meta: {
    hidden: true
  }
}];
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
