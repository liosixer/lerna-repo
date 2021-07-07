<template>
  <div class="container table-flex">
    <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <div class="search-btnGroud" slot="btns">
        <el-button size="small" @click="handleSave" type="primary" :saveLoading="saveLoading">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </div>
    </page-crumb>
    <div class="global-content">
      <div class="global-content-detail clear-fr">
        <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="120px" size="small" label-position="right">
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="addForm.ruleName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="规则编号" prop="ruleBH">
            <el-input v-model="addForm.ruleBH" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="计算方式" prop="ptfwRuleType">
            <el-select v-model="addForm.ptfwRuleType" placeholder="请选择">
              <el-option :value="1" label="标准累进制"></el-option>
              <el-option :value="2" label="梯度进制"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计算金额" prop="countAmount">
            <el-select v-model="addForm.countAmount" placeholder="请选择" disabled>
              <el-option value label="不限"></el-option>
              <el-option :value="1" label="预算价"></el-option>
              <el-option :value="2" label="成交价"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效" prop="isYouXiao">
            <el-select v-model="addForm.isYouXiao" placeholder="请选择">
              <el-option :value="1" label="有效"></el-option>
              <el-option :value="0" label="无效"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";

export default {
  name: "chargeRulesAdd",
  components: {
    PageCrumb,
  },
  data() {
    const fullAngleBack = (rule, value, callback) => {
      if (/[\uFF00-\uFFFF]/g.test(value)) {
        callback(new Error('不能输入全角字符！'))
      } else {
        callback()
      }
    }
    return {
      breadcrumbList: [
        { label: "平台配置", link: "" },
        { label: "收费规则设置", link: "/platformConfig/chargeRules" },
        { label: "新增", link: "" }
      ], // 面包屑配置
      addForm: {
        ptfwType: this.$route.query.type || 2,
        ruleName: "",
        ruleBH: "",
        ptfwRuleType: "",
        countAmount: 1,
        isYouXiao: 1,
      },
      addRules: {
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
        isYouXiao: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
      },
      saveLoading: false,
    };
  },
  methods: {
    // 保存
    handleSave() {
      this.$refs.addForm.validate(async (validate) => {
        if (!validate) return false
        this.saveLoading = true
        const res = await this.portService.fetchRuleSave(this.addForm)
        if (res && res.code == 1) {
          this.$message.success("保存成功")
          this.$router.go(-1)
        }
      });
    },
  },
};
</script>