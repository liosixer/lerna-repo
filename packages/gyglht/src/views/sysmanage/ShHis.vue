<template>
    <el-dialog title="历史采购制度审核记录" :visible.sync="dialogVisible" width="1200px" append-to-body>
        <self-table :data="tableData" border stripe style="width: 100%;" v-loading="tbLoading">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="gczbLimit" label="工程招标限额（万元）" min-width="160"></el-table-column>
            <el-table-column prop="wzzbLimit" label="货物招标限额（万元）" min-width="160"></el-table-column>
            <el-table-column prop="fwzbLimit" label="服务招标限额（万元）" min-width="160"></el-table-column>
            <el-table-column prop="createTime" label="审核通过时间" min-width="120">
                <template slot-scope="scope">{{ scope.row.approvalTime | timestampChange }}</template>
            </el-table-column>
            <el-table-column prop="id" label="采购制度附件" min-width="120">
                <template slot-scope="scope">
                    <a :href="scope.row.fileSrc" class="downloadA">{{scope.row.fileName}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="备注" min-width="120"></el-table-column>
            <div slot="empty" class="custom-empty"></div>
        </self-table>
    </el-dialog>
</template>
<script>
    import util from "../../utils/util";

    export default {
        name: "ShHis",
        inject: ['globalSetting'],
        data() {
            return {
                dialogVisible: false,
                tbLoading: false,
                tableData: []
            }
        },
        created() {
        },
        methods: {
            openDialog() {
                this.dialogVisible = true
                this.getTable()
            },
            //获取表格信息
            async getTable() {
                const res = await this.portService.cgzdShHis()
                if (res && res.code == 1) {
                    for (let i = 0; i < res.data.recordList.length; i++) {
                        let item=res.data.recordList[i]
                        if (item.cgzdAttachmentGuid) {
                            const fileData = await util.getDownSrcName(item.cgzdAttachmentGuid)
                            item.fileSrc = fileData.src
                            item.fileName = fileData.name
                        }
                    }
                    this.tableData = res.data.recordList
                }
            }
        },

    }
</script>
