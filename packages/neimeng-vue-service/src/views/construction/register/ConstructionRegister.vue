<template>
  <div class="construction-register">
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
            label="项目编号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="zbrName"
            label="招标人"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column label="项目行业分类" width="120" align="center">
            <template #default="{row}">
              {{ _industryType(row.hangyeFenlei) }}
            </template>
          </el-table-column>
          <el-table-column label="项目所在行政区域" width="150" align="center">
            <template #default="{row}">
              {{ _neimengAreaCode(row.projectArea) }}
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="100" align="center">
            <template #default="{row}">
              {{ _auditStatus(row.approveStatus) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/construction/register/manage',
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
      size="20%"
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
import { getProject } from './service';
import { auditStatus, industryType, neimengAreaCode } from '@/config/data.config';
export default {
  name: 'ConstructionRegister',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      searchForm: {
        currPage: 1,
        pageSize: 10,
        projectNo: '',
        projectName: '',
        approveStatus: null,
      },
      total: 0,
      tableData: [],
      showSearch: false,
    };
  },
  computed: {
    _auditStatus() {
      return (status) => {
        const obj = this._.find(auditStatus, { code: status * 1 });
        return obj ? obj.name : '';
      };
    },
    _industryType() {
      return (type) => {
        const obj = this._.find(industryType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
    _neimengAreaCode() {
      return (code) => {
        const obj = this._.find(neimengAreaCode, { code: code });
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
      if (params.approveStatus == 10) {
        params.approveStatus = null;
      }
      const res = await getProject(params);
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
        path: '/construction/register/new',
        query: {
          src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=new`,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.construction-register {
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
