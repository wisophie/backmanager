<template>
  <div class="login_container">
    <div class="box">
      <div class="avatar">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <el-form
        ref="formref"
        :rules="loginrules"
        class="loginform"
        :model="loginform"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginform.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            prefix-icon="el-icon-s-goods"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btsn">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetform()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: "admin",
        password: "123456",
      },
      loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    resetform() {
      this.$refs.formref.resetFields();
    },
    open2() {
      this.$message({
        message: "登录成功",
        type: "success",
      });
    },
    open4() {
      this.$message({
        showClose: true,
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    },
    login() {
      this.$refs.formref.validate(async (valid) => {
        if (!valid) return;
        await this.request.post("login", this.loginform).then((res) => {
          if (res.data.meta["status"] == 200) {
            this.$message.success("登录成功");
            window.sessionStorage.setItem("token", res.data.data.token);
            this.$router.push("/home");
          } else {
            this.$message.error("登录失败");
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(36, 35, 94);
  height: 100vh;
}
.box {
  position: absolute;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    position: absolute;
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
  .loginform {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
  }
  .btsn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>