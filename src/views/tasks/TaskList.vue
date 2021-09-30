<!--
 * @Description:
 * @Autor: 张洪喜
 * @Date: 2021-08-23 10:06:37
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-12 22:45:07
-->
<template>
  <div class="main-body">
    <!--Page Title-->
    <page-title title="任务大厅" desc="一些文字介绍。。。"></page-title>
    <!--End Page Title-->

    <!-- Listing Section -->
    <section class="ls-section">
      <div class="auto-container">
        <div class="filters-backdrop"></div>

        <div class="row">
          <!-- Filters Column -->
          <div class="filters-column col-lg-4 col-md-12 col-sm-12">
            <div class="inner-column pd-right">
              <div class="filters-outer">
                <button type="button" class="theme-btn close-filters">X</button>
                <!-- Filter Block -->
                <div class="filter-block">
                  <h4>关键字</h4>
                  <div class="form-group">
                    <input type="text" name="listing-search" placeholder="项目名称" v-model="keywords" @blur="getProjectListsByKeywords"><!-- 、项目类型、职位类型-->
                    <span class="icon qingmeng-icon icon-search-blue searchSize"></span>
                  </div>
                </div>

                <!-- Filter Block -->
                <div class="filter-block">
                  <h4>职位类型</h4>
                  <div class="form-group">
                    <ul class="checkboxes square">
                      <li v-for="(positionType, index) in positionTypeLists" :key="index+1">
                        <input type="checkbox" :id="'check-' + positionType.id" :value="positionType.id" v-model="positionTypeIds">
                        <label :for="'check-' + positionType.id">{{ positionType.positionName }}</label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="filter-block fb-line"></div>

                <!-- Filter Block -->
                <div class="switchbox-outer">
                  <h4>项目类型</h4>
                  <div class="form-group">
                    <ul class="switchbox">
                      <li v-for="(projectType,index) in projectTypeLists" :key="index+1">
                        <label class="switch">
                          <input type="checkbox" :value="projectType.id" v-model="projectTypeIds">
                          <span class="slider round"></span>
                          <span class="title">{{ projectType.typeName }}</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="filter-block fb-line"></div>

                <!-- Filter Block -->
                <div class="filter-block">
                  <h4>项目预算</h4>
                  <div class="form-group money-range">
                    <input type="text" class="range-min" v-model="minValue" @blur="getRange">
                    <span class="middel-gang"> - </span>
                    <input type="text" class="range-max" v-model="maxValue" @blur="getRange">
                  </div>
                </div>

                <div class="filter-block fb-line"></div>

                <!-- Filter Block -->
                <div class="filter-block">
                  <h4>工作方式</h4>
                  <div class="form-group">
                    <div class="radio-box" v-for="(way, index) in workWay" :key="index">
                      <input type="radio" :id="'radio-' + index" :value="way.id" :checked="way.checked === true ? 'checked': way.checked" v-model="workType">
                      <label :for="'radio-' + index">{{ way.name }}</label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Content Column -->
          <div class="content-column col-lg-8 col-md-12 col-sm-12">
            <div class="ls-outer">
              <button type="button" class="theme-btn btn-style-two toggle-filters">Show Filters</button>

              <!-- ls Switcher -->
              <div class="ls-switcher">
                <div class="showing-result">
                  <div class="text">
                    显示 <strong>{{ total }}</strong> 中的 <strong>1-{{ pageSize }}</strong> 条记录
                  </div>
                </div>
                <SortBy @change="changeHandler" v-model="sortBy" :list="sortList" />
              </div>

              <!-- Block Block -->
              <div class="company-block-three" v-for="project in projectLists" :key="project.id">
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
                          <div class="pim-val text-nowrap">{{project.createTime}}</div>
                        </li>
                        <li class="pim project-client">
                          <span v-for="(havingIcon,index) in project.projectTypeList" :key="index+1" class="typesize">
                            <img v-if="havingIcon.id === 1" src="../../assets/images/icons/PC.png" alt="">
                            <img v-if="havingIcon.id === 2" src="../../assets/images/icons/APP.png" alt="">
                            <img v-if="havingIcon.id === 3" src="../../assets/images/icons/小程序.png" alt="">
                            <img v-if="havingIcon.id === 4" src="../../assets/images/icons/UI设计.jpg" alt="">
                            <img v-if="havingIcon.id === 5" src="../../assets/images/icons/产品设计.png" alt="">
                            <img v-if="havingIcon.id === 6" src="../../assets/images/icons/测试.png" alt="">
                            <img v-if="havingIcon.id === 7" src="../../assets/images/icons/其他.png" alt="">
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
              <el-empty v-if="projectLists.length == 0" description="没有找到您想要的数据~~" :image="require('../../assets/images/empty/home-list.png')" :image-size="450"></el-empty>

              <!-- Listing Show More -->
              <div class="ls-show-more">
                <div class="block">
                  <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="prev, pager, next" :total="total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End Listing Page Section -->
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import SortBy from "@/components/SortBy";
import qs from "qs";

