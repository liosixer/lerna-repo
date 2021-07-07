<template>
  <div :class="isDisabled ? 'isShowButton upload' : 'upload'">
    <el-upload
      ref="commonUpload"
      :action="`${API_ROOT}${action}`"
      :data="paramData"
      :before-upload="handleBeforeUpload"
      v-on:on-progress="handlePreview"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :show-file-list="showFileList"
      :headers="token"
      :name="argument"
      :disabled="isDisabled"
      :limit="limitNum"
      :on-exceed="handleExceed"
      :file-list="uploadFileList"
      :currentId="currentId"
      :on-preview="listClick"
      :on-remove="handleRemove"
      :accept="acceptType"
      :on-change="handleChange"
      :isSingle="isSingle"
    >
      <el-button
        v-if="isButtonShow"
        :disabled="isDisabled"
        :type="buttonType"
        v-loading.fullscreen.lock="loading"
        element-loading-text="正在上传..."
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :size="menuSize"
        >{{ buttonTxt }}</el-button
      >
    </el-upload>
    <preview-dialog ref="previewDialog"></preview-dialog>
  </div>
</template>
<script>
/*
 *  上传组件使用方法
 *  1.上传组件的个数限制，如果只上传1个，使用时不用设置limit
 *  2.上传一个附件的时候，继续上传是替换，需要设置@changeFilelist，
 *  3.上传多个附件时，limit需要设置个数，如果已经上传几个附件，编辑的时候还需要继续上传附件，groupGuid是已经从业务接口获得，需要把这个groupGuid
 *  赋给上传组件中的groupGuid，例如：this.$refs["groupsFj"].groupGuid = result.data.zbwjQiTaFuJian;
 *  4.单个附件删除只需要在deleteFile这个方法中，把相应的附件guid赋空就可以，
 *  例：deleteFile(file, fileList) {
          this.saveData.zbwjJsFuJian = "";
        },
 *  5.多附件删除，直接点击附件列表的删除x，就可以，文件系统直接删除的
 *  6.查看和编辑页面时，上传按钮获取已经上传的文件,util.js文件里面有getFiles的方法
 *  例：const fileObj = await util.getFiles(result.data.zbwjJsFuJian);//单附件
        const fileObj1 = await util.getFiles(result.data.zbwjQiTaFuJian, 1);//多附件
        if (fileObj) {
          //单附件
          this.fujianList1.push(fileObj);
        }
        if (fileObj1) {
          //多附件
          this.fujianList2 = Object.assign([], fileObj1);
        }
 */
