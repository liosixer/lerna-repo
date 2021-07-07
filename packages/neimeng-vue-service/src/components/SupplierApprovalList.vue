<template>
    <self-table :data="ApprovalTableData" stripe style="width: 100%" border>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column prop="submitter" label="提交人"></el-table-column>
        <el-table-column prop="submitTime" label="提交时间" >
            <template slot-scope="scope">{{scope.row.submitTime |dateFormater("YYYY-MM-DD HH:mm")}}</template>
        </el-table-column>
        <el-table-column prop="approver" label="审批人"></el-table-column>
        <el-table-column prop="approvalResult" label="审核结果">
            <template slot-scope="scope">
                {{scope.row.approvalResult|translate(globalSetting.common.shenheStatusOptions)}}
            </template>
        </el-table-column>
        <el-table-column prop="approvalTime" label="审核时间">
            <template slot-scope="scope">{{scope.row.approvalTime |dateFormater("YYYY-MM-DD HH:mm")}}</template>
        </el-table-column>
        <el-table-column prop="approvalOpinion" label="审批意见"></el-table-column>
        <div slot="empty" class="custom-empty"></div>
    </self-table>
</template>
<script>
    export default {
        name: "SupplierApprovalList",
        inject: ['globalSetting'],
        props: {
            businessId: {
                type: String,
                default() {
                    return "";
                }
            },
            businessType: {
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
                var result = await this.portService.auditRecordList({
                    businessId: this.businessId,
                    businessType: this.businessType
                });
                console.log(result);
                if (result && result.data) {
                    this.ApprovalTableData = result.data.rows;
                }
            }
        }
    };
</script>

<style scoped>
</style>
