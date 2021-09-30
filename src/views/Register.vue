<!--
 * @Description: 注册页面
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 12:38:56
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-09 11:47:25
-->

<template>
  <div class="login-section">
    <div class="image-layer"></div>
    <div class="outer-box">
      <!-- Login Form -->
      <div class="login-form default-form">
        <div class="form-inner">
          <h3>注册账户</h3>

          <div class="form-group">
            <label>用户名</label>
            <input type="text" v-model="username" placeholder="请输入用户名" />
          </div>

          <div class="form-group">
            <label>密码</label>
            <input type="password" v-model="password" placeholder="请输入密码" />
          </div>

          <div class="row form-group box">
            <p class="col-lg-6">
              <label>电话</label>
              <input type="text" v-model="phone" placeholder="请输入您的电话" />
            </p>
            <p class="col-lg-6">
              <label>验证码</label>
              <input type="text" v-model="code" placeholder="请输入验证码" />
              <button @click='getCode' type="button" id="code-btn" class="theme-btn btn-style-three large">获取验证码</button>
            </p>
          </div>
          <div class="form-group submit">
            <button class="theme-btn btn-style-one" @click="handleRegister">注册</button>
          </div>
        </div>
      </div>
      <!--End Login Form -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      code: "",
      phone: "",
      identityTag: ""
    };
  },
  created() {
    this.identityTag = this.$route.params.identityTag;
  },
  methods: {
    ...mapMutations(["login"]),
    getCode() {
      this.axios
        .post(
          "/user/sendMessageCode",
          {},
          {
            params: {
              phone: this.phone,
              identityTag: this.identityTag
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
    handleRegister() {
      this.axios
        .post("/user/register", {
          username: this.username,
          password: this.password,
          code: this.code,
          phone: this.phone,
          identityTag: this.identityTag,
        })
        .then((res) => {
          console.log(res);
          return this.axios.post("/user/login", {
            username: this.username,
            password: this.password,
          });
        })
        .then((res) => {
          this.login({ ...res, username: this.username });
          this.$router.go(-3);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-section .image-layer {
  background-image: url(../assets/images/background/register-bg.png);
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100% - 170px);
  margin: 120px 0 50px;
  border-radius: 0 20px 20px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.box {
  display: flex;
  justify-content: space-between;
  p {
    position: relative;
    margin-bottom: 20px;
    #code-btn {
      position: absolute;
      bottom: -10px;
      right: 10px;
      width: 40%;
      padding: 20px 20px;
    }
  }
}
.submit {
  margin-top: 20px;
}
</style>
