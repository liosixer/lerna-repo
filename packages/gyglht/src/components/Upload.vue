<template>
  <div class="upload">
    <!-- accept="application/pdf" 上传格式限定 -->
    <el-upload
      :action="`${API_ROOT}${action}`"
      :data="paramData"
      :before-upload="handleBeforeUpload"
      v-on:on-progress="handlePreview"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :show-file-list="showFileList"
      :headers="token"
      :name="argument"
      :accept="acceptType"
      :disabled="isDisabled"
      :limit="limitNum"
      :on-change="handleOnChange"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :currentId="currentId"
      :on-preview="listClick"
      :on-remove="onRemove"
      :isImgSize="isImgSize"
      ref="upload"
    >
      <el-button
        :disabled="isDisabled"
        :type="buttonType"
        v-loading.fullscreen.lock="loading"
        element-loading-text="正在上传..."
        element-loading-background="rgba(0, 0, 0, 0.8)"
        size="mini"
        v-if="buttonType !== 'image'"
      >
        {{ buttonTxt }}
      </el-button>
      <div class="uplader_image" v-else>
        <div class="img_bg" v-if="src[0]" :style="{ backgroundImage: 'url(' + src + ')' }"></div>
        <i class="el-icon-picture" v-else style="font-size: 40px; color: #ccc"></i>
      </div>
    </el-upload>
  </div>
</template>
<script>
import axios from "axios";
/*
 * 1.使用时候，如果需要显示已经上传过的文件，需要将已经上传的文件用过uploadedList属性传入
 * <Upload action="/upload" :uploadedList="[{guid: 'aaa', fileName: 'aa.png'}]" ></upload>
 * 2.如果需要在上传完成后显示图片预览，只需要将buttonType属性设置成image即可
 */
