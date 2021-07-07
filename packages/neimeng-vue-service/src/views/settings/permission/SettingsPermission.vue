<template>
  <div class="settings-permission">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <template #header>
        <card-header
          :onSearch="() => (showSearch = true)"
          :onNew="() => handleDataEdit('addSystem', '添加子系统', null)"
        />
      </template>
      <div class="card-content">
        <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          class="cus-table"
          style="width: 100%"
          row-key="id"
          lazy
          :load="loadTableData"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :height="computeCusTableHeight()"
        >
          <el-table-column prop="systemName" label="权限名称" min-width="180">
          </el-table-column>
          <el-table-column prop="level" label="功能级别" width="100">
          </el-table-column>
          <el-table-column prop="remark" label="权限描述" width="150">
          </el-table-column>
          <el-table-column prop="photoUrl" label="图标" width="120">
          </el-table-column>
          <el-table-column label="操作" min-width="200" align="center">
            <template #default="{row}">
              <el-button
                type="text"
                icon="el-icon-edit-outline"
                @click="() => handleDataModify(row)"
                >编辑</el-button
              >
              <el-button type="text" icon="el-icon-document">查看</el-button>
              <el-button type="text" icon="el-icon-delete">删除</el-button>
              <el-button
                v-if="row.level === '子系统'"
                type="text"
                icon="el-icon-document-add"
                @click="() => handleDataEdit('addModule', '添加模块', null)"
                >添加模块</el-button
              >
              <el-button
                v-if="row.level === '模块'"
                type="text"
                icon="el-icon-document-add"
                @click="() => handleDataEdit('addMenu', '添加菜单', null)"
                >添加菜单</el-button
              >
              <el-button
                v-if="row.level === '菜单'"
                type="text"
                icon="el-icon-document-add"
                >添加功能</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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

    <data-edit
      :eidtType="eidtType"
      :title="eidtDialogTitle"
      :visible="showDataEdit"
      :values="dataEditValues"
      :onCancel="() => handeleDataEditCancel()"
      :onFinish="handeleDataEditFinish"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CardHeader from './components/CardHeader.vue';
import SearchForm from './components/SearchForm.vue';
import DataEdit from './components/DataEdit.vue';
import tableFormMixin from '@/mixins/tableFormMixin.js';
import { getSystemList, getModuleList, getMenuList } from './service';
export default {
  name: 'SettingsPermission',
  components: { NavBar, CardHeader, SearchForm, DataEdit },
  mixins: [tableFormMixin],
  data() {
    return {
      searchForm: {
        operateTime: null,
      },
      total: 0,
      tableData: [],
      showSearch: false,

      eidtType: '',
      eidtDialogTitle: '',
      showDataEdit: false,
      dataEditValues: null,
      dataDeleteLoading: [],
    };
  },
  computed: {},
  created() {
    this.handleSearchModel();
    this.getList();
  },
  methods: {
    async loadTableData(tree, treeNode, resolve) {
      let listData = [];
      if (tree.level === '子系统') {
        listData = await this.getModules(tree.guid);
      }
      if (tree.level === '模块') {
        listData = await this.getMenus(tree.guid);
      }
      resolve(listData);
    },
    async getModules(systemGuid) {
      const { data: list } = await getModuleList({ systemGuid });
      list.map((item) => {
        item.id = 'mod' + item.guid;
        item.level = '模块';
        item.systemName = item.moduleName;
        item.hasChildren = true;
      });
      return list;
    },
    async getMenus(moduleGuid) {
      const { data: list } = await getMenuList({ moduleGuid });
      list.map((item) => {
        item.id = 'men' + item.guid;
        item.level = '菜单';
        item.systemName = item.menuName;
      });
      return list;
    },
    async getList() {
      this.loading = true;
      let params = this.searchForm;
      const res = await getSystemList(params);
      this.loading = false;
      if (res && res.page) {
        let list = res.page.list;
        list.map((item) => {
          item.id = 'sys' + item.guid;
          item.level = '子系统';
          item.hasChildren = true;
        });
        this.tableData = list;
      }
    },
    handleReset() {
      const name = this.$route.name;
      const key = `${name.toUpperCase()}_SEARCH_MODEL`;
      sessionStorage.removeItem(key);
      this.searchForm.operateTime = null;
    },
    handleSearch() {
      this.getList();
      setTimeout(() => (this.showSearch = false), 300);
    },
    handleDataEdit(type, title, values) {
      this.eidtType = type;
      this.eidtDialogTitle = title;
      this.dataEditValues = values;
      this.showDataEdit = true;
    },
    handeleDataEditCancel() {
      this.showDataEdit = false;
      this.dataEditValues = null;
    },
    handeleDataEditFinish(values) {
      console.log(values, 'values');
    },
    handleDataModify(data) {
      let type = '';
      let title = '';
      if (data.level === '子系统') {
        type = 'modifySystem';
        title = '编辑子系统';
        data.name = data.systemName;
        data.no = data.systemNo;
        data.url = data.systemUrl;
        data.childrenIds = [];
      }
      if (data.level === '模块') {
        type = 'modifyModule';
        title = '编辑模块';
        data.systemName = data.name = data.moduleName;
        data.no = data.moduleNo;
        data.url = data.moduleUrl;
        data.childrenIds = [];
      }
      if (data.level === '菜单') {
        type = 'modifyMenu';
        title = '编辑菜单';
        data.name = data.menuName;
        data.no = data.menuNo;
        data.url = data.menuUrl;
        data.childrenIds = [];
      }
      this.handleDataEdit(type, title, data);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-permission {
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
