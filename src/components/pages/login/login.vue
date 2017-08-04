<template>
    <div class="login-wrapper">
        <div class="form-wrapper">
            <el-form :model="formData" :rules="rules" ref="loginForm" class="demo-ruleForm">
                <div class="form-title">
                    2I支撑维系平台
                </div>
                <el-form-item prop="username">
                    <el-input v-model="formData.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="formData.password"></el-input>
                </el-form-item>
                <div class="form-submit">
                    <el-button type="primary" class="login-btn" @click="submitLoginForm" :loading="loading">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script type="text/javascript">
import { getToken } from '@/util/auth.js'; 
export default {
    name: 'login',
    data: function() {
        var validPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('密码不能小于6位'));
            } else {
                callback();
            }
        };
        return {
            formData: {
                username: '',
                password: ''
            },
            loading: false,
            tipShow: false,
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    validator: validPass,
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        submitLoginForm: function() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    // 通过校验
                    this.loading = true;
                    // 分发登录请求
                    this.$store.dispatch('login', this.formData).then((res) => {
                        this.loading = false;
                        // 页面跳转
                        if (res.token) {
                            // 说明账户和密码有效,开始路由跳转
                        }
                    }).catch(error => {
                        console.log('login.vue error', error);
                        this.loading = false;
                        // 弹出登录失败的提示
                    });
                } 
            });
        }
    }
};
</script>
<style lang="scss" scope>
.login-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .form-wrapper {
        background-color: #fff;
        width: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px;
        border-radius: 10px;
        .form-title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
        }
        .el-form-item__content {
            line-height: 50px;
        }
        .login-btn {
            width: 100%;
            text-align: center;
        }
    }
}
</style>
