<template lang="html">
  <div class="password-reset">
    <el-form :model="passwordData" label-width="130px" ref="passwordForm" class="password-form" :rules="passwordRules">
      <el-form-item label="云门户账号" prop="username">
        <el-input v-model="passwordData.username"></el-input>
      </el-form-item>
      <el-form-item label="发送类型">
        <el-select v-model="passwordData.sendType">
          <el-option label="邮箱" value="email"></el-option>
          <el-option label="手机" value="phone" disabled></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model="passwordData.verifyCode"></el-input>
        <span class="codeImg" @click=changeVerifyCode>{{initCode}}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword">密码重置</el-button>
        <el-button @click="gotoLogin">返回首页</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import {
  getVerifyCode
} from '@/api/user.js';
export default {
  data: function() {
    let validVerifyCode = function(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入验证码'));
      } else if (value !== this.initCode) {
        callback(new Error('验证码输入错误！'));
      } else {
        callback();
      }
    };
    return {
      passwordData: {
        username: '',
        sendType: 'email',
        verifyCode: ''
      },
      initCode: '',
      passwordRules: {
        username: [{
          required: true,
          message: '请输入云门户账号',
          trigger: 'blur'
        }],
        verifyCode: [{
          validator: validVerifyCode,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted: function() {
    // 获取验证码
    getVerifyCode().then((val) => {
      this.initCode = val.verifyCode;
    });
  },
  methods: {
    resetPassword: function() {
      // 重置密码，向后台发送请求
      console.log(JSON.stringify(this.passwordData));
    },
    gotoLogin: function() {
      // 返回登录页面
      this.$router.push({
        path: '/login'
      });
    },
    changeVerifyCode: function() {
      getVerifyCode().then((val) => {
        this.initCode = val.verifyCode;
      });
    }
  }
}
</script>

<style lang="scss">
.password-reset {
    .password-form {
        width: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        border: 1px solid #CCC;
        padding: 30px 20px 10px;
        .codeImg {
            display: inline-block;
            border: 1px solid #999;
            background: linear-gradient(30deg, #8492A6, #EFF2F7, #324057);
            padding: 2px 5px;
            letter-spacing: 10px;
            font-size: 18px;
            margin-top: 5px;
            font-weight: 600;
            cursor: pointer;
        }
    }
}
</style>
