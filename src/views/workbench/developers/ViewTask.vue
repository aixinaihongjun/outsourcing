<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-29 14:14:36
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-11 15:39:21
-->
<template>
  <div class="dashboard-outer">
    <UpperTitle title="查看任务" text="任务详情。">
      <button @click="cancelProject"
              v-if="project.projectScheduleList && project.projectScheduleList.length>0 && project.projectScheduleList[0].id<4"
              type="button" class="theme-btn btn-style-three">撤销任务
      </button>
      <button @click="evaluateDialogVisible = true"
              v-if="project.projectScheduleList && project.projectScheduleList.length>0 && project.projectScheduleList[0].id==10"
              type="button" class="theme-btn btn-style-four">请您评价
      </button>
    </UpperTitle>
    <ProjectBrief :projectDetail="project"></ProjectBrief>
    <div class="row">
      <div class="col-lg-4">
        <RestDay :restDay="project.endDateWarn"></RestDay>
        <Schedule :scheduleList="project.projectScheduleList"></Schedule>
      </div>
      <div class="col-lg-8">
        <ProjectTab :projectDetail="project" @update-logo="handleUpdateProjectLogo"></ProjectTab>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="evaluateDialogVisible" width="30%" :append-to-body='true'
               custom-class="qm-dialog" top="30vh">
      <template slot="title">
        <div class="dialog-title flex"><span class="icon la la-pencil"></span> 请您评价</div>
      </template>
      <div>
        <div class="evaluate-group flex">
          <div class="title">评分</div>
          <el-rate v-model="rate"></el-rate>
        </div>
        <div class="evaluate-group flex">
          <div class="title">评价</div>
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="evaluation"></el-input>
        </div>
      </div>
      <template slot="footer" class="dialog-footer">
        <el-button @click="evaluateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="evaluateProject">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import UpperTitle from "../components/UpperTitle.vue";
import ProjectBrief from "../components/ProjectBrief.vue";
import Schedule from "../components/Schedule.vue";
import ProjectTab from "../components/ProjectTab.vue";
import RestDay from "../components/RestDay";

export default {
  name: "ViewTask",
  components: {
    UpperTitle,
    ProjectBrief,
    RestDay,
    Schedule,
    ProjectTab,
  },
  data() {
    return {
      projectId: 0,
      project: {},
      evaluateDialogVisible: false,
      rate: 5,
      evaluation: "",
    };
  },
  created() {
    this.projectId = this.$route.params.id;
    this.getProjectInfo();
  },
  methods: {
    getProjectInfo() {
      this.axios
          .get("/project/projectDetail", {
            params: {
              projectId: this.projectId,
            },
          })
          .then((res) => {
            this.project = res;
          });
    },
    cancelProject() {
      this.openMessageBox({
        title: "确定撤销本任务吗？",
        content: "撤销任务会对您在本站的信誉产生影响，请谨慎操作。",
        handleConfirm: () => {
          this.axios
              .post("/project/cancelProject", {}, {params: {projectId: this.projectId}})
              .then(() => {
                this.$message({
                  type: "success",
                  message: "撤销成功!",
                });
                setTimeout(() => {
                  this.$router.back();
                }, 2000);
              });
        },
        handleCancel: () => {
          this.$message({
            type: "info",
            message: "已取消撤销",
          });
        },
      });
    },
    handleUpdateProjectLogo(logoUrl) {
      this.project.projectLogo = logoUrl;
    },
    evaluateProject() {
      this.axios
          .post("/projectSchedule/completeDeveloperEvaluation", {
            content: this.evaluation,
            projectId: 19,
            starCount: this.rate,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "评价成功!",
            });
            this.evaluateDialogVisible = false;
            this.getProjectInfo();
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-title {
  font-size: 20px;
  font-family: Adobe Heiti Std;
  color: #000000;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;

  .icon {
    color: #1966d2;
    font-size: 25px;
    margin-right: 10px;
  }
}

.evaluate-group {
  padding: 0 20px;
  align-items: baseline;
  margin-bottom: 20px;

  .title {
    margin-right: 20px;
    white-space: nowrap;
  }
}
</style>
