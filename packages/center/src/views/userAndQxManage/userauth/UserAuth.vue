<template>
  <section>
    <div class="global-title" ref="table_title">
      <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
        <div class="search-btnGroud" slot="btns">
          <el-button type="text" @click="addFunc" size="small"
            ><i class="iconfont icon-xinzeng"></i> 添加
          </el-button>
          <el-popover
            class="search-term"
            placement="bottom"
            width="300"
            trigger="click"
            v-model="iscollapsider"
          >
            <el-form
              :model="searchForm"
              :rules="zbrdbCheckRuleData"
              ref="searchForm"
              label-width="85px"
              class="global-form-top-line"
              size="small"
              label-position="right"
            >
              <el-form-item label="姓名:" prop="userName">
                <el-input v-model="searchForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="电话:" prop="userPhone">
                <el-input v-model="searchForm.userPhone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:" prop="user_BH">
                <el-input v-model="searchForm.user_BH"></el-input>
              </el-form-item>
              <el-form-item label="用户级别:" prop="userLevel">
                <el-select v-model="searchForm.userLevel" placeholder="请选择">
                  <el-option :value="'1'" label="平台级"></el-option>
                  <el-option :value="'2'" label="租户级"></el-option>
                </el-select>
              </el-form-item>
              <div class="search-form-footer">
                <el-button
                  type="primary"
                  @click="handleSearch"
                  size="small"
                  icon="el-icon-search"
                  >查询
                </el-button>
                <el-button
                  @click.stop="reset()"
                  size="small"
                  icon="el-icon-refresh-right"
                  >重置
                </el-button>
              </div>
            </el-form>
            <el-button slot="reference" size="small" type="text">
              筛选条件<i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
      </PageCrumb>
    </div>
    <div class="global-content">
      <div class="zbrdbCheckDev" ref="table_search"></div>
      <div class="global-content-detail">
        <self-table
          border
          :data="userTable"
          stripe
          style="width: 100%; margin-bottom: 20px"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="accountName"
            label="用户名"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="user_BH"
            label="身份证号"
            min-width="180px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="userPhone"
            label="联系电话"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="userLevel" label="用户级别" min-width="150px">
            <template slot-scope="scope">
              {{
                scope.row.userLevel == 1
                  ? "平台级"
                  : scope.row.userLevel == 2
                  ? "租户级"
                  : ""
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="所属租户"
            min-width="150px"
          ></el-table-column>
          <el-table-column
            prop="roleName"
            label="已分派角色"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="150px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{
              scope.row.createTime | timestampFormat("minute")
            }}</template>
          </el-table-column>
          <el-table-column
            prop="isYouXiao"
            label="是否有效"
            min-width="150px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="status-success" v-if="scope.row.isYouXiao == 0"
                >有效</span
              >
              <span class="status-fail" v-else>无效</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="220"
            align="left"
          >
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button
                  type="primary"
                  plain
                  class="operation-button"
                  size="mini"
                  @click="editFunc(scope.row)"
                >
                  <i class="iconfont icon-bianji2"
                    ><span>编辑</span></i
                  ></el-button
                >
                <el-button
                  type="info"
                  plain
                  class="operation-button"
                  size="mini"
                  @click="delFunc(scope.row.userGuid)"
                >
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
                <el-button
                  @click="resetPasswords(scope.row)"
                  size="mini"
                  type="primary"
                  plain
                  class="operation-button"
                >
                  <i class="iconfont icon-mima"><span>重置密码</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
      <div class="com-table-pagination clearfix" ref="table_pagination">
        <v-pagination
          :total="total"
          :page="searchForm.page"
          :limit="searchForm.rows"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></v-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import VPagination from "@/components/VPagination";
// import mixins from "../mixins";
import PageCrumb from "@/components/PageCrumb";

export default {
  name: "superviseRsz",
  // mixins: [mixins],
  components: {
    PageCrumb,
  },
  data() {
    return {
      roleDialogVisible: false,
      edit: false,
      zbrdbCheckRuleData: {},
      userTable: [],
      dialogVisible: false,
      total: 0,
      searchForm: {
        userName: "",
        userPhone: "",
        user_BH: "",
        userLevel: "",
        page: 1,
        rows: 10,
        userType: 0,
      },
      roleInfo: {},
      roleForm: {
        roleName: "",
        roleZhuangTai: 1,
        beiZhu: "",
        guid: "",
      },
      breadcrumbList: [{ label: "用户管理", link: "" }],
      iscollapsider: false,
      tableHeight: "",
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    async handleSearch() {
      // this.iscollapsider = !this.iscollapsider;
      const res = await this.portService.queryUserList(this.searchForm);
      if (res && res.data) {
        this.userTable = res.data.list;
        this.total = res.data.totalCount;
      }
    },
    reset() {
      this.$refs.searchForm.resetFields();
      this.iscollapsider = false;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.searchForm.rows = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.handleSearch();
    },
    addFunc() {
      this.$router.push({
        path: "/userAndQxManage/userauthdetail",
        query: {
          status: 1,
        },
      });
    },
    editFunc(row) {
      this.$router.push({
        path: "/userAndQxManage/userauthdetail",
        query: {
          userGuid: row.userGuid,
          status: 2,
        },
      });
    },
    async delFunc(id) {
      const res = await this.portService.userAuthDel({ user_Guid: id });
      if (res && res.data) {
        this.handleSearch();
      }
    },
    async resetPasswords(row) {
      const { code, data ,info} = await this.portService.resetPasswords({ userGuid: row.userGuid ,password:"Abcd@123"});
      if (code) {
        if (code == 1) {
          this.$message({ message: info, type: "success" });
        } else {
          this.$message({ message: info, type: "warning" });
        }
      } else {
        this.$message({ message: info, type: "warning" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
