import Vue from 'vue'
import Router from 'vue-router'
const login = (resolve) => require(['../components/pages/login/login.vue'], resolve);
const home = (resolve) => require(['../components/common/home/home.vue'], resolve);
const basicInfo = (resolve) => require(['../components/pages/basicInfo/basicInfo.vue'], resolve);
const productDayForm = (resolve) => require(['../components/pages/productDayForm/productDayForm.vue'], resolve);
const provinceDayForm = (resolve) => require(['../components/pages/provinceDayForm/provinceDayForm.vue'], resolve);
const productMonthForm = (resolve) => require(['../components/pages/productMonthForm/productMonthForm.vue'], resolve);
const provinceMonthForm = (resolve) => require(['../components/pages/provinceMonthForm/provinceMonthForm.vue'], resolve);
const personCenter = (resolve) => require(['../components/pages/personCenter/personCenter.vue'], resolve);
const userManage = (resolve) => require(['../components/pages/userManage/userManage.vue'], resolve);
// 测试用
const dashboard = (resolve) => require(['../components/pages/dashboard/dashboard.vue'], resolve);
const errorPage = (resolve) => require(['../components/pages/404/404.vue'], resolve);
const passwordReset = (resolve) => require(['../components/pages/passwordReset/passwordReset.vue'], resolve);
const messageTemplate = (resolve) => require(['../components/pages/messageTemplate/messageTemplate.vue'], resolve);
const messageEdit = (resolve) => require(['../components/pages/messageEdit/messageEdit.vue'], resolve);
Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: login,
    name: 'login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/resetPassword',
    component: passwordReset,
    name: 'resetPassword',
    meta: {
      hidden: true
    }
  }
];

export const asyncRouterMap = [{
  path: '/',
  component: home,
  name: 'root',
  redirect: '/static',
  meta: {
    dropdown: false
  },
  children: [{
    path: 'static',
    component: dashboard,
    name: 'dashboard',
    meta: {
      title: '数据统计',
      icon: 'icon-attendance'
    }
  }]
}, {
  path: '/dayForm',
  component: home,
  redirect: '/dayForm/productDayForm',
  name: 'dayForm',
  meta: {
    title: '日报表',
    icon: 'icon-calendar',
    dropdown: true
  },
  children: [{
    path: 'productDayForm',
    component: productDayForm,
    name: 'productDayForm',
    meta: {
      title: '产品日报表'
    }
  }, {
    path: 'provinceDayForm',
    component: provinceDayForm,
    name: 'provinceDayForm',
    meta: {
      title: '区域日报表'
    }
  }]
}, {
  path: '/monthForm',
  component: home,
  redirect: '/monthForm/productMonthForm',
  name: 'monthForm',
  meta: {
    title: '月报表',
    icon: 'icon-cangneishicao',
    dropdown: true
  },
  children: [{
    path: 'productMonthForm',
    component: productMonthForm,
    name: 'productMonthForm',
    meta: {
      title: '产品月报表'
    }
  }, {
    path: 'provinceMonthForm',
    component: provinceMonthForm,
    name: 'productMonthForm',
    meta: {
      title: '区域月报表'
    }
  }]
}, {
  path: '/detail',
  component: home,
  redirect: '/detail/basicInfo',
  name: 'detail',
  meta: {
    title: '明细',
    icon: 'icon-delivery',
    dropdown: true
  },
  children: [{
    path: 'basicInfo',
    component: basicInfo,
    name: 'basicInfo',
    meta: {
      title: '基本信息'
    }
  }]
}, {
  path: '/message',
  component: home,
  redirect: '/message/messageTemplate',
  name: 'message',
  meta: {
    title: '短信维系',
    icon: 'icon-chat',
    dropdown: true
  },
  children: [{
    path: 'messageTemp',
    component: messageTemplate,
    name: 'messageTemplate',
    meta: {
      title: '经典模型'
    }
  }, {
    path: 'messageEdit',
    component: messageEdit,
    name: 'messageEdit',
    meta: {
      title: '新建模型'
    }
  }]
}, {
  path: '/',
  component: home,
  name: 'root',
  redirect: '/static',
  meta: {
    icon: 'el-icon-star-on',
    dropdown: false
  },
  children: [{
    path: 'userManage',
    component: userManage,
    name: 'userManage',
    meta: {
      role: ['admin'],
      title: '用户管理',
      icon: 'icon-power'
    }
  }, {
    path: 'personCenter',
    component: personCenter,
    name: 'personCenter',
    meta: {
      title: '个人中心',
      icon: 'icon-user'
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
