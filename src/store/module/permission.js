import {
  asyncRouterMap,
  constantRouterMap
}
from '@/router/index.js';
import {
  SET_ROUTERS
} from '../types.js';

// 判断当前用户角色，是否具有访问当前路径的权限
// 值得注意的是，用户的权限角色可能有多个
// 一个路由route允许访问的权限角色也可能有多个
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some((role) => {
      route.meta.role.indexOf(role) > -1
    });
  } else {
    // meta中不设置role字段，说明任何人都可以登录
    return true;
  }
}

// 获取一个用户可访问的所有路由
// 路径有嵌套，注意递归
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessRouters = asyncRouterMap.filter((route) => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  console.log('当前用户可访问异步路由', accessRouters);
  return accessRouters;
}
const permission = {
  state: {
    routers: constantRouterMap, // 该用户最终可访问的所有路由
    addRouters: [] // 根据权限后续添加的路由
  },
  mutations: {
    [SET_ROUTERS](state, routers) {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    // 因为是异步加载路由，因此封装在action中
    generateRouters({ commit }, roles) {
      return new Promise((resolve) => {
        let result;
        if (roles.indexOf('admin') >= 0) {
          result = asyncRouterMap;
        } else {
          result = filterAsyncRouter(asyncRouterMap, roles);
        }
        commit(SET_ROUTERS, result);
        resolve();
      });
    }
  }
};
export default permission;
