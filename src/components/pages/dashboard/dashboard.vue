<template>
  <div class="dashboard">
  <breadbar></breadbar>
    <div class="query-form">
      <el-form ref="form" label-width="80px" v-model="querys">
        <div class="form-item">
          <label>产品：</label>
          <el-select v-model="querys.selectedProduct" style="margin-right: 50px">
            <template v-for="product in productMap">
              <el-option v-for="(value, key) in product" :label="value" :key="key" :value="key"></el-option>
            </template>
          </el-select>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <!-- <label>省分：</label>
          <el-select v-model="querys.selectedProvince">
            <el-option label="全国" value="0"></el-option>
            <el-option label="北京" value="1"></el-option>
          </el-select>-->
        </div>
      </el-form>
    </div>
    <div class="desc-wrapper">
      <h4 class="desc-title">截止昨日的统计数据</h4>
      <p class="desc-content">用户总数：<span class="num">{{yesSum}}</span></p>
      <p class="desc-content">昨日新增:<span class="num">{{yesAdd}}</span>,昨日流失<span class="num">{{yesMinus}}</span></p>
    </div>
    <div class="chart-wrapper">
      <el-tabs v-model="selectedLineType" @tab-click="handleChangeLineType">
        <el-tab-pane v-for="(value,key) in lineTypes" :label="value" :key="key" :name="key"></el-tab-pane>
      </el-tabs>
      <!-- <h3 class="chart-title">用户数统计</h3>-->
      <el-radio-group v-model="selectedDuration" size="small" @change="handleChangeDuration" fill="#D8EBFF" text-color="#2578DF">
        <el-radio-button v-for="(value,key) in durations" :key="key" :label="key">{{value}}</el-radio-button>
      </el-radio-group>
      <div>
        <line-chart class="chart" ref="lineChart"></line-chart>
      </div>
    </div>
    <div class="chart-wrapper">
      <h3 class="chart-title">用户地域分布</h3>
      <el-row>
        <!--
        <el-col :span=8>
          <el-radio-group style="margin-left: 30px" v-model="selectedPieType" size="small" fill="#D8EBFF" text-color="#2578DF" @change="handleChangePieType">
            <el-radio-button v-for="(value,key) in pieTypes" :key="key" :label="key">{{value}}</el-radio-button>
          </el-radio-group>
          <pie-chart ref="pieChart"></pie-chart>
        </el-col>
        -->
        <el-col :span=24>
          <bar-chart ref="barChart"></bar-chart>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import breadbar from '@/components/common/breadbar/breadbar.vue';
import pieChart from '@/components/common/charts/pieChart';
import lineChart from '@/components/common/charts/lineChart';
import barChart from '@/components/common/charts/barChart';
import { queryVisualizeInfo } from '@/api/static.js';
import { mapGetters } from 'vuex';
export default {
  data: function() {
    return {
      durations: {
        '7days': '近七天',
        '15days': '近十五天',
        '30days': '近三十天'
      },
      lineTypes: {
        'changeUser': '用户变化趋势统计',
        'allUser': '用户总数统计'
      },
      pieTypes: {
        'age': '年龄',
        'sex': '性别'
      },
      selectedDuration: '7days',
      selectedLineType: 'changeUser',
      selectedPieType: 'age',
      querys: {
        selectedProduct: '90063345'
      },
      yesSum: '--',
      yesAdd: '--',
      yesMinus: '--'
    };
  },
  components: {
    lineChart,
    pieChart,
    barChart,
    breadbar
  },
  mounted: function() {
    // 进入页面默认进行一次查询，此时的querys.selectedProduct为00，即默认所有产品
    this.handleQuery();
  },
  methods: {
    handleQuery: function() {
      // 点击查询
      console.log('选择的产品编号：', this.querys.selectedProduct);
      this.showLoading();
      queryVisualizeInfo(this.querys.selectedProduct).then((res) => {
        this.hideLoading();
        let lineData = res['month'];
        if (lineData.length) {
            let lastIndex = lineData.length - 1;
            this.yesSum = lineData[lastIndex]['sum_user'];
            this.yesAdd = lineData[lastIndex]['yes_add'];
            this.yesMinus = lineData[lastIndex]['yes_xiaohu'];            
        }
        this.$nextTick(function() {
          this.$refs.lineChart.update(lineData);
          this.$refs.barChart.update(res['province']);
        });
      });
    },
    showLoading: function() {
        this.$refs.lineChart.showLoading();
        this.$refs.barChart.showLoading();
    },
    hideLoading: function() {
        this.$refs.lineChart.hideLoading();
        this.$refs.barChart.hideLoading();
    },
    handleChangeDuration: function(duration) {
      console.log('duration', duration);
      // 切换折线图显示时长
      this.$refs.lineChart.updateLineDuration(duration);
    },
    handleChangeLineType: function(tab) {
      console.log('lineType', tab.name);
      // 切换折线图显示类型，是显示用户总数，还是显示用户新增/流失
      this.$refs.lineChart.updateLineType(tab.name);
    },
    handleChangePieType: function(pieType) {
      // 切换饼图显示类型，是显示用户性别分布，还是显示用户年龄分布
      this.$refs.pieChart.updatePieType(pieType);
    }
  },
  computed: {
    ...mapGetters([
      'productMap'
    ])
  }
};

</script>
<style lang="scss" scoped>
.dashboard {
  width: 90%;
  margin: 20px auto;
  .title-wrapper {
    font-size: 24px;
    padding: 20px 0;
  }
  .bottom-line {
    border-bottom: 1px solid #CED1DB;
  }
  .query-form {
    padding: 0 15px;
    margin-top: 15px;
    border: 1px solid #CED1DB;
    background-color: #F5F7FA;
    border-radius: 3px;
    .form-item {
      padding: 15px 0;
    }
  }
  .desc-wrapper {
    margin-top: 20px;
    padding: 15px 20px;
    border: 1px solid #CED1DB;
    border-radius: 3px;
    color: #555;
    .desc-title {
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
    }
    .desc-content {
      font-size: 12px;
      padding: 5px 0;
    }
    .num {
      color: #000;
      font-weight: 400;
      font-size: 14px;
    }
  }
  .dur-rg-wrapper {
    margin-top: 15px;
  }
  .chart-wrapper {
    border-bottom: 1px solid #EAEBED;
    margin-top: 25px;
    .chart-title {
      font-size: 18px;
      font-weight: 600;
      padding: 20px 30px;
    }
    .chart {}
  }
}

</style>
