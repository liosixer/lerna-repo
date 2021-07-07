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
      <!-- 日志信息 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">日志信息</span>
        </div>
        <div class="global-card-content">
          <el-form :model="baseForm" ref="baseForm" label-width="135px" size="small" label-position="right" disabled>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="所属系统">
                  <el-input :value="baseForm.xitong | formatVal(systemType)" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="日志类别">
                  <el-input :value="baseForm.type | formatVal(globalSetting.logManagement.operateType)" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="事项类型">
                  <el-input :value="baseForm.shixiangType | formatVal(matterList)" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作人名称">
                  <el-input v-model="baseForm.operator" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="操作时间">
                  <el-input :value="baseForm.createdTime | timestampFormat('minute')" placeholder="自动读取"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="日志内容">
                  <el-input v-model="baseForm.operateDesc" placeholder="自动读取" type="textarea" :rows="4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import mixins from "@/mixins/mixins";

export default {
  name: "operationLogDetail",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "日志管理", link: "" },
        { label: "操作日志", link: "/logManagement/operationLog" },
        { label: "详情", link: "" },
      ], // 面包屑配置
      baseForm: {},
      guid: "",
      logList: [],
      matterTypeData: {},
      xitong: "1",
      matterList: [],
      systemType: [],
    }
  },
  filters: {
    formatVal(val, arr) {
      let res = arr.find((e) => e.code == val)
      if (res) return res.name
      else return val
    }
  },
  async created() {
    this.guid = this.$route.query.guid || ""
    this.xitong = this.$route.query.xitong || "1"
    let resSystem = await this.portService.fetchSystemType()
    if (resSystem && resSystem.code == 1) {
      this.systemType = resSystem.data || []
    }

    let resMatter = await this.portService.fetchMatterType({
      code: this.xitong,
    })
    if (resMatter && resMatter.code == 1) {
      this.matterList = resMatter.data || []
    }
    await this.getDetail()
  },
  methods: {
    // 获取数据
    async getDetail() {
      let res = await this.portService.fetchOperateLogDetail({
        guid: this.guid,
      })
      if (res && res.code == 1) {
        this.baseForm = res.data
      }
    },
    // 返回事项名
    getMatterVal() {
      function translate(val, arr) {
        let res = arr.find((e) => e.code === val)
        if (res) return res.name
        else return val
      }
      let array = this.matterTypeData[this.baseForm.xitong] || []
      return translate(this.baseForm && this.baseForm.shixiangType, array)
    },
  },
}
</script>

<style scoped lang="scss">

</style>