<template>
  <div class="dashboard-outer">
    <UpperTitle
      title="个人认证"
      text="个人认证后,您才能够接单，同时才能享受平台的推送服务。"
    ></UpperTitle>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="ls-widget">
          <div class="qm-widget-content">
            <div class="default-form">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="realName"
                  >真实姓名</label
                >
                <div class="col-sm-9">
                  <input
                    id="realName"
                    type="text"
                    v-model="name"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="idCard"
                  >身份证号</label
                >
                <div class="col-sm-9">
                  <input
                    id="idCard"
                    type="text"
                    v-model="idNumber"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="idCard"
                  >身份证照片</label
                >
                <div class="col-sm-9 d-flex">
                  <el-upload
                    class="avatar-uploader"
                    :action="getAbsPath('user/uploadIDCardFront')"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="getPortraitUrl"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="portraitUrl"
                      :src="getAbsPath(portraitUrl)"
                      class="avatar id-card"
                    />
                    <div
                      v-else
                      class="idcard-front avatar"
                      :style="'background-image:url(' + idcardFront + ')'"
                    ></div>
                    <div class="card-word">身份证照片正面</div>
                  </el-upload>

                  <el-upload
                    class="avatar-uploader"
                    :action="getAbsPath('user/uploadIDCardFront')"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="getEmblemUrl"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="emblemUrl"
                      :src="getAbsPath(emblemUrl)"
                      class="avatar id-card"
                    />
                    <div
                      v-else
                      class="idcard-front avatar"
                      :style="'background-image:url(' + idcardReverse + ')'"
                    ></div>
                    <div class="card-word">身份证照片背面</div>
                  </el-upload>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"></label>
                <div class="col-sm-9">
                  <button @click="postData" class="theme-btn btn-style-one">
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
  name: "PersonalAuthentication",
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
      name: "" /*真实姓名*/,
      idNumber: "" /*身份证号*/,
      portraitUrl: "" /*身份证人像面图片地址*/,
      emblemUrl: "" /*身份证国徽面图片地址*/,
      idcardReverse: require("@/assets/images/workbench/idcard-reverse.png") /*从images取出来的身份证正面图片做背景图*/,
      idcardFront: require("@/assets/images/workbench/idcard-front.png") /*从images取出来的身份证背面图片做背景图*/,
    };
  },
  methods: {
    /**
     * 获得身份证人像面图片地址
     * @author 霍少哲
     * params res后端返回的数据
     */
    getPortraitUrl(res) {
      this.portraitUrl = res.data;
    },
    /**
     * 获得身份证国徽面图片地址
     * @author 霍少哲
     * params res后端返回的数据
     */
    getEmblemUrl(res) {
      this.emblemUrl = res.data;
    },
    /**
     * 图片文件上传前检查是否符合要求
     * @author 霍少哲
     * params file传上去的图片文件
     */
    beforeAvatarUpload(file) {
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
    /**
     * 上传表单信息
     * @author 霍少哲
     * 请求类型为post
     */
    postData() {
      this.axios
        .post("/user/realNameForUser", {
          idCard: this.idNumber,
          idcardFront: this.portraitUrl,
          idcardReverse: this.emblemUrl,
          realName: this.name,
        })
        .then(() => {
          this.$message("认证成功");
          setTimeout(() => {
            this.$router.push("/workbench/dashboard");
          }, 1000);
        })
        .catch(() => {
          this.$message.error("认证失败，请检查信息输入是否有误！");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
