<!--预览弹框-->
<template>
  <el-dialog class="previewDialog" title="预览" :visible.sync="dialogVisible" width="1200px" :append-to-body="true">
    <div class="imgPreview" v-if="imgSrc">
      <img :src="imgSrc" alt />
    </div>
    <div class="pdfPreview" v-if="pdfSrc">
      <iframe ref="pdfIframe2" :src="iframeSrc" allowfullscreen="true" frameborder="0" :style="{ width: '100%', height: pageHt - 325 + 'px' }"></iframe>
    </div>
    <div class="downLoadMenu">
      <!-- <el-button :disabled="false" size="small" type="primary" @click="closeDialog">关闭</el-button>
      <el-button size="small" type="primary" @click="downImg">下载</el-button>-->
      <div @click="closeDialog" class="my-menu">关闭</div>
      <div @click="downImg" class="my-menu">下载</div>
    </div>
  </el-dialog>
</template>

<script>
import util from "../utils/util";
import config from "../config/config";
export default {
  name: "PreviewDialog",
  //   props: {
  //     // 图片地址
  //     imgSrc: {
  //       type: String,
  //       default: ""
  //     },
  //     // pdf地址
  //     pdfSrc: {
  //       type: String,
  //       default: ""
  //     },
  //   },
  data() {
    return {
      dialogVisible: false,
      imgSrc: "",
      pageHt: window.innerHeight,
      pdfSrc: "",
      iframeSrc: "",
      guid: "",
      fileName: "",
    };
  },
  methods: {
    downImg() {
      if (this.imgSrc) {
        window.location.href = this.imgSrc;
      } else {
        window.location.href = this.pdfSrc;
      }
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  created() {},
  watch: {
    guid(newValue, oldValue) {
      if (newValue != oldValue) {
        const ext = this.fileName.substring(this.fileName.lastIndexOf(".")).toLowerCase();
        if (ext == ".pdf") {
          console.log(config.getLocalUrl,'config.getLocalUrlconfig.getLocalUrl')

          this.imgSrc = "";
          // pdf下载地址
          util.getDownSrc(newValue).then((res) => {
            this.pdfSrc = res;
          });
          // pdf预览地址
          util.getDownSrc(newValue).then((res) => {
            console.log(config.getLocalUrl + "/pdfn/web/viewer.html?file=" + encodeURIComponent(res))
            this.iframeSrc = config.getLocalUrl + "/gt-jy-qyglht/pdfn/web/viewer.html?file=" + encodeURIComponent(res);
          });
        } else {
          this.iframeSrc = "";
          this.pdfSrc = "";
          util.getDownSrc(newValue).then((res) => {
            this.imgSrc = res;
            console.log(this.imgSrc);
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.imgPreview {
  text-align: center;
  img {
    max-width: 100%;
  }
}
.downLoadMenu {
  text-align: center;
  margin-top: 20px;
  .my-menu {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    margin-left: 10px;
  }
}
.previewDialog {
  .el-dialog__body {
    padding: 0 10px 10px 10px;
  }
}
</style>