export default {
  name: "TaskList",
  components: {
    PageTitle,
    SortBy,
  },
  data() {
    return {
      clientIcon: {
        1: {},
      },
      keywords: "",
      workWay: [
        {
          id: 2,
          name: "全兼均可",
          checked: true,
        },
        {
          id: 0,
          name: "全职",
          checked: false,
        },
        {
          id: 1,
          name: "兼职",
          checked: false,
        },
      ],
      sortList: [
        {
          title: "综合",
          sort: "desc",
          key: "projectType",
        },
        {
          title: "金额",
          sort: "asc",
          key: "projectBudget",
        },
        {
          title: "开发周期",
          sort: "asc",
          key: "projectDuration",
        },
      ],
      sortBy: {
        title: "综合",
        sort: "desc",
        key: "projectType",
      },
      minValue: 0, // 项目预算最小值
      maxValue: 0, // 项目预算最大值
      positionTypeLists: [], //职位类型
      positionTypeIds: [], //职位类型ID组
      projectTypeLists: [], //项目类型
      projectTypeIds: [], // 项目类型ID组
      workType: 0, // 工作方式
      projectLists: [{}], //项目列表
      pageNum: 1, // 页数
      pageSize: 5, // 每页显示数据量
      total: 0, // 总数据量
      currentPage: 1, // 当前页数
      projectQueryParam: {}, // 对象数据集
    };
  },
  methods: {
    changeHandler() {
      // 根据排序方式重新获取数据
      // console.log(this.sortBy);
      switch (this.sortBy.key) {
        case "projectType":
          delete this.projectQueryParam.orderType,
            this.projectQueryParam.orderWay;
          break;
        case "projectBudget":
          this.projectQueryParam.orderType = 0;
          break;
        case "projectDuration":
          this.projectQueryParam.orderType = 1;
          break;
        default:
          break;
      }
      switch (this.sortBy.sort) {
        case "desc":
          if ("orderType" in this.projectQueryParam) {
            this.projectQueryParam.orderWay = 1;
          }
          break;
        case "asc":
          if ("orderType" in this.projectQueryParam) {
            this.projectQueryParam.orderWay = 0;
          }
          break;
        default:
          break;
      }
      // console.log(this.projectQueryParam);
      this.getProjectLists();
    },
    async getProjectLists() {
      await this.axios
        .post(
          "/project/list?" +
            qs.stringify({
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            }),
          this.projectQueryParam
        )
        .then((res) => {
          console.log(res);
          this.total = res.total || 0;
          this.projectLists = res.list || [];

          let projectTypeArr = [],
            projectPositionTypeArr = [];

          for (let k = 0; k < this.projectLists.length; k++) {
            let createTime = this.projectLists[k].createTime.split(" ");
            this.projectLists[k].createTime = createTime[0];
            let projectTypeList = this.projectLists[k].projectTypeList;
            let projectPositionTypeList =
              this.projectLists[k].projectPositionTypeList;
            if (projectTypeList.length !== 0) {
              for (let i = 0; i < projectTypeList.length; i++) {
                projectTypeArr.push(" " + projectTypeList[i].typeName + " ");
              }
            }
            projectTypeArr.length !== 0
              ? (this.projectLists[k].typeName = projectTypeArr.toString())
              : (this.projectLists[k].typeName = "无");

            if (projectPositionTypeList.length !== 0) {
              for (let j = 0; j < projectPositionTypeList.length; j++) {
                projectPositionTypeArr.push(
                  " " + projectPositionTypeList[j].positionName + " "
                );
              }
            }
            projectPositionTypeArr.length !== 0
              ? (this.projectLists[k].positionName =
                  projectPositionTypeArr.toString())
              : (this.projectLists[k].positionName = "无");
          }
          // console.log(this.projectLists)
        })
    },
    getProjectListsByKeywords() {
      this.projectQueryParam.projectName = this.keywords;
      this.getProjectLists();
      // console.log(this.projectQueryParam);
    },
    async getPositionTypeLists() {
      await this.axios.post("/project/getPositionTypeList", {}).then((res) => {
        // console.log("职位类型" + res);
        this.positionTypeLists = res;
      });
    },
    async getProjectTypeLists() {
      await this.axios.post("/project/getProjectTypeList", {}).then((res) => {
        // console.log("项目类型" + res);
        this.projectTypeLists = res;
      });
    },
    /**
     * 改变分页数量
     * @param val
     */
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
      this.getProjectLists();
    },
    /**
     * 改变当前页码
     * @param val
     */
    handleCurrentChange(val) {
      // console.log(val);
      this.pageNum = this.currentPage = val;
      this.getProjectLists();
    },
    /**
     * 项目预算 - 范围
     */
    getRange() {
      if (this.maxValue !== 0) {
        this.projectQueryParam.minProjectBudget = this.minValue;
        this.projectQueryParam.maxProjectBudget = this.maxValue;
        this.getProjectLists();
      } else {
        delete this.projectQueryParam.minProjectBudget,
          this.projectQueryParam.maxProjectBudget;
      }
    },
  },
  watch: {
    /**
     * 职位类型
     */
    positionTypeIds(newValue) {
      // console.log(newValue);
      this.projectQueryParam.projectPositionTypeList = newValue;
      // console.log(this.projectQueryParam)
      this.getProjectLists();
    },
    /**
     * 工作方式
     */
    workType(newValue) {
      // console.log(newValue);
      this.projectQueryParam.workType = newValue;
      // console.log(this.projectQueryParam)
      this.getProjectLists();
    },
    /**
     * 项目类型
     */
    projectTypeIds(newValue) {
      // console.log(newValue);
      this.projectQueryParam.projectTypeList = newValue;
      // console.log(this.projectQueryParam)
      this.getProjectLists();
    },
  },
  created() {
    this.getPositionTypeLists();
    this.getProjectTypeLists();
    this.getProjectLists();
  },
};
</script>

<style lang="scss" scoped>
/* Company Block Three*/

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

.ls-section .filter-block input {
  padding-left: 20px;
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

.sort-by {
  a {
    margin-right: 10px;
  }
}

.showing-result {
  margin-left: 15px;
}

.filters-outer {
  padding: 30px;
}

.fb-line {
  width: 100%;
  height: 3px;
  margin-left: 0;
  margin-right: 0;
  background-color: #efefef;
}

.content-column {
  border-radius: 8px;
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 40px;
}

.main-body {
  background-color: #f5f7fc;
}

.money-range {
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
}

.range-min,
.range-max {
  width: 100%;
  height: 40px !important;
  padding: 3px !important;
  text-indent: 0.6em;
}

.middel-gang {
  margin: 0 10px;
}

.ls-show-more {
  align-items: flex-end;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled) {
  &.active {
    background-color: #1966d2;
  }
  &:hover {
     background-color: #1758b4;
  }
}

.searchSize {
  font-size: 20px !important;
}
</style>
