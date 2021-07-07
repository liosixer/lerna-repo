<template>
    <section class="container">
        <div class="global-title" ref="table_title">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
                <div class="search-btnGroud" slot="btns">
                    <el-button type="text" size="small" @click="addSzJdrBtn"><i class="iconfont icon-xinzeng"></i> 添加</el-button>
                    <el-popover class="search-term"  placement="bottom" width="480" trigger="click" v-model="iscollapsider">
                        <el-form :model="jddwCheckData" label-width="100px" size="small" label-position="right" class="global-form-top-line">
                            <el-form-item label="企业名称:">
                                <el-input placeholder="请输入" v-model="jddwCheckData.qiyeName"></el-input>
                            </el-form-item>
                            <el-form-item label="企业代码:">
                                <el-input placeholder="请输入" v-model="jddwCheckData.qiyeBH"></el-input>
                            </el-form-item>
                            <el-form-item label="设置时间:">
                                <el-date-picker
                                    v-model="jddwCheckData.creatorTime"
                                    style="width:100%;"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                                <el-form-item label="设置人:">
                                    <el-input placeholder="请输入" v-model="jddwCheckData.creatorName"></el-input>
                                </el-form-item>
                            <div class="search-form-footer">
                                <el-button type="primary" size="small" @click="searchTable" icon="el-icon-search">查询</el-button>
                                <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
                            </div>
                        </el-form>
                        <el-button slot="reference" size="small" type="text">
                            筛选条件<i class="el-icon-arrow-down"></i>
                        </el-button>
                    </el-popover>
                </div>
            </PageCrumb>
            <!-- <div class="global-title-box">
                <span class="global-title-name">监督单位设置</span>
            </div> -->
        </div>
        <div class="global-content">
            <div class="global-content-search" ref="table_search">
                
            </div>
            <div class="global-content-detail">
                <self-table border :data="jddwTableData" header-cell-class-name="headercell" style="width:100%;margin:0;" :height="tableHeight" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip align="center" width="80"></el-table-column>
                    <el-table-column prop="qyName" label="企业名称" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qyBH" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createrTime" label="设置时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
<!--                    <el-table-column prop="createrName" label="设置人" min-width="150px" show-overflow-tooltip></el-table-column>-->
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="info" plain class="operation-button" size="mini" @click="deletJdDw(scope.row.guid)">
                                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                    <template slot="emptyDis" v-if="$store.state.logoType == 1">
                        <div style="color: #ccc">您当前无上级监督单位，点击右侧“<span style="color: blue">添加</span>”按钮进行添加</div>
                        <div style="color: #ccc">此处添加上级监督单位后，对应的单位可以查看</div>
                        <div style="color: #ccc">您的招投所有标项目并进行监督</div>
                    </template>
                </self-table>
            </div>
            <div class="com-table-pagination clearfix" ref="table_pagination">
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
    import mixins from "./mixins";
    export default {
        name: 'superviseDwsz',
        mixins: [mixins],
        components: { VPagination, superviseDwszDialog , PageCrumb},
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
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
                jarSzArr:[],
                iscollapsider:false,
            }
        },
        methods: {
            reset(){
                this.jddwCheckData.qiyeName= ""
                this.jddwCheckData.qiyeBH= ""
                this.jddwCheckData.creatorTime= []
                this.jddwCheckData.creatorName= ""
            },
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
                this.iscollapsider = !this.iscollapsider;
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
            },
            yes() {
                this.iscollapsider = !this.iscollapsider;
                setTimeout( ()=> {
                    this.computeTableHeight()
                },600)
            }
        },
        create() {

        },
        mounted() {
            this.queryJdList()
            this.computeTableHeight()
        },
        destroyed() { },
        watch: {
        },
    }
</script>

<style lang="scss" scoped>
::v-deep.el-range-editor--small .el-range-separator {
    width: 10%!important;
}
</style>
