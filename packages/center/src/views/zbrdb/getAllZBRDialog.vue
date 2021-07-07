<template>
    <section class="container">
        <el-dialog title="选择所属单位" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="allQiYeData" class="allQiYeForm">
                <el-form-item label="企业名称:">
                    <el-input placeholder="请输入" v-model="allQiYeData.zbrName"></el-input>
                </el-form-item>
                <el-form-item label="企业代码:">
                    <el-input placeholder="请输入" v-model="allQiYeData.zbrBh"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                </el-form-item>
            </el-form>
            <self-table border :data="allQiYeTableData" height="422px" header-cell-class-name="headercell"
                style="width:100%;margin:0;" :fit="true">
                <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qiYe_Name" label="企业名称" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qiYe_BH" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="100" align="left">
                    <template slot-scope="scope">
                        <el-button-group class="operation-button-group">
                            <el-button type="primary" plain class="operation-button" size="small" @click="checkZbrFunc(scope.row)">
                                <i class="iconfont icon-xuanze-"><span>选择</span></i>
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </self-table>
            <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
        </el-dialog>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";

    export default {
        name: 'allZBR',
        components: { VPagination },
        data() {
            return {
                allQiYeData: {
                    zbrName: "",
                    zbrBh: ""
                },
                allQiYeTableData: [],
                total: 0,
                searchForm: {
                    zbrName: "",
                    zbrBh: "",
                    page: 1,
                    rows: 10
                },
                dialogTableVisible: false
            }
        },
        methods: {
            //查询所属单位
            async getAllZBR() {
                this.searchForm = {
                    zbrName: this.allQiYeData.zbrName,
                    zbrBh: this.allQiYeData.zbrBh,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows
                }

                const res = await this.portService.getAllZBR(this.searchForm)
                if (res.data) {
                    this.allQiYeTableData = res.data.rows
                    this.total = res.data.total
                }
            },
            //查询所有企业
            searchTable() {
                this.getAllZBR()
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.getAllZBR()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.getAllZBR()
            },
            qyBoolen() {
                this.dialogTableVisible = true
                this.getAllZBR()
            },
            checkZbrFunc(row){
                this.$emit('zbrDataFunc',row);
                this.dialogTableVisible = false
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
    .container {
         ::v-deep.el-dialog {
            width: 70%!important;
            top: 40px;
            margin: 0 auto!important;
            .el-dialog__header {
                height: 40px;
                padding:0 20px;
                background: #f5f5f5;
                line-height:40px;
                .el-dialog__title {
                    font-size: 18px;
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
                            width: 90PX!important;
                            /*no*/
                            height: 40px;
                            padding-left: 12px;
                            font-size: 14px;
                        }
                        .el-form-item__content {
                            width: calc(100% - 90PX);
                            /*no*/
                            .el-input {
                                width: 100%;
                                .el-input__inner {
                                    width: 100%;
                                    height: 40px;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                    .el-form-item:last-child {
                        text-align: right;
                        .el-button {
                            width: 60px;
                            height: 40px!important;
                            padding: 0;
                        }
                    }
                }
                .el-table {
                    .el-table__header tr th {
                        height: 48px;
                    }
                    .el-table__body tr td {
                        height: 48px;
                    }
                    .cell {
                        padding: 0;
                        text-align: center;
                        .el-button {
                            width:60px;
                            height: 30px!important;
                            padding:0;
                            color:#fff;
                        }
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
