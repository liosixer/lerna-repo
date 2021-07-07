<template>
    <el-dialog title="选择租户" :visible.sync="dialogVisible" :append-to-body="true">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-position="left" size="small"
                 label-width="100px" style="padding: 0 50px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="租户名称">
                        <el-input v-model="searchForm.zuHuName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button @click="getList" type="primary" size="small" icon="el-icon-search">查询</el-button>
                </el-col>
            </el-row>
        </el-form>
        <self-table border :data="tableData" stripe style="width: 100%" :height="300"
                    @selection-change="handleSelectionChange" row-key="danWeiBH">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="zuHuName" label="租户名称"></el-table-column>
            <el-table-column prop="zuHuCode" label="租户编号"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="left">
                <template slot-scope="{ row }">
                    <el-button-group class="operation-button-group">
                        <el-button @click="checkout(row)" type="primary" plain class="operation-button" size="mini">
                            <i class="iconfont icon-xuanze-"><span>选择</span></i>
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
            <div slot="empty" class="custom-empty"></div>
        </self-table>
        <v-pagination
                :total="total"
                :page="searchForm.page"
                :limit="searchForm.rows"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        ></v-pagination>
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
                userGuid: ''
            }
        },
        methods: {
            openDialog() {
                this.dialogVisible = true
                this.getList()
            },
            async getList() {
                const result = await this.portService.zuhuQueryAll({
                    zuHuName: this.searchForm.zuHuName,
                    pageSize: this.searchForm.rows,
                    pageNo: this.searchForm.page,
                    isZuHu: 1
                })
                if (result && result.data) {
                    this.tableData = result.data.rows
                    this.total = result.data.total
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
            async checkout(row) {
                this.$emit('sendZh', row)
                this.dialogVisible = false
            }
        }
    }
</script>