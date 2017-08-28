const getters = {
  token: (state) => state.userInfo.token,
  avatar: (state) => state.userInfo.avatar,
  name: (state) => state.userInfo.name,
  roles: (state) => state.userInfo.roles,
  allRouters: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
  provinceMap: (state) => state.provinceInfo.provinceMap,
  productMap: (state) => state.productInfo.productMap
};
export default getters;
