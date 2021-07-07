<template>
    <el-dialog title="选择角色" :visible.sync="dialogVisible" :append-to-body="true">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-position="left" size="small"
                 label-width="100px" style="padding: 0 50px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="角色名称">
                        <el-input v-model="searchForm.roleName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色编号">
                        <el-input v-model="searchForm.roleNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button @click="getList" type="primary" size="small" icon="el-icon-search">查询</el-button>
                </el-col>
            </el-row>
        </el-form>
        <self-table border :data="tableData" stripe style="width: 100%" :height="300"
                    @selection-change="handleSelectionChange" row-key="danWeiBH" :key="tbKey">
            <el-table-column type="selection" width="55" align="center" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleNo" label="角色编号"></el-table-column>
            <div slot="empty" class="custom-empty"></div>
        </self-table>
        <v-pagination
                :total="total"
                :page="searchForm.page"
                :limit="searchForm.rows"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        ></v-pagination>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="checkout" size="small">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "PlanDialog",
        inject: ['globalSetting'],
        data() {
            return {
                total: 0,
                dialogVisible: false,
                searchForm: {
                    page: 1,
                    rows: 10
                },
                tableData: [],
                rows: [],
                userGuid: '',
                tbKey: 1,
                roleGuids:''//用以排除已选项
            }
        },
        methods: {
            openDialog(userGuid,guids) {
                this.dialogVisible = true
                this.roleGuids=guids
                this.userGuid = userGuid
                this.tbKey += 1
                this.getList()
            },
            async getList() {
                const opt = {
                    roleNo: this.searchForm.roleNo,
                    roleName: this.searchForm.roleName,
                    roleGuids: this.roleGuids,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows,
                    roleZhuangTai:1
                }
                const res = await this.portService.allRolesQueryCtrs(opt);
                if (res && res.data) {
                    this.tableData = res.data.data
                    this.total = res.data.total
                }
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.getList()
            },
            handleSelectionChange(rows) {
                this.rows = rows
            },
            async checkout(row) {
                let ids = '', arr = []
                if (this.rows.length > 0) {
                    this.rows.forEach(item => {
                        arr.push(item.guid)
                    })
                    ids = arr.join()
                }
                const res = await this.portService.DisRoles({roleGuids: ids, user_Guid: this.userGuid});
                if (res && res.code == 1) {
                    this.$message.success(res.info)
                    this.$emit('sendRoles', row)
                    this.dialogVisible = false
                }
            }
        }
    }
</script>