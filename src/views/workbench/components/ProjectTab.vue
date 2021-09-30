<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-30 11:10:28
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-03 10:11:06
-->
<template>
  <div class="tab ls-widget">
    <ul class="qm-tabs qm-widget-title">
      <li
          @click="currentTab = tab.key"
          class="flex align-items-center"
          :class="{ active: currentTab === tab.key }"
          v-for="tab in tabs"
          :key="tab.key"
      >
        <span :class="'tab-icon ' + tab.icon"></span>{{ tab.title }}
      </li>
    </ul>
    <div class="qm-widget-content">
      <ul v-if="currentTab === 'info'" class="info">
        <li class="item">
          <div class="title">
            <span class="qingmeng-icon icon-project-intro-line-blue"></span>项目简介
          </div>
          <p class="content">{{ projectDetail.projectShortIntro }}</p>
        </li>
        <li class="item">
          <div class="title">
            <span class="qingmeng-icon icon-project-desc-line-blue"></span>项目介绍
          </div>
          <div class="content editor-content" v-html="projectDetail.projectIntroduction"></div>
        </li>
        <li class="item" v-if="!canView">
          <div class="title">
            <span class="qingmeng-icon icon-related-documents-line-blue"></span>相关文档
          </div>
          <div class="content">
            <p v-for="(item, index) in projectDetail.projectFileList" :key="index" class="mb-2">
              <a target="_blank" :href="getAbsPath(item.fileUrl)">{{ item.fileName }}</a>
            </p>
          </div>
        </li>
        <li class="item">
          <div class="title">
            <span class="qingmeng-icon icon-work-type-line-blue"></span>工作方式
          </div>
          <p class="content">{{ workType[projectDetail.workType] }}</p>
        </li>
        <li class="item">
          <div class="title">
            <span class="qingmeng-icon icon-work-content-line-blue"></span>工作内容
          </div>
          <div class="content editor-content" v-html="projectDetail.workExplain"></div>
        </li>
      </ul>
      <ul v-if="currentTab === 'files'" class="files">
        <file-upload
            :action="getAbsPath('project/uploadFile')"
            :extraParams="{projectId: projectDetail.id}"
            :showFileList="projectDetail.projectFileList"
            @on-success="handleSuccess"
            @on-remove="handleRemove"></file-upload>
      </ul>
      <ul v-if="currentTab === 'setting'" class="info">
        <li class="item">
          <div class="title">
            <span>项目LOGO</span>
          </div>
          <p>
            <el-upload
                action="#"
                :class="listLength === 1 ? 'hide_box' : ''"
                ref="uploadLogo"
                list-type="picture-card"
                :http-request="uploadLogo"
                :auto-upload="false"
                :limit="1"
                :multiple="false"
                :on-preview="handleLogoPreview"
                :on-remove="handleLogoRemove"
                :on-change="handleLogoChange">
              <i class="el-icon-plus el-icon-setting"></i>
            </el-upload>
            <small class="form-text text-muted">
              允许上传的文件格式：png、jpg、jpeg。
            </small>
            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt=""/>
            </el-dialog>
          </p>
        </li>
        <li class="item">
          <div class="title">
          </div>
          <p>
            <button
                type="button"
                @click="$refs.uploadLogo.submit()"
                class="submit-logo theme-btn btn-style-one">保存
            </button>
          </p>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from "@/utils/auth";
import FileUpload from "@/components/FileUpload.vue";

export default {
  components: {
    FileUpload
  },
  data() {
    return {
      userRoles: [],
      currentTab: "info",
      workType: {
        0: "全职",
        1: "兼职",
        2: "全职&兼职",
      },
      // 文件上传
      // logo上传
      listLength: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  props: ["projectDetail"],
  computed: {
    canView() {
      return this.userRoles.includes('employer');
    },
    tabs() {
      let arrTab = [
        {
          title: "项目信息",
          icon: "qingmeng-icon icon-project-intro-line-gray",
          key: "info",
        }
      ];
      //TODO: 通过前端 js 隐藏菜单并不安全！！！
      if (this.userRoles.includes('employer')) {
        return arrTab.concat([
          {
            title: "项目文件",
            icon: "qingmeng-icon icon-related-documents-line-gray",
            key: "files",
          },
          {
            title: "项目设置",
            icon: "qingmeng-icon icon-project-settings-line-gray",
            key: "setting",
          },
        ])
      }
      return arrTab;
    }
  },
  methods: {
    handleSuccess(file) {
      this.projectDetail.projectFileList.push(file);
    },
    handleRemove(file) {
      this.projectDetail.projectFileList.splice(this.projectDetail.projectFileList.findIndex(elem => elem.uid === file.uid), 1)
    },
    // logo上传系列方法
    handleLogoPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleLogoChange(file, fileList) {
      // 图片上传成功赋值当前列表length
      this.listLength = fileList.length;
    },
    handleLogoRemove(file, fileList) {
      console.log(file, fileList);
      setTimeout(() => {
        this.listLength = fileList.length;
      }, 1000);
    },
    uploadLogo(param) {
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("file", fileObj); // 文件对象
      fd.append("projectId", this.projectDetail.id); // 文件对象

      this.axios.post("/project/uploadProjectLogo", fd).then((response) => {
        this.$message({
          type: "success",
          message: "上传成功!",
        });
        this.$emit('update-logo', response.fileUrl)
      });
    },
  },
  created() {
    const userInfo = getUserInfo();
    let {roles} = JSON.parse(userInfo);
    this.userRoles = roles;
  }
};
</script>

<style lang="scss" scoped>

.qm-tabs {
  .active {
    .tab-icon::before {
      color: #1966d2;
    }
  }
}

.qm-widget-content {
  min-height: 40vh;

  .qingmeng-icon {
    //vertical-align: middle;
    font-size: 24px;

    &::before {
      margin-right: 5px;
    }
  }

  .info {
    .item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;

      .title {
        font-size: 18px;
        margin-right: 30px;
        white-space: nowrap;
        min-width: 100px;

        display: flex;
        align-items: center;
      }

      .content {
        font-size: 18px;
        vertical-align: middle;
        line-height: 1.5;
      }

      /deep/ .editor-content {
        p {
          font-size: 18px;
        }
      }
    }
  }
}

// 隐藏样式  >>> 根据需要添加(如果用的脚手架样式不能覆盖)
.hide_box ::v-deep .el-upload--picture-card {
  display: none;
}
</style>
