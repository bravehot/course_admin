<template>
  <div class="wrap">
    <div class="content">
      <h1 class="title">山 东 科 技 大 学 课 程 管 理 中 心</h1>
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="用 户 名：" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密 码：" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="buttonBox">
        <el-button type="primary" @click="handleLogin('loginForm', 1)">登录</el-button>
        <el-button type="info" @click="handleLogin('loginForm', 2)">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { handleLogin } from "../../api/index.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ],
        password: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  methods: {
    handleLogin(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let result = await handleLogin({ type, ...this.loginForm });
          if (result.code === 200) {
            // 登录成功
            let { token, username } = result.data;
            document.cookie = `token=${token}`; // 设置token
            this.$store.dispatch("handleLogin", username)
            this.$router.push('/class')
          } else {
            this.$message.error("用户名或密码错误！");
            this.resetForm(formName);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100vh;
  background-color: #b8e5f8;
  background-image: url("../../../src/assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 400px;
    padding: 20px 30px;
    background: #ffffff;
    border-radius: 20px;
    .title {
      text-align: center;
      line-height: 20px;
      font: bold 22px/32px "-apple-system";
      margin: 30px 0;
      color: #0084ff;
    }
    .el-form {
      width: 300px;
      margin: 0 auto;
    }
    .buttonBox {
      width: 50%;
      display: flex;
      margin: 60px auto 20px;
      justify-content: space-around;
    }
  }
}
// mobile
@media screen and (max-width: 680px){
  .content {
    width: 500px !important;
    .title {
      font: bold 30px/32px "-apple-system" !important;
    }
    .el-form {
      width: 400px;
      .el-input {
        font-size: 22px;
      }
    }
    button {
      font-size: 22px;
    }
  }
}
</style>
