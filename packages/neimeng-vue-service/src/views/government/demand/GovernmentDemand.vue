<template>
  <div class="government-demand">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header :onSearch="() => (showSearch = true)" />
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
            prop="planNo"
            label="计划函号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="planName"
            label="计划名称"
            min-width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="budgetAmount"
            label="预算金额(元)"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="zbFagnshi"
            label="采购方式"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="qiyeName"
            label="采购单位"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="分办时间" width="180" align="center">
            <template #default="{row}">
              {{ row.assignTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mainUserName"
            label="主办人员"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/government/demand/manage',
                  query: {
                    src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${row.planNo}`,
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
import { getDemands } from './service';
export default {
  name: 'GovernmentDemand',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      searchForm: {
        currPage: 1,
        pageSize: 10,
        approveStatus: 1,
        planNo: '',
        qiyeName: '',
        zbFagnshi: null,
      },
      total: 0,
      tableData: [],
      showSearch: false,
    };
  },
  created() {
    this.handleSearchModel();
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      let params = this.searchForm;
      const res = await getDemands(params);
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
      this.searchForm.planNo = '';
      this.searchForm.qiyeName = '';
      this.searchForm.zbFagnshi = null;
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.government-demand {
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
