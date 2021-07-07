<template>
  <self-table border :data="ApprovalTableData" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
    <el-table-column prop="commitUserName" label="提交人" min-width="120"></el-table-column>
    <el-table-column prop="commitTime" label="提交时间" min-width="140">
      <template slot-scope="scope">{{scope.row.commitTime |dateFormater("YYYY-MM-DD HH:mm")}}</template>
    </el-table-column>
    <el-table-column prop="approveUserName" label="审批人" min-width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.qiyeName!=scope.row.tiJiaoqiyeName">{{scope.row.qiyeName}} + {{scope.row.approveUserName}}</span>
        <span v-else>{{scope.row.approveUserName}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="statusMsg" label="审核结果" min-width="120">
      <template slot-scope="scope">
        <!-- 状态 going -->
        <span  class="status-success" v-if="scope.row.statusMsg==1">{{scope.row.statusMsg|translate(globalSetting.common.appvalStatus)}}</span>
        <span class="status-fail" v-else-if="scope.row.statusMsg==2||scope.row.statusMsg==3">{{scope.row.statusMsg|translate(globalSetting.common.appvalStatus)}}</span>
        <span class="status-other" v-else>{{scope.row.statusMsg|translate(globalSetting.common.appvalStatus)}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="approveTime" label="审核时间" min-width="140" >
      <template slot-scope="scope">{{scope.row.approveTime |dateFormater("YYYY-MM-DD HH:mm")}}</template>
    </el-table-column>
    <el-table-column prop="opinion" label="审批意见" min-width="120"></el-table-column>
    <el-table-column v-if="isFile" prop="fuJianGuid" label="审批附件" min-width="140">
      <template slot-scope="scope">
        <a class="downloadA" :href="scope.row.src">{{scope.row.name}}</a>
      </template>
    </el-table-column>
    <div slot="empty" class="custom-empty"></div>
  </self-table>
</template>
<script>
import util from "@/utils/utils";
export default {
  name: "ApprovalList",
  inject: ["globalSetting"],
  props: {
    businessKey: {
      type: String,
      default() {
        return "";
      }
    },
    isFile: {
      type: Boolean,
      default() {
        return false;
      }
    },
    from:{
      type: String,
      default() {
          return "";
      }
    }
  },
  data() {
    return {
      ApprovalTableData: []
    };
  },
  watch: {
    businessKey(val) {
      console.log(val, "==================>>>>>>>>>>");
      if (val) {
        this.getApprovalList();
      }
    }
  },
  created() {
    this.getApprovalList();
  },
  methods: {
    async getApprovalList() {
      if(this.from=='planDetail'){
        let planId=this.businessKey.split(':')[1]
        var result = await this.portService.getYearPlanAuditList({
          planId: planId,businessKey: this.businessKey
        });
        if (result && result.data) {
          this.ApprovalTableData = result.data;
        }
      }else{
        var result = await this.portService.getApprovalList({
          businessKey: this.businessKey
        });
        console.log(result);
        if (result && result.data) {
          this.ApprovalTableData = result.data;
          if (this.isFile) {
            this.ApprovalTableData.forEach((val, index) => {
              if (val.fuJianGuid) {
                util
                  .getDownSrcName(this.ApprovalTableData[index].fuJianGuid)
                  .then(res => {
                    this.$set(this.ApprovalTableData[index], "src", res.src);
                    this.$set(this.ApprovalTableData[index], "name", res.name);
                  });
              }
              console.log(val);
            });
          }
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
