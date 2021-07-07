<template>
  <div class="government-plan">
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
          <el-table-column label="采购方式" width="120" align="center">
            <template #default="{row}">
              {{ _zbFangshi(row.zbFangshi) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="qiyeName"
            label="采购单位"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="接收时间" width="180" align="center">
            <template #default="{row}">
              {{ row.receiveTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mainUserName"
            label="主办人员"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="分办状态" width="100" align="center">
            <template #default="{row}">
              {{ _status(row.status) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/government/plan/manage',
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
import { zbFangshi, planStatus } from '@/config/data.config';
import { getPlans } from './service';
export default {
  name: 'GovernmentPlan',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      searchForm: {
        currPage: 1,
        pageSize: 10,
        approveStatus: 0,
        planNo: '',
        planName: '',
        qiyeName: '',
        zbFangshi: null,
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
    _status() {
      return (status) => {
        const obj = this._.find(planStatus, { code: status * 1 });
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
      const res = await getPlans(params);
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
      this.searchForm.planName = null;
      this.searchForm.qiyeName = '';
      this.searchForm.zbFangshi = null;
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
    handleNew() {
      console.log(1111);
      this.$router.push({
        path: '/government/plan/new',
        query: {
          src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=new`,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.government-plan {
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
