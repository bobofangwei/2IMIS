<template>
  <div :style="{height:height,width:width}" class="chart"></div>
</template>
<script type="text/javascript">
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/theme/macarons');
import { extend } from '@/common/js/util.js';
var commonOption = {
  color: ['#58B7FF', '#F7BA2A'],
  tooltip: {
    trigger: 'axis'
  },
  yAxis: {
    type: 'value'
  },
  xAxis: {
    boundaryGap: false
  },
  series: []
};
export default {
  props: {
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data: function() {
    return {
      chart: null,
      // chartData: [],
      lineType: 'changeUser',
      lineDuration: '7days'
    };
  },
  mounted: function() {
    this.initChart();
    // this.chart.showLoading();
    // // 模拟从后台异步获取数据的过程
    // setTimeout(() => {
    //   this.chartData = this.getRandomData();
    // }, 1000);
  },
  watch: {
    // chartData: function() {
    //   if (this.chartData.length > 0) {
    //     if (this.chart) {
    //       this.chart.hideLoading();
    //       this.chart.setOption({
    //         series: [{
    //           name: '新增用户',
    //           type: 'line',
    //           data: this.chartData[0]
    //         }, {
    //           name: '流失用户',
    //           type: 'line',
    //           data: this.chartData[1]
    //         }]
    //       });
    //     }
    //   }
    // }
  },
  beforeDestroy: function() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart: function() {
      // this.chart = echarts.init(this.$el, 'macarons');
      this.chart = echarts.init(this.$el);
    },
    // 更改图形显示类型，是显示用户变化，还是用户总数
    updateLineType: function(type) {
      this.lineType = type;
      this.render();
    },
    // 更改图形显示时长，是显示近7天，还是15天，还是30天
    updateLineDuration: function(duration) {
      this.lineDuration = duration;
      this.render();
    },
    // 只有data改变的时候，才需要调用此函数
    // 如果仅仅是显示时间之间的切换，或者是用户变化和用户总数之间的切换，不需要调用此函数
    update: function(userAll, userAdd, userMinus) {
      this.dealWithData(userAll, userAdd, userMinus);
      this.render();
    },
    render: function() {
      this.$nextTick(function() {
        var tmp = -7;
        switch (this.lineDuration) {
          case '7days':
            tmp = -7;
            break;
          case '15days':
            tmp = -15;
            break;
          case '30days':
            tmp = -30;
            break;
        };
        var curXAxisData = this.xAxisData.slice(tmp);
        this.chart.clear();
        if (this.lineType === 'changeUser') {
          let extraOption = {
            xAxis: {
              data: curXAxisData
            },
            legend: {
              right: '50px',
              data: ['新增用户', '流失用户']
            },
            series: [{
              name: '新增用户',
              type: 'line',
              data: this.userAddData.slice(tmp)
            }, {
              name: '流失用户',
              type: 'line',
              data: this.userMinusData.slice(tmp)
            }]
          };
          let curOption = extend(true, {}, commonOption, extraOption);
          this.chart.setOption(curOption);
        } else if (this.lineType === 'allUser') {
          let extraOption = {
            xAxis: {
              data: curXAxisData
            },
            series: [{
              type: 'line',
              name: '用户总数',
              data: this.userAllData.slice(tmp)
            }]
          };
          let curOption = extend(true, {}, commonOption, extraOption);
          this.chart.setOption(curOption);
        }
        // console.log('options', this.chart.getOption());
      });
    },
    dealWithData: function(userAll, userAdd, userMinus) {
      this.xAxisData = [];
      this.userAllData = [];
      this.userAddData = [];
      this.userMinusData = [];
      for (var i = 0, len = userAll.length; i < len; i++) {
        for (var key in userAll[i]) {
          this.xAxisData.push(key);
          this.userAllData.push(userAll[i][key]);
          this.userAddData.push(userAdd[i][key]);
          this.userMinusData.push(userMinus[i][key]);
        }
      }
    }
  }
};

</script>
<style lang="scss" scoped>
.chart {
  margin: 0 auto;
}

</style>
