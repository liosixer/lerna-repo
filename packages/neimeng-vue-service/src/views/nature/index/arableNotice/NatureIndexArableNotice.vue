<template>
  <div class="government-plan">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header
          :tabs="tabs"
          :tabValue.sync="tabValue"
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
          :height="computeCusTableHeight()"
        >
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="ggNo"
            label="公告编号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ggName"
            label="公告名称"
            min-width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="公告发布时间" width="180" align="center">
            <template #default="{row}">
              {{ row.fabuTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="行政区" width="150" align="center">
            <template #default="{row}">
              {{ _neimengAreaCode(row.projectArea) }}
            </template>
          </el-table-column>
          <el-table-column label="是否发布" width="100" align="center">
            <template #default="{row}">
              {{ row.ggType ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column label="交易方式" width="100" align="center">
            <template #default="{row}">
              {{ _tradeType(row.tradeType) }}
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="120" align="center">
            <template #default="{row}">
              {{ _approveStatus(row.approveStatus) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/announcement/manage/manage',
                  query: {
                    src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${row.ggNo}`,
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
          <img
            src="../../../../assets/images/frame/filter.png"
            class="i-filter"
          />
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
import {
  ggType,
  approveStatus,
  neimengAreaCode,
  tradeType,
} from '@/config/data.config';
const noticeType = ggType.filter((item) => [10, 20].includes(item.code));
import { getGonggao } from './service';
export default {
  name: 'NatureIndexArableNotice',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      tabs: Object.freeze([{ name: '全部', code: 10 }, ...noticeType]),
      tabValue: 100,
      searchForm: {
        currPage: 1,
        pageSize: 10,
        ggNo: '',
        projectArea: null,
      },
      total: 0,
      tableData: [],
      showSearch: false,
      showNew: false, // 新建公告
    };
  },
  computed: {
    _approveStatus() {
      return (status) => {
        const obj = this._.find(approveStatus, { code: status * 1 });
        return obj ? obj.name : '';
      };
    },
    _neimengAreaCode() {
      return (code) => {
        const obj = this._.find(neimengAreaCode, { code: code });
        return obj ? obj.name : '';
      };
    },
    _tradeType() {
      return (type) => {
        const obj = this._.find(tradeType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
  },
  watch: {
    tabValue(newVal, oldVal) {
      if (newVal !== oldVal) {
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
      // type: 公告分类：10补充耕地指标公告 20节余指标公告 30矿业权及地勘公告
      params = { ...params, ...{ systemFrom: 1, type: 10 } };
      if (this.tabValue !== 100) {
        params.ggType = this.tabValue;
      } else {
        params.ggType = null;
      }
      const res = await getGonggao(params);
      this.loading = false;
      if (res && res.page) {
        this.tableData = res.page.list;
        this.total = res.page.totalCount;
      } else {
        this.tableData = [];
        this.total = 0;
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
      this.searchForm.ggNo = '';
      this.searchForm.projectArea = null;
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
    handleNewCancel() {
      this.showNew = false;
    },
    handleNewFinish(values) {
      console.log(values, 'values');
    },
  },
};
</script>

<style lang="scss" scoped>
.government-plan {
  height: 100%;
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
