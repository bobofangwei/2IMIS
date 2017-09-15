<template>
  <div :style="{height:height,width:width}" class="chart"></div>
</template>
<script type="text/javascript">
import { extend } from '@/common/js/util.js';
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/theme/macarons');

var commonOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}%'
  },
  series: [{
    data: [],
    animationType: 'scale',
    animationEasing: 'elasticOut',
    type: 'pie',
    radius: '65%',
    roseType: 'radius',
    animationDelay: function(idx) {
      return Math.random() * 200;
    }
  }]
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
      pieType: 'age'
    };
  },
  mounted: function() {
    this.initChart();
    // this.chart.showLoading(); // // 模拟从后台异步获取数据的过程 // setTimeout(() => { // 
  },
  // watch: {
  //   chartData: function() {
  //     if (this.chartData.length > 0) {
  //       if (this.chart) {
  //         this.chart.hideLoading();
  //         this.chart.setOption({
  //           series: [{
  //             type: 'pie',
  //             radius: '65%',
  //             roseType: 'radius',
  //             data: this.chartData
  //           }]
  //         });
  //       }
  //     }
  //   }
  // },
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
      // this.chart = echarts.init(this.$el);
    },
    // 数据源发生变化时候调用
    update: function(age, sex) {
      // 处理数据格式
      this.dealWithData(age, sex);
      this.render();
    },
    dealWithData: function(age, sex) {
      this.ageData = [];
      this.sexData = [];
      for (let key in age) {
        this.ageData.push({ name: key, value: age[key] });
      }
      for (let key in sex) {
        this.sexData.push({ name: key, value: sex[key] });
      }
    },
    updatePieType: function(pieType) {
      this.pieType = pieType;
      // debugger
      this.render();
    },
    render: function() {
      this.chart.clear();
      this.$nextTick(function() {
        // debugger
        if (this.pieType === 'age') {
          // 因为嵌套了多层，因此使用了类似于jQuery的深度复制
          // 使用Object.assign是不能够实现深复制的，会发现series除了data之外的其他属性会丢失
          // 为了防止污染commonOption,不能这么写：curOption = extend(true, commonOption, { series: [{ data: this.ageData }] });
          // 甚至也不能这么写：curOption = extend(true, Object.assign({},commonOption), { series: [{ data: this.ageData }] });这种对于之嵌套一层属性的时候是可行的，但是对于此例中的多层属性不可
          let curOption = extend(true, {}, commonOption, { series: [{ data: this.ageData }] });
          this.chart.setOption(curOption);
        } else if (this.pieType === 'sex') {
          let curOption = extend(true, {}, commonOption, { series: [{ data: this.sexData }] });
          this.chart.setOption(curOption);
        }
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
