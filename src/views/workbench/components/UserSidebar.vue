<!--
 * @Description: 仪表盘的侧边栏
 * @Autor: 孙婧雯
 * @Date: 2021-08-24 11:54:30
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-01 13:48:49
-->
<template>
  <!-- User Sidebar -->
  <div class="user-sidebar">
    <div class="sidebar-inner d-flex flex-column justify-content-lg-between">
      <ul class="navigation">
        <li :class="{'active': ('/workbench/'+item.path) == $route.path || ($route.meta.parentPath == item.path )}"
             v-for="(item) in navigations"
            :key="item.path">
          <router-link :to="'/workbench/'+item.path"><i :class="item.meta.icon"></i>{{ item.meta.title }}</router-link>
        </li>
      </ul>
      <button class="theme-btn btn-style-one btn-auth" @click="identityAuth" v-if="isHavingAuth === false">
        <span class="qingmeng-icon icon-authentication-line-white"></span>&nbsp;&nbsp;&nbsp;身份认证
      </button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { getUserInfo } from '@/utils/auth'

export default {
  name: "UserSidebar",
  data() {
    return {};
  },
  props:["isHavingAuth"],
  computed: {
    ...mapState(['routes']),
    navigations() {
      return this.routes[0].children.filter(item => {
        return !item.hidden
      });
    }
  },
  methods: {
    identityAuth(){
      const userInfo = getUserInfo();
      if (userInfo) {
        let { roles } = JSON.parse(userInfo);
        if (roles.includes('employer')) {
          this.$router.push('/workbench/company-auth');
        }else{
          this.$router.push('/workbench/personal-auth');
        }
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.user-sidebar .navigation li a:hover,
.user-sidebar .navigation li.active a {
  color: #1967d2;
  background: rgba(25, 103, 210, 0.1);

  i::before {
    color: #1967d2;
  }
}

.sidebar-inner{
  height: 100%;
}
</style>
