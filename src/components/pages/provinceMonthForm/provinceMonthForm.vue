<template>
  <div class="provinceDayForm-wrapper">
    <div class="main-wrapper">
      <breadbar></breadbar>
      <div class="query-form-wrapper">
        <el-form label-position="left" ref="form" :model="queryFormData" label-width="150px" :inline="true" :rules="queryFormRules">
          <el-form-item prop="selectedProduct">
            <el-select v-model="queryFormData.selectedProduct" placeholder="请选择产品">
                <template v-for="item in productMap">
              <el-option v-for="(value,key) in item" :key="key" :value="key" :label="value"></el-option>
                </template>
            </el-select>
          </el-form-item>
          <el-form-item prop="selectedDate">
            <el-date-picker v-model="queryFormData.selectedDate" placeholder="选择月份" type="month" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryByProvince">查询</el-button>
            <download-btn :data="productData" :header="tableHeaderData"></download-btn>
          </el-form-item>
        </el-form>
      </div>
      <div class="data-form-wrapper">
        <el-table :data="productData" border :empty-text="tableMsg" style="width: 100%" :height="610" v-loading="isLoading" element-loading-text="拼命查询中...">
          <el-table-column v-for="item in tableHeaderData" :prop="item.prop" :label="item.label">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
import downloadBtn from '@/components/common/downloadBtn/downloadBtn.vue';
import { mapGetters } from 'vuex';
import { queryMonthformByProduct } from '@/api/monthForm.js';
import { formatDate } from '@/common/js/util.js';

export default {
  data: function() {
    return {
      isLoading: false,
      tableMsg: '请选择产品和月份，进行查询...',
      queryFormData: {
        selectedProduct: '',
        selectedDate: ''
      },
      queryFormRules: {
        selectedProduct: [{ required: true, message: '请选择产品' }],
        selectedDate: [{ required: true, type: 'date', message: '请选择月份' }]
      },
      pickerOptions: {
        disabledDate(time) {
          // 选择今天之前的时间
          return time.getTime() > new Date(Date.now() - 24 * 60 * 60 * 1000);
        }
      },
      tableHeaderData: [{
          prop: 'province_name',
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
  methods: {
    queryByProvince: function() {
      this.$refs['form'].validate((valid) => {
        // console.log('valid', valid);
        if (!valid) {
          return;
        }
        this.isLoading = true;
        queryMonthformByProduct(this.queryFormData.selectedProduct, formatDate(this.queryFormData.selectedDate, 'yyyy-MM-dd')).then((res) => {
          // console.log(res);
          this.isLoading = false;
          if (res.length === 0) {
            this.tableMsg = '暂无数据';
          }
          this.productData = res;
        }).catch((err) => {
          this.isLoading = false;
          this.tableMsg = '服务器汇报了一个错误，程序员正在紧急处理中...';
          console.log(err);
        })
      });
    }
  },
  components: {
    breadbar,
    downloadBtn
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
.provinceDayForm-wrapper {
  .main-wrapper {
    width: 90%;
    margin: 20px auto;
  }
  .query-form-wrapper {
    margin: 15px 0 10px 0;
  }
}

</style>
