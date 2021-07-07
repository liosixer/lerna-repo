<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" :append-to-body="true" :before-close="handleClose">
    <!-- search -->
    <el-form :model="searchForm" label-width="120px" size="small">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="企业名称">
            <el-input placeholder="请输入" v-model="searchForm.qiYeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="企业代码">
            <el-input placeholder="请输入" v-model="searchForm.qiYeBH"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleSearch" type="primary" size="small" icon="el-icon-refresh-right">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
    <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" height="350" class="no-all-tb" ref="selectionTable" @select="handleSelectRow">
      <el-table-column class-name="sections" type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="qiYeName" label="企业名称" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qiYeBH" label="企业代码" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column type="selection"  width="60" align="center"></el-table-column>
      <div slot="empty" class="custom-empty"></div>
    </self-table>
    <!-- page -->
    <div class="com-table-pagination clearfix" v-if="total > 0">
      <v-pagination
        :total="total"
        :page="searchForm.pageNo"
        :limit="searchForm.pageSize"
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
import utils from "@/utils/utils"

export default {
  name: "agencyDialog",
  inject: ["globalSetting"],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "选择招标代理"
    },
    agencyList: {
      type: Array,
      default: () => ([])
    },
    agencyNames: {
      type: Array,
      default: () => ([])
    },
  },
  computed: {
  },
  data() {
    return {
      searchForm: {
        qiYeName: "",
        qiYeBH: "",
        pageNo: 1,
        pageSize: 10
      },
      loading: false,
      tableData: [],
      total: 0,
      selectVals: [],
      checkedList: [],
      checkedNames: [],
    }
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit("update:dialogVisible", false)
    },
    // 搜索
    handleSearch() {
      this.searchForm.pageNo = 1
      this.getList()
    },
    // 列表
    async getList() {
      this.loading = true
      let res = await this.portService.fetchTenderAgencyList({
        ...this.searchForm,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total    
        this.$nextTick(() => {
          this.tableData.filter((t, i) => {
            let flag = this.checkedList.some(s => s == t.qiYeGuid)
            this.$refs.selectionTable.$refs.selfTable.toggleRowSelection(this.tableData[i], flag)
          })
        })
      }
    },
    // 确定
    handleSelect() {
      this.$emit("handleSelect", this.checkedList, this.checkedNames)
      this.handleClose()
    },
    // 选择行
    handleSelectRow(val, row) {
      let index = -1
      let flag = false
      this.checkedList.some((s, i) => {
        if (s == row.qiYeGuid) {
          flag = true
          index = i
          return true
        } else {
          return false
        }
      })
      if (flag) {
        this.checkedList.splice(index, 1)
        this.checkedNames.splice(index, 1)
      } else {
        this.checkedList.push(row.qiYeGuid)
        this.checkedNames.push(row.qiYeName)
      }
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getList()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.searchForm.pageNo = val
      this.getList()
    },
  },
  watch: {
    dialogVisible: {
      handler(val) {
        if (val) {
          this.checkedList = utils.deepClone(this.agencyList)
          this.checkedNames = utils.deepClone(this.agencyNames)
          this.searchForm = {
            qiYeName: "",
            qiYeBH: "",
            pageNo: 1,
            pageSize: 10
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
  .no-all-tb {
    ::v-deep.el-table-column--selection.is-leaf {
      .cell {
        display: none;
      }
      /*display: none;*/
    }
  }
</style>
