<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 12:38:11
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-13 17:35:18
-->
<template>
  <header :class="headerStyle">
    <!-- Main box -->
    <div class="main-box">
      <!--Nav Outer -->
      <div class="nav-outer">
        <div class="logo-box">
          <div class="logo">
            <router-link to="/">
              <img :src="require('../assets/images/logo.svg')" alt title />
            </router-link>
          </div>
        </div>

        <nav class="nav main-menu">
          <ul class="navigation" id="navbar">
            <li>
              <router-link to="/home">首页</router-link>
            </li>
            <li>
              <router-link to="/tasks">任务大厅</router-link>
            </li>
            <li>
              <router-link to="/developers">人才市场</router-link>
            </li>
            <li>
              <router-link to="/workbench">工作台</router-link>
            </li>
          </ul>
        </nav>
        <!-- Main Menu End-->
      </div>

      <div v-if="token" class="outer-box">
        <!-- Login/Register -->
        <!-- Dashboard Option -->
        <!-- <button class="menu-btn">
          <span class="count">1</span>
          <span class="icon la la-heart-o"></span>
        </button> -->

        <button v-if="token" class="menu-btn" @click="$router.push('/workbench/my-messages')">
          <span v-if="hasMessage" class="count"></span>
          <span class="icon la la-bell"></span>
        </button>
        <div class="dropdown dashboard-option">
          <a @click="isDropShow = !isDropShow" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
            <img :src="getAbsPath(userInfo.avatar)" alt="avatar" class="thumb" />
            <span class="name">{{ userInfo.username }}</span>
          </a>
          <ul class="dropdown-menu" :class="{ show: isDropShow }">
            <li v-for="item in dropdownList" :key="item.path">
              <router-link :to="item.path">
                <i :class="item.icon"></i> {{ item.title }}
              </router-link>
            </li>
            <li @click="logout">
              <a> <i class="la la-sign-out"></i>退出</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="btn-box">
        <router-link to="/login" class="theme-btn btn-style-three call-modal">登录</router-link>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header">
      <div class="logo">
        <router-link to="/">
          <img src="/images/logo.svg" alt title />
        </router-link>
      </div>

      <!--Nav Box-->
      <div class="nav-outer clearfix">
        <div class="outer-box">
          <!-- Login/Register -->
          <div class="login-box">
            <a href="login-popup.html" class="call-modal">
              <span class="icon-user"></span>
            </a>
          </div>

          <a href="#nav-mobile" class="mobile-nav-toggler">
            <span class="flaticon-menu-1"></span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div id="nav-mobile"></div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainHeader",
  computed: {
    ...mapState(["token", "userInfo"]),
    headerStyle() {
      let style = "main-header";
      if (this.$route.path.includes("workbench")) {
        style += " header-shaddow";
      }
      return style + " " + this.headerClass;
    },
  },
  props: ["headerClass"],
  watch: {
    $route() {
      this.isDropShow = false;
    },
  },
  data() {
    return {
      dropdownList: [
        { title: "个人中心", path: "/profile", icon: "la la-user-alt" },
        { title: "修改密码", path: "changePassword", icon: "la la-lock" },
      ],
      isDropShow: false,
      hasMessage: 0,
    };
  },
  created() {
    if (this.token) {
      this.hasUnreadMessage();
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    hasUnreadMessage() {
      this.axios.get("/message/hasUnreadMessage").then((res) => {
        this.hasMessage = res;
      });
    },
  },
};
</script>

<style lang="scss">
// .main-header{
//   background: #fff;
// }
.logo img {
  height: 50px;
}
.main-menu .navigation > li > a {
  &.router-link-active,
  &:hover {
    color: #1967d2;
  }
}
.dashboard-option .dropdown-menu li a {
  &.router-link-exact-active,
  &:hover {
    color: #1967d2;
    background: rgba(25, 103, 210, 0.1);
  }
}
</style>
