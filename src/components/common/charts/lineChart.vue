<template>
  <div :style="{height:height,width:width}" class="chart"></div>
</template>
<script type="text/javascript">
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
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
      this.chartData = this.getRandomData();
    }, 1000);
  },
  watch: {
    chartData: function() {
      if (this.chartData.length > 0) {
        if (this.chart) {
          this.chart.hideLoading();
          this.chart.setOption({
            series: [{
              name: '新增用户',
              type: 'line',
              data: this.chartData[0]
            }, {
              name: '流失用户',
              type: 'line',
              data: this.chartData[1]
            }]
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
    getxAxisData: function() {
      let result = [];
      for (var i = 10; i >= 3; i--) {
        result.push('前' + i + '天');
      }
      result.push('前天');
      result.push('昨天');
      return result;
    },
    getRandomData: function() {
      let result = [];
      for (var k = 0; k < 2; k++) {
        result[k] = [];
        for (var i = 0; i < 10; i++) {
          result[k].push(Math.ceil(Math.random() * 20) + 80);
        }
      }
      return result;
    },
    initChart: function() {
      // this.chart = echarts.init(this.$el, 'macarons');
      this.chart = echarts.init(this.$el);
      this.chart.setOption({
        title: {
          text: '2I用户数变化趋势',
          x: 'center'
        },
        color: ['#58B7FF', '#F7BA2A'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: '50px',
          data: ['新增用户', '流失用户']
        },
        xAxis: {
          data: this.getxAxisData(),
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          min: 75,
          max: 105
        },
        series: []
      });
    }
  }
}

</script>
<style lang="scss" scoped>
.chart {
  margin: 0 auto;
}

</style>
