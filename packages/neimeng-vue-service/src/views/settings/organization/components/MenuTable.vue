<template>
  <div class="menu-table">
    <table-header :onAddUser="() => handleAddUser()" />
    <div class="table-content">
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
          prop="userName"
          label="姓名"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="所在部门"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="{row}">
            <el-button type="text" @click="userModify(row)">编辑</el-button>
            <el-button type="text" @click="userAllocate(row)">分配</el-button>
            <el-button
              type="text"
              :loading="userDeleteLoading.includes(row.guid)"
              @click="userDelete(row)"
              >删除</el-button
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

    <user-edit
      :title="eidtDialogTitle"
      :visible="showUserEdit"
      :values="userEditValues"
      :onCancel="() => handeleUserEditCancel()"
      :onFinish="handeleUserEditFinish"
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
import tableFormMixin from '@/mixins/tableFormMixin.js';
import TableHeader from './TableHeader.vue';
import UserEdit from './UserEdit.vue';
import AuthAllocate from './AuthAllocate.vue';
import { getUserList } from '../service';
export default {
  name: 'MenuTable',
  mixins: [tableFormMixin],
  components: { TableHeader, UserEdit, AuthAllocate },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        currPage: 1,
        pageSize: 10,
      },
      total: 0,
      eidtDialogTitle: '添加成员',
      showUserEdit: false,
      userEditValues: null,
      userDeleteLoading: [],
      showAuthAllocate: false,
      authAllocateValues: {},
    };
  },
  computed: {
    currentNodeId: {
      get() {
        return this.$store.state.organization.currentNode.id;
      },
      set() {},
    },
  },
  watch: {
    currentNodeId(newVal, pldVal) {
      console.log(newVal);
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      const res = await getUserList(this.searchForm);
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
    handleAddUser() {
      this.userEditValues = null;
      this.eidtDialogTitle = '添加成员';
      this.showUserEdit = true;
    },
    userModify(user) {
      this.userEditValues = user;
      this.eidtDialogTitle = '编辑成员信息';
      this.showUserEdit = true;
    },
    userAllocate(user) {
      this.authAllocateValues = user;
      this.showAuthAllocate = true;
    },
    userDelete(user) {
      this.userDeleteLoading = [user.guid];
      this.$confirm('您确认删除当前用户信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // TODO 删除用户接口
          setTimeout(() => {
            this.userDeleteLoading = [];
          }, 1500);
        })
        .catch(() => {
          this.userDeleteLoading = [];
        });
    },
    handeleUserEditCancel() {
      this.showUserEdit = false;
    },
    handeleUserEditFinish(values) {
      console.log(values, 'values');
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
.menu-table {
  height: 100%;
  overflow-y: auto;
  padding: 0 12px 24px;
  background-color: #ffffff;
  border-radius: 12px;
  .table-content {
    padding: 24px 12px 0;
  }
}
</style>
