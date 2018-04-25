<template lang="html">
  <div class="tabpane-wrapper">
    <template v-if="tableList">
    <table-pane v-for="(item,index) in tableList" :tableData="item.data" :rule="item.rule" :loading="tableLoading" :key="index"></table-pane>
  </template>
    <div v-else>此产品无此类短信模版！</div>
  </div>
</template>

<script>
import {
  getMessageDetail
} from '@/api/messageDetail.js';
import {
  isEmptyObject
} from '@/util/index.js';
import tablePane from './tablePane.vue';
export default {
  components: {
    tablePane
  },
  data() {
    return {
      tableList: [],
      tableLoading: false
    };
  },
  props: {
    type: {
      type: String,
      default: 'chognzhi'
    },
    product: {
      type: String
    }
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.tableLoading = true;
      return getMessageDetail(this.product, this.type).then((res) => {
        this.tableList = res;
        this.tableLoading = false;
        console.log('tableList', this.tableList);
      }).catch((error) => {
        this.tableLoading = false;
        this.$alert(error, '提示', {
          confirmButtonText: '确定'
        });
      });
    }
  }
}
</script>

<style lang="scss">
@import '../../../../common/scss/colors.scss';
.tabpane-wrapper {
    .title {
        font-size: 18px;
        background-color: #409EFF;
        color: #FFF;
        font-weight: bold;
        padding: 15px 20px;
    }
    .content-table {
        width: 100%;
        margin: 15px 0 50px;
    }
    .el-table th {
        background-color: #EEF1F6;
    }
    .time {
        text-align: right;
        height: 50px;
        line-height: 50px;
        color: $light-black;
        font-size: 16px;
        overflow: hidden;
        .download-btn {
            float: right;
        }
        .label {
            color: #20A0FF;
        }
        .iconfont {
            font-size: 18px;
            margin: 0 10px;
        }
    }
}
</style>
