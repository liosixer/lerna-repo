<template>
  <div>
    <el-form
      :disabled="checkout"
      size="small"
      class="demo-form-inline"
      label-position="right"
      label-width="125px"
    >
      <!-- <el-row :gutter="20" v-if="!checkout">
        <el-col :span="12">
          <el-form-item label="事项类型">
            <el-select v-model="itemCode" placeholder="请选择">
              <el-option
                v-for="item in itemTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="添加变量">
            <el-select v-model="variable" placeholder="请选择">
              <el-option
                v-for="item in variableOptions"
                :key="item.guid"
                :label="item.name"
                :value="item.guid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公告模板">
            <el-select
              v-model="moban"
              placeholder="请选择"
              @change="changMoBan"
            >
              <el-option
                v-for="item in itemTypeOptions"
                :key="item.guid"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作:">
            <el-button type="small" @click="changBL">替换变量</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item>
            <vue-ueditor-wrap
              @ready="ready"
              v-model="noticeInfo.moBanContent"
              :config="editorConfig"
            ></vue-ueditor-wrap>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import util from "@/utils/utils";
import VueUeditorWrap from "vue-ueditor-wrap";
import uEditorConfig from "@/config/ueditorConfig";

export default {
  name: "contractTemplateEditor",
  components: { VueUeditorWrap },
  inject: ["globalSetting"],
  props: {
    checkout: {
      type: Boolean,
      default: false,
    },
    itemType: {
      type: String,
      default: "采购合同",
    },
    shiXiangCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ueditor: null,
      variable: "", //变量
      itemCode: "",
      allConfig: "",
      editorConfig: uEditorConfig,
      itemTypeOptions: [], //事项类型们
      variableOptions: [],
      complexContent: "",

      //公告信息
      noticeInfo: {
        ggName: "",
        ggStartTime: "",
        // ggEndTime: '',
        faBuMeiTi: [],
        fujian: "",
        bgGgCiShu: "",
      },
      //模板选项
      moban: "",
      mobanOptions: [],
    };
  },
  computed: {},
  watch: {
    variable: {
      handler(n, o) {
        if (n) {
          let code = this.variableOptions.filter((i) => i.guid == n)[0];
          this.changeContent(`#{${code.name}}`);
        }
      },
    },
  },
  created() {
    //判断是否仅查看状态
    this.configItems();
    this.getMoBanOptions();
  },
  mounted() {},
  methods: {
    ready(editorInstance) {
      this.ueditor = editorInstance;
      if (this.checkout) {
        this.ueditor.setDisabled();
      }
      this.changeContent(this.content);
    },
    async configItems() {
      // await this.queryVariableConfig();
      await this.getTemplateItemsConfig();
    },

    /** 查询配置变量 **/
    async queryVariableConfig() {
      const { code, data } = await this.portService.commonlyUFqueryVarConfig();
      if (code == 1) {
        this.allConfig = data;
      }
    },

    /** 配置模板参数 **/
    async getTemplateItemsConfig() {
      const {
        data,
        code,
      } = await this.portService.commonlyUFqueryMoBanShiXiangLeiXing();
      if (code == 1) {
        data.map((v) => {
          this.itemTypeOptions.push({
            key: v.key,
            value: v.value,
            guid: v.guid,
          });
        });
      }
    },
    changeContent(insertHtml) {
      if (this.ueditor) {
        this.ueditor.execCommand("inserthtml", insertHtml);
      }
    },

    setContent(content) {
      this.complexContent = content;
      this.changeContent(content);
    },
    /** 获取富文本文档内容 **/
    getContent() {
      return this.ueditor ? this.ueditor.getContent() : "";
    },

    async getMoBanOptions() {
      const itemCode = this.getItemCode();
      return;
      const { code } = await this.portService.getCommonUsedFileForHeTong(
        itemCode
      );
      if (code == 1) {
        this.mobanOptions = data;
      }
    },

    async changMoBan(moban) {
      console.log(this.mobanOptions);
      this.mobanOptions.forEach((i) => {
        if (i.guid == moban) {
          this.noticeInfo.moBanContent = i.content;
        }
      });
    },
    async changBL() {
      console.log("替换变量之前需要先保存当前页面");
      // this.saveSubmmit("validate").then((res) => {
      //   if (res) {
      // this.portService.cgggchangGongGaoBianLiang(this.getParam()).then((res) => {
      //   this.noticeInfo.moBanContent = res.data.moBanContent;
      // });
      //   }
      // });
    },

    //2102 采购合同
    getItemCode(name = "采购合同") {
      const list = [...this.globalSetting.common.singstype];
      const value = list.find((value) => {
        return value.name == name;
      });
      return value ? value.code : "2102";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>