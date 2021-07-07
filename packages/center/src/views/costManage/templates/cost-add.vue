<template>
  <div class="container table-flex">
    <!-- <ContentHeader :title="$route.meta.routeName">
            <template slot="btns">
                <el-button size="small"  @click="saveBtn" type="primary" :loading="loading">保存</el-button>
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </template>
    </ContentHeader>-->
    <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <div class="search-btnGroud" slot="btns">
        <el-button size="small" @click="saveBtn" type="primary" :loading="loading">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </div>
    </page-crumb>
    <div class="global-content">
      <div class="global-content-detail clear-fr">
        <el-form
          ref="form"
          :model="addForm"
          label-width="120px"
          size="small"
          label-position="right"
        >
          <el-form-item label="规则名称" prop="ruleName" :rules="ruleNameRule(true)">
            <el-input v-model="addForm.ruleName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="规则编号" prop="ruleBH" :rules="ruleBHRule(true)">
            <el-input v-model="addForm.ruleBH" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="计算方式" prop="ptfwRuleType" :rules="validate.vdRequiredTC()">
            <el-select v-model="addForm.ptfwRuleType" placeholder="请选择">
              <el-option :value="1" label="标准进制"></el-option>
              <el-option :value="2" label="梯度进制"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计算金额" prop="countAmount">
            <el-select v-model="addForm.countAmount" placeholder="请选择">
              <el-option value label="不限"></el-option>
              <el-option :value="1" label="预算价"></el-option>
              <el-option :value="2" label="成交价"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效" prop="isYouXiao" :rules="validate.vdRequiredTC()">
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
import ContentHeader from "@/components/contentHeader/ContentHeader";
import ruleMixin from "../templates/ruleMixin";
import PageCrumb from "@/components/PageCrumb";
export default {
  name: "cost-add",
  components: {
    ContentHeader,
    PageCrumb,
  },
  mixins: [ruleMixin],
  data() {
    return {
      addForm: {
        ptfwType: this.$route.query.type,
        ruleName: "",
        ruleBH: "",
        ptfwRuleType: "",
        countAmount: "",
        isYouXiao: 1,
      },
      loading: false,
      breadcrumbList: [
        {
          label:
            this.$route.query.type == 1 ? "代理服务费设置" : "平台使用费设置",
          link:
            this.$route.query.type == 1
              ? "/costManage/agentCost"
              : "/costManage/platformCost",
        },
        { label: "新增", link: "" },
      ],
    };
  },
  methods: {
    /**
     * 费用管理添加
     */
    async costManageAdd() {
      this.loading = true;
      const data = await this.portService
        .costManageAdd(this.addForm)
        .catch(() => {
          this.loading = false;
          this.$message.error("提交失败");
        });

      this.loading = false;
      if (data.code) {
        this.$router.go(-1);
        this.$message({ type: "success", message: data.info });
      } else {
        this.$message({ type: "error", message: data.info });
      }
    },
    /**
     * 规则保存
     */
    saveBtn() {
      this.$refs.form.validate((validate) => {
        if (validate) this.costManageAdd();
      });
    },
  },
};
</script>