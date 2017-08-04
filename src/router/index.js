import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: (resolve) => require(['../components/pages/login/login.vue'], resolve)
    }, {
        path: '/',
        name: 'root',
        component: (resolve) => require(['../components/common/home/home.vue'], resolve),
        children: [{
            path: 'basicInfo',
            name: 'basicInfo',
            component: (resolve) => require(['../components/pages/basicInfo/basicInfo.vue'], resolve)
        }, {
            path: 'productDayForm',
            name: 'productDayForm',
            component: (resolve) => require(['../components/pages/productDayForm/productDayForm.vue'], resolve)
        }, {
            path: 'provinceDayForm',
            name: 'provinceDayForm',
            component: (resolve) => require(['../components/pages/provinceDayForm/provinceDayForm.vue'], resolve)
        }, {
            path: 'monthData',
            name: 'monthData',
            component: (resolve) => require(['../components/pages/monthData/monthData.vue'], resolve)
        }]
    }]
})
