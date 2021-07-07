<template>
  <!-- 履约情况 -->
  <el-card>
    <div slot="header" class="clearfix">
      <span class="global-card-header-name">{{qiYe_Name}}({{qiYe_BH}})</span>
    </div>
    <div class="global-card-content">
      <el-form :model="baseForm" ref="baseForm" label-width="135px" size="small" label-position="right" disabled>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="成交金额（万元）">
              <el-input :value="baseForm.dealMoney/10000 || ''" placeholder="自动读取"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商评价">
              <el-select v-model="baseForm.evaluationLevel" placeholder="自动读取">
                <el-option
                  v-for="item in globalSetting.supplierManagement.evaluation"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" v-for="item in scoreList" :key="item.label">
          <el-col :span="24">
            <el-form-item :label="item.label">
              <div class="evaluate-score-box">
                <div class="rate-box">
                  <el-rate :value="baseForm[item.field]/20" disabled allow-half :max="5" :low-threshold="10" :high-threshold="20"></el-rate>
                  <span class="rate-text">{{formatScoreText(baseForm[item.field])}}</span>
                </div>
                <h6 class="evaluate-describe-text">{{item.tips}}</h6>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="评价信息">
              <el-input v-model="baseForm.evaluationInfo" placeholder="自动读取" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="评价说明文件">
              <ul class="file-list">
                <li class="file-item" v-for="item in fileList" :key="item.guid">
                  <span class="down-link" @click="handleDownFile(item)">{{item.name}}</span>
                </li>
              </ul>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import util from "@/utils/util"
import config from "./config"

export default {
  name: "cjlyqkDetailEvaluate",
  inject: ["globalSetting"],
  mixins: [config],
  props: {
    baseForm: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fileList: [],
      scoreList: [],
      qiYe_Name: "",
      qiYe_BH: "",
    }
  },
  mounted() {
    const { enterPriseInfo } = this.$store.state.roleAnddepartment
    this.qiYe_Name = enterPriseInfo.qiYe_Name || "企业名称"
    this.qiYe_BH = enterPriseInfo.qiYe_BH || "企业代码"
  },
  methods: {
    formatScoreText(val) {
      if (val == 20 || val == 30) {
        return "较差"
      } else if (val == 40 || val == 50 ) {
        return "不合格"
      } else if (val == 60 || val == 70 ) {
        return "合格"
      } else if (val == 80 || val == 90 ) {
        return "良好"
      } else if (val == 100) {
        return "优秀"
      } else {
        return "很差"
      }
    },
    // 文件下载
    async handleDownFile(item) {
      const url = await util.getDownSrc(item.guid)
      window.open(url)
    },
  },
  watch: {
    'baseForm.attachment': async function(val, old) {
      if (val) {
        const res = await util.getFiles(val, 1)
        this.fileList = res
      }
    },
    'baseForm.xmLeiXing': function(val, old) {
      let arr = Object.keys(this.EVALUATE)
      let i = arr.findIndex(f => f == val)
      this.scoreList = i != -1 ? this.EVALUATE[arr[i]].list : []
      console.log(this.scoreList, "")
    },
  },
}
</script>

<style scoped lang="scss">
.evaluate-score-box{
  display: flex;
  align-items: flex-start;
  padding-top: 4PX;/*no*/

  .rate-box{
    flex: 0 0 300px;
    display: flex;
    align-items: center;
    ::v-deep.el-rate__item {

      .el-rate__decimal {
        font-size: 18PX;/*no*/
      }
    }
    .rate-text{
      margin: 0 0 0 4px;
      font-size: 16px;
      line-height: 1.5;
      color: rgb(247, 186, 42);
    }
  }

  .evaluate-describe-text{
    margin: 0 0 0 20px;
    font-size: 16px;
    line-height: 1.5;
    color: #999999;
  }
}
.down-link{
  color: #409eff;
  cursor: pointer;
}
</style>