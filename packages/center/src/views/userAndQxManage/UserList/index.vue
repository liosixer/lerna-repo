<template>
  <div class="table-flex container">
    <div class="content_title">
      <h3 class="pro_name">
        {{ $store.state.roleAnddepartment.setCurrentDepartmentName }}
        <!-- {{showName}} -->
      </h3>
      <!-- <div class="content_title_con">
        <el-button
          type="text"
          size="small"
          @click="handleModifyNode"
          >修改组织</el-button
        >
        <span>|</span>
        <el-button
          type="text"
          size="small"
          @click="handleAddSubNode"
          >添加下级组织</el-button
        >
        注： 一级组织不能删除
        <span v-if="$store.state.roleAnddepartment.currentDepartment.parentGuid != 0">|</span>
        <el-button
          v-if="$store.state.roleAnddepartment.currentDepartment.parentGuid != 0"
          type="text"
          size="small"
          @click="handleDelNode"
          >删除</el-button
        >
      </div> -->
    </div>
    <div class="table-content">
      <div class="content-btns">
        <!-- <el-button size="small" @click="handleAddOrEidtUser()"
          >添加成员</el-button>
        <el-button size="small" @click="handleShowDialog('dialogVisible')"
          >批量导入</el-button>
        <el-button size="small" @click="handleExport(multipleSelection)"
          >批量导出</el-button>
        <el-button size="small" @click="handleDelUsers(multipleSelection)"
          >删除</el-button> -->
      </div>
      <self-table ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="user_Name" label="姓名"></el-table-column>
        <!-- <el-table-column prop="deptName" label="职位"></el-table-column> -->
        <el-table-column prop="deptName" label="所在组织"></el-table-column>
        <!-- <el-table-column prop="shenfen" label="身份">
          <template slot-scope="scope">
            {{ senfenArr[scope.row.shenfen - 1] }}
          </template>
        </el-table-column> -->
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="user_Phone" label="手机号码"></el-table-column>
        <el-table-column label="操作" width="250" align="left" fixed="right">
          <template slot-scope="scope">
            <el-button-group class="operation-button-group">
              <el-button
                @click="handleAddOrEidtUser(scope.row)"
                type="primary" plain class="operation-button"
                size="small"><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button>

            <!-- <el-button
              type="text"
              size="small"
              @click="handleAsign(scope.row)">分配</el-button>
             -->
            <el-button
              type="info" plain class="operation-button"
              @click="handleDelUsers(scope.row.user_Guid)"
              size="small"><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </self-table>
      <div class="com-table-pagination clearfix">
        <v-pagination
          :total="total"
          :page="page"
          :limit="limit"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></v-pagination>
      </div>
    </div>
    <!-- 导入模板弹窗 -->
    <el-dialog
      :title="tipTitle[currentDepartment.type]"
      :visible.sync="dialogVisible"
      width="800px"
      :append-to-body="true"
      :closeOnClickModal="false"
    >
      <div>
        <el-input
          v-if="currentDepartment.type === 1"
          type="text"
          size="small"
          v-model="currentDepartment.deptName"></el-input>

        <addOrganization v-if="currentDepartment.type === 0 && dialogVisible" :value="currentDepartment" ref="organization"></addOrganization>
        <addOrganization v-if="currentDepartment.type === 2 && dialogVisible" :value="currentDepartment" ref="organization"></addOrganization>
        <p v-if="errTip.trim()">{{ errTip }}</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePopCancel" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handlePopOK">确 定</el-button>
      </span>
    </el-dialog>
    <RoleList :show="showAssign" @showEvent="handleShowEvent" :guid="guid" :roleIds="roleIds" />

    <!-- 设置子部门 -->
  </div>
</template>

