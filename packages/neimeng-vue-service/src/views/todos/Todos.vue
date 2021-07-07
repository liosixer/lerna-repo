<template>
  <div class="my-todos">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header
          :tabs="tabs"
          :tabValue.sync="tabValue"
          :tabSubs="tabSubs"
          :tabSubValue.sync="tabSubValue"
          :onSearch="() => (showSearch = true)"
        />
      </template>
      <div class="card-content">
        <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          class="cus-table"
          style="width: 100%"
          :height="computeCusTableHeight() - 60"
        >
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="businessName"
            label="事项名称"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column label="交易领域" width="120" align="center">
            <template #default="{row}">
              {{ _businessFrom(row.businessFrom) }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="[10, 3].includes(tabValue)"
            :key="1"
            label="二级交易领域"
            width="120"
            align="center"
          >
            <template #default="{row}">
              {{ _systemFrom(row.systemFrom) }}
            </template>
          </el-table-column>
          <el-table-column label="事项类型" width="80" align="center">
            <template #default="{row}">
              {{ _businessType(row.businessType) }}
            </template>
          </el-table-column>
          <el-table-column
            :prop="tabSubValue == 0 ? 'submitName' : 'approveTime'"
            :label="tabSubValue == 0 ? '提交人' : '受理人'"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column
            :label="tabSubValue == 0 ? '提交时间' : '受理时间'"
            width="180"
            align="center"
          >
            <template #default="{row}">
              {{
                tabSubValue == 0
                  ? row.submitTime
                  : row.approveTime | dateFormater('YYYY-MM-DD HH:mm:ss')
              }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/todos/detail',
                  query: {
                    src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${row.shiXiangCode}`,
                  },
                }"
                >进入</router-link
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
          <img src="../../assets/images/frame/filter.png" class="i-filter" />
          <span class="title">高级筛选</span>
          <el-button type="text" @click="() => (showSearch = false)">
            收起<i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
      </template>
      <search-form
        :tabSubValue="tabSubValue"
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
import { getApproverecord } from './service';
import {
  businessFrom,
  systemFrom,
  businessType,
} from '@/config/data.config';

export default {
  name: 'MyTodos',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      tabs: Object.freeze([
        { name: '全部', img: 'qiye', code: 10 },
        ...businessFrom,
      ]),
      tabValue: 10,
      tabSubs: Object.freeze([
        { name: '我的待办', code: 0 },
        { name: '我的已办', code: 1 },
      ]),
      tabSubValue: 0,
      searchForm: {
        currPage: 1,
        pageSize: 10,
        submitTime: null,
      },
      total: 0,
      tableData: [],
      showSearch: false,
    };
  },
  computed: {
    _businessFrom() {
      return (from) => {
        const obj = this._.find(businessFrom, { code: from * 1 });
        return obj ? obj.name : '';
      };
    },
    _systemFrom() {
      return (from) => {
        const obj = this._.find(systemFrom, { code: from * 1 });
        return obj ? obj.name : '';
      };
    },
    _businessType() {
      return (type) => {
        const obj = this._.find(businessType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
  },
  watch: {
    tabValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchForm();
        this.getList();
      }
    },
    tabSubValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchForm();
        this.getList();
      }
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
      if (this.tabValue !== 10) {
        params.businessFrom = this.tabValue;
      } else {
        params.businessFrom = null;
      }
      params.approveStatus = this.tabSubValue;
      const res = await getApproverecord(params);
      this.loading = false;
      if (res && res.page) {
        this.tableData = res.page.list;
        this.total = res.page.totalCount;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    handleSearchForm() {
      const { currPage, pageSize } = this.searchForm;
      if (this.tabSubValue === 0) {
        this.searchForm = {
          currPage,
          pageSize,
          submitTime: null,
        };
      }
      if (this.tabValue === 1) {
        this.searchForm = {
          currPage,
          pageSize,
          approveTime: null,
        };
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
      this.handleSearchForm();
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-todos {
  padding: 0 20px 20px;
  .main-card {
    min-height: calc(100% - 40px);
  }
}
</style>
