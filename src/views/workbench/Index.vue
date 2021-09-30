<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-24 11:56:14
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-24 12:46:07
-->
<template>
  <div class="workbench-wrapper">
    <UserSidebar :hasAuth="isHavingAuth"></UserSidebar>
    <section class="user-dashboard">	
<!--      <div class="dashboard-outer">-->
        <router-view />
<!--      </div>-->
    </section>
  </div>
</template>

<script>
import UserSidebar from "./components/UserSidebar.vue";
import { getUserInfo } from '@/utils/auth'
export default {
  name: "Workbench",
  components: {
    UserSidebar,
  },
  methods: {
	isHavingAuth(){
		return JSON.parse(getUserInfo()).hasAuth;
	}
  }
};
</script>

<style>
</style>
