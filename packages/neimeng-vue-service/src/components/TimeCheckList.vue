<template>
  <self-table border :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
    <el-table-column prop="userName" label="提交人" min-width="120"></el-table-column>
    <el-table-column prop="createTime" label="提交时间" min-width="140">
      <template slot-scope="scope">{{scope.row.createTime |dateFormater("YYYY-MM-DD HH:mm")}}</template>
    </el-table-column>
    <el-table-column prop="offlineTime" label="线下审批完成时间" min-width="140" >
      <template slot-scope="scope">{{scope.row.offlineTime |dateFormater("YYYY-MM-DD HH:mm")}}</template>
    </el-table-column>
    <div slot="empty" class="custom-empty"></div>
  </self-table>
</template>
<script>
import util from "@/utils/utils";
export default {
  name: "TimeCheckList",
  inject: ["globalSetting"],
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    //   tableData: []
    };
  },
  watch: {
    tableData(val) {
      console.log(val,"09090909090")
    }
  },
  created() {
  },
  methods: {
    
  }
};
</script>

<style scoped>
</style>