import { getDownToken } from "@/service/enterpriseInfo";
import config from "../config/config";
export default {
  props: {
    // 按钮名称
    buttonTxt: {
      type: String,
      default: "上传文件",
    },
    // 上传地址
    action: {
      type: String,
      default: "/upload",
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
      default: "10240",
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    isImgSize:{
      type: Boolean,
      default: false,
    },
    onSuccess: Function,
    onProgress: Function,
    beforeUpload: Function,
    acceptType: {
      type: String,
      default: ".doc,.docx,.xls,.xlsx,.png,.jpg,.pdf,.zip,.rar",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    // 限制上传个数
    limitNumType: {
      type: [Number, Boolean],
      default: false,
    },
    // 列表数据里面id
    currentId: {
      type: Number,
      default: 0,
    },
    uploadedList: {
      type: Array,
      default: () => [{ fileName: "" }],
    },
    //没有token的情况 （账号申诉材料的上传）
    noToken:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      token: {},
      isExamSolt: true,
      // API_ROOT: './UPLOAD_API',
      API_ROOT: config.fileDownUrl + "/file-web",
      paramData: {},
      src: "",
      fileList: [],
      loaded: false,
    };
  },
  computed: {
    limitNum() {
      return typeof this.limitNumType === "number" ? this.limitNumType : 100000;
    },
  },
  created() {
    this.getFileList()
  },
  methods: {
    getFileList(){
      this.getToken().then((res) => {
        console.log("0000000000000000")
        console.log(this.uploadedList)
        if (this.uploadedList.length) {
          if (this.buttonType === "image") {
            // 目前只处理一张图片的
            const guid = this.uploadedList[0]["guid"];
            if (guid) {
              this.getFiles(guid).then((r) => {
                this.src = `${config.fileDownUrl}/file-web/downloadFile?guid=${guid}&token=${r.downToken}`;
                this.fileList.push({
                  name: this.uploadedList[0].fileName,
                  guid: this.uploadedList[0]["guid"],
                });
              });
            }
          } else {
            this.fileList = []
            this.uploadedList.forEach((i) => {
              if (i["guid"]) {
                this.fileList.push({
                  name: i.fileName,
                  guid: i["guid"],
                });
              }
            });
          }
        }
      });
    },
    async getToken() {
      return new Promise((resolve) => {
        if(!this.noToken){
          const res = axios({
            url: config.requestUrl + "/guotou-file-business/newSingleUpload",
            method: "get",
            headers: {
              Authorization: "Bearer " + this.$store.state.loginCookie.access_token,
            },
          }).then((res) => {
            this.paramData.token = res.data.data;
            resolve(res.data.data);
          });
        }else{
          const result = axios({
            url: config.requestUrl + "/qykzt/file/getUploadFileToken",
            method: "get",
          }).then((res) => {
            console.log(res,'=====')
            this.paramData.token = res.data.data.token;
            resolve(res.data.data.token);
          });
        }
      });
    },
    handleBeforeUpload(file) {
      this.loaded = false;
      if (this.fileSize) {
        // 限制文件大小，单位为k
        if (file.size / 1024 > this.fileSize) {
          this.$message.error("上传的文件不能超过" + 10 + "M，请重新上传");
          this.$emit("onRemoveFn");
          this.fileList = [];
          return false;
        }
      }
      const fileName = file.name;
      const ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
      const extCur = fileName.substring(fileName.lastIndexOf("."));
      if (this.acceptType) {
        if (this.acceptType.indexOf(ext) < 0 && this.acceptType.indexOf(extCur) < 0) {
          this.$message.error("文件类型不合法，请上传" + this.acceptType);
          this.fileList = [];
          return false;
        }
      }
      if(this.isImgSize){
        let _this = this
        const isSize = new Promise(function (resolve, reject) {
        let width = 120; // 限制图片尺寸为654X270
        let height = 100;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          let valid = img.width === width && img.height === height;
          valid ? resolve() : reject();
        }
          img.src = _URL.createObjectURL(file);
        }).then(() => {
          return file;
        }, () => {
          _this.$message.error('图片尺寸限制为120 x100')
          return Promise.reject();
        });
        return isSize
      }
      this.getToken().then((res) => {
        if (res) {
          // this.loading = true;
        }
      });
    },
    // 文件上传时的钩子
    handlePreview() {
      this.$emit("on-progress");
    },
    // 文件上传成功时的钩子
    async handleUploadSuccess(res, file, fileList) {
      // 关闭上传中状态
      this.loading = false;
      if (res.success) {
        //吧成功回调函数传给父组件
        this.$emit("sucData", res.result, this.currentId);
        const guid = res.result.guid;
        if (this.buttonType === "image") {
          this.src = URL.createObjectURL(file.raw);
        }
      } else {
        this.fileList = [];
        this.$message.error("上传失败");
      }
    },
    // 文件上传失败时的钩子
    handleUploadError() {
      this.loading = false; // 关闭上传中状态
      this.$message.error("上传失败");
    },
    handleExceed(files) {
      this.$message.warning(`最多可以上传${this.limitNum}个文件`);
    },
    onRemove(file, fileList) {
      const data = file.response ? file.response.result : { guid: file.guid, fileName: file.name };
      this.$emit("onRemoveFn", data);
    },
    async getFiles(guid) {
      if (guid) {
        let result = await axios({
          url: config.requestUrl + "/guotou-file-business/getByFileGuid",
          method: "get",
          params: { fileInfoGuid: guid },
          headers: {
            Authorization: "Bearer " + this.$store.state.loginCookie.access_token,
          },
        });
        if (result.data.code == 1 && result.data.data) {
          return result.data.data;
        }
      } else {
        return null;
      }
    },
    async listClick(file) {
      const guid = file.guid;
      // console.log(file)
      const res = await this.getFiles(guid);
      if (guid) {
        //如果是已经上传好的  查询出来下载
        const token = res.downToken;
        if (token) {
          this.downLoadFunc(guid, token);
        }
      } else if (file.response) {
        // 因为并没有提给获取文件token的接口，所以暂时不支持上传就下载
        //const result = file.response.result
        // const res = await this.getToken(result.guid)
        //this.downLoadFunc(result.guid, res)
      }
    },
    downLoadFunc(guid, token) {
      window.location.href = `${config.fileDownUrl}/file-web/downloadFile?guid=${guid}&token=${token}`;
    },
    handleOnChange(file, fileList) {
      console.log("66666")
      console.log(file)
      if (this.limitNumType === false || this.limitNumType === 1) {
        if (fileList.length > 0) {
          this.fileList = [fileList[fileList.length - 1]];
        }
      }
    },
  },
  watch: {
    uploadedList(data) {
      console.log("9999999999999999")
      console.log(data)
      if (data[0] && !data[0].fileName) {
        this.fileList = [];
        this.src = [];
      }
      // this.getFileList()
    },
  },
};
</script>
<style lang="scss">
.uplader_image {
  width: 150px;
  height: 150px;
  border: 1px dashed #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .img_bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
.el-upload-list {
  vertical-align: bottom;
  display: inline-block;
  position: relative;
  bottom: 5px;
}
.el-upload {
  vertical-align: top;
  display: inline-block;
}
.el-upload-list__item {
  transition: all 0s;
  width: 240px;
}
</style>
