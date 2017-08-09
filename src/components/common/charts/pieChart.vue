<template>
  <div :style="{height:height,width:width}" class="chart"></div>
</template>
<script type="text/javascript">
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
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
      this.chartData = [{ value: 20, name: '腾讯王卡' }, { value: 30, name: '蚂蚁宝卡' }];
    }, 1000);
  },
  watch: {
    chartData: function() {
      if (this.chartData.length > 0) {
        if (this.chart) {
          this.chart.hideLoading();
          this.chart.setOption({
            series: [{
              type: 'pie',
              radius: '55%',
              roseType: 'radius',
              data: this.chartData
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
    initChart: function() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.setOption({
        title: {
          text: '2I各类产品市场份额',
          x: 'center'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['腾讯王卡', '蚂蚁宝卡']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
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
