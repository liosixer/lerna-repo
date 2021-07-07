<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button type="primary" size="small" :loading="saveLoading" @click="handleSave">保存</el-button>
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
          <el-form :model="baseForm" ref="baseForm" :rules="baseRules" label-width="135px" size="small" label-position="right">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="规则名称" prop="ruleName">
                  <el-input v-model="baseForm.ruleName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="规则编号" prop="ruleBH">
                  <el-input v-model="baseForm.ruleBH" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="计算方式" prop="ptfwRuleType">
                  <el-select v-model="baseForm.ptfwRuleType" placeholder="请选择" disabled>
                    <el-option :value="1" label="标准累进制"></el-option>
                    <el-option :value="2" label="梯度进制"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计算金额">
                  <el-select v-model="baseForm.countAmount" placeholder="请选择" disabled>
                    <el-option value="" label="不限"></el-option>
                    <el-option :value="1" label="预算价"></el-option>
                    <el-option :value="2" label="成交价"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!-- 计算规则 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">计算规则</span>
          <el-button class="fr" @click="handleAdd" type="text" size="small">添加</el-button>
        </div>
        <div class="global-card-content">
          <self-table border :data="ruleList" v-loading="loading" stripe style="width: 100%">
          <el-table-column prop="sequence" label="档次" min-width="120"></el-table-column>
          <el-table-column prop="minValue" label="最小值（万元）" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sequenceName" label="名称" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="maxValue" label="最大值（万元）" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="feiLv" :label="baseForm.ptfwRuleType == 1 ? '费率（%）' : '收费金额（元）'" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" min-width="160" align="left" fixed="right">
            <template slot-scope="{row, $index}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleEdit(row, $index)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button @click="handleDel(row, $index)" size="mini" type="info" plain class="operation-button">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
        </div>
      </el-card>
      
    </div>

    <el-dialog :title=" type == 1 ? '设置基数区间和费率' : '设置基数区间和收费金额'" :visible.sync="ruleVisible" :before-close="beforeClose" append-to-body>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="150px" size="small" label-position="right">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="计算基数（万元）：" prop="minValue">
              <el-input v-model="ruleForm.minValue" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="`<第${ruleForm.sequence}档次≤`" prop="maxValue" class="gt-from-lable">
              <el-input v-model="ruleForm.maxValue" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="setMax" size="small" class="gt-set-btn">设为最大</el-button>
          </el-col>
        </el-row>
        <el-form-item :label="type == 1 ? '费率（%）：' : '收费金额(元)：'" prop="feiLv">
          <el-input v-model="ruleForm.feiLv" placeholder="请输入"></el-input>
          <p v-if="type == 1">注：在此区间内，按该-费率-进行-标准累进制-的计算</p>
          <p v-if="type == 2">注：在此区间内，按该-收费金额-进行-梯度收费-的计算</p>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="ruleVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleConfirmRule"  size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import mixins from "@/mixins/mixins";

export default {
  name: "chargeRulesDetail",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
  },
  data() {
    const fullAngleBack = (rule, value, callback) => {
      if (/[\uFF00-\uFFFF]/g.test(value)) {
        return callback(new Error('不能输入全角字符！'))
      } else {
        callback()
      }
    }
    const checkMin = (rule, value, callback) => {
      const reg = /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/
      if (value && !reg.test(value)) {
        return callback(new Error('请输入数字，如果是小数最多保留两位'))
      } else {
        callback()
      }
    }
    const checkMax = (rule, value, callback) => {
      const reg = /^([∞]{1}$)|^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/
      if (value && !reg.test(value)) {
        return callback(new Error('必须为特色字符∞，或者全为数字'))
      } else {
        callback()
      }
    }
    return {
      breadcrumbList: [
        { label: "平台配置", link: "" },
        { label: "收费规则设置", link: "/platformConfig/chargeRules" },
        { label: "详情", link: "" },
      ], // 面包屑配置
      baseForm: {},
      baseRules: {
        ruleName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: fullAngleBack, trigger: 'blur'},
        ],
        ruleBH: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        ptfwRuleType: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
      },
      ruleList: [],
      loading: false,
      saveLoading: false,
      guid: "",
      type: 1,
      ruleVisible: false,
      ruleForm: {
        feiLv: '',
        maxValue: '',
        minValue: '',
        sequence: 1,
      },
      rules: {
        minValue: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkMin, trigger: 'blur'},
        ],
        maxValue: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkMax, trigger: 'blur'},
        ],
        feiLv: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkMin, trigger: 'blur'},
        ],
      },
      ruleEditType: "add",
    }
  },
  created() {
    const { type = 1, guid = "" } = this.$route.query
    this.guid = guid
    this.type = type
    this.getDetail()
  },
  methods: {
    // 获取数据
    async getDetail() {
      const { code, data } = await this.portService.fetchRuleDetail({
        guid: this.guid,
      })
      if (code && code == 1) {
        this.baseForm = data
        this.ruleList = data.ptfwfRuleInfoVOList || []
      }
    },
    // 保存
    handleSave() {
      this.$refs.baseForm.validate(async (validate) => {
        if (!validate) return false
        this.saveLoading = true
        const res = await this.portService.fetchRuleUpdate(this.baseForm)
        if (res && res.code == 1) {
          this.saveLoading = false
          this.$message.success("保存成功")
        }
      })
    },
    beforeClose() {
      this.ruleVisible = false
    },
    // 添加
    handleAdd() {
      this.ruleForm = {
        ruleGuid: this.baseForm.guid,
        sequence: this.ruleList.length+1
      }
      this.ruleEditType = "add"
      this.ruleVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 编辑
    handleEdit(row, index) {
      this.ruleForm = {...row}
      this.ruleEditType = "edit"
      this.ruleVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 删除
    handleDel(row, index) {
      this.$confirm("此操作将永久删除该计算规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async () => {
        const res = await this.portService.fetchDelOneRule({ guid: row.guid })
        if (res && res.code == 1) {
          this.$message.success("删除成功")
          await this.getDetailList()
        }
      })
      .catch(() => {
        this.$message({ type: "info", message: "已取消删除" });
      });
    },
    // 设为最大
    setMax() {
      this.ruleForm = Object.assign({}, this.ruleForm, {
        maxValue: '∞'
      })
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate("maxValue")
      })
    },
    // 保存
    handleConfirmRule() {
      this.$refs.ruleForm.validate(async (validate) => {
        if (!validate) return false
        let service = this.ruleEditType == "add" ? "fetchSaveOneRule" : "fetchUpdateOneRule"
        const res = await this.portService[service](this.ruleForm)
        if (res && res.code == 1) {
          this.ruleVisible = false
          this.$message.success("保存成功")
          await this.getDetailList()
        }
      })
    },
    // 详细列表
    async getDetailList() {
      this.loading = true
      const res = await this.portService.fetchRuleDetailList({
        ruleGuid: this.guid,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.ruleList = res.data
      }
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep.gt-from-lable .el-form-item__label{
    text-align: center;
}
.gt-set-btn{
    width: 100%;
}
</style>