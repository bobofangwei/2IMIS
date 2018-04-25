<template lang="html">
  <div class="tablepane-wrapper">
  <p class="time"><span class="label"><i class="icon-back-r iconfont"></i>短信发送规则：</span>{{rule}}
  <!--  <el-button type="primary" icon="el-icon-document" class="download-btn" @click="handleDownload">导出excel</el-button>-->
  </p>
  <el-table :data="tableData" v-loading.body="tableLoading" class="content-table" border :span-method="spanMethod">
    <el-table-column label="说明" width="100px" align="center">
      <template slot-scope="props">
        {{props.row.intro}}
      </template>
    </el-table-column>
    <el-table-column  label="号码状态" width="160px" align="center">
      <template slot-scope="props">
        <span>{{props.row.state}}</span>
      </template>
    </el-table-column>
    <el-table-column label="号码类型" width="120px" align="center">
      <template slot-scope="props">
        {{props.row.type}}
      </template>
    </el-table-column>
    <el-table-column label="产品ID&产品名称" width="195px" align="center">
      <template slot-scope="props">
        <p v-for="obj in props.row.product">{{obj.id+' '+obj.name}}</p>
      </template>
    </el-table-column>
     <el-table-column label="短信内容" align="left">
       <template slot-scope="props">
       <span v-show="!props.row.edit">{{props.row.message}}</span>
       <el-input type="textarea" :autosize="{minRows:3}" v-show="!!props.row.edit" v-model="props.row.message"></el-input>
     </template>
   </el-table-column>
   <el-table-column label="操作" align="center" width="120px">
     <template slot-scope="scope">
    <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="el-icon-edit">编辑</el-button>
    <el-button v-show='scope.row.edit' type="success" @click='completeEdit(scope)' size="small" icon="el-icon-check">完成</el-button>
  </template>
   </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {
  getMessageDetail
} from '@/api/messageDetail.js';
import {
  isEmptyObject
} from '@/util/index.js';
export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rule: {
      type: String,
      default: ''
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log('this.tableData', this.tableData);
    if (this.tableData) {
      this.mergeIndex = this.findMergeTableIndex(this.tableData, {
        'intro': 0,
        'state': 1
      });
    }
  },
  methods: {
    // 处理excel的下载
    handleDownload() {
      // 使用webpack code splitting xlsx还是挺大的
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../../../vendor/Export2Excel');
        const tHeader = ['说明', '号码状态', '号码类型', '产品ID&产品名称', '短信内容'];
        const filterVal = ['intro', 'state', 'type', 'product', 'message'];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '列表excel');
      })
    },
    formatJson(filterVal, list) {
      return list.map(v => filterVal.map(j => v[j]));
    },
    completeEdit(scope) {
      // 加入验证规则
      // console.log('sope', scope);
      let validRet = this.validMessage(scope.row.message);
      if (validRet === true) {
        scope.row.edit = false;
      } else {
        // 弹出提示框
        this.$alert(validRet + ',请重新编辑', '提示', {
          confirmButtonText: '确定'
        });
      }
    },
    validMessage(message) {
      // 字数限制，140个字节，70个汉字
      if (message.length > 70) {
        return '短信字数不能超过70个汉字！';
      } else if (!message.trim().length) {
        return '短信内容不能为空';
      } else if (/10010|联通|王卡|宝卡/.test(message)) {
        return '短信不能包含10010、联通、王卡、宝卡等关键词';
      } else {
        return true;
      }
    },
    // 供表合并方法调用,找到需要合并的单元格坐标，以及需要合并的行，列
    // 先仅考虑行合并
    // data为用于渲染的表格数据，colProps为列属性与列Index的对应关系，如{'hasShouchong':0,'state':1}
    // 返回结果类型为｛0：｛0：5，5：5｝，1:｛0：2，2：1｝｝这种形式，最外层的key代表要合并的列，第二层的key代表要合并的单元格的rowIndex,其对应的value代表要合并的rowspan
    findMergeTableIndex(data, colProps) {
      this.mergeIndex = {};
      // 需要合并的列
      // elementUI中的table rowIndex以及colIndex都是从0开始计数
      // 这个算法还是有点复杂，值得体会
      let ret = {};
      for (let colProp in colProps) {
        let rowIndex = 0;
        let nextRowIndex = 1;
        let colIndex = colProps[colProp];
        ret[colIndex] = {};
        // 找到第一个和当前rowIndex不同的值
        while (nextRowIndex <= data.length) {
          // debugger
          while (nextRowIndex < data.length && data[rowIndex][colProp] === data[nextRowIndex][colProp]) {
            nextRowIndex++;
          }
          let rowspan = nextRowIndex - rowIndex;
          ret[colIndex][rowIndex] = rowspan;
          rowIndex = nextRowIndex;
          nextRowIndex++;
        }
      }
      console.log('待合并的列' + this.rule, ret);
      return ret;
    },
    spanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (!this.tableData) {
        return;
      }
      if (columnIndex in this.mergeIndex) {
        let temp = this.mergeIndex[columnIndex];
        if (isEmptyObject(temp)) {
          return;
        }
        if (rowIndex in temp) {
          return [temp[rowIndex], 1];
        } else {
          return [0, 0];
        }
      }
    }
  },
  watch: {
    tableData(newVal) {
      this.mergeIndex = this.findMergeTableIndex(newVal, {
        'intro': 0,
        'state': 1
      });
    }
  }
}
</script>

<style lang="scss">
@import '../../../../common/scss/colors.scss';
.tablepane-wrapper {
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
