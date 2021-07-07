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

          <!-- 工程建设 -->
          <template v-if="tabValue == 1">
            <el-table-column
              key="1"
              prop="projectNo"
              label="项目编号"
              width="110"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="2"
              prop="projectName"
              label="项目名称"
              min-width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="3"
              prop="bdName"
              label="标段(包)名称"
              width="110"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="4"
              label="项目行业分类"
              width="110"
              align="center"
            >
              <template #default="{row}">
                {{ row.hangyeFenlei }}
              </template>
            </el-table-column>
            <el-table-column
              key="5"
              label="项目交易分类"
              width="110"
              align="center"
            >
              <template #default="{row}">
                {{ row.tradeType }}
              </template>
            </el-table-column>
            <el-table-column
              key="6"
              label="招标方式"
              width="100"
              align="center"
            >
              <template #default="{row}">
                {{ _zbFangshi(row.zbFangshi) }}
              </template>
            </el-table-column>
            <el-table-column
              key="7"
              label="公告发布时间"
              width="180"
              align="center"
            >
              <template #default="{row}">
                {{ row.fabuTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column
              key="8"
              label="公告发布状态"
              width="110"
              align="center"
            >
              <template #default="{row}">
                {{ row.fabuStatus }}
              </template>
            </el-table-column>
            <el-table-column
              key="9"
              label="当前阶段"
              width="100"
              align="center"
            >
              <template #default="{row}">
                {{ row.bdStatus }}
              </template>
            </el-table-column>
          </template>

          <!-- 政府采购 -->
          <template v-if="tabValue == 2">
            <el-table-column
              key="10"
              prop="projectNo"
              label="项目编码"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="11"
              prop="projectName"
              label="项目名称"
              min-width="200"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="12"
              prop="shiXiangCode"
              label="采购单位"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="13"
              prop="projectName"
              label="轮次"
              min-width="200"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="14"
              label="采购方式"
              width="100"
              align="center"
            >
              <template #default="{row}">
                {{ _zbFangshi(row.zbFangshi) }}
              </template>
            </el-table-column>
            <el-table-column
              key="15"
              prop="projectName"
              label="当前阶段"
              min-width="200"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="16"
              prop="shiXiangCode"
              label="方案状态"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="17"
              prop="projectName"
              label="文件状态"
              min-width="200"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="18"
              label="开标时间"
              width="180"
              align="center"
            >
              <template #default="{row}">
                {{ row.kbTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
          </template>

          <!-- 自然资源 -->
          <template v-if="tabValue == 3">
            <el-table-column
              key="19"
              prop="resourceNo"
              label="资源编号"
              width="110"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="20"
              prop="resourceName"
              label="项目名称"
              min-width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="21"
              prop="projectArea"
              label="项目位置"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="22"
              label="资源类型"
              width="100"
              align="center"
            >
              <template #default="{row}">
                {{ _resourceType(row.resourceType) }}
              </template>
            </el-table-column>
            <el-table-column
              key="23"
              label="结束时间"
              width="180"
              align="center"
            >
              <template #default="{row}">
                {{ row.tbEndTime | dateFormater('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column
              key="24"
              prop="projectArea"
              label="行政区名称"
              width="110"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="25"
              label="资源阶段"
              min-width="110"
              align="center"
              >
              <template #default="{row}">
                {{ _resourceStage(row.resourceStage) }}
              </template>
            </el-table-column>
          </template>

          <el-table-column label="操作" width="120" align="center">
            <template #default="{row}">
              <router-link
                class="router-link"
                :to="{
                  path: '/project/mine/detail',
                  query: {
                    src: `https://www.tianqi.com/plugin/list.html?muban_id=1&style=&id=${row.shiXiangCode}`,
                  },
                }"
                >进入项目</router-link
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
        :tabValue="tabValue"
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
  businessFrom,
  zbFangshi,
  resourceType,
  resourceStage,
} from '@/config/data.config';
import { getMyProject } from './service';
export default {
  name: 'ProjectMine',
  components: { NavBar, CardHeader, SearchForm },
  mixins: [tableFormMixin],
  data() {
    return {
      tabs: Object.freeze(businessFrom),
      tabValue: 1,
      searchForm: {
        currPage: 1,
        pageSize: 10,
        projectNo: null, // 招标项目编号、项目编码
        projectName: '', // 招标项目名称
        faNo: null, // 方案编码
        zbFangshi: null, // 采购方式
        fileStatus: null, // 文件状态
        resourceNo: null, // 资源编号
        resourceName: '', // 项目名称
      },
      total: 0,
      tableData: [],
      showSearch: false,
      showNew: false, // 新建公告
    };
  },
  computed: {
    _zbFangshi() {
      return (fangshi) => {
        const obj = this._.find(zbFangshi, { code: fangshi * 1 });
        return obj ? obj.name : '';
      };
    },
    _resourceType() {
      return (type) => {
        const obj = this._.find(resourceType, { code: type * 1 });
        return obj ? obj.name : '';
      };
    },
    _resourceStage() {
      return (stage) => {
        const obj = this._.find(resourceStage, { code: stage * 1 });
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
  },
  created() {
    this.handleSearchModel();
    this.searchForm.currPage = 1;
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      let params = this.searchForm;
      if (this.tabValue !== 10) {
        params.businessFrom = this.tabValue;
      }
      const res = await getMyProject(params);
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
      if (this.tabValue === 1) {
        this.searchForm = {
          currPage,
          pageSize,
          projectNo: null,
          projectName: '',
        };
      }
      if (this.tabValue === 2) {
        this.searchForm = {
          currPage,
          pageSize,
          projectNo: null,
          faNo: null,
          zbFangshi: null,
          fileStatus: null,
        };
      }
      if (this.tabValue === 3) {
        this.searchForm = {
          currPage,
          pageSize,
          resourceNo: null,
          resourceName: '',
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
