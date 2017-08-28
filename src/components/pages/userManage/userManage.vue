<template>
  <div class="user-manage">
    <div class="main-wrapper">
      <breadbar></breadbar>
      <div class="form-wrapper">
        <el-button type="primary" @click="handleAdd" class="ope-btn">新增用户</el-button>
        <el-button type="warning" @click="handleBatchDelete" class="ope-btn">批量删除</el-button>
        <el-table ref="userTable" border :data="userList" @selection-change="handleSelect">
          >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="公司" prop="company"></el-table-column>
          <el-table-column label="部门" prop="apartment"></el-table-column>
          <el-table-column label="角色" prop="role"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" label-width="100px">
        <el-form ref="userForm" :model="curUser" label-width="80px" :rules="userRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="curUser.username" :disabled="usernameDisabled"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="curUser.name"></el-input>
          </el-form-item>
          <el-form-item label="公司" prop="company">
            <el-input v-model="curUser.company"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="apartment">
            <el-input v-model="curUser.apartment"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="curUser.role" placeholder="请选择用户角色">
              <el-option v-for="(role, key) in roleMap" :label="role" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <div v-for="(role, key) in roleMap">{{role}},{{key}}</div>
          <el-form-item>
            <el-button type="primary" @click="handleCertain">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
export default {
  data: function() {
    return {
      dialogVisible: false,
      dialogType: '', // 对话框的类型，是新增用户还是编辑用户
      curUser: {
        username: '',
        role: ''
      },
      usernameDisabled: true,
      roleMap: {
        'admin': '管理员',
        'PM': '2I项目经理'
      },
      userList: [{
        'username': 'bobo',
        'name': '李伟博',
        'company': '联通总部',
        'apartment': '电子商务部',
        'role': 'admin'
      }, {
        'username': 'zyg',
        'name': '郑永广',
        'company': '联通总部',
        'apartment': '电子商务部',
        'role': 'PM'
      }],
      multipleSelection: [],
      userRules: {
        username: [{ required: true, message: '请输入用户名' }],
        role: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
      }
    };
  },
  components: {
    breadbar
  },
  created: function() {
    this.dealUserData();
  },
  methods: {
    dealUserData: function() {
      this.userList.map((item) => {
        item.role = this.roleMap[item.role];
      });
    },
    handleEdit: function(scope) {
      // 弹出对话框
      this.usernameDisabled = true;
      this.curUser = Object.assign({}, this.userList[scope.$index]);
      this.dialogType = 'edit';
      this.$nextTick(() => {
        this.openDialog();
      });
    },
    // 新增用户
    handleAdd: function() {
      this.usernameDisabled = false;
      this.curUser = {};
      this.dialogType = 'add';
      this.openDialog();
    },
    // 删除单个用户
    handleDelete: function(scope) {
      // console.log(scope);
      // 删除用户
      this.userList.splice(scope.$index, 1);
      // 发送post请求服务器端删除
    },
    // 批量删除用户
    handleBatchDelete: function() {
      this.userList = this.userList.filter((item) => {
        return this.multipleSelection.indexOf(item) <= -1;
      });
      // 发送post请求服务器端删除（需要再请求一遍接口吗）
    },
    openDialog: function() {
      this.dialogVisible = true;
    },
    closeDialog: function() {
      this.dialogVisible = false;
    },
    // 可能是新增，也可能是编辑
    handleCertain: function() {
      this.$refs.userForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.curUser.role = this.roleMap[this.curUser.role];
        if (this.dialogType === 'add') {
          this.userList.unshift(this.curUser);
        } else if (this.dialogType === 'edit') {
          const index = this.userList.findIndex((item) => {
            return item.username === this.curUser.username;
          });
          console.log('index', index);
          this.userList.splice(index, 1, this.curUser);
        }
        this.closeDialog();
        console.log('确定后的用户信息', this.curUser);
      });
    },
    handleSelect: function(val) {
      this.multipleSelection = val;
    }
  }
};

</script>
<style lang="scss" scope>
.user-manage {
  .main-wrapper {
    width: 90%;
    margin: 20px auto;
  }
  .ope-btn {
    margin: 10px 20px 15px 0;
  }
}

</style>
