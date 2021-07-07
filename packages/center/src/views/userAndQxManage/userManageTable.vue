<template>
  <section class="container table-flex">
    <div class="procurement-plan-title global-title" ref="table_title">
    <!-- <ContentHeader title="角色管理"></ContentHeader> -->
    <page-crumb :d="{breadcrumbList:breadcrumbList}">
    <!-- <div class="global-content">
      <div class="global-content-search  global-form-top-line"> -->
      <div class="search-btnGroud" slot="btns">
        <el-button type="text" @click="zbrdbAddFun" size="small"><i class="iconfont icon-xinzeng"></i>添加</el-button>
        <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
        <el-form
          :model="zbrdbCheckData"
          ref="zbrdbCheckData"
          size="small"
          label-width="100px"
          label-position="right">
              <el-form-item label="角色名称:">
                <el-input placeholder="请输入" v-model="zbrdbCheckData.roleName" size="small"></el-input>
              </el-form-item>
              <el-form-item label="角色编号:">
                <el-input placeholder="请输入" v-model="zbrdbCheckData.roleNo" size="small"></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                <el-select
                  v-model="zbrdbCheckData.roleZhuangTai"
                  placeholder="请选择"
                >
                  <el-option :value="1" label="有效"></el-option>
                  <el-option :value="0" label="无效"></el-option>
                </el-select>
              </el-form-item>
             <div class="search-form-footer">
                      <el-button @click.stop="handleSearch" size="small" type="primary" icon="el-icon-search">查询</el-button>
                      <el-button @click.stop="resetBtn" size="small" icon="el-icon-refresh-right">重置</el-button>
                  </div>
        </el-form>
        <el-button slot="reference" size="small" type="text">
          筛选条件<i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
      </page-crumb>
      </div>

      <!-- <div class="global-content-search global-clear-fr">
        <el-button type="primary" @click="zbrdbAddFun" size="small" class="fr">添加</el-button>
      </div> -->
      <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search">
      </div>
      <div class="global-content-detail">
        <self-table :data="zbrdbTableData"
          border
          header-cell-class-name="headercell"
          style="width:100%;margin:0;"
          :height="tableHeight"
          :fit="true">
          <el-table-column type="index" label="序号" align="center" show-overflow-tooltip width="80"></el-table-column>
          <el-table-column  prop="roleName" label="角色名称" min-width="150" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="roleNo" label="角色编号" min-width="150" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="creatorName" label="创建人" min-width="150" show-overflow-tooltip ></el-table-column>

          <el-table-column prop="createTime" label="创建时间" min-width="150" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ scope.row.createTime | timestampChange }}
            </template>
          </el-table-column>

          <el-table-column label="状态" min-width="100">
            <template slot-scope="{row}">
                <span v-if="row.roleZhuangTai === 1" class="cost-success">有效</span>
                <span v-if="row.roleZhuangTai === 0" class="cost-error">无效</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" min-width="280" align="left">
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button type="primary" plain class="operation-button" size="small" @click="zbrdbBjFun(scope.row)">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button type="primary" plain class="operation-button" size="small" @click="zbrdbFpqxFun(scope.row.guid,'look')">
                  <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                </el-button>
                <el-button type="info" plain class="operation-button redBtn" size="small" @click="zbrdbDeletFun(scope.row.guid)">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
                <el-button type="primary" plain class="operation-button" size="small" @click="zbrdbFpqxFun(scope.row.guid)" >
                  <i class="iconfont icon-fenpeiquanxian" style="font-size:18px;"><span>分配权限</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
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

    <el-dialog
      title="添加角色"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="roleForm"
          :rules="roleRules"
          ref="roleForm"
          size="small"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model.trim="roleForm.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="roleZhuangTai">
            <el-radio-group v-model="roleForm.roleZhuangTai">
              <el-radio :label="1">有效</el-radio>
              <el-radio :label="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="beiZhu">
            <el-input
              v-model="roleForm.beiZhu"
              type="textarea"
              :rows="4"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button
          type="primary"
          v-if="!edit"
          @click="handleCreateRole"
          size="small"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="handleUpdateRole" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="角色详情"
      :append-to-body="true"
      :visible.sync="roleDialogVisible"
      width="600px"
      :before-close="handleRoleClose"
    >
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
// import ContentHeader from "@/components/contentHeader/ContentHeader";
import PageCrumb from "@/components/PageCrumb";
import mixins from "./mixin"
import { getRoleList, saveRoleData, getRoleDeTail, delRole, updateRole } from '../../service/roleAndDepartment'
export default {
  name: 'superviseRsz',
  mixins: [mixins],
  components: {
    VPagination,
    // ContentHeader
    PageCrumb
  },
  data () {
    return {
      roleDialogVisible: false,
      edit: false,
      /**
       * 分页总条数
       */
      total: 0,
      zbrdbCheckData: {
        cgrCheckVal: "",
        roleZhuangTai: 1,
        zbrdbCheckVal: "",
        zbrdbStauesVal: "",
        roleNo: '',
        roleName: '',
        page: 1,
        rows: 10
      },
      statusArr: ['无效', '有效'],
      zbrdbTableData: [],
      dialogVisible: false,
      searchForm: {
        page: 1,
        rows: 10,
        roleNo: '',
        roleName: '',
        roleZhuangTai: ''
      },
      roleInfo: {},
      roleForm: {
        roleName: '',
        roleZhuangTai: 1,
        beiZhu: '',
        guid: ''
      },
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
            message: '企业名称不能包含特殊字符',
            trigger: 'blur',
          }
        ],
        roleZhuangTai: [
          { required: true, message: '请选择角色状态', trigger: 'blur' }
        ]
      },
      breadcrumbList: [
          // { label: "用户及权限管理 ", link: "" },
          { label: "角色权限", link: "" }
      ],
    }
  },
  created () {
    this.handleSearch()
    this.computeTableHeight()
  },
  methods: {
    /**
     * 查询表格数据
     */
    async roleQueryList() {
      const {data, code} = await this.portService.roleQueryList(this.searchForm);

      if (code) {
        this.zbrdbTableData = data.data;
        this.total = data.total;
      }
    },
    /**
     * 查询表格数据
     */
    async userDelOrganization(guid) {
      const {data, code} = await this.portService.roleDelete({guid: guid});

      if (code) {
        this.roleQueryList()
        this.$message({ type: 'success', message: data.message });
      } else {
        this.$message({ type: 'error', message: data.message });
      }
    },
    handleRoleClose () {
      this.roleDialogVisible = false
    },
    handleClose () {
      this.dialogVisible = false

    },
    finishData (res) {
      if (res.code === 1) {
        if (res.data.guid) {
          this.$message.success(res.info)
          this.$refs.roleForm.resetFields()
          this.handleClose()
          this.handleSearch()
        }
      }
    },
    // 创建角色
    handleCreateRole () {
      this.$refs.roleForm.validate(v => {
        if (v) {
          saveRoleData(this.roleForm).then(res => {
            this.finishData(res)
          }).catch(e => {
            console.log(e)
          })
        }
      })
    },
    // 修改角色
    handleUpdateRole () {
      updateRole(this.roleForm).then(res => {
        this.finishData(res)
      })
    },
    handleSearch () {
      this.iscollapsider= false
      this.searchForm.roleName = this.zbrdbCheckData.roleName
      this.searchForm.roleZhuangTai = this.zbrdbCheckData.roleZhuangTai
      this.searchForm.roleNo = this.zbrdbCheckData.roleNo
      this.roleQueryList()
      // getRoleList(this.searchForm).then(res => {
      //   this.zbrdbTableData = res.data.rows
      //   this.total = res.data.total
      // })
    },
    zbrdbAddFun () {
      this.$router.push({ name: "userManageAdd"})
      // this.edit = false
      // this.roleForm.beiZhu = ''
      // this.roleForm.roleZhuangTai = 1
      // this.roleForm.roleName = ''
      // this.dialogVisible = true
    },
    // 查看角色信息
    zbrdbXqFun (data) {
      this.$router.push({
        name: "userManageAdd" ,
        query: {
          methods: "see",
          id: data.guid
        }
      })
      //     this.roleDialogVisible = true
      // getRoleDeTail({ guid }).then(res => {
      //   if (res.code === 1) {
      //     this.roleInfo = Object.assign(this.roleInfo, res.data.data)
      //     this.roleDialogVisible = true
      //   }
      // }).catch(e => {
      //   console.error(e)
      // })
    },
    zbrdbBjFun (data) {
      this.$router.push({
        name: "userManageAdd" ,
        query: {
          methods: "edit",
          id: data.guid
        }
      })
      // this.edit = true
      // this.dialogVisible = true
      // this.roleForm.beiZhu = data.beiZhu
      // this.roleForm.roleZhuangTai = data.roleZhuangTai
      // this.roleForm.roleName = data.roleName
      // this.roleForm.guid = data.guid
    },
    zbrdbDeletFun (guid) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userDelOrganization(guid)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    zbrdbFpqxFun (id,type) {
      this.$router.push({ path: "/userAndQxManage/userManageQx", query: { id:id,type:type } })
    },
    handleSizeChange (val) {
      this.searchForm.rows = val
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    resetBtn() {
      this.zbrdbCheckData = Object.assign({}, this.zbrdbCheckData,{
        cgrCheckVal: "",
        roleZhuangTai: 1,
        zbrdbCheckVal: "",
        zbrdbStauesVal: "",
        roleNo: '',
        roleName: ''
      })
      this.handleSearch()
    }
  },
  create () {
  },
  mounted () { },
  destroyed () { },
  watch: {
  },
}

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 110px);
}

