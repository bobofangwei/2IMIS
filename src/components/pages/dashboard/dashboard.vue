<template>
  <div class="dashboard">
    <el-row>
      <el-col :span=8>
        <pie-chart>
        </pie-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
import pieChart from '@/components/common/charts/pieChart';
export default {
  components: {
    pieChart
  }
};

</script>
<style lang="scss" scoped></style>
