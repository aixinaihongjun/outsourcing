<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-30 09:13:17
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-09 13:17:55
-->
<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="ls-widget">
        <div class="qm-widget-content row">
          <div class="left-box flex col-lg-7 col-md-7 col-sm-12">
            <el-avatar v-if="projectDetail.projectLogo"
                       :size="80"
                       :src="getAbsPath(projectDetail.projectLogo)"
            ></el-avatar>
            <div class="project-info">
              <h5 class="project-name">{{ projectDetail.projectName }}</h5>
              <div class="project-type">
                  <span
                      v-for="(type, index) in projectDetail.projectTypeList"
                      :key="type.id"
                  >{{
                      type.typeName
                    }}<span
                        v-if="index + 1 !== projectDetail.projectTypeList.length"
                    >/</span
                    ></span
                  >
              </div>
              <div class="tags flex">
                <button
                    v-for="(tag, index) in projectDetail.projectPositionTypeList"
                    :key="tag.id"
                    :style="{
                    backgroundColor: tagColor[index].bg,
                    color: tagColor[index].text,
                  }"
                >
                  {{ tag.positionName }}
                </button>
              </div>
            </div>
          </div>
          <div class="right-box flex col-lg-5 col-md-5 col-sm-12">
            <div>
              <h6>项目预算</h6>
              <h4 class="number">
                ¥{{ projectDetail.projectBudget | NumFormat }}
              </h4>
            </div>
            <div class="divider"></div>
            <div>
              <h6>项目周期</h6>
              <h4 class="number">{{ projectDetail.projectDuration }}天</h4>
            </div>
            <div class="divider" v-if="canView"></div>
            <div v-if="canView">
              <h6>项目关注</h6>
              <h4 class="number">{{ projectDetail.collectCount }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from "@/utils/auth";

export default {
  data() {
    return {
      tagColor: {
        0: {bg: "#E6F1FB", text: "#1B64DD"},
        1: {bg: "#FEF2D9", text: "#DD7F1B"},
        2: {bg: "#E1F2E5", text: "#23A42F"},
        3: {bg: "#EFE6FB", text: "#8C47E1"},
        4: {bg: "#FBE6F6", text: "#E147A2"},
        5: {bg: "#FAFBE6", text: "#DEB200"},
      },
    };
  },
  props: ["projectDetail"],
  computed: {
    canView() {
      const userInfo = getUserInfo();
      let {roles} = JSON.parse(userInfo);
      return roles.includes('employer');
    }
  }
};
</script>

<style lang="scss" scoped>
.qm-widget-content {

  .right-box {
    justify-content: space-around;
    text-align: center;

    h6 {
      margin-bottom: 15px;
    }
  }

  .project-info {
    margin-left: 30px;

    .project-name {
      font-weight: 800;
      margin-bottom: 10px;
    }

    .project-type {
      margin-bottom: 10px;
    }

    button {
      border-radius: 5px;
      margin-right: 10px;
      font-weight: bold;
      padding: 5px 20px;
    }
  }

  .divider {
    width: 1px;
    height: 50%;
    background: #e5e5e5;
  }

  .number {
    font-weight: bold;
    color: #1966d2;
  }
}
</style>
