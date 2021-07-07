<template>
    <section class="container">
        <div class="jdrSzHeader">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }"></PageCrumb>
            <div>
                <h3>监督人设置</h3>
            </div>
        </div>
        <div class="jdrSzContent">
            <div class="jdrCheckDev">
                <el-form :inline="true" :model="jdrCheckData" class="jdrCheckForm">
                    <el-form-item label="采购项目名称:">
                        <el-input placeholder="请输入" v-model="jdrCheckData.gcName"></el-input>
                    </el-form-item>
                    <el-form-item label="采购项目编号:">
                        <el-input placeholder="请输入" v-model="jdrCheckData.gcBH"></el-input>
                    </el-form-item>
                    <el-form-item label="采购人:">
                        <el-input placeholder="请输入" v-model="jdrCheckData.caiGouRen"></el-input>
                    </el-form-item>
                    <el-form-item label="监督人员:">
                        <el-input placeholder="请输入" v-model="jdrCheckData.jianduren"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="jdrTableDiv">
                <self-table border :data="jdrTableData" height="84%" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="gcName" label="采购项目名称" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="gcBH" label="采购项目编号" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zbRName" label="采购人" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jianDuRenName" label="监督人员" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="primary" plain class="operation-button" size="small" @click="addSzJdrBtn(scope.row.gcGuid)">
                                    <i class="iconfont icon-ziyuan"><span>设置</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
                <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            </div>
            <superviseRszDialog ref="superviseRszDialog" @qyDataFunc="getQyData"></superviseRszDialog>
        </div>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";
    import superviseRszDialog from "./superviseRszDialog";
    import PageCrumb from "@/components/PageCrumb";
    export default {
        name: 'superviseRsz',
        components: { VPagination, superviseRszDialog, PageCrumb},
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
                    { label: "监督管理", link: "" },
                    { label: "监督人设置", link: "" }
                ],
                jdrCheckData: {
                    gcName:"",
                    gcBH:"",
                    caiGouRen:"",
                    jianduren:""
                },
                jdrTableData: [],
                total: 0,
                searchForm: {
                    gcName:"",
                    gcBH:"",
                    caiGouRen:"",
                    jianduren:"",
                    page: 1,
                    rows: 10
                },
                jarSzArr:[],
                szGuid:""
            }
        },
        methods: {
            //查询主表格
            async getJianDuXMList() {
                this.searchForm={
                    gcName:this.jdrCheckData.gcName,
                    gcBH:this.jdrCheckData.gcBH,
                    caiGouRen:this.jdrCheckData.caiGouRen,
                    jianduren:this.jdrCheckData.jianduren,
                    page:this.searchForm.page,
                    rows:this.searchForm.rows
                }
                const res = await this.portService.getJianDuXMList(this.searchForm)
                if (res.data) {
                    this.jdrTableData = res.data.rows
                    this.total = res.data.total
                }
            },
            //查询主表格
            searchTable(){
                this.getJianDuXMList()
            },
            //点击设置按钮
            addSzJdrBtn(guid){
                this.szGuid=guid
                this.$refs.superviseRszDialog.qyBoolen()
            },
            //回填监督人信息
            getQyData(payload){
                this.jarSzArr= payload
                this.fenPeiJdr()
            },
            //保存监督人设置
            async fenPeiJdr() {
                var userGuidsArr=[]
                for(let i=0;i<this.jarSzArr.length;i++){
                    userGuidsArr.push(this.jarSzArr[i].guid)
                }
                var saveForm={
                    gcGuid: this.szGuid,
                    userGuidList: userGuidsArr
                }
                const res = await this.portService.fenPeiJdr(saveForm)
                .then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: "success",
                            center: true,
                            duration: 1000,
                            message: "监督人设置成功!"
                        });
                        this.getJianDuXMList()
                    }
                }).catch(error => {

                })
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.getJianDuXMList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.getJianDuXMList()
            },
        },
        create() {
        },
        mounted() {
            this.getJianDuXMList()
         },
        destroyed() { },
        watch: {
        },
    }

</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: calc(100vh - 110px);
    }

    /*头部样式*/
    .jdrSzHeader {
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
    .jdrSzContent {
        width: calc(100% - 10px);
        height: calc(100% - 100px);
        margin: 5px;
        >div {
            width: 100%;
            background: #fff;
        }
        .jdrCheckDev{
            height: 120px;
            margin-bottom:20px;
            padding-bottom:0;
            padding-top:10px;
            .jdrCheckForm{
                width: calc(100% - 40px);
                height:120px;
                margin: 0 auto;
                ::v-deep.el-form-item {
                    width: calc(100% / 3);
                    height: 60px;
                    margin-right: 0;
                    margin-bottom:0;
                    .el-form-item__label {
                        width: 120PX!important;/*no*/
                        height: 40px;
                        padding-left: 12px;
                        font-size:14px;
                        line-height: 40px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 120PX);/*no*/
                        height: 40px;
                        line-height: 0;
                        .el-input {
                            width: 100%;
                            height: 40px;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size:14px;
                            }
                        }
                    }
                }
                 ::v-deep.el-form-item:last-child {
                    width: calc(100% / 3 * 2);
                    text-align: right;
                    .el-button {
                        width:60px;
                        height: 40px!important;
                        padding:0;
                    }
                }
            }
        }
        .jdrTableDiv{
            height:calc(100% - 120px);
        }
         ::v-deep.el-table {
            .el-table__header tr th{
                height:48px;
                padding:0;
            }
            .el-table__body tr td{
                height:48px;
                padding:0;
            }
            .cell {
                padding: 0;
            }
            .el-button {
                color:#409eff;
            }
        }
    }
</style>
