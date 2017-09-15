const provinceInfo = {
  state: {
    provinceMap: {
      '97': '黑龙江',
      '91': '辽宁',
      '90': '吉林',
      '89': '新疆',
      '88': '宁夏',
      '87': '甘肃',
      '86': '云南',
      '85': '贵州',
      '84': '陕西',
      '83': '重庆',
      '81': '四川',
      '79': '西藏',
      '76': '河南',
      '75': '江西',
      '74': '湖南',
      '71': '湖北',
      '70': '青海',
      '59': '广西',
      '51': '广东',
      '50': '海南',
      '38': '福建',
      '36': '浙江',
      '31': '上海',
      '30': '安徽',
      '19': '山西',
      '18': '河北',
      '17': '山东',
      '10': '内蒙古',
      '13': '天津',
      '11': '北京',
      '34': '江苏'
    }
  },
  getters: {
    provinceMapWithQuanguo: (state) => {
      return Object.assign(state.provinceMap, {'0': '全国'});
    }
  }
};
export default provinceInfo;
