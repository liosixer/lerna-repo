<template>
  <div class="settings-role">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header
          :onSearch="() => (showSearch = true)"
          :onNew="() => handleRoleEdit('新增角色', null)"
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
            prop="roleName"
            label="角色名称"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="roleSystem"
            label="所属交易系统"
            min-width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createName"
            label="创建人"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="创建时间" width="180" align="center">
            <template #default="{row}">
              {{ row.createTime | dateFormater('YYYY-MM-DD HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template #default="{row}">
              {{ row.fabuStatus ? '有效' : '无效' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180" align="center">
            <template #default="{row}">
              <el-button
                type="text"
                icon="el-icon-edit-outline"
                @click="() => handleRoleEdit('编辑角色', row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                icon="el-icon-document"
                @click="() => userAllocate(row)"
                >分配权限</el-button
              >
              <el-button type="text" icon="el-icon-delete">删除</el-button>
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

    <role-edit
      :title="eidtDialogTitle"
      :visible="showRoleEdit"
      :values="roleEditValues"
      :onCancel="() => handeleRoleEditCancel()"
      :onFinish="handeleRoleEditFinish"
    />

    <auth-allocate
      :visible="showAuthAllocate"
      :values="authAllocateValues"
      :onCancel="() => handeleAuthAllocateCancel()"
      :onFinish="handeleAuthAllocateFinish"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CardHeader from './components/CardHeader.vue';
import SearchForm from './components/SearchForm.vue';
import RoleEdit from './components/RoleEdit.vue';
import AuthAllocate from './components/AuthAllocate.vue';
import tableFormMixin from '@/mixins/tableFormMixin.js';
import { getUserRoleList } from './service';
export default {
  name: 'SettingsRole',
  components: { NavBar, CardHeader, SearchForm, RoleEdit, AuthAllocate },
  mixins: [tableFormMixin],
  data() {
    return {
      searchForm: {
        currPage: 1,
        pageSize: 10,
        roleName: '',
        status: null,
      },
      total: 0,
      loading: false,
      tableData: [],
      showSearch: false,

      eidtDialogTitle: '',
      showRoleEdit: false,
      roleEditValues: null,
      roleDeleteLoading: [],

      showAuthAllocate: false,
      authAllocateValues: {},
    };
  },
  created() {
    this.handleSearchModel();
    this.getList();
  },
  methods: {
    handleRoleEdit(title, values) {
      this.eidtDialogTitle = title;
      this.roleEditValues = values;
      this.showRoleEdit = true;
    },
    async getList() {
      this.loading = true;
      let params = this.searchForm;
      const res = await getUserRoleList(params);
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
      this.searchForm.roleName = '';
      this.searchForm.status = null;
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
    handeleRoleEditCancel() {
      this.showRoleEdit = false;
      this.roleEditValues = null;
    },
    handeleRoleEditFinish(values) {
      console.log(values, 'values');
    },
    userAllocate(user) {
      this.authAllocateValues = user;
      this.showAuthAllocate = true;
    },
    handeleAuthAllocateCancel() {
      this.showAuthAllocate = false;
    },
    handeleAuthAllocateFinish(values) {
      console.log(values, 'values');
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-role {
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
