<template>
  <el-dialog
    title="提示"
    :append-to-body="true"
    :visible.sync="dialogVisible"
    width="950px"
    :before-close="handleClose"
  >
    <self-table border :data="tableData" height="350" style="width: 100%">
      <el-table-column prop="date" label="提交时间" width="180" >
      </el-table-column>
      <el-table-column prop="name" label="操作类型" width="180">
      </el-table-column>
      <el-table-column prop="name" label="操作时间" width="180" >
      </el-table-column>
      <el-table-column prop="name" label="操作人" width="180">
      </el-table-column>
      <el-table-column prop="name" label="操作结果" width="180">
      </el-table-column>
      <el-table-column prop="address" label="审核意见" show-overflow-tooltip=""> </el-table-column>
      <div slot="empty" class="custom-empty"></div>
    </self-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      dialogVisible: true,
      tableData: []
    };
  },
  methods: {
    handleClose () {
      this.$emit('onShowRecords', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
