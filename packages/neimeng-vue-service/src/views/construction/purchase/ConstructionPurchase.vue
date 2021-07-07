<template>
  <div class="construction-purchase">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header
          :onSearch="() => (showSearch = true)"
          :onNew="() => handleNew()"
        />
      </template>
      <div class="card-content">
        <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          class="cus-table"
          style="width: 100%"
          :height="computeCusTableHeight()"
        >
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="projectNo"
            label="招标项目编号"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="projectName"
            label="招标项目名称"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bdName"
            label="标段(包)名称"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column label="招标方式" width="120" align="center">
            <template #default="{row}">
              {{ _zbFangshi(row.zbFangshi) }}
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="180" align="center">
            <template #default="{row}">
              {{ _approveStatus(row.approveStatus) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/construction/purchase/manage',
                  query: {
                    src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${row.projectNo}`,
                  },
                }"
                >管理</router-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="cus-table-pagination clearfix" ref="table_pagination">
        <v-pagination
          :total="total"
          :page="searchForm.currPage"
          :limit="searchForm.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></v-pagination>
      </div>
    </el-card>
    <el-drawer
      custom-class="cus-drawer"
      :visible.sync="showSearch"
      :show-close="false"
      direction="rtl"
      size="24%"
    >
      <template #title>
        <div class="cus-drawer-header">
          <img src="../../../assets/images/frame/filter.png" class="i-filter" />
          <span class="title">高级筛选</span>
          <el-button type="text" @click="() => (showSearch = false)">
            收起<i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
      </template>
      <search-form
        :searchForm="searchForm"
        :onReset="() => handleReset()"
        :onSearch="() => handleSearch()"
      />
    </el-drawer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CardHeader from './components/CardHeader.vue';
import SearchForm from './components/SearchForm.vue';
import tableFormMixin from '@/mixins/tableFormMixin.js';
import { zbFangshi, approveStatus } from '@/config/data.config';
import { getProjectBd } from './service';
export default {
  name: 'ConstructionPurchase',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      searchForm: {
        currPage: 1,
        pageSize: 10,
        projectNo: '',
        projectName: '',
      },
      total: 0,
      tableData: [],
      showSearch: false,
    };
  },
  computed: {
    _zbFangshi() {
      return (fangshi) => {
        const obj = this._.find(zbFangshi, { code: fangshi * 1 });
        return obj ? obj.name : '';
      };
    },
    _approveStatus() {
      return (status) => {
        const obj = this._.find(approveStatus, { code: status * 1 });
        return obj ? obj.name : '';
      };
    },
  },
  created() {
    this.handleSearchModel();
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      let params = this.searchForm;
      const res = await getProjectBd(params);
      this.loading = false;
      if (res && res.page) {
        this.tableData = res.page.list;
        this.total = res.page.totalCount;
      }
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchForm.currPage = val;
      this.getList();
    },
    handleReset() {
      const name = this.$route.name;
      const key = `${name.toUpperCase()}_SEARCH_MODEL`;
      sessionStorage.removeItem(key);
      this.searchForm.projectNo = '';
      this.searchForm.projectName = '';
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
    handleNew() {
      console.log(1111);
      this.$router.push({
        path: '/construction/purchase/new',
        query: {
          src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=new`,
        },
      });
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.construction-purchase {
  padding: 0 20px 20px;
  .main-card {
    min-height: calc(100% - 40px);
    .card-header {
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
