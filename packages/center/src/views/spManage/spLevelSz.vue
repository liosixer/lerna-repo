<template>
    <section class="container">
        <div class="spLevelSzHeader">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }"></PageCrumb>
            <div>
                <h3>审批级别设置</h3>
            </div>
        </div>
        <div class="spLevelSzContent">
            <div class="zzxxDiv">
                <self-table border :data="zzxxData" height="90%" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="shiXiangName" label="审批事项名称" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="shenPiJiBie" label="审批级别" min-width="150px" show-overflow-tooltip :formatter="stauesChange"></el-table-column>
                    <el-table-column prop="modifyTime" label="设置时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="120" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="primary" plain class="operation-button" size="small" @click="szSpPersonFun(scope.row)">
                                    <i class="iconfont icon-ziyuan"><span>设置审批人员</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </self-table>
                <v-pagination
                    :total="total"
                    :page="searchForm.page"
                    :limit="searchForm.rows"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></v-pagination>
            </div>
        </div>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";
    import PageCrumb from "@/components/PageCrumb";
    export default {
        name: 'splevelsz',
        components: { VPagination , PageCrumb},
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
                    { label: "审批管理", link: "" },
                    { label: "审批级别设置", link: "" }
                ],
                zzxxData: [],
                total: 0,
                searchForm: {
                    page: 1,
                    rows: 10
                },
            }
        },
        methods: {
            //查询主表格
            async queryShenPiShiXiangList() {
                this.searchForm={
                    page:this.searchForm.page,
                    rows:this.searchForm.rows
                }
                const res = await this.portService.queryShenPiShiXiangList(this.searchForm)
                if (res.data) {
                    this.zzxxData = res.data.rows
                    this.total = res.data.total
                }
            },
            //转换状态
            stauesChange(row, column, cellValue, index){
                var str = ''
                if (cellValue != undefined && cellValue != null) {
                    if(cellValue==="0"){
                        str="不审批"
                    }else if(cellValue === "1"){
                        str = "一级"
                    }else if(cellValue === "2"){
                        str = "二级"
                    }else if(cellValue === "3"){
                        str = "三级"
                    }
                }
                return str
            },
            //转换时间格式
            timeChange(row, column, cellValue, index){
                if(cellValue===null){
                    return this.formatDate(row.sheZhiTime)
                }else{
                    console.log()
                    return this.formatDate(cellValue)
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
            szSpPersonFun(row){
                var sxGuid= row.shenPiGuid
                this.$router.push({ name: "spPersonSz", params: { id: sxGuid } })
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.queryShenPiShiXiangList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.queryShenPiShiXiangList()
            },
        },
        create() {
        },
        mounted() {
            this.queryShenPiShiXiangList()
         },
        destroyed() { },
        watch: {
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height:calc(100vh - 110px);
    }

    /*头部样式*/
    .spLevelSzHeader {
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
    .spLevelSzContent {
        width: calc(100% - 10px);
        height:calc(100% - 90px);
        margin: 5px;
        >div {
            width: 100%;
            height:100%;
            background: #fff;
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
                color: #409eff;
            }
        }
    }
</style>
