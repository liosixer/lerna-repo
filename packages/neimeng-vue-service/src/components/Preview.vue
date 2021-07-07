<!--预览弹框-->
<template>
<div>
  <el-dialog
    class="previewDialog"
    title="预览"
    :visible.sync="dialogVisible"
    width="1200px"
    :append-to-body="true"
  >
    <div class="imgPreview" v-if="imgSrc">
      <img :src="imgSrc" alt />
    </div>
    <div class="pdfPreview" v-if="pdfSrc">
      <iframe
        ref="pdfIframe2"
        :src="iframeSrc"
        allowfullscreen="true"
        frameborder="0"
        :style="{width:'100%',height:(pageHt-325)+'px'}"
      ></iframe>
    </div>
    <div class="downLoadMenu">
      <!-- <el-button :disabled="false" size="small" type="primary" @click="closeDialog">关闭</el-button>
      <el-button size="small" type="primary" @click="downImg">下载</el-button>-->
      <div @click="closeDialog" class="my-menu">关闭</div>
      <div @click="downImg" class="my-menu">下载</div>
      <div class="my-menu" @click="pdfPrintAll" v-if="pdfSrc">打印</div>
    </div>
  </el-dialog>
  <div style="display:none;">
      <pdf 
        ref="pdf"
        :src="pdfSrc">
      </pdf>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: "PreviewDialog",
  data() {
    return {
      // url:"http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      dialogVisible: false,
      imgSrc: "",
      pageHt: window.innerHeight,
      pdfSrc: "",
      iframeSrc: ""
    };
  },
  components:{
    pdf
  },
  methods: {
    pdfPrintAll() {
      // this.dialogVisible = false;
      this.$refs.pdf.print()
    },
    downImg() {
      const url = this.imgSrc ? this.imgSrc : this.pdfSrc;
      window.open(url, "_blank");
      this.url = url;
      // if (this.imgSrc) {
      //   window.location.href = this.imgSrc;
      // } else {
      //   window.location.href = this.pdfSrc;
      // }
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  },
  created() {}
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