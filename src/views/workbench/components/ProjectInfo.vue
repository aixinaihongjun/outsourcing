<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-31 14:51:40
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-31 18:38:36
-->
<template>
  <Collapse title="项目信息" icon="qingmeng-icon icon-project-info-line-blue" :isShow="isShow">
    <ul>
      <li>
        <div class="title">
          <span class="icon la la-clock"></span> 项目简介
        </div>
        <p>{{ projectDetail.projectShortIntro }}</p>
      </li>
      <li>
        <div class="title">
          <span class="icon la la-clock"></span> 项目介绍
        </div>
        <p>{{ projectDetail.projectIntroduction }}</p>
      </li>
      <li>
        <div class="title">
          <span class="icon la la-clock"></span> 相关文档
        </div>
        <a target="_blank" :href="getAbsPath(file.file)" v-for="file in projectDetail.projectFileList" :key="file.id">{{ file.fileName }} <span>，</span></a>
      </li>
      <li>
        <div class="title">
          <span class="icon la la-clock"></span> 工作方式
        </div>
        <p>{{ workType[projectDetail.workType] }}</p>
      </li>
      <li>
        <div class="title">
          <span class="icon la la-clock"></span> 工作内容
        </div>
        <p>{{ projectDetail.workExplain }}</p>
      </li>
    </ul>
  </Collapse>
</template>

<script>
import Collapse from "@/components/Collapse.vue";
export default {
  name: "ProjectInfo",
  components: { Collapse },
  props: ["projectDetail", "isShow"],
  data() {
    return {
      isCollapse: false,
      workType: {
        0: "全职",
        1: "兼职",
        2: "全职&兼职",
      },
    };
  },
};
</script>

