<template>
  <div class="government-plan">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header
          :tabs="tabs"
          :tabValue.sync="tabValue"
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
            prop="resourceNo"
            label="资源编号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="资源类型" width="100" align="center">
            <template #default="{row}">
              {{ _resourceType(row.resourceType) }}
            </template>
          </el-table-column>
          <el-table-column label="交易方式" width="100" align="center">
            <template #default="{row}">
              {{ _tradeType(row.tradeType) }}
            </template>
          </el-table-column>
          <el-table-column label="挂牌/公告开始时间" width="180" align="center">
            <template #default="{row}">
              {{ row.ggStartTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="竞买时间" width="180" align="center">
            <template #default="{row}">
              {{ row.buyTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="assignYear"
            label="出让年限"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="startAmount"
            label="起始价(万元)"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column label="资源阶段" width="100" align="center">
            <template #default="{row}">
              {{ _resourceStage(row.resourceStage) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="resourceStatus"
            label="资源状态"
            width="100"
            align="center"
          >
            <template #default="{row}">
              {{ row.resourceStatus }}
            </template>
          </el-table-column>
          <el-table-column
            prop="projectArea"
            label="行政区"
            width="100"
            align="center"
          >
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
                  path: '/resource/outin/manage',
                  query: {
                    src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${row.resourceNo}`,
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
          <img src="../../../../assets/images/frame/filter.png" class="i-filter" />
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
  resourceType,
  tradeType,
  resourceStage,
  approveStatus,
} from '@/config/data.config';
const resources = resourceType.filter((item) => item.code != 3);
import { getResource } from './service';
export default {
  name: 'NatureMineralOutResource',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      tabs: Object.freeze([
        { name: '全部', img: 'ore', code: 10 },
        ...resources,
      ]),
      tabValue: 10,
      searchForm: {
        currPage: 1,
        pageSize: 10,
        type: 1,
        ggStartTime: null,
        resourceNo: '',
        projectArea: '',
      },
      total: 0,
      tableData: [],
      showSearch: false,
      showNew: false, // 新建公告
    };
  },
  computed: {
    _resourceType() {
      return (type) => {
        const obj = this._.find(resourceType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
    _tradeType() {
      return (type) => {
        const obj = this._.find(tradeType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
    _resourceStage() {
      return (type) => {
        const obj = this._.find(resourceStage, { code: type * 1 });
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
      if (this.tabValue !== 10) {
        params.resourceType = this.tabValue;
      } else {
        params.resourceType = null;
      }
      const res = await getResource(params);
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
      this.searchForm.ggStartTime = null;
      this.searchForm.resourceNo = '';
      this.searchForm.projectArea = '';
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
    handleNew() {
      this.showNew = true;
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
