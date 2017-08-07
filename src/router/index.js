import Vue from 'vue'
import Router from 'vue-router'
const login = (resolve) => require(['../components/pages/login/login.vue'], resolve);
const home = (resolve) => require(['../components/common/home/home.vue'], resolve);
const basicInfo = (resolve) => require(['../components/pages/basicInfo/basicInfo.vue'], resolve);
const productDayForm = (resolve) => require(['../components/pages/productDayForm/productDayForm.vue'], resolve);
const provinceDayForm = (resolve) => require(['../components/pages/provinceDayForm/provinceDayForm.vue'], resolve);
const monthData = (resolve) => require(['../components/pages/monthData/monthData.vue'], resolve);

Vue.use(Router)

export const constantRouterMap = [{
        path: '/login',
        component: login,
        hidden: true,
        name: 'login'
    }, {
        path: '/',
        component: home,
        redirect: '/dayForm/productDayForm',
        name: 'home',
        hidden: true
    }
];

export const asyncRouterMap = [{
    path: '/dayForm',
    component: home,
    redirect: '/dayForm/productDayForm',
    name: 'dayForm',
    icon: 'el-icon-document',
    title: '日报表',
    children: [{
        path: 'productDayForm',
        component: productDayForm,
        name: 'productDayForm',
        title: '产品发展报表'
    }, {
        path: 'provinceDayForm',
        component: provinceDayForm,
        name: 'productDayForm',
        title: '区域发展报表'
    }]
}, {
  path: '/detail',
  component: home,
  redirect: '/detail/basicInfo',
  name: 'detail',
  titel: '明细',
  icon: 'el-icon-setting',
  children: [{
    path: 'basicInfo',
    component: basicInfo,
    name: 'basicInfo',
    title: '基本信息',
    meta: {
      role: ['admin']
    }
  }]
}
];
export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
});
