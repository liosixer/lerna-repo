<template>
  <section>
    <div class="global-title" ref="table_title">
      <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
        <div class="search-btnGroud" slot="btns">
          <el-button type="text" @click="zbrdbAddFun" size="small"><i class="iconfont icon-xinzeng"></i> 添加</el-button>
          <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
            <el-form :model="zbrdbCheckData" :rules="zbrdbCheckRuleData" ref="zbrdbCheckData" label-width="85px" class="global-form-top-line" size="small" label-position="right">
              <el-form-item label="角色名称:">
                <el-input placeholder="请输入角色" v-model="zbrdbCheckData.roleName"></el-input>
              </el-form-item>

              <el-form-item label="状态:">
                <el-select v-model="zbrdbCheckData.roleZhuangTai" placeholder="请选择">
                  <el-option :value="1" label="有效"></el-option>
                  <el-option :value="0" label="无效"></el-option>
                </el-select>
              </el-form-item>

              <div class="search-form-footer">
                <el-button type="primary" @click="handleSearch" size="small" icon="el-icon-search">查询</el-button>
                <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
              </div>
            </el-form>
            <el-button slot="reference" size="small" type="text"> 筛选条件<i class="el-icon-arrow-down"></i> </el-button>
          </el-popover>
        </div>
      </PageCrumb>
    </div>
    <div class="global-content">
      <div class="zbrdbCheckDev" ref="table_search"></div>
      <div class="global-content-detail">
        <el-table :data="zbrdbTableData" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" :height="tableHeight">
          <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" label="创建人" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150px" show-overflow-tooltip
            ><template slot-scope="scope">{{ scope.row.createTime | timestampChange }}</template></el-table-column
          >

          <el-table-column prop="status" label="状态" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="status-success" v-if="scope.row.roleZhuangTai == 1">{{ statusArr[scope.row.roleZhuangTai] }}</span>
              <span class="status-fail" v-else>{{ statusArr[scope.row.roleZhuangTai] }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="220" align="left">
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button type="primary" plain class="operation-button" size="mini" @click="zbrdbBjFun(scope.row)"
                  ><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button
                >
                <el-button type="info" plain class="operation-button" size="mini" @click="zbrdbDeletFun(scope.row.guid)"
                  ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button
                >
                <el-button type="primary" plain class="operation-button" size="mini" @click="zbrdbFpqxFun(scope.row.guid)"
                  ><i class="iconfont icon-fenpeiquanxian"><span>分配权限</span></i></el-button
                >
              </el-button-group>
            </template>
          </el-table-column>
          <template v-if="$store.state.logoType == 1" slot="empty">
            <div>当前暂无可用角色，请点击右上角 <span style="color:blue">“添加”</span> 按钮添加角色</div>
            <div>将角色分配给添加的用户，用户即可拥有该角色的所有操作权限</div>
          </template>
          <div slot="empty" class="custom-empty"></div>
        </el-table>
      </div>
      <div class="com-table-pagination clearfix" ref="table_pagination">
        <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
      </div>
    </div>
    <el-dialog title="添加角色" :append-to-body="true" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
      <div>
        <el-form :model="roleForm" :rules="roleRules" ref="roleForm" size="small" label-width="80px" label-position="right">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model.trim="roleForm.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="roleZhuangTai">
            <el-radio-group v-model="roleForm.roleZhuangTai">
              <el-radio :label="1">有效</el-radio>
              <el-radio :label="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="beiZhu">
            <el-input v-model="roleForm.beiZhu" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" v-if="!edit" @click="handleCreateRole" size="small">确 定</el-button>
        <el-button type="primary" v-else @click="handleUpdateRole" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="角色详情" :append-to-body="true" :visible.sync="roleDialogVisible" width="600px" :before-close="handleRoleClose">
      <div>
        <table class="table">
          <tr>
            <th>角色名称</th>
            <td>{{ roleInfo.roleName }}</td>
          </tr>
          <tr>
            <th>角色编号</th>
            <td>hhh</td>
          </tr>
          <tr>
            <th>备注</th>
            <td>{{ roleInfo.beiZhu }}</td>
          </tr>
          <tr>
            <th>创建人</th>
            <td>{{ roleInfo.creator }}</td>
          </tr>
          <tr>
            <th>创建人姓名</th>
            <td>{{ roleInfo.creatorName }}</td>
          </tr>
          <tr>
            <th>创建时间</th>
            <td>{{ roleInfo.createTime | timestampChange }}</td>
          </tr>
          <tr>
            <th>状态</th>
            <td>{{ ["无效", "有效"][roleInfo.roleZhuangTai] }}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import VPagination from "@/components/VPagination";
import { getRoleList, saveRoleData, delRole, updateRole } from "@/service/defaultRoleManagement";
import mixins from "./mixins";
import PageCrumb from "@/components/PageCrumb";

export default {
  name: "superviseRsz",
  mixins: [mixins],
  components: {
    PageCrumb,
  },
  data() {
    return {
      roleDialogVisible: false,
      edit: false,
      zbrdbCheckData: {
        cgrCheckVal: "",
        roleZhuangTai: 1,
        zbrdbCheckVal: "",
        zbrdbStauesVal: "",
        roleName: "",
      },
      zbrdbCheckRuleData: {},
      statusArr: ["无效", "有效"],
      zbrdbTableData: [],
      dialogVisible: false,
      total: 0,
      searchForm: {
        page: 1,
        rows: 10,
        roleName: "",
        roleZhuangTai: "",
      },
      roleInfo: {},
      roleForm: {
        roleName: "",
        roleZhuangTai: 1,
        beiZhu: "",
        guid: "",
      },
      roleRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
            message: "角色名称不能包含特殊字符",
            trigger: "blur",
          },
        ],
        roleZhuangTai: [{ required: true, message: "请选择角色状态", trigger: "blur" }],
      },
      breadcrumbList: [
        { label: "默认角色管理", link: "" }
      ],
      iscollapsider: true,
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    reset() {
      this.zbrdbCheckData.roleName = "";
      this.zbrdbCheckData.roleZhuangTai = 1;
    },
    handleRoleClose() {
      this.roleDialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    finishData(res) {
      if (res.code === 1) {
        if (res.data.guid) {
          this.$message.success(res.info);
          this.$refs.roleForm.resetFields();
          this.handleClose();
          this.handleSearch();
        }
      }
    },
    // 创建角色
    handleCreateRole() {
      this.$refs.roleForm.validate((v) => {
        if (v) {
          saveRoleData(this.roleForm)
            .then((res) => {
              this.finishData(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    },
    // 修改角色
    handleUpdateRole() {
      updateRole(this.roleForm).then((res) => {
        this.finishData(res);
      });
    },
    handleSearch() {
      this.iscollapsider = !this.iscollapsider;
      this.searchForm.roleName = this.zbrdbCheckData.roleName;
      this.searchForm.roleZhuangTai = this.zbrdbCheckData.roleZhuangTai;
      getRoleList(this.searchForm).then((res) => {
        this.zbrdbTableData = res.data.rows;
        this.total = res.data.total;
      });
    },
    zbrdbAddFun() {
      this.edit = false;
      this.roleForm.beiZhu = "";
      this.roleForm.roleZhuangTai = 1;
      this.roleForm.roleName = "";
      this.dialogVisible = true;
    },
    zbrdbBjFun(data) {
      this.edit = true;
      this.dialogVisible = true;
      this.roleForm.beiZhu = data.beiZhu;
      this.roleForm.roleZhuangTai = data.roleZhuangTai;
      this.roleForm.roleName = data.roleName;
      this.roleForm.guid = data.guid;
    },
    zbrdbDeletFun(guid) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRole({ guid }).then((res) => {
            if (res.code === 1) {
              this.$message.success(res.info);
              this.handleSearch();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    zbrdbFpqxFun(id) {
      this.$router.push({ path: "/qyxxgl/defaultRole/detail", query: { id } });
    },
    handleSizeChange(val) {
      this.searchForm.rows = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.handleSearch();
    },
  },
  mounted() {
    this.computeTableHeight();
  },
  destroyed() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
/*主体内容样式*/
.zbrdbCheckDev {
  width: 98%;
  margin: 0 auto;
  padding: 20px 0 0; /*no*/
}
.zbrdbTableDiv {
}
::v-deep.el-table {
  .cell {
    padding: 0 5px;
    font-size: 14px;
  }
  .el-button {
    color: #409eff;
  }
  .redBtn {
    color: #f00;
  }
}
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
  tr {
    border-bottom: 1px solid #e0e0e0;
    td {
      padding: 10px;
    }
    th {
      width: 100px;
      text-align: right;
      background: #efefef;
      padding-right: 10px;
    }
  }
}
</style>
