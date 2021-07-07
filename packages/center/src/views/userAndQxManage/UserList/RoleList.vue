<template>
  <el-dialog title="分配角色" :append-to-body="true"
             :visible.sync="assignVisible" width="40%"
             :before-close="handleCansel">
    <div>
      <self-table ref="rolesTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        :append-to-body="true"
        @selection-change="handleSelectionChange"
        height="350"
      >
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column prop="roleName" label="角色名"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
      </self-table>
      <div>
        <v-pagination
          :total="total"
          :page="this.page"
          :limit="this.rows"
          v-if="total > 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></v-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCansel" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="handleOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleList, saveRole } from '@/service/roleAndDepartment'
export default {
  props: {
    show: {
      type: Boolean,
      defualt: false,
    },
    guid: {
      type: String,
      required: true
    },
    roleIds: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      assignVisible: false,
      page: 1,
      rows: 10,
      total: 0,
      shenQingZhuanYe: '',
      shenHeStatus: '',
      tableData: [],
      userRoleIds: [],
      copyUserRoleIds: []
    }
  },
  created () {
  },
  methods: {
    // 表格选择
    handleSelectionChange (val) {
      this.userRoleIds = val
    },
    handleSizeChange (data) {
      this.rows = data
      this._getRoleList()
    },
    handleCurrentChange (data) {
      this.page = data
      this._getRoleList()
    },
    _getRoleList () {
      let params = { page: this.page, rows: this.rows }
      if (this.shenQingZhuanYe) params.shenQingZhuanYe = this.shenQingZhuanYe
      if (this.shenHeStatus) params.shenHeStatus = this.shenHeStatus
      this.copyUserRoleIds = [...this.userRoleIds]
      // getRoleList(params).then(res => {
      //   this.tableData = res.data.rows
      //   this.total = res.data.total
      //   this.tableData.forEach(e => {
      //     if (this.roleIds.includes(e.guid)) {
      //       this.userRoleIds.push(e)
      //       this.$nextTick().then(() => {
      //         this.$refs.rolesTable.toggleRowSelection(e, true)
      //       })
      //     }
      //   })
      // })
    },
    _emitData () {
      this.assignVisible = false
      this.$emit('showEvent', this.assignVisible)
    },
    handleCansel () {
      this._emitData()
      this.$refs.rolesTable.clearSelection();
    },
    handleOK () {
      this.copyUserRoleIds = [...this.copyUserRoleIds, ...this.userRoleIds]
      let userRoleIds = this.copyUserRoleIds.map(item => item.guid).join(',')
      let userGuid = this.guid
      if (!userRoleIds.length) {
        this.$message({
          type: 'warning',
          message: '请至少选择一个角色'
        })
        return
      }
      saveRole({ userRoleIds, userGuid }).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: res.info
          })
        }
      })
      this._emitData()
    }
  },
  watch: {
    show: {
      handler (data) {
        this.assignVisible = data
        if (data) {
          this._getRoleList()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
