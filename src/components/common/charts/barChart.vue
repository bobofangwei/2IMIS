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
    },
    update(barData) {
      this.dealWithData(barData);
      this.render();
    },
    dealWithData: function(barData) {
      this.xAxisData = [];
      this.valueData = [];
      for (let i = 0, len = barData.length; i < len; i++) {
        let curData = barData[i];
        let provinceText = curData['province_name'];
        this.xAxisData.push(provinceText);
        this.valueData.push({ name: provinceText, value: curData['sum_user'] });
      }
    },
    showLoading: function() {
        this.chart.showLoading();
    },
    hideLoading: function() {
        this.chart.hideLoading();
    },
    render: function() {
      this.$nextTick(function() {
        var option = {
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
            data: this.xAxisData,
            boundaryGap: true,
            axisLabel: {
              interval: 0
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            type: 'bar',
            data: this.valueData
          }]
        };
        // console.log(option);
        this.chart.setOption(option);
      });
    }
  }
};

</script>
<style lang="scss" scoped>
.chart {
  margin: 0 auto;
}

</style>
