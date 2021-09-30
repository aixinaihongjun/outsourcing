<!--
 * @Description: 企业申请认证
 * @Author: 刘时航
 * @Date: 2021-08-26 19:50:13
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-13 12:06:36
-->
<template>
  <div class="dashboard-outer">
    <UpperTitle
      title="企业认证"
      text="企业认证后通过，项目会打上通过企业认证的标签，可提升项目项目靠谱程度。"
    ></UpperTitle>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="ls-widget">
          <div class="qm-widget-content">
            <div class="default-form">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="companyName"
                  >企业名称</label
                >
                <div class="col-sm-9">
                  <input
                    id="companyName"
                    type="text"
                    v-model="companyName"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="companyCode"
                  >统一社会信用代码或注册号</label
                >
                <div class="col-sm-9">
                  <input
                    id="companyCode"
                    type="text"
                    v-model="companyCode"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="idCard"
                  >营业执照扫描件</label
                >
                <div class="col-sm-9 d-flex">
                  <el-upload
                    class="avatar-uploader"
                    :action="getAbsPath('company/uploadBusinessImage')"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="getLicenseUrl"
                    :before-upload="beforeLicenseUpload"
                  >
                    <img
                      v-if="licenseUrl"
                      :src="getAbsPath(licenseUrl)"
                      class="avatar id-card"
                    />
                    <div
                      v-else
                      class="idcard-front avatar"
                      :style="'background-image:url(' + licenseBg + ')'"
                    ></div>
                    <div class="card-word">立即上传</div>
                  </el-upload>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"></label>
                <div class="col-sm-9">
                  <button
                    @click="applyCertification"
                    class="theme-btn btn-style-one"
                  >
                    提交认证
                  </button>
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
import { getToken } from "@/utils/auth";

export default {
  name: "EmployerCertification",
  components: {
    UpperTitle,
  },
  computed: {
    headers() {
      //TODO: 要封装出去
      return { Authorization: getToken("all") };
    },
  },
  data() {
    return {
      companyName: "",
      companyCode: "",
      licenseBg: require("@/assets/images/workbench/license.png") /*从images取出来的背景图*/,
      licenseUrl: "",
    };
  },
  methods: {
    beforeLicenseUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getLicenseUrl(res) {
      this.licenseUrl = res.data;
    },
    applyCertification() {
      this.axios
        .post(
          "/company/applyCertification",
          {},
          {
            params: {
              companyName: this.companyName,
              companyCode: this.companyCode,
              filePath: this.licenseUrl,
            },
          }
        )
        .then(() => {
          this.$message("认证成功");
          setTimeout(() => {
            this.$router.push("/workbench/dashboard");
          }, 1000);
        });
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader {
  display: flex;
  align-items: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.id-card {
  width: 320px;
  height: 209px;
  border: 1px dashed #d9d9d9;
  margin-top: 20px;
  background-size: contain;
  margin-right: 96px;
}
.idcard-front {
  width: 320px;
  height: 209px;
  margin-top: 20px;
  background-size: contain;
  margin-right: 96px;
}
.idcard-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
}

.card-word {
  margin-top: 35px;
  width: 320px;
}
</style>
