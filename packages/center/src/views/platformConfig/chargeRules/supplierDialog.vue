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
          <el-form-item label="企业名称">
            <el-input placeholder="请输入" v-model="searchForm.qiYe_Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="企业代码">
            <el-input placeholder="请输入" v-model="searchForm.qiYe_BH"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleSearch" type="primary" size="small" icon="el-icon-refresh-right">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
    <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" height="350" ref="selectionTable" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="qiYe_Name" label="企业名称" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qiYe_BH" label="企业代码" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column type="selection"  width="60" align="center"></el-table-column>
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
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSelect">确定</el-button>
      <el-button type="primary" plain @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "supplierDialog",
  inject: ["globalSetting"],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "选择供应商"
    },
  },
  data() {
    return {
      searchForm: {
        qiYe_Name: "",
        qiYe_BH: "",
        page: 1,
        rows: 10
      },
      loading: false,
      tableData: [],
      total: 0,
      selectVals: [],
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
      let res = await this.portService.fetchWhiteSupplier({
        ...this.searchForm,
        preperdZhongBiaoRen: "",
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total    
      }
    },
    // 确定
    handleSelect() {
      this.$emit("handleSelect", this.selectVals)
      this.handleClose()
    },
    // 选择行
    handleSelectionChange(val) {
      this.selectVals = val
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
            qiYe_Name: "",
            qiYe_BH: "",
            page: 1,
            rows: 10
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
