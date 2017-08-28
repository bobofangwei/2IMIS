<template>
  <div class="productDayForm-wrapper">
    <div class="main-wrapper">
      <breadbar></breadbar>
      <div class="query-form-wrapper">
        <el-form ref="form" label-position="left" :model="queryFormData" label-width="100px" :inline="true" :rules="queryFormRules">
          <el-form-item prop="selectedProvince" required>
            <el-select v-model="queryFormData.selectedProvince" placeholder="请选择地域">
              <el-option v-for="(province,code) in provinceMap" :key="code" :value="code" :label="province"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="selectedDate" required>
            <el-date-picker v-model="queryFormData.selectedDate" align="left" type="month" placeholder="选择月份" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryByProvince">查询</el-button>
            <download-btn :data="productData" :header="tableHeaderData"></download-btn>
          </el-form-item>
        </el-form>
      </div>
      <div class="data-form-wrapper">
        <el-table :empty-text="tableMsg" show-summary :header="tableHeaderData" :data="productData" border style="width: 100%" :height="610" v-loading="isLoading" element-loading-text="拼命查询中...">
          <el-table-column v-for="item in tableHeaderData" :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
import downloadBtn from '@/components/common/downloadBtn/downloadBtn.vue';
import { queryMonthformByProvince } from '@/api/monthForm.js';
import { mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      queryFormData: {
        selectedProvince: '',
        selectedDate: ''
      },
      // 查询表单的校验规则
      queryFormRules: {
        selectedProvince: [{ required: true, message: '请输入地域' }],
        selectedDate: [{ type: 'date', required: true, message: '请选择日期' }]
      },
      pickerOptions: {
        disabledDate(time) {
          // 选择今天之前的时间
          return time.getTime() > new Date(Date.now() - 24 * 60 * 60 * 1000);
        }
      },
      isLoading: false,
      tableMsg: '请选择地域和月份,进行查询',
      tableHeaderData: [{
          prop: 'product_name',
          label: '类别'
        }, {
          prop: 'sum_user',
          label: '用户总数'
        }, {
          prop: 'last_mon_add',
          label: '上月新增'
        }, {
          prop: 'mon_add',
          label: '当月新增'
        }, {
          prop: 'mon_tingji',
          label: '当月停机'
        }, {
          prop: 'mon_qianfei',
          label: '当月欠费'
        }, {
          prop: 'mon_xiaohu',
          label: '当月销户'
        },
        {
          prop: 'mon_shouchong',
          label: '当月首充'
        }
      ],
      productData: null
    };
  },
  components: {
    breadbar,
    downloadBtn
  },
  methods: {
    queryByProvince: function() {
      // 校验是否进行了地域和日期选择
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          queryMonthformByProvince(this.queryFormData.selectedProvince, this.queryFormData.selectedDate.toLocaleString()).then((res) => {
            // console.log(res);
            this.isLoading = false;
            this.productData = this.dealQueryResult(res);
          }).catch((err) => {
            this.isLoading = false;
            this.tableMsg = '服务器汇报了一个错误，工程师正在紧急处理中...';
            console.log(err);
          })
        }
      });
    },
    // 寻找卡ID和卡名称的对应关系
    dealQueryResult: function(res) {
      let result = res.map((item) => {
        if (!this.productMap[item.product_id]) {
          return null;
        } else {
          item.product_name = this.productMap[item.product_id];
          return item;
        }
      }).filter((item) => {
        return item !== null;
      });
      return result;
    }
  },
  computed: {
    ...mapGetters([
      'productMap',
      'provinceMap'
    ])
  }
};

</script>
<style lang="scss" scope>
.productDayForm-wrapper {
  .main-wrapper {
    width: 90%;
    margin: 20px auto;
  }
  .query-form-wrapper {
    margin: 15px 0 10px 0;
  }
}

</style>
