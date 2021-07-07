<template>
  <el-dialog
    title="查看审核记录"
    :append-to-body="true"
    :visible.sync="dialogVisible"
    width="950px"
    :before-close="handleClose"
  >
    <div>
      <self-table border :data="records" stripe style="width: 100%" height="350px">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="commitTime" label="提交时间">
          <template slot-scope="scope">{{
            scope.row.commitTime | timestampChange
          }}</template>
        </el-table-column>
        <el-table-column prop="shiXiangLeiBie" label="操作类型">
          <template slot-scope="scope">{{
            ['撤回','通过','未通过'][parseInt(scope.row.is_shenHe) - 1]
            }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间">
          <template slot-scope="scope">{{
            scope.row.createTime | timestampChange
          }}</template>
        </el-table-column>
        <el-table-column prop="shenHeRen" label="操作人"> </el-table-column>
        <el-table-column prop="is_shenHe" label="操作结果">
          <template slot-scope="scope">{{
            ['撤回审核','通过审核','未通过审核'][parseInt(scope.row.is_shenHe) - 1]
          }}</template>
        </el-table-column>
        <el-table-column prop="shenHeYiJian" label="审核意见">
        </el-table-column>
      </self-table>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    records: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dialogVisible: true,
    };
  },
  methods: {
    handleClose () {
      this.$parent.records = []
      this.$parent.showRecordflg = false
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
