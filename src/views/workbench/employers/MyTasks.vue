<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-24 11:54:30
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-11 17:09:22
-->
<template>
  <div class="dashboard-outer">
    <UpperTitle title="我的任务" text="您所有的任务以及状态信息将在这里显示。"></UpperTitle>
    <div class="row">
      <div class="col-lg-12">
        <div class="ls-widget">
          <div class="qm-widget-content">
            <div class="table-header">
              <div class="title">任务列表</div>
              <ul class="tabs">
                <li :class="{active:tabTag == index}" @click="tabTag=index" v-for="(tab,index) in tabs" :key="tab.tabTag">{{ tab.title }} ({{ tab.count }})
                </li>
              </ul>
            </div>
            <el-table :data="projectList" style="width: 100%" border header-cell-class-name="row-head">
              <el-table-column align="center" prop="projectName" label="任务名称" width="180"></el-table-column>
              <el-table-column align="center" prop="projectBudget" label="任务预算" width="180"></el-table-column>
              <el-table-column align="center" prop="projectDuration" label="交付周期"></el-table-column>
              <el-table-column align="center" prop="endDate" label="过期时间"></el-table-column>
              <el-table-column align="center" prop="scheduleName" label="状态"></el-table-column>
              <el-table-column align="center" prop="address" label="操作">
                <template slot-scope="scope">
                  <button class="actions" @click="$router.push('/workbench/view-task/' +  scope.row.projectId)"><span class="la la-eye"></span></button>
                  <button class="actions" @click="$router.push({path:'/workbench/publish-task', query:{projectId:scope.row.projectId}})"
                          v-if="scope.row.scheduleId < 4">
                    <span class="la la-pencil"></span>
                  </button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpperTitle from "../components/UpperTitle.vue";

export default {
  name: "MyTasks",
  components: {
    UpperTitle,
  },
  data() {
    return {
      tabTag: 0,
      tabs: [],
      projectList: [],
      // 分页
      total: 0,
      pageNum: 1,
      pageSize: 5,
    };
  },
  created() {
    this.getStatusCount();
    this.getProjectListByStatus();
  },
  watch: {
    tabTag() {
      this.getProjectListByStatus();
    },
  },
  methods: {
    getStatusCount() {
      this.axios
        .get("/user/getPublisherUserProjectCountForProjectStatus")
        .then((res) => {
          this.tabs = res;
        });
    },
    getProjectListByStatus() {
      this.axios
        .get("/user/getProjectListByPublisherUserId", {
          params: {
            tabTag: this.tabTag,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          if (res && res.list) {
            this.projectList = res.list;
            this.total = res.total;
          } else {
            this.projectList = [];
            this.total = 0;
          }
        });
    },
    /**
     * @description:  通过任务id获取任务进度
     * @author: 孙婧雯
     * @param {*} project 要给哪一个任务添加进度
     */
    getProjectById(project) {
      project.isExpanded = !project.isExpanded;
      if (project.isExpanded && project.projectSchedule.length == 0) {
        this.axios
          .get("/projectSchedule/getProjectScheduleList", {
            params: {
              projectId: 19,
              // projectId: project.projectId,
            },
          })
          .then((res) => {
            console.log(666);
            project.projectSchedule = res;
          });
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getProjectListByStatus();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getProjectListByStatus();
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-outer {
  .widget-content {
    padding: 30px;
  }

  .tab-active {
    color: #1967d2;

    &::after {
      transform: scale(1);
    }
  }

  .table-header {
    padding: 20px 30px;
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
    white-space: nowrap;
    background: #f5f7fc;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .tabs {
      display: flex;

      li {
        margin-left: 30px;
        cursor: pointer;
        position: relative;
        transition: all ease 0.5s;
        font-size: 13px;

        &::after {
          transition: all ease 0.5s;
          position: absolute;
          bottom: -5px;
          content: "";
          display: block;
          height: 2px;
          width: 100%;
          border-radius: 2px;
          background: #1967d2;
          transform: scale(0);
        }

        &:hover {
          @extend .tab-active;
        }

        &.active {
          @extend .tab-active;
        }
      }
    }
  }

  .row-head {
    background-color: #fafafa !important;

    .cell {
      text-align: center;
    }
  }

  button.actions {
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(#1967d2, 0.07);
    margin: 0 10px;
    border-radius: 8px;
    color: #1967d2;
    // font-weight: 600;
    font-size: 20px;
    transition: all ease 0.5s;

    &:hover {
      background: rgba(#1967d2, 0.15);
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
