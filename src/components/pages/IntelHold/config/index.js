const tagsData = [{
  label: '基本标签',
  id: 'baseTag',
  children: [{
      id: 'project',
      label: '归属项目',
      selected: false,
      operate: 'jihe'
    }, {
      id: 'product',
      label: '归属产品',
      selected: false,
      operate: 'jihe'
    },
    {
      id: 'province',
      label: '号码省份',
      selected: false,
      operate: 'jihe'
    }, {
      id: 'state',
      label: '号码状态',
      selected: false,
      operate: 'jihe'
    }, {
      id: 'flow',
      label: '套内流量',
      selected: false,
      operate: 'daxiao'
    }
  ]
}, {
  label: '行为标签',
  id: 'actionTag',
  children: [{
      id: 'shouchong',
      label: '是否首充',
      selected: false,
      operate: 'zhenjia'
    },
    {
      id: 'arpu',
      label: 'ARPU',
      selected: false,
      operate: 'daxiao'
    }
  ]
}, {
  label: '用户标签',
  id: 'userTag',
  children: [{
      id: 'age',
      label: '年龄',
      selected: false,
      operate: 'daxiao'
    },
    {
      id: 'sex',
      label: '性别',
      selected: false,
      operate: 'jihe'
    }
  ]
}, {
  label: '位置标签',
  id: 'positionTag',
  children: [{
      id: 'city',
      label: '地市',
      selected: false,
      operate: 'jihe'
    },
    {
      id: 'xiaoqu',
      label: '小区',
      selected: false,
      operate: 'jihe'
    },
    {
      id: 'baseStation',
      label: '基站',
      selected: false,
      operate: 'jihe'
    }
  ]
}];
const operations = {
  jihe: {
    shuyu: '属于',
    bushuyu: '不属于'
  },
  daxiao: {
    dengyu: '等于',
    budengyu: '不等于',
    xiaoyu: '小于',
    xiaoyudengyu: '小于等于',
    dayu: '大于',
    dayudengyu: '大于等于'
  },
  zhenjia: {
    shi: '是',
    fou: '否'
  }
};
export {
  tagsData,
  operations
};