import axios from "axios";
import store from "../store/";
import util from "../utils/utils";
import previewDialog from "./Preview";
import config from "../config/config";
export default {
  components: { previewDialog },
  props: {
    isButtonShow: {
      type: Boolean,
      default: true,
    },
    // 按钮名称
    buttonTxt: {
      type: String,
      default: "上传文件",
    },
    // 按钮大小
    menuSize: {
      type: String,
      default: "mini",
    },
    // 上传地址
    action: {
      type: String,
      default: "aaa",
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: "primary",
    },
    // 上传参数
    argument: {
      type: String,
      default: "file",
    },
    para: {
      type: Object,
      default: function() {
        return {};
      },
    },
    // 文件大小限制，单位为K
    fileSize: {
      type: String,
      default: "100*1024",
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
    onSuccess: Function,
    onProgress: Function,
    beforeUpload: Function,
    isDisabled: {
      type: Boolean,
      default: true,
    },
    // 限制上传个数
    limitNum: {
      type: Number,
      default: 10,
    },
    // 列表数据里面id
    currentId: {
      type: Number,
      default: 0,
    },
    acceptType: {
      type: String,
      default: ".doc,.docx,.xls,.xlsx,.png,.jpg,.pdf,.zip,.rar",
    },
  },
  data() {
    return {
      loading: false,
      token: {},
      isExamSolt: true,
      // API_ROOT: './UPLOAD_API',
      API_ROOT: util.downSrc() + "file-web",
      paramData: {
        token: "",
        groupGuid: "",
      },
      groupGuid: "",
      groupToken: "",
    };
  },
  computed: {
    uploadFileList() {
      return this.fileList || [];
    },
  },
  methods: {
    handleBeforeUpload(file) {
      if (this.fileSize) {
        // 限制文件大小，单位为k
        // console.log(file.size,this.fileSize)
        if (file.size / 1024 > this.fileSize) {
          Number(this.fileSize) > 1024
            ? this.$message.error(`上传的文件不能超过${Number(this.fileSize) / 1024}M，请重新上传`)
            : this.$message.error(`上传的文件不能超过${this.fileSize}Kb，请重新上传`);
          return false;
        }
      }
      const fileName = file.name;
      const ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
      console.log("【Upload】" + ext);
      const extCur = fileName.substring(fileName.lastIndexOf("."));
      if (this.acceptType) {
        if (this.acceptType.indexOf(ext) < 0 && this.acceptType.indexOf(extCur) < 0) {
          this.$message.error("文件类型不合法，请上传" + this.acceptType);
          return false;
        }
      }
      return new Promise((resolve, reject) => {
        if (this.limitNum == 10) {
          axios({
            url: config.requestUrl + "/guotou-file-business/newSingleUpload",
            method: "get",
            headers: {
              Authorization: "Bearer " + store.state.loginCookie.access_token,
            },
          }).then((response) => {
            if (response.data.data) {
              // this.paramData = {
              //   ...{ token: response.data.data },
              //   ...(this.para || {})
              // };
              this.paramData.token = response.data.data;
              // 开启上传中状态
              this.loading = true;
              resolve(true);
            }
          });
        } else {
          console.log('-------------- this.groupToken',this.groupToken)
          if (!this.groupToken) {
            console.log('-------------- 000')
            axios({
              url: config.requestUrl + "/guotou-file-business/newGroupUpload",
              method: "get",
              params: {
                groupGuid: this.groupGuid,
              },
              headers: {
                Authorization: "Bearer " + store.state.loginCookie.access_token,
              },
            }).then((response) => {
              // console.log(response.data.data.token);
              // this.paramData = {
              //   ...{
              //     token: response.data.data.token,
              //     groupGuid: response.data.data.guid
              //   },
              //   ...(this.para || {})
              // };
              this.paramData.token = response.data.data.token;
              this.paramData.groupGuid = response.data.data.guid;
              this.groupGuid = response.data.data.guid;
              this.groupToken = response.data.data.token;
              // 开启上传中状态
              this.loading = true;
              resolve(true);
            });
          } else {
            console.log('-------------- 111')
            // this.paramData = {
            //   ...{
            //     token: this.groupToken,
            //     groupGuid: this.groupGuid
            //   },
            //   ...(this.para || {})
            // };
            this.paramData.token = this.groupToken;
            this.paramData.groupGuid = this.groupGuid;
            // 开启上传中状态
            this.loading = true;
            resolve(true);
          }
        }
      });
    },
    // 文件上传时的钩子
    handlePreview() {
      console.log(765875)
      this.$emit("on-progress");
    },
    //文件删除的回调
    handleRemove(file, fileList) {
      if (this.limitNum == 10) {
        this.$emit("fileRemove", file, fileList);
      } else {
        let guid = "";
        if (file.guid) {
          guid = file.guid;
        } else {
          guid = file.response.result.guid;
        }
        axios({
          url: config.requestUrl + "/guotou-file-business/deleteFile",
          method: "post",
          headers: {
            Authorization: "Bearer " + store.state.loginCookie.access_token,
          },
          params: {
            fileInfoGuid: guid,
          },
        }).then((response) => {
          this.$emit("fileRemove", file, fileList);
        });
      }
    },
    // 文件上传成功时的钩子
    handleUploadSuccess(res, file, fileList) {
      // 关闭上传中状态
      console.log(22222222222222222222222);
      this.loading = false;

      if (res.success) {
        //吧成功回调函数传给父组件
        if (this.limitNum == 10) {
          this.$emit("sucData", res.result, this.currentId);
        } else {
          this.$emit("sucData", res.result, this.currentId);
        }
      } else {
        fileList.forEach((item, index) => {
          if (item.uid == file.uid) {
            fileList.splice(index, 1);
          }
        });
        this.$message.error(`上传失败`);
      }
    },
    // 文件上传失败时的钩子
    handleUploadError() {
      this.loading = false; // 关闭上传中状态
      this.$message.error("上传失败");
    },
    handleExceed(files, fileList) {
      console.log(7567)
      this.$message.warning(`附件上传已满`);
    },
    //上传文件让第二次覆盖第一的文件
    handleChange(file, fileList) {
      console.log(64565)
      if (fileList.length == 2) {
        // this.fileList= [fileList[fileList.length-1]]
        this.$emit("changeFilelist", [fileList[fileList.length - 1]], this.currentId);
      }
    },
    async listClick(file) {
      console.log(7657)
      console.log(file, "000000");
      if (file.guid) {
        const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
          if (ext == ".pdf") {
            this.$refs["previewDialog"].dialogVisible = true;
            this.$refs["previewDialog"].imgSrc = "";
            // pdf下载地址
            this.$refs["previewDialog"].pdfSrc = `${util.downSrc()}file-web/downloadFile?guid=${file.guid}&token=${file.downToken}`;
            // pdf预览地址
            this.$refs["previewDialog"].iframeSrc =
              config.getLocalUrl + "/tj-jy-zhaobiao/pdfn/web/viewer.html?file=" + encodeURIComponent(`${util.downSrc()}file-web/downloadFile?guid=${file.guid}&token=${file.downToken}`);
              console.log(this.$refs["previewDialog"].iframeSrc)
          } else {
            this.$refs["previewDialog"].dialogVisible = true;
            this.$refs["previewDialog"].iframeSrc = "";
            this.$refs["previewDialog"].pdfSrc = "";
            this.$refs["previewDialog"].imgSrc = `${util.downSrc()}file-web/downloadFile?guid=${file.guid}&token=${file.downToken}`;
          }
        } else {
          this.downLoadFunc(file.guid, file.downToken);
        }
      } else if (file.response) {
        console.log(file.response);
      }
    },
    downLoadFunc(guid, token) {
      window.location.href = `${util.downSrc()}file-web/downloadFile?guid=${guid}&token=${token}`;
    },
  },
};
</script>
<style lang="scss">
/* .upload{
      .el-upload-list{
        display: inline-block;
        li {
          display: inline-block;
        }
      }
    } */
.isShowButton {
  .el-upload--text {
    display: none;
  }
}
</style>
