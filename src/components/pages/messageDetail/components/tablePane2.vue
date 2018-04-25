<template lang="html">
  <div class="tablepane-wrapper">
    <p class="time"><span class="label"><i class="icon-back-r iconfont"></i>短信发送规则：</span>{{rule}}
    <!--  <el-button type="primary" icon="el-icon-document" class="download-btn" @click="handleDownload">导出excel</el-button>-->
    </p>
    <el-table :data="tableData" v-loading.body="tableLoading" class="content-table" border>
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
    // if (this.tableData) {
    //   this.mergeIndex = this.findMergeTableIndex(this.tableData, {
    //     'intro': 0,
    //     'state': 1
    //   });
    // }
  },
  methods: {}
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
