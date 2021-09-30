<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-30 10:12:12
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-12 12:10:29
-->
<template>
  <div class="schedule ls-widget h-100">
    <div class="qm-widget-title flex align-items-center"><span class="qingmeng-icon icon-timeline-line-blue"></span> <span v-if="projectName">{{projectName}} </span> 任务时间线</div>
    <div class="qm-widget-content">
      <ul class="schedule-list">
        <li v-for="(item, index) in scheduleList" :key="item.id">
          <span class="circle" :style="{borderColor:colorList[(index+1)%4]}"></span>
          <div class="schedule">
            <h6 v-if="item.id == 3 && index == 0" style="color: #1b64dd; cursor: pointer;" @click="getWantDeveloperList($route.params.id)">{{timeline[item.id].content}} >></h6>
            <h6 v-else-if="(timeline[item.id] && !timeline[item.id].to) || index != 0 || $route.path.includes('evaluate')">{{timeline[item.id].content}}</h6>
            <router-link v-else-if="timeline[item.id] && timeline[item.id].to" :to="timeline[item.id].to + $route.params.id">
              <h6>{{timeline[item.id].content}} >></h6>
            </router-link>
            <p>{{item.createTime}}</p>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="提示" :visible.sync="wantDevloperDialogVisible" width="50%" :append-to-body='true' custom-class="qm-dialog" top="30vh">
      <el-table :data="wantDeveloperList" style="width: 100%">
        <el-table-column header-align="center" align="center" prop="date" label="头像" width="80">
          <template slot-scope="scope">
            <el-avatar v-if="scope.row.icon" class="avatar" size="small" :src="getAbsPath(scope.row.icon)"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="userName" label="昵称" width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="message" label="宣言">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <button class="theme-btn btn-style-one small" @click="$router.push(`/workbench/seedeveloper/${$route.params.id}/${scope.row.userId}/${scope.row.userName}`)">查看开发者</button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wantDevloperDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="wantDevloperDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import projectScheduleMixin from "@/utils/projectScheduleMixin";

export default {
  props: ["scheduleList", "projectName"],
  data() {
    return {};
  },
  mixins: [projectScheduleMixin],
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>