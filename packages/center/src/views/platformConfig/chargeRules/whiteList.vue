<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-button size="small" type="text" @click="handleAdd">
            <i class="iconfont icon-xinzeng"></i> 添加
          </el-button>
          <el-button size="small" type="text" @click="$router.go(-1)">返回</el-button>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search">
      </div>
      <div class="global-content-detail">
        <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="qiYe_Name" label="供应商名称" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qiYe_BH" label="企业代码" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lianXiRen_Name" label="联系人" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lianXiRen_Phone" label="联系电话" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="rukuTime" label="入库时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.rukuTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column prop="create_Time" label="添加时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.create_Time | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="160" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleDel(row)" size="mini" type="info" plain class="operation-button">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
      <div class="com-table-pagination clearfix" ref="table_pagination">
        <v-pagination
          :total="total"
          :page="searchFormList.page"
          :limit="searchFormList.rows"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></v-pagination>
      </div>
    </div>

    <supplier-dialog
      :dialog-visible.sync="supplierVisible"
      @handleSelect="handleSelectSupplier"
    ></supplier-dialog>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import VPagination from "@/components/VPagination";
import mixins from "@/mixins/mixins";
import supplierDialog from "./supplierDialog"

export default {
  name: "whiteList",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
    supplierDialog,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "平台配置", link: "" },
        { label: "收费规则设置", link: "/platformConfig/chargeRules" },
        { label: "平台使用费白名单", link: "" },
      ], // 面包屑配置
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
      },
      supplierVisible: false,
    }
  },
  created() {
    this.computeTableHeight()
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      this.loading = true
      const res = await this.portService.fetchWhiteList({
        ...this.searchFormList,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.total
      }
    },
    // 添加
    handleAdd() {
      this.supplierVisible = true
    },
    // 删除
    handleDel(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        let res = await this.portService.fetchDelWhiteSupplier({ guid: row.guid })
        if (res && res.info == "success") {
          this.$message.success("删除成功")
          this.getList()
        }
      })
      .catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.searchFormList.rows = val
      this.getList()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.searchFormList.page = val
      this.getList()
    },
    // 选择供应商
    async handleSelectSupplier(vals) {
      if (!vals.length) return
      let arr = vals.map(item => item.userQiYe_Guid)
      let res = await this.portService.fetchSaveWhiteSupplier({
        chooseQiyes: arr.join(",")
      })
      if(res && res.code == 1) {
        this.$message.success("添加成功")
        this.getList()
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>