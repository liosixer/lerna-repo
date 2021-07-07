<template>
  <div>
    <el-form :disabled="forBidden" size="small" class="demo-form-inline" label-position="right" label-width="125px" ref="formInline1">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公告模板">
            <el-select v-model="moban" placeholder="请选择" @change="changMoBan">
              <el-option v-for="item in mobanOptions" :key="item.guid" :label="item.name" :value="item.guid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作:">
            <el-button size="small" @click="changBL" type="primary">替换变量</el-button>
            <el-button size="small" @click="saveData" v-if="isSave">生成签章文件</el-button>
            <el-button size="small" @click="saveData2" v-if="isSave" type="primary">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item>
            <vue-ueditor-wrap @ready="ready" v-model="moBanContent" :config="editorConfig" ref="ueditor"></vue-ueditor-wrap>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="签章文件:"> <upload :action="upUrl" :fileList="fujianList2" ref="QZFj"></upload> <el-button type="primary" size="mini" @click="openSign">签章</el-button> </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="confirm-passinput-dialog-model" v-show="passDialog">
      <iframe class="iframe-22" src id="newiframe223" frameborder="0"></iframe>
      <!--显示区域-->
      <div v-show="passDialog">
        <object
          ref="test"
          id="test"
          classid="clsid:39E08D82-C8AC-4934-BE07-F6E816FD47A1"
          style="margin-top: 10px"
          width="100%"
          :height="wdHeight - 260"
          codebase="iWebPDF.ocx#version=8.2.100.1138"
          align="middle"
          border="0"
        ></object>
        <input type="hidden" id="signData" />
        <input type="hidden" id="ggGuidPdf" value="${ggGuid!}" />
        <input type="hidden" id="pdfFileGuidQz" value="${pdfFileGuid!}" />
        <div style="text-align:center">
          <el-button @click="saveSign">保存</el-button>
          <el-button
            @click="
              () => {
                this.passDialog = false;
              }
            "
            >关闭</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import uEditorConfig from "@/config/ueditorConfig";
import util from "@/utils/utils";
import config from "@/config/config";
import Upload from "@/components/Upload";
export default {
  name: "ggInfo",
  components: { VueUeditorWrap, Upload },
  props: {
    shixiangcode: {
      type: Number,
      default: 0,
    },
    forBidden: {
      type: Boolean,
      default: false,
    },
    isSave: {
      type: Boolean,
      default: false,
    },
    guid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editorConfig: uEditorConfig,
      ueditor: "",
      mobanOptions: "",
      moban: "",
      moBanContent: "",
      upUrl: "",
      fujianList2: [],
      passDialog: false,
      wdHeight: window.innerHeight,
    };
  },

  created() {
    this.getMoBanOptions();
    if (this.guid) {
      util.getFiles(this.guid).then((res) => {
        if (res) {
          this.fujianList2 = [res];
        }
      });
    }
  },
  methods: {
    //保存签章
    saveSign() {
      //WebPDF.WebSave();
      const string = this.WebPDF.SaveSignDataToLocal();
      console.log(this.guid);
      this.portService.isignaturesaveSign({ fileGuid: this.guid, signData: string }).then((res) => {
        if (res.code === 1) {
          this.guid = res.data.newFileGuid;
          this.$emit("saveQZ", res.data.newFileGuid);
          this.passDialog = false;
        } else {
          this.$message({
            type: "error",
            message: res.info,
          });
        }
      });
    },
    //打开签章程序
    passSubmitFun() {
      this.sign().then((res) => {
        var result = this.WebPDF.ShowSignDlg(1);
        // this.saveSign();
      });
    },
    //签章相关

    initSign(val) {
      console.log(val, "val");
      var fileId = "${pdfFileGuid!}";
      var ggGuid = "${ggGuid!}";
      var downloadUrl = "${downloadUrl!}";
      this.WebPDF = document.getElementById("test");
      console.log(this.WebPDF);
      //                this.WebPDF = this.$refs.test;
      this.WebPDF.ShowMenus = 0;
      this.WebPDF.ShowSides = 0;
      this.WebPDF.ShowTools = 0;
      this.WebPDF.ShowSigns = 0;
      this.WebPDF.ShowState = 1;
      this.WebPDF.IsShowInputBox = false;
      this.WebPDF.RecordId = fileId;
      // this.WebPDF.WebUrl = config.requestUrl + "/gt-jy-zhaobiao/api/isignature/pdfServer.do";
      this.WebPDF.ServerURL = "http://192.168.0.198:8888/iSignatureServer/OfficeServer.jsp";
      // this.WebPDF.WebUrl = "${base}/zbgg/pdfSave.does?ggGuid=" + ggGuid;
      console.log(this.WebPDF);
      this.WebPDF.WebOpenUrlFile(val);
      //                this.WebPDF.WebOpenUrlFile(downloadUrl);
      //                this.WebPDF.GotoLastPage();
    },
    async sign() {
      console.log(this.guid);
      const guid = this.guid;
      if (guid) {
        const fileObj1 = await util.getFiles(guid);
        if (fileObj1) {
          console.log(fileObj1);
        }
        this.initSign(`${util.downSrc()}file-web/downloadFile?guid=${fileObj1.guid}&token=${fileObj1.downToken}`);
      }
    },
    openSign() {
      this.passDialog = true;
      this.passSubmitFun();
    },
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
      this.ueditor = editorInstance;
      if (this.forBidden) {
        this.ueditor.setDisabled();
      }
      var that = this;
      this.ueditor.addListener("contentChange", function(editor) {
        that.$nextTick(() => {
          that.$emit("getContent", that.ueditor.getContent());
        });
      });
    },
    async getMoBanOptions() {
      const { code, data } = await this.portService.commonlyUFgetCanUserList({ shiXiangCode: this.shixiangcode, bdGuid: this.$store.state.bids.bidInfo.bdGuid });
      if (code == 1) {
        this.mobanOptions = data;
      }
    },
    async changBL() {
      this.$emit("changBL", "");
    },
    async saveData() {
      this.$emit("saveData", "");
    },
    async saveData2() {
      this.$emit("saveAllData", "");
    },
    async changMoBan(moban) {
      this.mobanOptions.forEach((i) => {
        if (i.guid == moban) {
          this.moBanContent = i.content;
          this.$emit("getContent", i.content);
        }
      });
    },
    changeData() {
      console.log(aaaa);
    },
  },
  watch: {
    async guid(val) {
      if (val) {
        const fileObj1 = await util.getFiles(val);
        if (fileObj1) {
          this.fujianList2 = [fileObj1];
        }
      }
    },
    forBidden(val) {
      if (val) {
        this.ueditor.setDisabled();
      } else {
        this.ueditor.setEnabled();
      }
    },
    moBanContent(val) {
      if (val=='null') {
        this.moBanContent = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-passinput-dialog-model {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
  .confirm-use-dialog-div {
    padding: 70px 20px 20px 20px;
    width: 400px;
    border-radius: 10px;
    background-color: #ffffff;
    position: absolute;
    z-index: 999999;
    top: 40%;
    left: 50%;
    margin-left: -320px;
    .title {
      position: absolute;
      left: 20px;
      top: 15px;
    }
  }
  .confirm-use-dialog-close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
}
</style>
