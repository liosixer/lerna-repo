<template>
    <section class="container">
        <div class="jdDwSzHeader">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }"></PageCrumb>
            <div>
                <h3>监督单位设置</h3>
            </div>
        </div>
        <div class="jdDwSzContent">
            <div class="jdDwCheckDev">
                <el-form :inline="true" :model="jddwCheckData" class="jddwCheckForm">
                    <el-form-item label="企业名称:">
                        <el-input placeholder="请输入" v-model="jddwCheckData.qiyeName"></el-input>
                    </el-form-item>
                    <el-form-item label="企业代码:">
                        <el-input placeholder="请输入" v-model="jddwCheckData.qiyeBH"></el-input>
                    </el-form-item>
                    <el-form-item label="设置时间:">
                        <el-date-picker
                            v-model="jddwCheckData.creatorTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="设置人:">
                        <el-input placeholder="请输入" v-model="jddwCheckData.creatorName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                        <el-button type="primary" size="small" @click="addSzJdrBtn">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="jddwTableDiv">
                <self-table border :data="jddwTableData" height="84%" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qyName" label="企业名称" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qyBH" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createrTime" label="设置时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
                    <el-table-column prop="createrName" label="设置人" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                            <el-button type="primary" plain class="operation-button" size="small" @click="deletJdDw(scope.row.guid)">
                                <i class="iconfont icon-shanchu1"><span>删除</span></i>
                            </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
                <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            </div>
            <superviseDwszDialog ref="superviseDwszDialog" @qyDataFunc="getQyData"></superviseDwszDialog>
        </div>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";
    import superviseDwszDialog from "./superviseDwszDialog";
    import PageCrumb from "@/components/PageCrumb";
    export default {
        name: 'superviseDwsz',
        components: { VPagination, superviseDwszDialog , PageCrumb},
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
                    { label: "监督管理", link: "/superviseManage/superviseRsz" },
                    { label: "监督单位设置", link: "" }
                ],
                jddwCheckData: {
                    qiyeName:"",
                    qiyeBH:"",
                    creatorTime:[],
                    creatorName: ""
                },
                jddwTableData: [],
                total: 0,
                searchForm: {
                    qiyeName:"",
                    qiyeBH:"",
                    creatorName:"",
                    startTime:"",
                    endTime:"",
                    page: 1,
                    rows: 10
                },
                jarSzArr:[]
            }
        },
        methods: {
            //查询主表格
            async queryJdList() {
                if(this.jddwCheckData.creatorTime!=null){
                    var startTime ="";
                    if(this.jddwCheckData.creatorTime[0]!=undefined){
                        startTime = this.formatDate(this.jddwCheckData.creatorTime[0].getTime())
                    }
                    var endTime ="";
                    if(this.jddwCheckData.creatorTime[1]!=undefined){
                        endTime = this.formatDate(this.jddwCheckData.creatorTime[1].getTime())
                    }
                }

                this.searchForm={
                    qiyeName:this.jddwCheckData.qiyeName,
                    qiyeBH:this.jddwCheckData.qiyeBH,
                    creatorName:this.jddwCheckData.creatorName,
                    startTime:startTime,
                    endTime:endTime,
                    page:this.searchForm.page,
                    rows:this.searchForm.rows
                }
                const res = await this.portService.queryJdList(this.searchForm)
                this.jddwTableData = res.rows
                this.total = res.total
            },
            //查询主表格
            searchTable(){
                this.queryJdList()
            },
            //转换时间格式
            timeChange(row, column, cellValue, index){
                return this.formatDate(cellValue)
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.queryJdList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.queryJdList()
            },
            //点击添加按钮
            addSzJdrBtn(guid){
                this.$refs.superviseDwszDialog.qyBoolen()
            },
            //回填监督人信息
            getQyData(payload){
                this.jarSzArr= payload
                this.saveJianDuDanWei()
            },
            //保存监督单位设置
            async saveJianDuDanWei() {
                var userGuidsArr=[]
                var userGuidsStr=""
                for(let i=0;i<this.jarSzArr.length;i++){
                    userGuidsArr.push(this.jarSzArr[i].guid)
                }
                userGuidsStr= userGuidsArr.toString()
                var saveForm={
                    userQiYe_Guid: userGuidsStr
                }
                const res = await this.portService.saveJianDuDanWei(saveForm)
                .then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: "success",
                            center: true,
                            duration: 1000,
                            message: "添加监督单位成功!"
                        });
                        this.queryJdList()
                    }
                }).catch(error => {

                })
            },
            //点击删除监督单位
            deletJdDw(guid){
                this.$confirm('确定删除该监督单位吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    this.delJianDuDanWei(guid)
                })
                .catch(() => {})
            },
            //删除监督单位
            async delJianDuDanWei(guid) {
                var saveForm={
                    danWeiGuid: guid
                }
                const res = await this.portService.delJianDuDanWei(saveForm)
                .then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: "success",
                            center: true,
                            duration: 1000,
                            message: "监督单位删除成功!"
                        });
                        this.queryJdList()
                    }
                }).catch(error => {

                })
            },
            //时间戳转时间
            formatDate: function (value) {
                if(value===null){
                    return ""
                }else{
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
                }
            }
        },
        create() {
        },
        mounted() {
            this.queryJdList()
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

    .jdDwSzHeader {
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

    .jdDwSzContent {
        width: calc(100% - 10px);
        height: calc(100% - 100px);
        margin: 5px;
        >div {
            width: 100%;
            background: #fff;
        }
        .jdDwCheckDev {
            height: 120px;
            margin-bottom:20px;
            padding-bottom:0;
            padding-top:10px;
            .jddwCheckForm {
                width: calc(100% - 40px);
                height:120px;
                margin: 0 auto;
                ::v-deep.el-form-item {
                    width: calc(100% / 3);
                    height: 60px;
                    margin-right: 0;
                    margin-bottom:0;
                    .el-form-item__label {
                        width: 90PX!important;/*no*/
                        height: 40px;
                        padding-left: 12px;
                        font-size:14px;
                        line-height: 40px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 90PX);/*no*/
                        line-height: 0;
                        height: 40px;
                        .el-input {
                            width: 100%;
                            height: 40px;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size:14px;
                            }
                        }
                        .el-date-editor{
                            width: 100%;
                            height: 40px;
                            padding:0 10px;
                            line-height: 40px;
                            font-size:14px;
                            .el-range-input{
                                font-size:14px;
                            }
                            .el-input__icon{
                                line-height: 40px;
                            }
                            .el-range-separator{
                                font-size:14px;
                                line-height: 40px;
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
        .jddwTableDiv {
            height: calc(100% - 120px);
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
                color:#f00;
            }
        }
    }
</style>
