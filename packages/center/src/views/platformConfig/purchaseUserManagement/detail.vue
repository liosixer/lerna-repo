<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button v-if="!disabledEdit" type="primary" size="small" :loading="saveLoading" @click="handleSave">保存</el-button>
          <el-button size="small" @click="$router.go(-1)">返回</el-button>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <!-- 基本信息 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">基本信息</span>
        </div>
        <div class="global-card-content">
          <el-form :model="baseForm" ref="baseForm" label-width="135px" size="small" label-position="right" disabled>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="用户类别">
                  <el-radio-group v-model="baseForm.deptType">
                    <el-radio
                      v-for="item in globalSetting.platformConfig.userType"
                      :key="item.code"
                      :label="item.code"
                    >{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="baseForm.deptName" placeholder="自动读取" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="交易主体类型">
                  <el-checkbox-group v-model="baseForm.zuHuType">
                    <el-checkbox
                      v-for="item in globalSetting.platformConfig.marketType"
                      :key="item.code"
                      :label="item.code"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册邀请码">
                  <el-input v-model="baseForm.yaoQingCode" placeholder="自动读取" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="社会信用代码">
                  <el-input v-model="baseForm.qiYeDaiMa" placeholder="自动读取" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入库时间">
                  <el-input :value="baseForm.createTime | timestampFormat('minute')" placeholder="自动读取" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="所属租户">
                  <el-input v-model="baseForm.zuHuName" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="租户代码">
                  <el-input v-model="baseForm.zuHuCode" placeholder="自动读取" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!-- 权限控制 -->
      <permission-form
        v-if="isShowjurisdiction"
        :base-form="baseForm"
        :disabled-edit="disabledEdit"
        ref="permissionBox"
        @handleSelectAgency="handleSelectAgency"
      ></permission-form>

      <!-- 平台使用费收费规则 -->
      <platform-cost-rule-list
        v-if="baseForm.isPingTaiFei == 0"
        :guid="guidPtsyf"
        :disabled-edit="disabledEdit"
        :base-form="baseForm"
        :is-show="baseForm.isPingTaiFei == 0"
      ></platform-cost-rule-list>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import VPagination from "@/components/VPagination";
import mixins from "@/mixins/mixins";
import permissionForm from "./permissionForm"
import platformCostRuleList from "./platformCostRuleList"

export default {
  name: "purchaseUserManagementDetail",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
    permissionForm,
    platformCostRuleList,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "平台配置", link: "" },
        { label: "采购用户管理", link: "/platformConfig/purchaseUserManagement" },
        { label: "详情", link: "" },
      ], // 面包屑配置
      baseForm: {
        zuHuType: [0, 1],
        isUsedPlanModule: 1,
        isUsedPurchaseCommission: 0,
        daiLiFeiMethod: [0],
        biaoShuFeiMethod: [],
        isPingTaiFei: 1,
        isUsedExpertSystem: 0,
        extractExpertInfo: 0,
        isUsedFeiZhaoZYFL: 1,
        isUsedSupplierManage: 0,
        isUsedJianBiaoRen: 1,
        isUsedZiChaBaoGao: 1,
        isCaiGouRenFuHe: 1,
        isUsedZBFangAn: 1,
        projectNumber: 0,
        isUsedCA: 1,
        purchaseMethod: "",
        yunXuZhaoBiaoDaiLi: "",
        yunXuZhaoBiaoDaiLiNames: "",
      },
      saveLoading: false,
      editType: "view",
      guid: "",
      guidPtsyf:"",
      disabledEdit: false,
      // 是否显示设置权限
      isShowjurisdiction:false
    }
  },
  created() {
    const { type = "view", guid = "" } = this.$route.query
    this.guid = guid
    this.editType = type
    this.disabledEdit = type == "view" ? true : false
    this.getDetail()
  },
  methods: {
    // 获取数据
    async getDetail() {
      let res = await this.portService.fetchPurchaseUserDetail({
        // guid: this.guid,
        qiYeGuid: this.guid,
      })
      if (res && res.code == 1) {
        this.isShowjurisdiction = true;
        this.baseForm = res.data
        const checkEmptyArray = (data) => {
          if (!data && data != 0) {
            data = []
          } else {
            data = data.split(",")
            data = data.map(item => +item)
          }
          return data
        }
        const { zuHuType, daiLiFeiMethod, biaoShuFeiMethod, purchaseMethod } = res.data
        this.baseForm.zuHuType = checkEmptyArray(zuHuType)
        this.baseForm.daiLiFeiMethod = checkEmptyArray(daiLiFeiMethod)
        this.baseForm.biaoShuFeiMethod = checkEmptyArray(biaoShuFeiMethod)
        this.baseForm.purchaseMethod = checkEmptyArray(purchaseMethod)
        this.guidPtsyf = res.data.deptGuid
        this.$nextTick(() => {
          this.$refs.permissionBox.$refs.permissionForm.clearValidate()
        })
      }
    },
    // 保存
    async handleSave() {
      // this.$refs.permissionBox.$refs.permissionForm.validate(async valid => {
      //   if (!valid) return false
      //   this.saveLoading = true
      //   let params = { ...this.baseForm }
      //   params.zuHuType = params.zuHuType.join(",")
      //   params.daiLiFeiMethod = params.daiLiFeiMethod.join(",")
      //   params.biaoShuFeiMethod = params.biaoShuFeiMethod.join(",")
      //   params.purchaseMethod = params.purchaseMethod.join(",")
      //   let res = await this.portService.fetchSavePurchaseUserPermission({
      //     ...params,
      //     guid: this.guid,
      //     isZuHu: 0,
      //   })
      //   if (res && res.code == 1) {
      //     this.saveLoading = false
      //     this.baseForm.authorGuid = res.data.authorGuid
      //     this.$message.success("保存成功")
      //   }
      // })
      
      this.saveLoading = true
        let params = { ...this.baseForm }
        params.zuHuType = params.zuHuType.join(",")
        params.daiLiFeiMethod = params.daiLiFeiMethod.join(",")
        params.biaoShuFeiMethod = params.biaoShuFeiMethod.join(",")
        params.purchaseMethod = params.purchaseMethod.join(",")
        let res = await this.portService.fetchSavePurchaseUserPermission({
          ...params,
          guid: this.guid,
          isZuHu: 0,
        })
        if (res && res.code == 1) {
          this.saveLoading = false
          this.baseForm.authorGuid = res.data.authorGuid
          this.$message.success("保存成功")
        }
    },
    // 选择招标代理
    handleSelectAgency(vals, names) {
      this.baseForm = Object.assign({}, this.baseForm, {
        yunXuZhaoBiaoDaiLi: vals.join(","),
        yunXuZhaoBiaoDaiLiNames: names.join(","),
      })
    }
  },
}
</script>

<style scoped lang="scss">

</style>
