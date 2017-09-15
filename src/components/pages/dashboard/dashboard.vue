<template>
  <div class="dashboard">
    <h2 class="title-wrapper bottom-line">2I用户统计分析</h2>
    <div class="query-form">
      <el-form ref="form" label-width="80px" v-model="querys">
        <div class="form-item">
          <el-radio-group v-model="selectedDuration" size="small" @change="handleChangeDuration">
            <el-radio-button v-for="(value,key) in durations" :key="key" :label="key">{{value}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="form-item bottom-line">
          <label>产品：</label>
          <el-select v-model="querys.selectedProduct" style="margin-right: 50px">
            <el-option label="所有产品" value="0"></el-option>
            <el-option label="腾讯王卡" value="1"></el-option>
          </el-select>
          <!-- <label>省分：</label>
          <el-select v-model="querys.selectedProvince">
            <el-option label="全国" value="0"></el-option>
            <el-option label="北京" value="1"></el-option>
          </el-select>-->
        </div>
        <div class="form-item">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class="desc-wrapper">
      <h4 class="desc-title">截止昨日的统计数据</h4>
      <p class="desc-content">用户总数：<span class="num">{{yesSum}}</span></p>
      <p class="desc-content">昨日新增:<span class="num">{{yesAdd}}</span>,昨日流失<span class="num">{{yesMinus}}</span></p>
    </div>
    <div class="chart-wrapper">
      <h3 class="chart-title">用户数统计</h3>
      <el-form>
        <el-radio-group v-model="selectedLineType" @change="handleChangeLineType" tyle="margin-left: 30px" size="small" fill="#D8EBFF" text-color="#2578DF">
          <el-radio-button v-for="(value,key) in lineTypes" :key="key" :label="key">{{value}}</el-radio-button>
        </el-radio-group>
      </el-form>
      <div>
        <line-chart class="chart" ref="lineChart"></line-chart>
      </div>
    </div>
    <div class="chart-wrapper">
      <h3 class="chart-title">用户分布</h3>
      <el-row>
        <el-col :span=8>
          <el-radio-group style="margin-left: 30px" v-model="selectedPieType" size="small" fill="#D8EBFF" text-color="#2578DF" @change="handleChangePieType">
            <el-radio-button v-for="(value,key) in pieTypes" :key="key" :label="key">{{value}}</el-radio-button>
          </el-radio-group>
          <pie-chart ref="pieChart"></pie-chart>
        </el-col>
        <el-col :span=16>
          <bar-chart ref="barChart"></bar-chart>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import pieChart from '@/components/common/charts/pieChart';
import lineChart from '@/components/common/charts/lineChart';
import barChart from '@/components/common/charts/barChart';
export default {
  data: function() {
    return {
      durations: {
        '7days': '近七天',
        '15days': '近十五天',
        '30days': '近三十天'
      },
      lineTypes: {
        'changeUser': '用户变化',
        'allUser': '用户总数'
      },
      pieTypes: {
        'age': '年龄',
        'sex': '性别'
      },
      selectedDuration: '7days',
      selectedLineType: 'changeUser',
      selectedPieType: 'age',
      querys: {
        selectedProduct: '0',
        selectedProvince: '0'
      },
      yesSum: 100,
      yesAdd: 13,
      yesMinus: 5
    };
  },
  components: {
    lineChart,
    pieChart,
    barChart
  },
  created: function() {
    var data = this.generateData();
    console.log('data', data);
    // 经测试，必须在nextTick中执行
    // 因为刚创建的时候，$refs的初始化可能尚未完成
    this.$nextTick(function() {
      this.$refs.lineChart.update(data.userAll, data.userAdd, data.userMinus);
      this.$refs.pieChart.update(data.age, data.sex);
      this.$refs.barChart.update(data);
    });
  },
  computed: {},
  methods: {
    handleQuery: function() {
      // 点击查询
    },
    handleChangeDuration: function(duration) {
      console.log('duration', duration);
      // 切换折线图显示时长
      this.$refs.lineChart.updateLineDuration(duration);
    },
    handleChangeLineType: function(lineType) {
      console.log('lineType', lineType);
      // 切换折线图显示类型，是显示用户总数，还是显示用户新增/流失
      this.$refs.lineChart.updateLineType(lineType);
    },
    handleChangePieType: function(pieType) {
      // 切换饼图显示类型，是显示用户性别分布，还是显示用户年龄分布
      this.$refs.pieChart.updatePieType(pieType);
    },
    generateData: function() {
      var ret = {};
      // 折线图部分
      ret.userAll = [];
      ret.userAdd = [];
      ret.userMinus = [];
      var curDate = new Date();
      for (var i = 1; i <= 30; i++) {
        var userAll = Math.round(Math.random() * 1000000);
        var userAdd = Math.round(Math.random() * 100);
        var userMinus = Math.round(Math.random() * 100);
        var key = (curDate.getMonth() + 1) + '月' + curDate.getDate() + '日';
        // 变量作为key的时候，会被直接解析为一个字符串，因此需要借助o
        // 不能复用一个o，因为引用的关系，添加的只会是最后一个o的取值
        var o = {};
        o[key] = userAll;
        ret.userAll.unshift(o);
        var o1 = {};
        o1[key] = userAdd;
        ret.userAdd.unshift(o1);
        var o2 = {};
        o2[key] = userMinus;
        ret.userMinus.unshift(o2);
        curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000);
      }
      // 饼图部分
      ret.sex = { '男性': 55, '女性': 45 };
      ret.age = { '20岁以下': '10', '20-30岁': '17', '30-40岁': '21', '40-50岁': '33', '50岁以上': '27' };
      ret.province = { '北京': 100000, '上海': 239434, '天津': 223324, '杭州': 11111 };
      // 柱状图部分
      return ret;
    }
  }
};

</script>
<style lang="scss" scoped>
.dashboard {
  padding: 0 20px;
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
  .chart-wrapper {
    border-top: 1px solid #EAEBED;
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
