<template>
    <section class="container">
        <div class="zbrdbHeader">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }"></PageCrumb>
            <div>
                <h3>监标人代表</h3>
            </div>
        </div>
        <div class="zbrdbContent">
            <div class="zbrdbCheckDev">
                <el-form :inline="true" :model="zbrdbCheckData" class="zbrdbCheckForm">
                    <el-form-item label="姓名:">
                        <el-input placeholder="请输入" v-model="zbrdbCheckData.nameVal"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码:">
                        <el-input placeholder="请输入" v-model="zbrdbCheckData.idNoVal"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位:">
                        <el-input placeholder="请输入" v-model="zbrdbCheckData.employerVal"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话:">
                        <el-input placeholder="请输入" v-model="zbrdbCheckData.phoneVal"></el-input>
                    </el-form-item>
                    <el-form-item label="当前状态:">
                        <el-select v-model="zbrdbCheckData.zbrdbCheckVal" placeholder="请选择">
                            <el-option v-for="item in zbrdbCheckData.zbrdbCheck" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                        <el-button type="primary" size="small" @click="zbrdbAddFun">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="zbrdbTableDiv">
                <self-table border :data="zbrdbTableData" height="88%" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="姓名" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="idNo" label="身份证号码" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="employer" label="所属单位" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="phone" label="联系电话" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
                    <el-table-column prop="status" label="当前状态" min-width="150px" show-overflow-tooltip :formatter="stauesChange"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="160" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="primary" plain class="operation-button" size="small" @click="zbrdbBjFun(scope.row.guid)">
                                    <i class="iconfont icon-bianji2"><span>编辑</span></i>
                                </el-button>
                                <el-button type="primary" plain class="operation-button" size="small" @click="zbrdbXqFun(scope.row.guid)">
                                    <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
                <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            </div>
        </div>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";
    import PageCrumb from "@/components/PageCrumb";

    export default {
        name: 'superviseRsz',
        components: { VPagination, PageCrumb },
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
                    { label: "招标人代表", link: "/zbrdb/zbrdbTable" },
                    { label: "监标人", link: "" }
                ],
                zbrdbCheckData: {
                    nameVal: "",
                    idNoVal: "",
                    employerVal: "",
                    phoneVal: "",
                    zbrdbCheck: [
                        {
                            label: "全部",
                            value: ""
                        },
                        {
                            label: "有效",
                            value: 1
                        },
                        {
                            label: "无效",
                            value: 0
                        }
                    ],
                    zbrdbCheckVal: ""
                },
                zbrdbTableData: [],
                total: 0,
                searchForm: {
                    name: "",
                    idNo: "",
                    employer: "",
                    phone: "",
                    status: "",
                    type: 2,
                    page: 1,
                    rows: 10
                },
            }
        },
        methods: {
            //查询主表格
            searchTable() {
                this.ZhaoBiaoRenDaiBiaoList()
            },
            //转换状态
            stauesChange(row, column, cellValue, index) {
                var str = ''
                if (cellValue != undefined && cellValue != null) {
                    if (cellValue === "1") {
                        str = "有效"
                    } else if (cellValue === "0") {
                        str = "无效"
                    }
                }
                return str
            },
            //转换时间格式
            timeChange(row, column, cellValue, index) {
                return this.formatDate(cellValue)
            },
            //查询主表格
            async ZhaoBiaoRenDaiBiaoList() {
                this.searchForm = {
                    name: this.zbrdbCheckData.nameVal,
                    idNo: this.zbrdbCheckData.idNoVal,
                    employer: this.zbrdbCheckData.employerVal,
                    phone: this.zbrdbCheckData.phoneVal,
                    status: this.zbrdbCheckData.zbrdbCheckVal,
                    type: this.searchForm.type,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows
                }
                const res = await this.portService.ZhaoBiaoRenDaiBiaoList(this.searchForm)
                if (res.data) {
                    this.zbrdbTableData = res.data.rows
                    this.total = res.data.total
                }
            },
            //时间戳转时间
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
            //跳转新增页面
            zbrdbAddFun() {
                this.$router.push({ path: "/zbrdb/jbrdbAdd" })
            },
            //跳转编辑页面
            zbrdbBjFun(guid) {
                this.$router.push({ name: "jbrdbBj", params: { bjid: guid } })
            },
            //跳转详情页面
            zbrdbXqFun(guid) {
                this.$router.push({ name: "jbrdbXq", params: { xqid: guid } })
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.ZhaoBiaoRenDaiBiaoList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.ZhaoBiaoRenDaiBiaoList()
            },
        },
        create() {
        },
        mounted() {
            //默认加载查询表格
            this.ZhaoBiaoRenDaiBiaoList()
        },
        destroyed() { },
        watch: {
        },
    }

</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: calc(100vh - 120px);
    }
    /*头部样式*/

    .zbrdbHeader {
        width: 100%;
        height: 90px;
        background: #fff;
        div {
            width: calc(100% - 40px);
            height: 40px;
            margin: 0 auto;
            h3 {
                height: 40px;
                color: #000;
                font-size: 16px;
                line-height: 40px;
            }
        }
        div:first-child {
            color: #404040;
            font-size: 14px;
            line-height: 40px;
        }
    }
    /*主体内容样式*/

    .zbrdbContent {
        width: calc(100% - 10px);
        height: calc(100% - 90px);
        margin: 5px;
        >div {
            width: 100%;
            background: #fff;
        }
        .zbrdbCheckDev {
            height: 120px;
            margin-bottom: 20px;
            padding-bottom: 0;
            padding-top: 10px;
            .zbrdbCheckForm {
                width: calc(100% - 40px);
                height: 120px;
                margin: 0 auto;
                 ::v-deep.el-form-item {
                    width: calc(100% / 3);
                    height: 60px;
                    margin-right: 0;
                    margin-bottom: 0;
                    .el-form-item__label {
                        width: 120PX!important;
                        /*no*/
                        height: 40px;
                        padding-left: 12px;
                        font-size: 14px;
                        line-height: 40px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 120PX);
                        /*no*/
                        height: 40px;
                        line-height: 0;
                        .el-input {
                            width: 100%;
                            height: 40px;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size: 14px;
                            }
                        }
                        .el-select {
                            width: 100%;
                            height: 40px;
                            font-size: 14px;
                        }
                    }
                }
                 ::v-deep.el-form-item:last-child {
                    text-align: right;
                    .el-button {
                        width: 60px;
                        height: 40px!important;
                        padding: 0;
                    }
                }
            }
        }
        .zbrdbTableDiv {
            height: calc(100% - 120px);
        }
         ::v-deep.el-table {
            .el-table__header tr th {
                height: 48px;
                padding: 0;
            }
            .el-table__body tr td {
                height: 48px;
                padding: 0;
            }
            .cell {
                padding: 0;
                text-align: center;
            }
            .el-button {
                color: #409eff;
            }
        }
    }
</style>
