<!--
 * @Description:
 * @Autor: 张洪喜
 * @Date: 2021-08-23 10:06:37
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-13 16:59:38
-->
<template>
  <div class="page-wrapper">
    <!-- Job Detail Section -->
    <section class="job-detail-section">
      <!-- Upper Box -->
      <div class="upper-box">
        <div class="auto-container">
          <div class="pd-total">
            <img :src="getAbsPath(projectLogo)" alt="" class="pdt-img">
            <div class="pdt-info">
              <div class="pdti-top">
                <div class="pdti-left">
                  <div class="pdti-title">{{ projectName }}</div>
                  <div class="pdtil">(招募中)</div>
                </div>
                <div class="pdti-right" @click="isCollectFun(projectId)">
                  <span :class="isCollect === true ? 'qingmeng-icon icon-like-red qmicon-size' : 'qingmeng-icon icon-like-gray qmicon-size'">
                  </span>&nbsp;关注
                </div>
              </div>
              <div class="pdti-bottom">
                <div class="pdtib-left">
                  <div class="pdtibl-top">
                    <div class="zm">招募:</div>
                    <button class="zm-btn" :style="{backgroundColor: tagColor[index].bgcolors,
											color: tagColor[index].colors,}" v-for="(pptl, index) in projectPositionTypeList" :key="pptl.id">
                      {{ pptl.positionName }}
                    </button>
                  </div>
                  <ul class="pdtib-bottom">
                    <li class="pdtibb">
                      <div class="title-icon">
                        <span class="qingmeng-icon icon-project-budget-line-gray1"></span> 项目预算
                      </div>
                      <span class="tival">￥{{ projectBudget }}</span>
                    </li>
                    <li class="pdtibb">
                      <div class="title-icon">
                        <span class="qingmeng-icon icon-project-intro-line-gray"></span> 交付周期
                      </div>
                      <span class="tival">{{ projectDuration }} 天</span>
                    </li>
                    <li class="pdtibb">
                      <div class="title-icon">
                        <span class="qingmeng-icon icon-regist-time-gray"></span> 发布时间
                      </div>
                      <span class="tival">{{ createTime }}</span>
                    </li>
                    <li class="pdtibb">
                      <div class="title-icon">
                        <span class="qingmeng-icon icon-project-type-line-blue"></span> 项目类型
                      </div>
                      <div class="tival">
                        <span v-for="(havingIcon,index) in projectTypeList" :key="index+1" class="typesize">
                          <span class="qingmeng-icon icon-PC" v-if="havingIcon.id === 1">
                          </span>
                          <span class="qingmeng-icon icon-app" v-else-if="havingIcon.id === 2"> </span>
                          <span class="qingmeng-icon icon-weichat-green" v-else-if="havingIcon.id === 3"> </span>
                          <span class="qingmeng-icon icon-mini-program-line-green" v-else-if="havingIcon.id === 4"> </span>
                          <span class="qingmeng-icon icon-mini-program-line-green" v-else-if="havingIcon.id === 6"> </span>
                          <span class="qingmeng-icon icon-mini-program-line-green" v-else-if="havingIcon.id === 7"> </span>
                          <span class="qingmeng-icon icon-mini-program-line-green" v-else-if="havingIcon.id === 8"> </span>
                          <span v-else></span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="pdtim-right">
                  <el-button type="primary" class="pdtimr-contact" plain @click="showMessageDetails()">立即沟通</el-button>
                  <span v-if="projectscheduleid <= 4 && applyTask === false">
                    <el-dropdown :hide-on-click="false" size="medium" @command="handleCommand" class="pdtimr-btns">
                      <span class="btn-style-one el-dropdown-link">
                        菜单<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="个人接单">个人接单</el-dropdown-item>
                        <!-- <el-dropdown-item command="团队接单">团队接单</el-dropdown-item> -->
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                </div>
                <el-dialog title="接单邀约" :visible.sync="projectReceivedVisible" width="30%" :append-to-body='true' custom-class="qm-dialog qm-dialog-content" top="30vh" center>
                  <div class="evaluate-group flex">
                    <el-input type="textarea" :rows="5" placeholder="请输入您的留言" v-model="projectReceived">
                    </el-input>
                  </div>
                  <template slot="footer" class="dialog-footer">
                    <el-button @click="projectReceivedVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendJoin">发送邀请</el-button>
                  </template>
                </el-dialog>
                <el-drawer :title="'与雇主沟通 ' + projectName + ' 项目'" :visible.sync="drawer" :append-to-body="true" custom-class="qm-drawer">
                  <div v-if="messageDetails.projectScheduleList && messageDetails.projectScheduleList.length==0" class="message-content  d-flex justify-content-center align-items-center">
                  </div>
                  <div class="chat-container">
                    <div class="chat-wrapper">
                      <div class="chat-box">
                        <div class="clearfix" v-for="item in chatDetails" :key="item.id">
                          <!-- 对方 -->
                          <div v-if="item.userId == projectPublisherId" class="sender chat">
                            <div class="time">{{ item.createTime }}</div>
                            <div class="d-flex align-items-center">
                              <div class="user-box d-flex flex-column align-items-center">
                                <el-avatar v-if="item.userAvatar" class="avatar" size="large" :src="getAbsPath(item.userAvatar)"></el-avatar>
                              </div>
                              <div class="content">{{ item.messageContent }}</div>
                            </div>
                            <span class="chat-username pl-3">{{ item.username }}</span>
                          </div>
                          <!-- 自己 -->
                          <div v-else class="receiver chat">
                            <div class="time">{{ item.createTime | dateFormat('YYYY-mm-dd HH:MM:SS') }}</div>
                            <div class="d-flex align-items-center justify-content-end">
                              <div class="content">{{ item.messageContent }}</div>
                              <div class="user-box d-flex flex-column align-items-center">
                                <el-avatar v-if="item.userAvatar" class="avatar" size="large" :src="getAbsPath(item.userAvatar)"></el-avatar>
                              </div>
                            </div>
                            <span class="chat-username pr-3">{{ item.username }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="send-box default-form">
                      <div class="form-group">
                        <textarea v-model="sendMessage"></textarea>
                        <i @click="handleSendMessage" class="qingmeng-icon icon-publish-task-line-gray"></i>
                      </div>
                    </div>
                  </div>
                </el-drawer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="job-detail-outer">
        <div class="auto-container">
          <div class="row">
            <div class="content-column col-lg-8 col-md-12 col-sm-12">
              <div class="job-detail">
                <h6>项目简介</h6>
                <p class="textindent2">
                  {{ projectShortIntro }}
                </p>
                <h6>项目介绍</h6>
                <div class="textindent2" v-html="projectIntroduction"></div>
                <h6>相关文档</h6>
                <p class="textindent2">
                  <a class="project-document" :href=" showDoc === true ? getAbsPath(pfl.file) : '#' " target="_blank" v-for="(pfl, index) in projectFileList" :key="index">{{ pfl.fileName }}</a>
                </p>
                <h6>工作方式</h6>
                <p class="textindent2">
                  {{ workTypeNames[workType] }}
                </p>
                <h6>工作内容</h6>
                <div class="textindent2" v-html="workExplain"></div>
              </div>
            </div>

            <div class="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside class="sidebar">
                <div class="employers-right">
                  <div class="employers-title">
                    <span class="qingmeng-icon icon-employer-info-blue"></span>
                    <div class="gzxx">雇主信息</div>
                    <span class="qingmeng-icon icon-authentication-filled-green"></span>
                  </div>
                  <div class="employers-stars">
                    <el-rate :value="starCount" disabled></el-rate>
                    <a href="#" class="pj">{{ starCount }}分, 共 {{ commentLength }} 个评价 >> </a>
                  </div>
                  <ul class="employers-info">
                    <li>
                      <span class="lanbg">
                        <span class="qingmeng-icon icon-location-blue"></span>
                      </span>
                      {{ address }}
                    </li>
                    <li>
                      <span class="lanbg">
                        <span class="qingmeng-icon icon-send-blue"></span>
                      </span>
                      共发布 {{ projectCount }} 个项目
                      <div class="info-introduction">项目完成率 {{ projectFinishPercent }} % ,
                        {{ waitForOrderCount }}个正在招募中项目
                      </div>
                    </li>
                    <li>
                      <span class="lanbg"><span class="qingmeng-icon icon-project-budget-filled-blue"></span></span>
                      在平台一共花费 ￥{{ totalBudget }} 元
                      <div class="info-introduction">共招募过 {{ receiveDevloperCount }}个 开发者</div>
                    </li>
                    <li>
                      <span class="lanbg"><span class="qingmeng-icon icon-project-budget-line-blue"></span></span>
                      平均为每位开发者支付佣金 <br>
                      <div class="info-introduction last-info-introduction">
                        ￥{{ avgBudgetForDevloper }}元
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="employers-right-two">
                  <a href="javascript:void(0);" class="btn-style-one el-button fabu">发布您的需求</a>
                  <div class="fabu-info">想通过 <a href="/"> 青盟 </a> 成为开发者 ,
                    <router-link class="fabu-apply" tag="a" to="/register/:identityTag">现在就申请 > >
                    </router-link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Job Detail Section -->
  </div><!-- End Page Wrapper -->
</template>

<script>
import qs from "qs";
import { mapState } from "vuex";

export default {
  name: "TaskDetail",
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      // 消息列表
      messageList: [],
      // 抽屉
      drawer: false,
      messageDetails: {}, // 消息详情
      chatDetails: [], //聊天详情
      chatPageNum: 1,
      isOver: false,
      sendMessage: "",
      currentType: "",
      projectPublisherId: -1,
      projectPublisherName: "",
      projectBudget: "",
      projectDuration: "",
      projectName: "",
      projectShortIntro: "",
      projectIntroduction: "",
      workType: "",
      showDoc: false,
      workTypeNames: ["全职", "兼职", "全职 & 兼职 都可"],
      workExplain: "",
      projectPositionTypeList: [],
      projectTypeList: [],
      projectFileList: [],
      projectScheduleId: "",
      projectLogo: "",
      address: "",
      starCount: 0,
      commentLength: "",
      projectCount: "",
      projectFinishPercent: "",
      receiveDevloperCount: "",
      totalBudget: "",
      waitForOrderCount: "",
      avgBudgetForDevloper: "",
      isCollect: false,
      projectReceivedVisible: false,
      projectReceived: "",
      createTime: "",
      tagColor: {
        0: {
          bgcolors: "#E6F1FB",
          colors: "#1B64DD",
        },
        1: {
          bgcolors: "#FEF2D9",
          colors: "#DD7F1B",
        },
        2: {
          bgcolors: "#E1F2E5",
          colors: "#23A42F",
        },
        3: {
          bgcolors: "#EFE6FB",
          colors: "#8C47E1",
        },
        4: {
          bgcolors: "#FBE6F6",
          colors: "#E147A2",
        },
        5: {
          bgcolors: "#FAFBE6",
          colors: "#DEB200",
        },
      },
      applyTask: "",
      projectscheduleid: 0,
      // tagColor2: {
      // 	0: {
      // 		bgcolors: "#F8F5FF",
      // 		colors: "#603AB7",
      // 		icons: "icon-kanban-line-blue"
      // 	},
      // 	1: {
      // 		bgcolors: "#FFF5F8",
      // 		colors: "#F1416C",
      // 		icons: "icon-kanban-line-gray"
      // 	},
      // 	2: {
      // 		bgcolors: "#E8FFF3",
      // 		colors: "#3EC079",
      // 		icons: "icon-mini-program-line-gray"
      // 	},
      // 	3: {
      // 		bgcolors: "#FFF8DD",
      // 		colors: "#EEBA00",
      // 		icons: "icon-message-line-gray"
      // 	},
      // }
    };
  },
  methods: {
    async isCollectFun() {
      await this.axios
        .post(
          "/project/collectProject",
          qs.stringify({
            projectId: this.$route.params.id,
          })
        )
        .then((res) => {
          console.log(res);
          if (res === 0) {
            this.isCollect = false;
          } else if (res === 1) {
            this.isCollect = true;
          }
        });
    },
    async getProjectOne(id) {
      // console.log("getProjectOne:" + id);
      await this.axios
        .get("/project/projectDetail", {
          params: {
            projectId: id,
          },
        })
        .then((res) => {
          console.log(res);
          this.projectPublisherId = res.projectPublisherId;
          this.projectPublisherName = res.projectPublisherName;
          this.projectBudget = res.projectBudget;
          this.projectDuration = res.projectDuration;
          this.projectName = res.projectName;
          this.projectIntroduction = res.projectIntroduction;
          this.projectShortIntro = res.projectShortIntro;
          this.projectFileList = res.projectFileList;
          this.workType = res.workType;
          this.workExplain = res.workExplain;
          this.projectScheduleId = res.projectScheduleId;
          this.projectPositionTypeList = res.projectPositionTypeList;
          this.projectTypeList = res.projectTypeList;
          this.projectLogo = res.projectLogo;
          this.isCollect = res.isCollect;
          this.applyTask = res.applyTask;
          this.projectscheduleid = res.projectScheduleId;
          this.createTime = res.createTime.split(" ")[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getEmployersInfo(id) {
      // console.log("getEmployersInfo:" + id);
      await this.axios
        .get("/user/getPublisherInfoByProjectId", {
          params: {
            projectId: id,
          },
        })
        .then((res) => {
          // console.log(res)
          this.address = res.address;
          this.starCount = res.starCount;
          this.commentLength = res.commentList.length;
          this.projectCount = res.projectCount;
          this.projectFinishPercent = Number(
            res.projectFinishPercent * 100
          ).toFixed(1);
          this.receiveDevloperCount = res.receiveDevloperCount;
          this.totalBudget = res.totalBudget;
          this.waitForOrderCount = res.waitForOrderCount;
          this.avgBudgetForDevloper = res.avgBudgetForDevloper;
        });
    },
    handleCommand(command) {
      console.log(command);
      // this.$message(command);
      this.projectReceivedVisible = true;
    },
    showMessageDetails() {
      this.drawer = true;
      this.chatDetails = [];
      this.isOver = false;
      this.chatPageNum = 1;
      this.getChatList();
    },
    getChatList() {
      this.axios
        .get("/message/getUserDialogueMessage", {
          params: {
            anotherId: this.projectPublisherId,
            orderBy: 1,
            pageSize: 5,
            pageNum: this.chatPageNum,
          },
        })
        .then((res) => {
          if (res.code == 2201) {
            this.isOver = true;
            this.$message("没有更多数据了哦！");
          } else {
            this.chatDetails = [...res.list.reverse(), ...this.chatDetails];
          }
        });
    },
    loadingMore() {
      this.chatPageNum++;
      this.getChatList();
    },
    handleSendMessage() {
      this.axios
        .post("/message/sendMessage", {
          messageContent: this.sendMessage,
          messageTypeId: 4,
          receiveUserId: this.projectPublisherId,
        })
        .then(() => {
          this.chatDetails.push({
            createTime: new Date(),
            messageContent: this.sendMessage,
            userAvatar: this.userInfo.avatar,
            username: this.userInfo.username,
            userId: this.userInfo.userId,
          });
          this.sendMessage = "";
        });
    },
    async sendJoin() {
      await this.axios
        .post(
          "/project/takingOrder",
          qs.stringify({
            projectId: this.$route.params.id,
            messageContent: this.projectReceived,
          })
        )
        .then((res) => {
          console.log(res);
          this.$message("接单成功,请耐心等待通知");
          this.projectReceivedVisible = false;
          window.location.reload();
        });
    },
  },
  created() {
    console.log(this.$route.params);
    this.getProjectOne(this.$route.params.id);
    this.getEmployersInfo(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.job-detail-section {
  background-color: #f5f7fc;
}

.row {
  margin-left: 0;
  padding-bottom: 20px;
}

.job-detail-section .upper-box {
  padding: 20px 0 25px;
}

.pd-total {
  display: flex;
  padding: 20px 15px;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: 0px 4px 32px 0px rgba(172, 172, 172, 0.1);
  border-radius: 8px;

  .pdt-img {
    width: 187px;
    height: 187px;
    border-radius: 10px;
    // background-color: #000000;
  }

  @media only screen and (max-width: 599px) {
    .pdt-info {
      margin-left: 0;
    }
  }

  .pdt-info {
    width: 80%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-content: space-between;

    .pdti-top {
      display: flex;
      justify-content: space-between;

      .pdti-left {
        display: flex;
        height: 30px;

        .pdti-title {
          font-size: 21px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #000000;
          line-height: 30px;
        }

        .pdtil {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #e80000;
          line-height: 30px;
          margin-left: 10px;
        }
      }

      .pdti-right {
        display: flex;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #f58a00;
        cursor: pointer;

        .qmicon-size {
          line-height: 35px;
          font-size: 25px;
        }
      }
    }

    .pdti-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 26px;
      flex-wrap: wrap;

      .pdtibl-top {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .zm {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #999999;
        }

        .zm-btn {
          border-radius: 5px;
          margin-left: 15px;
          padding: 0 20px;
        }
      }

      .pdtib-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 26px;

        .pdtibb {
          width: 100%;
          margin-left: 20px;
          text-align: center;
          padding: 6px 15px;
          border: 1px dashed #9dc2f4;
          border-radius: 10px;

          .title-icon {
            width: 100%;
            color: #666666;
            font-weight: 400;
          }

          .tival {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #1967d2;

            .typesize {
              font-size: 18px;
            }
          }
        }

        .pdtibb:first-child {
          margin-left: 0;
        }

        .xmclient {
          margin-left: 8px;
        }
      }

      .pdtim-right {
        display: flex;
        flex-direction: column;
        margin-right: 30px;

        .pdtimr-contact {
          height: 45px;
          border-radius: 10px;
          color: #1966d2;
          background-color: #e6f1fb;
        }

        .pdtimr-btns {
          height: 45px;
          margin-top: 30px;
        }

        .el-dropdown-link {
          cursor: pointer;
        }

        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
  }
}

@media only screen and (max-width: 599px) {
  div.content-column {
    padding-left: 15px !important;
  }
}

div.content-column {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 42px 10px 20px 30px;
}

p.textindent2 {
  margin-top: 2px;
}

a.project-document {
  margin-left: 20px;
}

a.project-document:first-child {
  margin-left: 0;
}

.ibzm {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 20px;
}

button.projectType-single {
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 0 30px;
  height: 36px;
  line-height: 36px;
  border-radius: 10px;
}

@media only screen and (max-width: 599px) {
  div.sidebar-column {
    padding: 0 2px;
    margin-top: 10px;
  }
}

div.employers-right {
  padding: 12px;
  background-color: #ffffff;
  border-radius: 8px;

  .employers-title {
    font-size: 24px;
    line-height: 24px;
    display: flex;

    .gzxx {
      height: 24px;
      font-size: 15px;
      font-weight: bold;
      margin: 0 6px;
    }
  }
}

@media only screen and (max-width: 599px) {
  div.employers-stars {
    padding: 15px;
    text-indent: 2em;
    border: 1px dashed #aad7ff;
    border-radius: 13px;
    font-size: 20px;
  }
}

div.employers-stars {
  text-indent: 0;
  margin-top: 10px;
  padding: 15px;
  line-height: 15px;
  border: 1px dashed #aad7ff;
  border-radius: 13px;
  font-size: 18px;

  span {
    float: left;
    margin-left: 5px;
  }

  span:first-child {
    margin-left: 0;
  }

  .pj {
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    text-decoration: underline;
    color: #1967d2;
    margin-left: 10px;
  }
}

ul.employers-info > li {
  height: 60px;
  line-height: 20px;
  margin-bottom: 10px;
  font-size: 14px;

  .lanbg {
    width: 30px;
    height: 30px;
    line-height: 32px;
    text-align: center;
    background-color: #e6f1fb;
    border-radius: 5px;
    display: inline-block;
    margin-right: 10px;
    font-size: 18px;
  }
}

ul.employers-info > li:first-child {
  line-height: 60px;
}

div.info-introduction {
  text-indent: 3.8em;
  font-size: 12px;
  /*border: 1px solid red;*/
  color: lightgray;
}

div.last-info-introduction {
  text-indent: 3em;
  font-size: 15px;
  color: black;
}

div.employers-right-two {
  margin-top: 15px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 20px;
  font-size: 15px;
}

a.fabu {
  width: 200px;
  height: 40px;
  line-height: 0;
  font-size: 15px;
  font-weight: 400;
  color: #ffffff;
  margin: 30px 0 20px 0;
}

.fabu-info {
  height: 50px;
}

.fabu-apply {
  text-decoration: underline;
  font-family: Microsoft YaHei;
  font-weight: bold;
}

.el-rate {
  display: inline-block;
}
/deep/.qm-drawer {
  .el-drawer__header {
    color: #72767b;
    display: flex;
    padding: 20px 20px 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 0;
  }
  .message-content {
    min-height: 50%;
    padding: 20px;
  }
  .chat-container {
    height: calc(100vh - 70px);
    // position: fixed;
    bottom: 0;
    .chat-wrapper {
      height: calc(100% - 180px);
      overflow: scroll;
    }
    .send-box {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 180px;
      background: #ffffff;
      box-shadow: 0px 0px 29px 0px rgba(172, 172, 172, 0.21);
      border-radius: 8px 0px 0px 8px;
      .form-group {
        padding: 20px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        textarea {
          height: 140px;
          box-sizing: border-box;
        }
        i {
          text-align: center;
          line-height: 50px;
          flex-shrink: 0;
          margin-left: 20px;
          width: 50px;
          height: 50px;
          background: #1966d2;
          border-radius: 50%;
          font-size: 40px;
          cursor: pointer;
          &:hover {
            background: #0146a6;
          }
          &::before {
            color: #fff;
            margin-left: -5px;
          }
        }
      }
    }
    .chat-box {
      padding: 0 10px;
      transition: all 0.5s ease;
      .more {
        color: #1967d2;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
      }
      .chat {
        width: 80%;
        transition: all 0.5s ease;

        .time {
          color: #666666;
          font-size: 12px;
        }
        .user-box {
          // width: 80px;
          margin: 0 10px;
          font-size: 12px;
          flex-shrink: 0;
        }
        span {
          font-size: 12px;
        }
      }
      .sender {
        float: left;
        .time {
          margin-left: 60px;
        }
        .content {
          box-sizing: border-box;
          padding: 10px;
          background: #f8f5ff;
          border-radius: 0px 10px 10px 10px;
        }
      }
      .receiver {
        float: right;
        text-align: right;
        .time {
          margin-right: 60px;
        }
        .content {
          text-align: left;
          box-sizing: border-box;
          padding: 10px;
          background: #e3effa;
          border-radius: 10px 0px 10px 10px;
        }
      }
    }
  }
}
</style>
