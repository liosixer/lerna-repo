<template>
  <el-dialog title="审核意见" :visible.sync="dialogFormVisible" width="600px" :append-to-body="true">
    <div class="no-pass-reason">
      <el-form
              :model="searchForm"
              ref="searchForm"
              class="demo-form-inline"
              label-position="right"
              size="small"
              label-width="125px"
              >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="审核意见类型"  prop="shenHeYiJianType">
              <el-select v-model="searchForm.shenHeYiJianType" placeholder="请选择">
                <el-option v-for="(item, index) of typeArr" :value="index" :key="index" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="审核意见" prop="opinion" :rules="validate.vdLength(255,true)">
              <el-input type="textarea" :rows="4" v-model="searchForm.opinion"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="isFile">
          <el-col :span="24">
            <el-form-item label="审核附件">
              <upload
                      @sucData="getDataZb"
                      :fileList="fujianList1"
                      :action="upUrl"
                      :fileSize="'204800'"
                      :isDisabled="false"
                      :data="upParams"
                      @changeFilelist="changeFilelist"
              ></upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="text-align: right;margin-top: 20px;">
      <el-button @click="queding" type="primary" size="small">提交</el-button>
      <el-button @click="cancel" size="small">取消</el-button>
    </div>
  </el-dialog>



</template>
<script>
import Upload from "@/components/Upload";
export default {
  name: "nopassDialog",
  inject: ["globalSetting"],
  components: { Upload },
  props: {
    isFile: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      // 附件列表
      fujianList1: [],
      dialogFormVisible: false,
      upParams: "",
      searchForm: {
        opinion: "",
        fuJianGuid: "",
        shenHeYiJianType:'',
      },
      typeArr: [
        '公司名称填写有误 公司名称填写有误（与营业执照不一致）',
        '法定代表人填写有误 法定代表人填写有误（与营业执照不一致）',
        '注册地址填写有误 注册地址填写有误（与营业执照不一致）' ,
        '经营范围填写有误 经营范围填写有误（与营业执照保持一致）',
        '注册资本填写有误 注册资本填写有误（注意单位是万元）',
        '注册资本填写有误（与营业执照不一致） ',
        '三证合一证件号码填写有误 三证合一证件号码填写有误（与营业执照不一致）',
        '营业执照上传有误 请上传清晰版营业执照扫描件',
        '请上传营业执照彩色扫描件',
        'X年X月X日X变更，请上传最新版营业执照，并将相关注册信息与营业执照保持一致' ,
        '营业执照上传有误，与注册信息完全不一致',
        '请上传完整版营业执照扫描件（请勿部分截图）',
        '三证合一证件扫描件请上传营业执照',
        '附件无法打开，请确保文件未损坏'
      ],
    };
  },
  computed: {
    upUrl() {
      return "/upload";
    }
  },
  methods: {
    queding() {
      this.$refs["searchForm"].validate(async valid => {
        if (valid) {
          this.dialogFormVisible = false;
          // if (this.isFile) {
            this.$emit("getOpinion", this.searchForm);
          // } else {
          //   this.$emit("getOpinion", this.searchForm.opinion);
          // }
        }
      });
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    changeFilelist(arr) {
      this.fujianList1 = arr;
    },
    getDataZb(res) {
      this.searchForm.fuJianGuid = res.groupGuid;
    }
  },
  created() {}
};
</script>
<style lang="scss">
.no-pass-reason {
  .el-form-item__content {
    .el-textarea__inner {
      width: 100% !important;
    }
  }
}
// .shyj textarea{
//     height: 100px;
//     width: 200px!important;
// }
</style>