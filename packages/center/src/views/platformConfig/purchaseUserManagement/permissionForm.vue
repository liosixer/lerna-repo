<template>
  <!-- 权限控制 -->
  <el-card>
    <div slot="header" class="clearfix">
      <span class="global-card-header-name">权限控制</span>
    </div>
    <div class="global-card-content">
      <el-form :model="baseForm" ref="permissionForm" label-width="135px" size="small" label-position="right" :disabled="disabledEdit">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="门户网站" prop="isUsedHomeWebsite" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedHomeWebsite">
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="baseForm.isUsedHomeWebsite == 0">
            <el-form-item label="门户域名" prop="homeWebsite" :rules="requiredRuleInput">
              <el-input v-model="baseForm.homeWebsite" placeholder="www.xxxxx.com.cn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="采购方式" prop="purchaseMethod" :rules="requiredRule">
              <el-select v-model="baseForm.purchaseMethod" multiple placeholder="请选择" disabled>
                <el-option
                  v-for="item in globalSetting.common.PurchaseType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="baseForm.zuHuType.includes(0)">
            <el-form-item label="计划模块" prop="isUsedPlanModule" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedPlanModule" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" v-if="baseForm.zuHuType.includes(1)">
            <el-form-item label="采购委托" prop="isUsedPurchaseCommission" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedPurchaseCommission" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="baseForm.zuHuType.includes(1)">
            <el-form-item label="代理服务费" prop="daiLiFeiMethod" :rules="requiredRule">
              <el-checkbox-group v-model="baseForm.daiLiFeiMethod" disabled>
                <el-checkbox
                  v-for="item in globalSetting.platformConfig.agentCostType"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="标书费" prop="biaoShuFeiMethod" :rules="requiredRule">
              <el-checkbox-group v-model="baseForm.biaoShuFeiMethod" disabled>
                <el-checkbox
                  v-for="item in globalSetting.platformConfig.tenderCostType"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台使用费" prop="isPingTaiFei" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isPingTaiFei">
                <el-radio
                  v-for="item in globalSetting.platformConfig.platformCostType"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="专家系统" prop="isUsedExpertSystem" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedExpertSystem" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="baseForm.isUsedExpertSystem == 0">
            <el-form-item label="抽取专家信息" prop="extractExpertInfo" :rules="requiredRule">
              <el-radio-group v-model="baseForm.extractExpertInfo" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.secretType"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="非招专业分类" prop="isUsedFeiZhaoZYFL" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedFeiZhaoZYFL" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商管理" prop="isUsedSupplierManage" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedSupplierManage" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="监标人" prop="isUsedJianBiaoRen" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedJianBiaoRen" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自查报告" prop="isUsedZiChaBaoGao" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedZiChaBaoGao" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" v-if="baseForm.zuHuType.includes(0)">
            <el-form-item label="采购人复核" prop="isCaiGouRenFuHe" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isCaiGouRenFuHe" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.whetherStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="baseForm.zuHuType.includes(0)">
            <el-form-item label="招标方案" prop="isUsedZBFangAn" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedZBFangAn" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="项目编号" prop="projectNumber" :rules="requiredRule">
              <el-radio-group v-model="baseForm.projectNumber" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.createType"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="非招使用CA" prop="isUsedCA" :rules="requiredRule">
              <el-radio-group v-model="baseForm.isUsedCA" disabled>
                <el-radio
                  v-for="item in globalSetting.platformConfig.useStatus"
                  :key="item.code"
                  :label="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="允许招标代理" prop="yunXuZhaoBiaoDaiLiNames" :rules="requiredRule" class="flex_choose">
              <div class="flex_choose_input">
                <el-input v-model="baseForm.yunXuZhaoBiaoDaiLiNames" placeholder="请选择" readonly></el-input>
              </div>
              <el-button class="flex_choose_button" size="small" type="primary" @click="chooseAgency">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <agency-dialog
      :dialog-visible.sync="agencyVisible"
      :agency-list="agencyList"
      :agency-names="agencyNames"
      @handleSelect="handleSelectAgency"
    ></agency-dialog>
  </el-card>
</template>

<script>
import agencyDialog from "./agencyDialog"

export default {
  name: "permissionForm",
  inject: ["globalSetting"],
  components: {
    agencyDialog,
  },
  props: {
    baseForm: {
      type: Object,
      default: () => ({})
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      requiredRule: [
        { required: true, message: '请选择', trigger: 'change' },
      ],
      requiredRuleInput: [
        { required: true, message: '请输入', trigger: 'change' },
      ],
      agencyVisible: false,
      agencyList: [],
      agencyNames: [],
    }
  },
  mounted() {
    const checkEmptyArray = (data) => {
      if (!data) {
        data = []
      } else {
        data = data.split(",")
      }
      return data
    }
    this.agencyList = checkEmptyArray(this.baseForm.yunXuZhaoBiaoDaiLi)
    this.agencyNames = checkEmptyArray(this.baseForm.yunXuZhaoBiaoDaiLiNames)
  },
  methods: {
    chooseAgency() {
      this.agencyVisible = true
    },
    handleSelectAgency(vals, names) {
      console.log(vals,names)
      this.agencyList = vals
      this.agencyNames = names
      this.$emit("handleSelectAgency", vals, names)
    },
  },
}
</script>