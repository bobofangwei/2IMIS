<template>
<div class="personCenter">
  <breadbar></breadbar>
  <!--
  <div class="basic-wrapper">
    <h2 class="section-title">基本信息</h2>
    <div class="content">
      <div class="photo-wrapper">
        <div class="photo-outter">
          <img src="./imgs/myphoto.jpg" class="photo" alt="">
        </div>
        <div class="btn-wrapper">
          <el-button type="primary">修改头像</el-button>
        </div>
      </div>
    </div>
  </div>-->
  <div class="password-wrapper">
    <h2 class="section-title">密码修改</h2>
    <el-form :model="passwordForm" label-width="100px" ref="passwordForm" class="password-form" :rules="changePasswordRules">
      <el-form-item label="当前密码:" prop="initPassword">
        <el-input type="password" v-model="passwordForm.initPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input type="password" v-model="passwordForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="重复密码:" prop="passwordAgain">
        <el-input type="password" v-model="passwordForm.passwordAgain"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePassword">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
import md5 from 'md5';
export default {
  data: function() {
    var validPass = (rule, value, callback) => {
      // 再次输入密码的验证
      if (!value) {
        callback(new Error('请再次输入新密码！'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入的密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        initPassword: '',
        newPassword: '',
        passwordAgain: ''
      },
      changePasswordRules: {
        initPassword: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }],
        newPassword: [{
          required: true,
          message: '请输入修改后的密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 10,
          message: '长度在6到10个字符',
          trigger: 'blur'
        }],
        passwordAgain: [{
          validator: validPass,
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    changePassword: function() {
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          // 得到一个副本
          var reqData = JSON.parse(JSON.stringify(this.passwordForm));
          for (let key in reqData) {
            reqData[key] = md5(reqData[key]);
          }
          console.log(reqData);
          alert('submit');
        } else {
          return false;
        }
      });
    }
  },
  components: {
    breadbar
  }
};
</script>
<style lang="scss" scope>
.personCenter {
    width: 90%;
    margin: 20px auto;
    .section-title {
        font-size: 20px;
        padding: 15px;
        background-color: #EFF2F7;
        color: #333;
        border-radius: 6px;
        margin: 15px 0;
    }
    .basic-wrapper {
        overflow: hidden;
        .photo-wrapper {
            float: left;
            margin: 15px 0;
            .photo-outter {
                width: 250px;
                height: 250px;
                border-radius: 50%;
                overflow: hidden;
                .photo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .btn-wrapper {
                margin-top: 20px;
                text-align: center;
            }
        }
    }
    .password-form {
        width: 40%;
        padding: 20px 15px 0 0;
        margin: 10px auto 0;
    }
}
</style>
