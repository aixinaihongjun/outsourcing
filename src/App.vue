<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 10:06:37
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-13 18:26:41
-->
<template>
  <div id="app">
    <!-- Preloader -->
    <!--<div class="preloader"></div>-->

    <div v-if="isWorkbench" class="page-wrapper dashboard">
      <!-- Header Span -->
      <span class="header-span"></span>

      <!-- Main Header-->
      <main-header :headerClass="headerClass"></main-header>
      <!--End Main Header -->

      <!-- Main Body-->
      <router-view />
      <!-- End Main Body-->
    </div>
    <div v-else class="page-wrapper">
      <!-- Header Span -->
      <span class="header-span" v-if="$route.path != '/home' && needFooter"></span>

      <!-- Main Header-->
      <main-header :headerClass="headerClass"></main-header>
      <!--End Main Header -->

      <!-- Main Body-->
      <router-view />
      <!-- End Main Body-->

      <!-- Main Footer -->
      <main-footer v-if="needFooter"></main-footer>
      <!-- End Main Footer -->
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import {getToken, getUserInfo} from "@/utils/auth";

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
  },
  computed: {
    needFooter() {
      return ![
        "/login",
        "/register/1",
        "/register/2",
        "/chooseIdentity",
      ].includes(this.$route.path);
    },
    isWorkbench() {
      return this.$route.path.includes("workbench");
    },
  },
  data() {
    return {
      headerClass: "",
    };
  },
  mounted() {
    let token = getToken();
    if(token){
      this.$store.commit('setToken', JSON.parse(token))
    }
    let userInfo = getUserInfo();
    if (userInfo) {
      this.$store.commit('setUserInfo', JSON.parse(userInfo))
    }
    this.handleScroll();
  },
  methods: {
    handleScroll() {
      let htmlDom = document.documentElement;
      window.onscroll = () => {
        if (htmlDom.scrollTop > 0) {
          this.headerClass = "fixed-header animated slideInDown";
        } else {
          this.headerClass = "";
        }
      };
    },
  },
};
</script>

<style lang="scss">
.main {
  overflow: scroll;
  height: 100vh;
}
</style>
