<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-20 15:02:50
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-13 16:21:29
-->
<template>
  <div class="main-body">
    <!-- Banner Section-->
    <section class="banner-section">
      <div class="auto-container">
        <div class="row">
          <div class="content-column col-lg-7 col-md-12 col-sm-12">
            <div class="inner-column wow fadeInUp" data-wow-delay="1000ms">
              <div class="title-box">
                <h3>青盟<span class="colored">外包</span>服务平台</h3>
                <div class="text">QINGMENG OUTSOURCING SERVICES FLATFORM</div>
              </div>
              <!-- Popular Search -->
              <div class="popular-searches">
                <span class="title">新型设计开发，托付式服务平台 </span>
              </div>
              <!-- End Popular Search -->
            </div>
          </div>
          <div class="image-column col-lg-5 col-md-12">
            <div class="image-box">
              <figure class="main-image wow fadeIn" data-wow-delay="500ms"><img src="../assets/images/background/banner-person.png" alt=""></figure>

              <!-- Info BLock One -->
              <div class="info_block info_block_one  anm wow fadeIn" data-wow-delay="2500ms" data-speed-x="3" data-speed-y="3">
                <span class="icon fa fa-user-plus"></span>
                <p>求职招聘</p>
                <span class="sub-text">Job Recruitment</span>
              </div>

              <!-- Info BLock Two -->
              <div class="info_block info_block_two anm wow fadeIn" data-wow-delay="1000ms" data-speed-x="2" data-speed-y="2">
                <span class="icon fa fa-paper-plane"></span>
                <p>发布任务</p>
                <span class="sub-text">Publish Tasks</span>
              </div>

              <!-- Info BLock Three -->
              <div class="info_block info_block_three anm wow fadeIn" data-wow-delay="1500ms" data-speed-x="4" data-speed-y="4">
                <span class="icon fa fa-users"></span>
                <p>团队合作</p>
                <span class="sub-text">Team Cooperation</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Banner Section-->

    <!-- Job Section -->
    <section class="job-section">
      <div class="auto-container">
        <div class="sec-title text-center">
          <h2>任务列表</h2>
          <div class="text">TASK LIST</div>
        </div>

        <div class="row wow fadeInUp">
          <!-- Job Block -->
          <div class="company-block-three col-md-6 col-sm-12" v-for="project in projectList" :key="project.id">
            <div class="inner-box">
              <div class="content">
                <img :src="getAbsPath(project.projectLogo)" alt="项目缩略图" class="project-img">
                <div class="projectinfo">
                  <div class="pi-top">
                    <router-link :to="{name:'TaskDetail',params:{id:project.id}}" class="project-name">{{project.projectName}}</router-link>
                    <span class="lvse">招募中</span>
                  </div>
                  <ul class="pi-middle">
                    <li class="pim">
                      <span class="qingmeng-icon icon-project-budget-line-gray1"></span>
                      <span class="pim-child">&nbsp;项目预算&nbsp;</span>
                      <div class="pim-val">￥{{project.projectBudget}}</div>
                    </li>
                    <li class="pim">
                      <span class="qingmeng-icon icon-project-intro-line-gray"></span>
                      <span class="pim-child">&nbsp;交付周期&nbsp;</span>
                      <div class="pim-val">{{project.projectDuration}}天</div>
                    </li>
                    <li class="pim">
                      <span class="qingmeng-icon icon-regist-time-gray"></span>
                      <span class="pim-child">&nbsp;发布时间&nbsp;</span>
                      <div class="pim-val text-nowrap">{{project.createTime | dateFormat('YYYY-mm-dd') }}</div>
                    </li>
                    <li class="pim project-client">
                      <span v-for="(havingIcon,index) in project.projectTypeList" :key="index+1" class="typesize">
                        <img v-if="havingIcon.id === 1" src="@/assets/images/icons/PC.png" alt="">
                        <img v-if="havingIcon.id === 2" src="@/assets/images/icons/APP.png" alt="">
                        <img v-if="havingIcon.id === 3" src="@/assets/images/icons/小程序.png" alt="">
                        <img v-if="havingIcon.id === 4" src="@/assets/images/icons/UI设计.jpg" alt="">
                        <img v-if="havingIcon.id === 5" src="@/assets/images/icons/产品设计.png" alt="">
                        <img v-if="havingIcon.id === 6" src="@/assets/images/icons/测试.png" alt="">
                        <img v-if="havingIcon.id === 7" src="@/assets/images/icons/其他.png" alt="">
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text">
                {{ project.projectShortIntro }}
              </div>
            </div>
          </div>
        </div>

        <div class="btn-box">
          <router-link to="/tasks" class="theme-btn btn-style-one bg-blue"><span class="btn-title">查看更多</span></router-link>
        </div>
      </div>
    </section>
    <!-- End Job Section -->

  </div>
</template>

<script>
// @ is an alias to /src
import qs from "qs";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      projectList: [],
    };
  },
  created() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      this.axios
        .post(
          "/project/list?" +
            qs.stringify({
              pageNum: 1,
              pageSize: 4,
            }),
          {}
        )
        .then((res) => {
          console.log(res);
          this.projectList = res.list || [];
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.banner-section {
  background: linear-gradient(150deg, #f8fafd 0%, #e5ebf9 100%);
}
.banner-section .image-column .main-image img {
  // max-height: 85vh;
  max-width: 80%;
}
.company-block-three {
  position: relative;
  margin-bottom: 30px;
}

.company-block-three .inner-box {
  position: relative;
  padding: 32px 20px 22px 30px;
  background: #ffffff;
  border: 1px solid #ecedf2;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  -webkit-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;

  .text {
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -moz-box;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }
}

.company-block-three .inner-box:hover {
  -webkit-box-shadow: 0px 7px 18px rgba(64, 79, 104, 0.05);
  box-shadow: 0px 7px 18px rgba(64, 79, 104, 0.05);
}

.company-block-three .content {
  display: flex;
}
.project-img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  // background-color: #000000;
}

.projectinfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 16px;

  .pi-top {
    display: flex;
    margin-top: 5px;
    margin-bottom: 10px;

    .project-name {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      text-decoration: underline;
      color: #010101;
    }

    .lvse {
      width: 75px;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #36bb72;
      background: #e2fff2;
      border-radius: 5px;
      text-align: center;
      margin-left: 10px;
    }
  }

  .pi-middle {
    display: flex;
    .pim {
      height: 60px;
      margin-left: 20px;
      border: 1px dashed #dcdcdc;
      border-radius: 8px;
      text-align: center;
      font-size: 16px;
      padding: 2px 8px;

      .pim-child {
        font-size: 14px;
      }

      .pim-val {
        font-weight: bold;
        color: #1967d2;
      }
    }

    .pim:first-child {
      margin-left: 0;
    }

    .project-client {
      display: flex;
      align-items: center;
      border: 0;
      margin-left: 10px;

      .qingmeng-icon {
        display: inline-block;
      }

      .typesize {
        width: 32px;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 5px;
      }
    }
  }
}
</style>
