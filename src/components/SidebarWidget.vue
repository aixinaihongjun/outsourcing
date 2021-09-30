<template>
  <div class="sidebar-widget">
    <div class="widget-content d-flex flex-column justify-content-center align-items-center">
      <router-link to="#" class="btn-style-one">发布您的任务</router-link>
      <div style="margin-top: 20px;">
        想通过
        <router-link :to="baseURL">青盟</router-link>
        成为开发者 ,
        <router-link :to="baseURL + '/register/2'">
          现在就申请 >>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarWidget",
  computed: {
    baseURL(){
      return process.env.VUE_APP_URL;
    }
  }
}
</script>

<style scoped>

</style>