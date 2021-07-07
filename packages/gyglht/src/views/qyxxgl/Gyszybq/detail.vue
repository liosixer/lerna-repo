<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button size="small" type="primary" v-if="editType != 'view'" :loading="saveLoading" @click="handleSave">保存</el-button>
          <el-button size="small" @click="$router.go(-1)">返回</el-button>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <!-- 专业标签信息 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">专业标签信息</span>
        </div>
        <div class="global-card-content">
          <el-form :model="baseForm" ref="baseForm" :rules="baseRules" label-width="135px" size="small" label-position="right" :disabled="disabledEdit">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="专业标签" prop="biaoqianName">
                  <el-input v-model="baseForm.biaoqianName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属单位" prop="suoshuQiyeName" class="flex_choose">
                  <template v-if="$store.state.loginCookie.userInfo.guotouerji == 1">
                    <div class="flex_choose_input">
                      <el-input v-model="baseForm.suoshuQiyeName" placeholder="请选择" readonly></el-input>
                    </div>
                    <el-button class="flex_choose_button" size="small" type="primary" @click="chooseAgency">选择</el-button>
                  </template>
                  <template v-else>
                    <el-input v-model="baseForm.suoshuQiyeName" placeholder="" disabled></el-input>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <!--  企业为（企业代码：911100002717519818）供应商处理 -->
                <el-form-item label="是否电煤采购" prop="ifMeiDian" v-if="isMainAgency">
                  <el-radio-group v-model="baseForm.ifMeiDian" @change="handleChangeDianmei">
                    <el-radio
                      v-for="item in globalSetting.supplierManagement.whetherStatus"
                      :key="item.code"
                      :label="item.code"
                    >{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行业分类" prop="industryClassify">
                  <Cascader :disabledIndustry="disabledIndustry" @changData="changIndustry" :cascaderData="cascaderData"></Cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有效" prop="isYouxiao">
                  <el-radio-group v-model="baseForm.isYouxiao">
                    <el-radio
                      v-for="item in globalSetting.supplierManagement.majorLabelStatus"
                      :key="item.code"
                      :label="item.code"
                    >{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!-- 专业标签供应商 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">专业标签供应商</span>
          <el-button size="small" type="primary" :disabled="disabledEdit" @click="handleAddLabelSupplier" style="float:right;">添加</el-button>
        </div>
        <div class="global-card-content">
          <self-table border :data="supplierList" stripe>
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column label="供应商名称" prop="name" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业代码" prop="bh" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column label="联系人" prop="lianxiren" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column label="联系电话" prop="phone" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" min-width="120" align="left" fixed="right">
              <template slot-scope="{row, $index}">
              <el-button-group class="operation-button-group">
                <el-button :disabled="disabledEdit" @click="handleDelLabelSupplier(row, $index)" size="mini" type="info" plain class="operation-button">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
              </el-button-group>
            </template>
            </el-table-column>
          </self-table>
        </div>
      </el-card>
    </div>

    <!-- 采购单位 -->
    <purchase-dialog
      :dialog-visible.sync="purchaseVisible"
      @handleSelect="handleSelectPurchase"
    ></purchase-dialog>

    <!-- 供应商 -->
    <supplier-dialog
      :dialog-visible.sync="supplierVisible"
      :second-level-guid="baseForm.erHangyeFenlei"
      :supplier-list="supplierList"
      @handleSelect="handleSelectSupplier"
    ></supplier-dialog>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import mixins from "@/mixins/mixins";
import purchaseDialog from "./dialog/purchaseDialog"
import supplierDialog from "./dialog/supplierDialog"
import Cascader from "@/components/Cascader"

export default {
  name: "gyszybqDetail",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    purchaseDialog,
    supplierDialog,
    Cascader,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "供应商专业标签", link: "/qyxxgl/gyszybq" },
        { label: "详情", link: "" },
      ], // 面包屑配置
      saveLoading: false,
      disabledEdit: false,
      baseForm: {
        biaoqianName: "",
        suoshuQiyeName: "",
        industryClassify: "",
        isYouxiao: 1,
        ifMeiDian: 0,
      },
      baseRules: {
        biaoqianName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        suoshuQiyeName: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        industryClassify: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        isYouxiao: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        ifMeiDian: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      supplierList: [],
      editType: "view",
      purchaseVisible: false,
      supplierVisible: false,
      guid: "",
      cascaderData: [],
      disabledIndustry: false,
      isMainAgency: false,
    }
  },
  created() {
    const { type = "view", guid = "" } = this.$route.query
    this.editType = type
    this.guid = guid
    this.disabledEdit = type == "view" ? true : false
    const { enterPriseInfo } = this.$store.state.roleAnddepartment
    this.isMainAgency = enterPriseInfo.qiYe_BH == "911100002717519818"
    this.baseForm.suoshuQiyeName = enterPriseInfo.qiYe_Name
    this.baseForm.suoshuQiye = enterPriseInfo.userQiYe_Guid
    if (type != "create") {
      this.getDetail()
    }
  },
  methods: {
    // 获取数据
    async getDetail() {
      const res = await this.portService.fetchLabelDetail({
        guid: this.guid,
      })
      if (res && res.code == 1) {
        const { qiyeList = [], yiHangyeFenlei, erHangyeFenlei, sanHangyeFenlei = "" } = res.data
        this.baseForm = res.data
        let level = sanHangyeFenlei ? sanHangyeFenlei : erHangyeFenlei
        this.baseForm.industryClassify = level
        this.cascaderData = sanHangyeFenlei ? [yiHangyeFenlei, erHangyeFenlei, sanHangyeFenlei] : [yiHangyeFenlei, erHangyeFenlei]
        const { userInfo } = this.$store.state.loginCookie
        const { enterPriseInfo } = this.$store.state.roleAnddepartment
        if (userInfo.guotouerji != 1) {
          this.baseForm.suoshuQiyeName = enterPriseInfo.qiYe_Name
          this.baseForm.suoshuQiye = enterPriseInfo.userQiYe_Guid
        }
        this.supplierList = qiyeList
        this.clearIndustryRules()
      }
    },
    // 选择行业
    changIndustry(data, type) {
      if (type == "1") {
        this.baseForm.yiHangyeFenlei = data
        this.cascaderData[0] = data
      } else if (type == "2") {
        if (this.baseForm.erHangyeFenlei && this.baseForm.erHangyeFenlei != data) {
          this.supplierList = []
        }
        this.cascaderData[1] = data
        this.baseForm.erHangyeFenlei = data
      } else {
        this.cascaderData[2] = data
        this.baseForm.sanHangyeFenlei = data
      }
      this.clearIndustryRules()
    },
    // 电煤改变
    handleChangeDianmei(val) {
      if (val == 1) {
        // 电力、热力、燃气及水生产和供应业-电力、热力生产和供应业-电力生产
        this.baseForm = Object.assign({}, this.baseForm, {
          yiHangyeFenlei: "DBCC939B-8DFE-4D03-B071-0BC930E2A27F",
          erHangyeFenlei: "BF4A0076-2B9A-4F68-8D9F-00AE76353FC6",
          sanHangyeFenlei: "C8114111-5BE4-497B-B9F6-60D627E3B4AA",
          industryClassify: "C8114111-5BE4-497B-B9F6-60D627E3B4AA",
        })
        const { yiHangyeFenlei, erHangyeFenlei, sanHangyeFenlei } = this.baseForm
        this.cascaderData = [yiHangyeFenlei, erHangyeFenlei, sanHangyeFenlei]
        this.disabledIndustry = true
        if (this.isMainAgency) {
          this.handleCheckSetDianmei()
        }
      } else {
        this.disabledIndustry = false
      }
      this.$nextTick(() => {
        this.$refs.baseForm.clearValidate("industryClassify")
      })
    },
    // 选择单位
    chooseAgency() {
      this.purchaseVisible = true
    },
    // 选择采购单位
    handleSelectPurchase(row) {
      this.baseForm = Object.assign({}, this.baseForm, {
        suoshuQiyeName: row.name,
        suoshuQiye: row.guid,
      })
      if (this.baseForm.ifMeiDian && this.isMainAgency) {
        this.handleCheckSetDianmei()
      }
    },
    async handleCheckSetDianmei() {
      let res = await this.portService.fetchSetDianmei({qiyeGuid: this.baseForm.suoshuQiye || ""})
      if (res && res.code == 1) {
        if (res.data.data == 1) {
          this.$alert('该采购单位已设置电煤采购的专业供应商，不可重复添加！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.baseForm.ifMeiDian = 0
            }
          })
        }
      }
    },
    // 添加专业标签供应商
    handleAddLabelSupplier() {
      if (!this.baseForm.erHangyeFenlei) {
        this.$message.warning("请先选择行业分类")
        return
      }
      this.supplierVisible = true
    },
    // 选择供应商
    handleSelectSupplier(vals) {
      this.supplierList = vals
    },
    // 删除专业标签供应商
    handleDelLabelSupplier(row, i) {
      let arr = this.supplierList
      arr.splice(i, 1)
      this.supplierList = arr
    },
    // 保存
    handleSave() {
      this.$refs.baseForm.validate(async (valid) => {
        if (!valid) return false
        if (!this.supplierList.length) {
          this.$message.warning("请添加供应商")
          return false
        }
        let arr = this.supplierList.map(item => item.guid)
        let qiyeGuids = arr.join(",")
        this.saveLoading = true
        const { biaoqianName, suoshuQiye, yiHangyeFenlei, erHangyeFenlei, sanHangyeFenlei = "", isYouxiao, ifMeiDian } = this.baseForm
        let params = {
          guid: this.guid,
          biaoqianName,
          suoshuQiye,
          yiHangyeFenlei,
          erHangyeFenlei,
          sanHangyeFenlei,
          isYouxiao,
          qiyeGuids,
          ifMeiDian,
        }
        const res = await this.portService.fetchSaveLabel(params)
        if (res && res.code == 1) {
          this.saveLoading = false
          this.$message.success("保存成功")
          if (res.data.guid) {
            this.guid = res.data.guid
          }
        }
      })
    },
    clearIndustryRules() {
      if (!this.baseForm.sanHangyeFenlei) {
        this.baseForm = Object.assign({}, this.baseForm, {
          industryClassify: this.baseForm.erHangyeFenlei,
        })
      } else {
        this.baseForm = Object.assign({}, this.baseForm, {
          industryClassify: this.baseForm.sanHangyeFenlei,
        })
      }
      this.$nextTick(() => {
        this.$refs.baseForm.clearValidate("industryClassify")
      })
    },
  },
  watch: {
    'baseForm.ifMeiDian': function(val, old) {
      if (val == 1) {
        this.disabledIndustry = true
      } else {
        this.disabledIndustry = false
      }
    }
  },
}
</script>

<style scoped lang="scss">

</style>