<template>
    <section class="containerJdDw">
        <el-dialog title="选择监督单位" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="allQiYeData" class="allQiYeForm">
                <el-form-item label="企业名称:">
                    <el-input placeholder="请输入" v-model="allQiYeData.userName"></el-input>
                </el-form-item>
                <el-form-item label="企业代码:">
                    <el-input placeholder="请输入" v-model="allQiYeData.deptName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                </el-form-item>
            </el-form>
            <self-table border :data="allQiYeTableData" height="422px" @selection-change="handleSelectionChange" header-cell-class-name="headercell"
                style="width:100%;margin:0;" :fit="true">
                <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterpriseName" label="企业名称" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterpriseNo" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column type="selection" min-width="55"></el-table-column>
            </self-table>
            <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="dialogSureBtn">确定</el-button>
                <el-button @click="dialogQxBtn" size="small">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";

    export default {
        name: 'allQiYe',
        components: { VPagination },
        data() {
            return {
                allQiYeData: {
                    userName: "",
                    deptName: ""
                },
                allQiYeTableData: [],
                total: 0,
                searchForm: {
                    zbrName: "",
                    zbrBh: "",
                    page: 1,
                    rows: 10
                },
                multipleSelection: [],
                dialogTableVisible: false
            }
        },
        methods: {
            //查询所有企业
            async queryChooseZBRList() {
                this.searchForm = {
                    zbrName: this.allQiYeData.userName,
                    zbrBh: this.allQiYeData.deptName,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows
                }
                const res = await this.portService.queryChooseZBRList(this.searchForm)
                this.allQiYeTableData = res.rows
                this.total = res.total
            },
            //查询所有企业
            searchTable() {
                this.queryChooseZBRList()
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.queryChooseZBRList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.queryChooseZBRList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            dialogSureBtn() {
                if(this.multipleSelection.length==0){
                    this.$message({
                        type: "warning",
                        center: true,
                        duration: 1000,
                        message: "请选择监督单位!"
                    });
                    return false
                }
                this.$confirm('确定设置已选的监督单位吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    this.dialogTableVisible = false
                    this.$emit('qyDataFunc', this.multipleSelection);
                })
                .catch(() => {})
            },
            dialogQxBtn() {
                this.dialogTableVisible = false
            },
            qyBoolen() {
                this.dialogTableVisible = true
                this.queryChooseZBRList()
            }
        },
        create() {
        },
        mounted() {
        },
        destroyed() { },
        watch: {

        },
    }

</script>

<style lang="scss" scoped>
    .containerJdDw {
         ::v-deep.el-dialog {
            width:70%!important;
            top:40px;
            margin:0 auto!important;
            .el-dialog__header {
                height: 40px;
                padding:0 20px;
                background: #f5f5f5;
                line-height:40px;
                .el-dialog__title {
                    font-size: 16px;
                    color: #716f6f;
                }
                .el-dialog__headerbtn{
                    top:10px;
                }
                .el-dialog__close {
                    font-size: 18px;
                    color: #333;
                }
            }
            .el-dialog__body {
                padding:10px 20px;
                .allQiYeForm {
                    width: 100%;
                    .el-form-item {
                        width: calc(100% / 3);
                        height: 40px;
                        margin-right: 0;
                        .el-form-item__label {
                            width: 90PX!important;/*no*/
                            height: 40px;
                            padding-left: 12px;
                            font-size:14px;
                        }
                        .el-form-item__content {
                            width: calc(100% - 90PX);/*no*/
                            .el-input {
                                width: 100%;
                                .el-input__inner {
                                    width: 100%;
                                    height: 40px;
                                    font-size:14px;
                                }
                            }
                        }
                    }
                    .el-form-item:last-child {
                        text-align: right;
                        .el-button {
                            width:60px;
                            height: 40px!important;
                            padding:0;
                        }
                    }
                }
                .el-table {
                    .el-table__header tr th{
                        height:48px;
                    }
                    .el-table__body tr td{
                        height:48px;
                    }
                    .cell {
                        padding: 0;
                    }
                }
            }
            .el-dialog__footer{
                padding:10px 20px;
                .el-button {
                    width:60px;
                    height: 40px!important;
                    padding:0;
                }
            }
        }
    }
</style>
