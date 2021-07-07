<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
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
                <el-form-item label="标段/包名称">
                  <el-input v-model="baseForm.bdName" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标段/包编号">
                  <el-input v-model="baseForm.bdBh" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="项目类型">
                  <el-select v-model="baseForm.xmLeixing" placeholder="自动读取">
                    <el-option
                      v-for="item in globalSetting.supplierManagement.projectType"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="采购方式">
                  <el-select v-model="baseForm.zbFangshi" placeholder="自动读取">
                    <el-option
                      v-for="item in globalSetting.supplierManagement.purchaseType"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="采购单位">
                  <el-input v-model="baseForm.purchaserQiyeName" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业代码">
                  <el-input v-model="baseForm.purchaserQiyeBh" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="项目经理">
                  <el-input v-model="baseForm.purchaserLianxirenName" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="baseForm.purchaserLianxirenPhone" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <misconduct
        :base-form="baseForm"
      ></misconduct>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import mixins from "@/mixins/mixins";
import misconduct from "./misconduct"

export default {
  name: "misconductDetail",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    misconduct,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "供应商不良行为", link: "/qyxxgl/misconduct" },
        { label: "详情", link: "" }
      ],
      routeName: "misconductDetail",
      baseForm: {},
      guid: "",
    }
  },
  created() {
    this.fetchInit()
  },
  methods: {
    // 初始化
    fetchInit() {
      const { type = "view", guid = "" } = this.$route.query
      this.guid = guid
      this.routeName = this.$route.name
      this.getDetail()
    },
    // 获取数据
    async getDetail() {
      const res = await this.portService.fetchMisconductDetail({
        guid: this.guid,
      })
      if (res && res.code == 1) {
        this.baseForm = res.data.data
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>