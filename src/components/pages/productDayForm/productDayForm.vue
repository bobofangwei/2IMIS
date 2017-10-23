<template>
  <div class="productDayForm-wrapper">
    <div class="main-wrapper">
      <breadbar></breadbar>
      <div class="query-form-wrapper">
        <el-form ref="form" label-position="left" :model="queryFormData" label-width="100px" :inline="true" :rules="queryFormRules">
          <el-form-item prop="selectedProvince" required>
            <el-select v-model="queryFormData.selectedProvince" placeholder="请选择地域">
            <template v-for="item in provinces">
              <el-option v-for="(value,key) in item" :key="key" :value="key" :label="value"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item prop="selectedDate" required>
            <el-date-picker v-model="queryFormData.selectedDate" align="left" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryByProvince">查询</el-button>
            <download-btn :data="productData" :header="tableHeaderData"></download-btn>
          </el-form-item>
        </el-form>
      </div>
      <div class="data-form-wrapper">
        <el-table :empty-text="tableMsg" :header="tableHeaderData" :data="productData" border style="width: 100%" :height="610" v-loading="isLoading" element-loading-text="拼命查询中...">
          <el-table-column v-for="item in tableHeaderData" :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
import downloadBtn from '@/components/common/downloadBtn/downloadBtn.vue';
import { queryDayformByProvince } from '@/api/dayForm.js';
import { mapGetters } from 'vuex';
import { formatDate } from '@/common/js/util.js';

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
      tableMsg: '请选择地域和日期,进行查询',
      tableHeaderData: [{
          prop: 'product_name',
          label: '类别'
        }, {
          prop: 'sum_user',
          label: '用户总数'
        }, {
          prop: 'yes_add',
          label: '当日新增'
        }, {
          prop: 'mon_add',
          label: '当月新增'
        }, {
          prop: 'yes_tingji',
          label: '当日停机'
        }, {
          prop: 'yes_qianfei',
          label: '当日欠费'
        }, {
          prop: 'yes_xiaohu',
          label: '当日销户'
        },
        {
          prop: 'yes_shouchong',
          label: '当日首充'
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
        console.log('省分映射', this.provinces);
      // 校验是否进行了地域和日期选择
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // console.log('日期对象', formatDate(this.queryFormData.selectedDate, 'yyyy-MM-dd'));
          queryDayformByProvince(this.queryFormData.selectedProvince, formatDate(this.queryFormData.selectedDate, 'yyyy-MM-dd')).then((res) => {
            // console.log(res);
            // this.productData = this.dealQueryResult(res);
            if (res.length === 0) {
                this.tableMsg = '暂无数据';
            }
            this.productData = res;
            this.isLoading = false;
            // console.log('productData', this.productData);
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
    ...mapGetters({
      'provinces': 'provinceMap'
    })
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
