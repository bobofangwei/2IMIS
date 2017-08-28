<template>
  <div class="dashboard">
    <div class="section1">
      <el-row>
        <el-col :span=16>
          <line-chart></line-chart>
        </el-col>
        <el-col :span=8 class="static-wrapper">
          <ul class="static-list">
            <li class="static-item static-sum"><span class="static-label">用户总数：</span>13324243432</li>
            <li class="static-item static-add"><span class="static-label">昨日新增：</span>34567</li>
            <li class="static-item static-minus"><span class="static-label">昨日流失：</span>11222</li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span=8>
        <pie-chart></pie-chart>
      </el-col>
      <el-col :span=16>
      <bar-chart></bar-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
import pieChart from '@/components/common/charts/pieChart';
import lineChart from '@/components/common/charts/lineChart';
import barChart from '@/components/common/charts/barChart';
export default {
  components: {
    lineChart,
    pieChart,
    barChart
  }
};

</script>
<style lang="scss" scoped>
.dashboard {
  .section1 {
    padding: 20px 20px 20px 0;
    border-bottom: 1px solid #CCC;
  }
  .static-list {
    height: 400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px 50px 20px 0;
  }
  .static-item {
    font-size: 30px;
    padding: 30px 50px;
    text-align: left;
    background-color: #E5E9F2;
    border-radius: 6px;
    &.static-sum {
      color: #99A9BF;
    }
    &.static-add {
      color: #58B7FF;
    }
    &.static-minus {
      color: #F7BA2A;
    }
    .static-label {
      font-size: 22px;
    }
  }
  .line-wrapper {
    border: 1px solid #ccc;
  }
}

</style>
