<template>
  <div class="login">
    <div class="avatar-box">
      <img src="@/assets/logo.png" alt="" class="avatar" />
    </div>
    <el-card shadow="hover" class="login-card">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-s-custom"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-unlock"
            v-model="loginForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="submit"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="btn-login">
          <el-button
            type="primary"
            @click.native.prevent="submit"
            :loading="loading"
            >登录</el-button
          >
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      // 数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 定义校验规则
      loginRules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions("user", ["loginIn"]),
    async submit() {
      try {
        await this.$refs.loginForm.validate();
        this.loading = true;
        await this.loginIn(this.loginForm);
        this.$router.push("/welcome");
        Message.success("登陆成功");
        this.loading = false;
      } catch (error) {
        Message.success("登陆失败");

        this.loading = false;
        console.log(error);
      }
    },
    // 重置
    reset() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.form {
  margin-top: 50px;
}
.login {
  height: 100%;
  background-color: #2b4b6b;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 450px;
  height: 300px;
}
.btn-login {
  display: flex;
  justify-content: flex-end;
}
.avatar-box {
  z-index: 10;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px green;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
</style>
