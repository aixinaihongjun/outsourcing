<!--
 * @Description: 登录页面
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 12:38:56
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-09 11:51:37
-->

<template>
  <div class="login-section">
    <div class="image-layer"></div>
    <div class="outer-box">
      <!-- Login Form -->
      <div @keyup.enter="handleLogin" class="login-form default-form">
        <div class="form-inner">
          <h3>登录账户</h3>
          <!--Login Form-->
          <div class="form-group">
            <label>用户名</label>
            <input type="text" v-model="username" placeholder="请输入用户名"/>
          </div>

          <div class="form-group">
            <label>密码</label>
            <input type="password" v-model="password" placeholder="请输入密码"/>
          </div>

          <div class="form-group">
            <div class="field-outer">
              <router-link class="pwd" to="/chooseIdentity">去注册 &gt;</router-link>
              <router-link class="pwd" to="/register">忘记密码？</router-link>
            </div>
          </div>

          <div class="form-group">
            <button class="theme-btn btn-style-one" @click="handleLogin"> 登录</button>
          </div>
        </div>
      </div>
      <!--End Login Form -->
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations(["login"]),
    handleLogin() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        //TODO: 处理redirect
        // this.$router.push('/workbench/dashboard')
        this.$router.push({ path: this.redirect || '/workbench/dashboard'}).catch((error) => {
          console.info(error);
        })
      })
    },
  },
};
</script>

<style>
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
</style>