<script>
import { getUserList, delUser, addSubDepartment, updateDepartment } from '@/service/roleAndDepartment'
import addOrganization from './addOrganization'
import VPagination from "@/components/VPagination";
import RoleList from './RoleList'
export default {
  data () {
    return {
      errTip: '',
      multipleSelection: [], // 选中的用户信息
      dialogVisible: false,
      showInport: false,
      showModifyName: false,
      showAddChildDepartment: false,
      showAssign: false,
      tipTitle: ['添加下级组织', '修改组织'],
      senfenArr: ['普通成员', '部门负责人'],
      index: 0,
      tableData: [],
      guid: '',
      childName: '', // 子部门名称，添加
      currentDepartment: {},
      total: 0,
      page: 1,
      limit: 10,
      roleIds: []
    }
  },
  created () {
    // this.$store.commit('setCurrentDepartment', {})
    this._getUserList()
  },
  components: {
    RoleList,
    addOrganization
  },
  computed: {
    department () {
      return this.$store.state.roleAnddepartment.currentDepartment
    },
    showName(){
      
      // return this.$store.state.roleAnddepartment.currentDepartment["departName"];
    }
  },
  methods: {
    /**
     * 用户管理-新增/修改组织
     */
    async suerSaveOrganization(data) {
      console.log(data)
      const res = await this.portService.suerSaveOrganization(data);

      if (res.code == '成功') {
        this.$store.dispatch('getDepartmentData')
        this.$store.commit("setCurrentDepartmentName", data.deptName);
        this.$message({ type: 'success', message: res.message });
        this.dialogVisible = false;
      } else {
        this.$message({ type: 'error', message: res.message });
      }
    },
    /**
     * 查询 - 组织
     */
    async suerQueryOrganization(data) {
      const res = await this.portService.suerQueryOrganization(data);

      return Promise.resolve(res)
    },
    /**
     * 修改部门
     */
    handleModifyNode () {
      this.suerQueryOrganization({guid: this.department.departGuid }).then((res) => {
        console.log(res)
        if (res) {
          this.currentDepartment = {
            type: 2,
            parentGuid: res.parentGuid, // 父类id
            qiyeBumenDisabled: Number(res.qiyeBumen) === 2,//是否禁用企业，是部门就禁用企业单选按钮
            qiyeBumen: res.qiyeBumen, // 组织类型
            deptName: res.deptName, // 企业名称 / 部门名称
            qiyeDaima: res.qiyeDaima, // 企业代码
            deptType: Number(res.deptType), // 企业代码
            guid: res.guid,
            deptGuid: res.guid,
          }
          this.dialogVisible = true
        }
      });
    },
    /**
     * 树节点 --- 添加子组织
     */
    handleAddSubNode (node) {
      this.suerQueryOrganization({guid: this.department.departGuid }).then((res) => {
        if (res) {
          this.currentDepartment = {
            type: 0,
            qiyeBumenDisabled: Number(res.qiyeBumen) === 2,//是否禁用企业，是部门就禁用企业单选按钮
            parentGuid: res.guid, // 父类id
            qiyeBumen: Number(res.qiyeBumen) === 2 ? 2 : 1, // 组织类型
            deptName: '', // 企业名称 / 部门名称
            qiyeDaima: '', // 企业代码
            deptType: 1, // 企业代码
            deptGuid: res.guid // 当前节点id
          }

          this.dialogVisible = true
        }
      });
    },
    /**
     * 用户管理-删除
     */
    async userDelOrganization(data) {
      const res = await this.portService.userDelOrganization(data);

      if (res.status) {
        this.$store.dispatch('getDepartmentData')
        this.$message({ type: 'success', message: res.message });
      } else {
        this.$message({ type: 'error', message: res.message });
      }
    },
    handleDelNode() {
      this.$confirm('此操作将永久该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userDelOrganization({departGuid: this.department.departGuid})

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });

      });
    },
    handleSizeChange (data) {
      this.limit = data
      this._getUserList()
    },
    handleCurrentChange (data) {
      this.page = data
      this._getUserList()
    },
    handlePopCancel () {
      this.dialogVisible = false
      this.childName = ''
    },
    // 修改 type  类型 1 代表修改名称不需要验证 0 2 调用子组件需要调用子组件的方法
    handlePopOK () {
      if (this.currentDepartment.type === 1) {
        this.suerSaveOrganization(this.currentDepartment)
      } else {
        this.$refs.organization.validata((data) => {
          if (data) {
            this.suerSaveOrganization(data)
          }
        })
      }

    },
    _modifyDepartment () {
      let data = {
        deptBh: '',
        deptName: this.currentDepartment.departName,
        parentGuid: '',
        lianXiRen: '',
        guid: this.department.departGuid,
        beiZhu: ''
      }
      if(data.deptName) {
        updateDepartment(data).then(res => {
          if (res.code === 1) {
            this.$store.dispatch('getDepartmentData')
            this.$message.success('修改部门成功')
          } else {
            this.$message.error('修改部门失败')
          }
          this.dialogVisible = false
        }).catch(e => {
          console.log(e)
        })
      } else {
        this.$message.warning('请输入部门名称')
      }

    },
    _addSubDepartment () {

      let data = {
        deptName: this.childName,
        parentGuid: this.department.departGuid || 0,
      }
      if(data.deptName) {
        addSubDepartment(data).then(res => {
          if (res.message === '添加成功') {
            this.$store.dispatch('getDepartmentData')
            this.$message.success('添加部门成功')
          } else {
            this.$message.error('添加部门失败')
          }
          this.dialogVisible = false
        }).catch(e => {
          console.log(e)
        })
      } else {
        this.$message.warning('请输入部门名称')
      }
    },
    _getUserList () {
      let data = {
        page: this.page,
        rows: this.limit,
        deptGuid: this.department.departGuid || ''
      }

      this.portService.userQueryAllUserList(data).then((res) => {
        if (res) {
          this.tableData = res.rows
          this.total = res.total
        }
      })
    },
    // 控制角色分配弹出传参
    handleAsign (data) {
      this.guid = data.user_Guid
      this.roleIds = data.roleGuid ? data.roleGuid.split(','):[]
      this.showAssign = !this.showAssign
    },
    // 角色坦诚回调
    handleShowEvent (data) {
      this.showAssign = data
      this._getUserList()
    },
    // 表格选择
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 添加用户
    handleAddOrEidtUser (data) {
      if (data) {
        return this.$router.push({
          name: 'zzjgAdd',
          query: {
            id: data.user_Guid,
            did: data.deptGuid,
            methods: 'edit'
          }
        })
      }
      this.$router.push({ name: 'zzjgAdd' })
    },
    handleDelUsers (guid) {
      let ids = typeof guid === 'string' ? guid : guid.map(item => item.user_Guid).join(',')
      if (typeof guid === 'string') {
        this._delUserHandle(ids)
      } else {
        if (!this.selectionsConform(ids)) {
          this.$message({
            type: 'warning',
            message: '请至少选择一条记录！'
          })
          return
        }
        this._delUserHandle(ids)
      }
    },
    _delUser (guids) {
      this.portService.userDelUser({ userGuid: guids }).then((res) => {
        if (res.code == 200) {
          this._getUserList()
          this.$message({ type: 'success', message: res.data.message })
        } else {
          this.$message({ type: 'error', message: res.data.message })
        }
      })

    },
    _delUserHandle (ids) {
      this.$confirm('删除后将不能恢复数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delUser(ids)
      })
    },
    // 导入用户
    handleShowDialog (name, index) {

      // this.showModifyName = false
      // this.showInport = false
      // this.showAddChildDepartment = false
      // this[name] = true
      // this.index = index
      // this.dialogVisible = true
    },
    // 上传文件发生变化
    handelFileChange (e) {
      let data = new FormData()
      let file = this.$refs.file.files[0]
      data.append('file', file)
    },
    // 删除
    handleDel (data) {
      if (this.selectionsConform(data)) {
        alert(this.selectionsConform(data))
      }
    },
    // 判断是否有选择
    selectionsConform (data) {
      return data.length > 0
    },
    // 批量导出
    handleExport (data) {
      if (this.selectionsConform(data)) {
        alert(this.selectionsConform(data))
      }
    },
  },
  watch: {
    department: {
      immediate: true,
      handler (data) {
        this.currentDepartment = JSON.parse(JSON.stringify(data))
      }
    },
    '$store.state.roleAnddepartment.currentDepartment': {
      handler (data) {
        if (this.$route.path === '/userAndQxManage/zzjg/list') {
          this._getUserList()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.content_title {
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  width: 100%;
  h3 {
    font-size: 16px;
    font-weight: normal;
  }
  span {
    padding: 0px 5px;
    color: #666;
    opacity: 0.3;
  }
}
.content-btns {
  padding: 10px;
  background: #dfeffa;
  border: 1px solid #f4f5f9;
}
.pro_name {
  font-size: 28px !important;
}
</style>
