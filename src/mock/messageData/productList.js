var data = [{
  title: '百度圣卡',
  id: 'baidushengka',
  products: '百度超圣卡、大圣卡、小圣卡'
}, {
  title: '百度神卡',
  id: 'baidushenka',
  products: '百度大神卡、小神卡、女神卡'
}, {
  title: '微博V卡',
  id: 'weibovka',
  products: '微博V+卡、大V卡、金V卡'
}, {
  title: '畅淘卡',
  id: 'changtaoka',
  products: '畅淘卡'
}, {
  title: '滴滴王卡',
  id: 'didiwangka',
  products: '滴滴大王卡、小王卡'
}, {
  title: '滴滴橙卡',
  id: 'didichangka',
  products: '滴滴大橙卡、小橙卡、MINI橙卡'
}, {
  title: '运满满满卡',
  id: 'yunmanmanmanka',
  products: '运满满大满卡、小满卡'
}, {
  title: '阿里钉钉卡',
  id: 'dingdingka',
  products: '钉钉商务钻石卡、金卡、银卡'
}, {
  title: '饿了么蜂卡',
  id: 'elemefengka',
  products: '饿了么蜂王卡、蜂鸟卡'
}, {
  title: '饿了么饿卡',
  id: 'elemeeka',
  products: '饿了么大饿卡、小饿卡'
}, {
  title: '工行e卡',
  id: 'gonghangeka',
  products: '工行梦想e卡、大e卡'
}, {
  title: '花椒卡',
  id: 'huajiaoka',
  products: '小花椒卡、大花椒卡'
}, {
  title: '同花顺顺卡',
  id: 'tonghuashunshunka',
  products: '同花顺小顺卡、大顺卡、天顺卡'
}, {
  title: '蚂蚁宝卡',
  id: 'mayibaoka',
  products: '蚂蚁大宝卡、小宝卡、小宝+卡'
}, {
  title: '美团美卡',
  id: 'meituanmeika',
  products: '美团大美卡、小美卡'
}, {
  title: '浦发发卡',
  id: 'pufafaka',
  products: '浦发大发卡、浦发小发卡'
}, {
  title: '头条懂我卡',
  id: 'toutiaodongwoka',
  products: '头条懂我卡、懂我卡plus'
}, {
  title: '招联牛卡',
  id: 'zhaolianniuka',
  products: '招联牛卡'
}, {
  title: '招行招卡',
  id: 'zhaohangzhaoka',
  products: '招行大招卡、小招卡'
}];
var colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'];
let icons = ['bar-chart', 'attendance', 'calculator', 'atm'];
let length = colors.length;
data.map((item) => {
  item.color = colors[(Math.random() * length) | 0];
  item.icon = icons[(Math.random() * length) | 0];
});
export default data;
