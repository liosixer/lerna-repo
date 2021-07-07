<template>
    <section class="container">
        <div class="global-title" ref="table_title">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
                <div class="search-btnGroud" slot="btns">
                    <el-popover class="search-term"  placement="bottom" width="300" trigger="click" v-model="iscollapsider">
                        <el-form :model="jdrCheckData" label-width="100px" size="small" label-position="right">       
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
                <span class="global-title-name">监督人设置</span>
            </div> -->
        </div>
        <div class="global-content">
            <div class="global-content-search" ref="table_search">
                
            </div>
            <div class="global-content-detail">
                <self-table border :data="jdrTableData" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" :height="tableHeight">
                    <el-table-column type="index" label="序号" show-overflow-tooltip width="80" align="center"></el-table-column>
                    <el-table-column prop="gcName" label="采购项目名称" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="gcBH" label="采购项目编号" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zbRName" label="采购人" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jianDuRenName" label="监督人员" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="primary" plain class="operation-button" size="mini" @click="addSzJdrBtn(scope.row.gcGuid)">
                                    <i class="iconfont icon-ziyuan"><span>设置</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                    <template slot="emptyDis" v-if="$store.state.logoType == 1">
                        <div style="color: #ccc">暂无监督人，功能开发中，敬请期待！</div>
                    </template>
                </self-table>

            </div>
            <div class="com-table-pagination clearfix" ref="table_pagination">
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
    import mixins from "./mixins";
    export default {
        name: 'superviseRsz',
        mixins: [mixins],
        components: { VPagination, superviseRszDialog, PageCrumb},
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
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
                szGuid:"",
                iscollapsider:false
            }
        },
        methods: {
            reset(){
                this.jdrCheckData.gcName= ""
                this.jdrCheckData.gcBH= ""
                this.jdrCheckData.caiGouRen= ""
                this.jdrCheckData.jianduren= ""
            },
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
                this.iscollapsider = !this.iscollapsider;
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
            this.getJianDuXMList()
            this.computeTableHeight()
         },
        destroyed() { },
        watch: {
        },
    }

</script>

<style lang="scss" scoped>

</style>
