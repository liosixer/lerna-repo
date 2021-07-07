<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="60%"
    :append-to-body="true"
    :before-close="handleClose"
    >
    <!-- search -->
    <el-form :model="searchForm" label-width="120px" size="small">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="规则名称">
            <el-input placeholder="请输入" v-model="searchForm.ruleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="规则编号">
            <el-input placeholder="请输入" v-model="searchForm.ruleBH"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleSearch" type="primary" size="small" icon="el-icon-refresh-right">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
    <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" height="350">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="ruleName" label="规则名称" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ruleBH" label="规则编号" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ptfwRuleType" label="计算规则" min-width="120" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span v-if="row.ptfwRuleType === 1">标准累进制</span>
          <span v-else-if="row.ptfwRuleType === 2">梯度进制</span>
        </template>
      </el-table-column>
      <el-table-column label="选择" width="90" align="left">
        <template slot-scope="{row}">
          <el-button class="operation-button" size="mini" type="text" @click="handleSelect(row)"><i class="iconfont icon-xuanze-"><span>选择</span></i></el-button>
        </template>
      </el-table-column>
      <div slot="empty" class="custom-empty"></div>
    </self-table>
    <!-- page -->
    <div class="com-table-pagination clearfix" v-if="total > 0">
      <v-pagination
        :total="total"
        :page="searchForm.page"
        :limit="searchForm.rows"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></v-pagination>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "ruleListDialog",
  inject: ["globalSetting"],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "选择收费规则"
    },
    ruleType: {
      type: [Number, String],
      default: ""
    },
  },
  computed: {
  },
  data() {
    return {
      searchForm: {
        ruleName: "",
        ruleBH: "",
        page: 1,
        rows: 10,
        isYouXiao: 1,
      },
      loading: false,
      tableData: [],
      total: 0,
    }
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit("update:dialogVisible", false)
    },
    // 搜索
    handleSearch() {
      this.searchForm.page = 1
      this.getList()
    },
    // 列表
    async getList() {
      this.loading = true
      let res = await this.portService.fetchRuleList({
        ...this.searchForm,
        ptfwRuleType: this.ruleType,
      })
      if (res && res.code == 1) {
        const { list, total, totalCount } = res.data
        this.loading = false
        this.tableData = list
        this.total = total || totalCount
      }
    },
    // 选择某项
    handleSelect(row) {
      this.$emit("handleSelect", row)
      this.handleClose()
      
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.searchForm.rows = val
      this.getList()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.getList()
    },
  },
  watch: {
    dialogVisible: {
      handler(val) {
        if (val) {
          this.searchForm = {
            ruleName: "",
            ruleBH: "",
            page: 1,
            rows: 10,
            isYouXiao: 1,
          }
          this.getList()
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/components/dailog/dialog.scss";
</style>
