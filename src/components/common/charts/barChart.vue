<template>
  <div :style="{height:height,width:width}" class="chart"></div>
</template>
<script type="text/javascript">
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/theme/macarons');
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
      chartData: []
    };
  },
  mounted: function() {
    this.initChart();
    this.chart.showLoading();
    // 模拟从后台异步获取数据的过程
    setTimeout(() => {
      this.chartData = this.generateData();
      console.log('chartData', this.chartData);
    }, 1000);
  },
  watch: {
    chartData: function() {
      if (this.chartData.length > 0) {
        if (this.chart) {
          this.chart.hideLoading();
          this.chart.setOption({
            series: [{
                type: 'bar',
                name: '总用户数',
                data: this.chartData[0]
              },
              {
                type: 'bar',
                name: '新增用户',
                data: this.chartData[1]
              }
            ]
          });
        }
      }
    }
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
      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.setOption({
        // title: {
        //   text: 'Top产品市场份额',
        //   x: 'center'
        // },
        legend: {
         x: 'center',
         y: 'bottom',
         data: ['总用户数', '新增用户']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        xAxis: [{
          type: 'category',
          data: this.generatexAxisData()
        }],
        yAxis: [{
          type: 'value'
        }],
        series: []
      });
    },
    generateData: function() {
      var result = [];
      for (var k = 0; k < 2; k++) {
        result[k] = [];
        for (var i = 1; i < 25; i++) {
          result[k].push({ name: '卡' + i, value: Math.random() * 1000 + 9000 });
        }
      }
      return result;
    },
    generatexAxisData: function() {
      var result = [];
      for (var i = 1; i < 25; i++) {
        result.push('卡' + i);
      }
      return result;
    }
  }
}

</script>
<style lang="scss" scoped>
.chart {
  margin: 0 auto;
}

</style>
