<template>
  <div class="container table-flex">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}"></page-crumb>
    </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search"></div>
      <div class="global-content-detail">
        <self-table border :data="tableData" stripe v-loading="loading">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="subSystemId" label="子系统ID" min-width="120"></el-table-column>
          <el-table-column prop="subSystemName" label="子系统名称" min-width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="150" align="left">
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button
                  type="primary"
                  plain
                  class="operation-button"
                  size="small"
                  @click="look(scope.row.subSystemId)"
                >
                  <i class="iconfont icon-bianji2">
                    <span>查看</span>
                  </i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </self-table>
      </div>

      <div class="com-table-pagination clearfix">
        <VPagination
          :total="total"
          :page="searchFrom.page"
          :limit="searchFrom.rows"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></VPagination>
      </div>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import VPagination from "@/components/VPagination";

export default {
  name: "authorityManagement",
  components: {
    PageCrumb,
    VPagination
  },
  data() {
    return {
      searchFrom: {
        page: 1,
        rows: 10,
        name: ""
      },
      tableData: [],
      loading: false,
      breadcrumbList: [
        // { label: "用户及权限管理 ", link: "" },
        { label: "权限管理", link: "" }
      ],
      total: 0
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    /**
     * 查询表格数据
     */
    async searchList() {
      this.loading = true;
      const {
        code,
        data,
        total
      } = await this.portService.authorityManagementList(this.searchFrom);
      if (code == 200) {
        this.loading = false;
        this.tableData = data.rows;
        this.total = data.total;
      }
    },
    /**
     * 当分页器 分页数 改变调用
     * @param {String,Number} val 传入的条数
     * 调用一次组合组件的查询表格函数
     */
    handleSizeChange(val) {
      this.searchFrom.rows = val;
      this.searchList();
    },
    /**
     * 当分页器 页码 改变
     * @param {String,Number} val 传入的页数
     * 调用一次组合组件查询表格的函数
     */
    handleCurrentChange(val) {
      this.searchFrom.page = val;
      this.searchList();
    },
    /**
     * 查看
     */
    look(id) {
        this.$router.push({path:"/userAndQxManage/jurisdictionDetail",query:{id:id}})
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
