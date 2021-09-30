<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-24 11:54:30
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-12 15:13:58
-->
<template>
  <div class="dashboard-outer">
    <UpperTitle :title="'Hello, ' + $store.state.userInfo.username" text=""></UpperTitle>
    <div class="row">
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="ui-item">
          <div class="left">
            <i class="icon flaticon-briefcase"></i>
          </div>
          <div class="right">
            <h4>{{data.projectCount}}</h4>
            <p>发布项目数量</p>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="ui-item ui-red">
          <div class="left">
            <i class="icon la la-file-invoice"></i>
          </div>
          <div class="right">
            <h4>{{data.followCount}}</h4>
            <p>关注者数量</p>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="ui-item ui-yellow">
          <div class="left">
            <i class="icon la la-comment-o"></i>
          </div>
          <div class="right">
            <h4>{{data.messageCount}}</h4>
            <p>消息数量</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Schedule :projectName="data.projectName" :scheduleList="data.projectScheduleList"></Schedule>
      </div>
      <div class="col-lg-8">
        <div class="h-100 ls-widget qm-message-box ">
          <div class="qm-widget-title flex">
            <div class="flex">
              <i class="qingmeng-icon icon-system-message-line-blue"></i>
              <span class="mr-3">消息列表</span>
            </div>
          </div>
          <div class="widget-content">
            <el-table ref="multipleTable" :data="data.userReceivedMessageList" tooltip-effect="dark" style="width: 100%">
              <el-table-column header-align="center" align="center" label="头像" width="70">
                <template slot-scope="scope">
                  <el-avatar v-if="scope.row.sendUserAvatar" class="avatar" size="small" :src="getAbsPath(scope.row.sendUserAvatar)"></el-avatar>
                </template>
              </el-table-column>
              <el-table-column header-align="center" align="center" prop="sendUserName" label="用户" width="100"></el-table-column>
              <el-table-column header-align="center" align="center" prop="messageContent" label="消息内容" show-overflow-tooltip>
                <template slot-scope="scope">
                  <!-- <div class="message-content" v-if="currentType == 5" @click="$router.push(`/workbench/seedeveloper/${scope.row.projectId}/${scope.row.sendUserId}/${scope.row.sendUserName}`)">{{scope.row.messageContent}}</div> -->
                  <div class="message-content">{{scope.row.messageContent}}</div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" align="center" prop="createTime" width="180" label="日期" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h5 class="my-3 ml-1 font-weight-bold">关注者</h5>
      </div>
      <div class="job-block col-lg-6 col-md-12 col-sm-12" v-for="developer in data.followUserList" :key="developer.id">
        <div class="inner-box">
          <div class="content">
            <span class="company-logo" :style="{backgroundImage:`url(${getAbsPath(developer.icon)})`}">
            </span>
            <h4>
              <router-link tag="a" :to="{name:'DeveloperDetail',params:{userId:developer.userId,userName:developer.userName}}">
                {{developer.userName}}
              </router-link>
              <span class="qingmeng-icon icon-authentication-filled-green qmiconauth"></span>
            </h4>
            <ul class="job-info">
              <li>
                <span class="qingmeng-icon icon-engineer-blue qmicon"></span>
                {{developer.positionTypeList[0] && developer.positionTypeList[0].positionName}}
              </li>
            </ul>
            <ul class="job-other-info">
              {{developer.personalProfile}}
            </ul>
            <button class="bookmark-btn">个人开发者</button>
          </div>
          <div class="content copycontent">
            <div class="kuai">
              <div class="one">
                <div class="qingmeng-icon icon-location-gray onelefe"></div>
                <div class="infos">
                  <div>居住地</div>
                  <div>{{developer.address}}</div>
                </div>
              </div>
              <div class="one">
                <div class="qingmeng-icon icon-project-budget-line-gray1 onelefe"></div>
                <div class="infos">
                  <div class="infos-title">佣金</div>
                  <div class="infos-val">{{developer.salary}}/天</div>
                </div>
              </div>
              <div class="one">
                <div class="qingmeng-icon icon-infor-setting-line-blue onelefe"></div>
                <div class="infos">
                  <div>工作经验</div>
                  <div>{{developer.workYears}}年</div>
                </div>
              </div>
              <div class="one">
                <div class="qingmeng-icon icon-join-project-blue onelefe"></div>
                <div class="infos">
                  <div>参与项目</div>
                  <div>{{developer.projectCount}}个</div>
                </div>
              </div>
              <div class="one">
                <div class="qingmeng-icon icon-infor-setting-line-blue onelefe"></div>
                <div class="infos">
                  <div>平台评分</div>
                  <div>{{developer.starCount}}分</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpperTitle from "../components/UpperTitle.vue";
import Schedule from "../components/Schedule.vue";
export default {
  name: "Dashboard",
  components: {
    UpperTitle,
    Schedule,
  },
  data() {
    return {
      data: {},
      project: {},
      messageList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("/project/getDashBoardInfo").then((res) => {
        this.data = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.job-block .content {
  padding-left: 150px;
}

.job-block .bookmark-btn {
  position: absolute;
  right: 0;
  top: -15px;
  height: 30px;
  line-height: 32px;
  font-size: 14px;
  width: 100px !important;
  background-color: #e2fff2 !important;
  border-radius: 5px;
  color: #36bb72;
  -webkit-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
}
.job-block .job-info li {
  padding-left: 0;

  .qmicon {
    line-height: 27px;
    font-size: 22px;
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 2px;
  }
}
.job-block .company-logo {
  width: 120px;
  height: 120px;
  top: -12px;
  border-radius: 50%;
  background: center center;
  background-size: cover;
}
.copycontent {
  margin-top: 30px;
  border-top: 1px solid #ecedf2;
  padding-left: 0 !important;
}
.qmiconauth {
  font-size: 22px;
  margin-left: 10px;
  margin-bottom: 5px;
  display: inline-block;
  vertical-align: middle;
}
.kuai {
  display: flex;
  flex-wrap: wrap;

  .one {
    margin-left: 10px;
    margin-top: 20px;

    .onelefe {
      float: left;
      margin-top: 10px;
      margin-right: 10px;
      font-size: 22px;
      border-radius: 8px;
      text-align: center;
      line-height: 36px;
      &::before {
        color: #1967d2;
      }
    }

    .infos {
      text-align: center;
      float: left;
      font-size: 13px;
      :last-child {
        font-size: 12px;
        color: #666666;
      }
    }
  }
}
</style>