/*头部样式*/
.zbrdbHeader {
  width: 100%;
  height: 80px;
  background: #fff;
  div {
    width: calc(100% - 40px);
    height: 40px;
    margin: 0 auto;
    h3 {
      height: 40px;
      color: #000;
      font-size: 16px;
      line-height: 40px;
    }
  }
  div:first-child {
    color: #404040;
    font-size: 14px;
    line-height: 40px;
  }
}
/*主体内容样式*/

.zbrdbContent {
  margin: 5px 4px;
  > div {
    width: 100%;
    padding-bottom: 20px;
    background: #fff;
  }
  .zbrdbCheckDev {
    height: 80px;
    .zbrdbCheckForm {
      width: calc(100% - 40px);
      margin: 0 auto;
      padding-top: 20px;
      ::v-deep.el-form-item {
        width: calc(100% / 3);
        height: 32px;
        margin-bottom: 30px;
        margin-right: 0;
        .el-form-item__label {
          width: 100px !important;
          padding-left: 12px;
        }
        .el-form-item__content {
          width: calc(100% - 100px);
          .el-input {
            width: 100%;
            .el-input__inner {
              width: 100%;
            }
          }
          .el-select {
            width: 100%;
          }
        }
      }
      ::v-deep.el-form-item:last-child {
        text-align: right;
      }
    }
  }
  .zbrdbTableDiv {
  }
  ::v-deep.el-table {
    .cell {
      padding: 0;
      font-size: 14px;
    }
    .el-button {
      color: #409eff;
    }
    .redBtn {
      color: #f00;
    }
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

.cost-success{
    padding-left: 10px;
    position: relative;
    &::before {
        content: '';
        width: 6px;
        height: 6px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0 , -50%);
        border-radius: 50%;
        background-color: #52C41A;
    }
}
.cost-error{
    padding-left: 10px;
    position: relative;
    &::before {
        width: 6px;
        height: 6px;
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0 , -50%);
        border-radius: 50%;
        background-color: #F5222D;
    }
}
</style>
