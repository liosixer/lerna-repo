<template>
  <el-form ref="form" :model="searchForm" label-width="100px" size="small" label-position="right">
    <el-form-item label="规则名称">
      <el-input v-model="searchForm.ruleName" placeholder="请输入" size="small"></el-input>
    </el-form-item>
    <el-form-item label="规则编号">
      <el-input v-model="searchForm.ruleBH" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="规则类型">
      <el-select v-model="searchForm.ptfwRuleType" placeholder="请选择">
        <el-option :value="1" label="标准进制"></el-option>
        <el-option :value="2" label="梯度进制"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="searchForm.isYouXiao" placeholder="请选择">
        <el-option :value="0" label="无效"></el-option>
        <el-option :value="1" label="有效"></el-option>
      </el-select>
    </el-form-item>
    <div class="search-form-footer">
      <el-button @click.stop="searchBtn" size="small" type="primary" icon="el-icon-search">查询</el-button>
      <el-button @click.stop="resetBtn" size="small" icon="el-icon-refresh-right">重置</el-button>
    </div>
  </el-form>
</template>

<script>
const costObject = {
  ruleName: null, // 规则名称
  ruleBH: null, // 规则编号收起
  ptfwRuleType: null, // 规则类型  1标准进制 2梯度进制
  isYouXiao: null, // 1是否有效 0无效 1有效
};
export default {
  name: "template-cost-header",
  data() {
    return {
      iscollapsider: false,
      searchForm: Object.assign({}, costObject),
    };
  },
  methods: {
    searchBtn() {
      this.$emit("on-search", this.searchForm);
    },
    resetBtn() {
      this.searchForm = Object.assign({}, costObject);
    },
  },
};
</script>