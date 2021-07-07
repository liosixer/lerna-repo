<!--采购制度管理-->
<template>
    <div class="notice-page page-detail">
        <div class="global-title">
            <page-crumb :d="{breadcrumbList:breadcrumbList}">
                <div slot="btns">
                    <el-button type="text" size="small" @click="toDetail"><i class="iconfont icon-xinzeng"></i> 添加</el-button>
                </div>
            </page-crumb>
        </div>
        <div class="global-content">
            <el-card>      
                <div class="global-card-content">
                    <self-table border :data="tableData" header-cell-class-name="headercell"
                                style="width:100%;margin:0;" :height="tableHeight" :fit="true">
                        <el-table-column type="index" label="序号" show-overflow-tooltip align="center"
                                    width="80"></el-table-column>
                        <el-table-column prop="gczbLimit" label="工程招标限额（万元）" min-width="120"></el-table-column>
                        <el-table-column prop="wzzbLimit" label="物资招标限额（万元）" min-width="120"></el-table-column>
                        <el-table-column prop="fwzbLimit" label="服务招标限额（万元）" min-width="120"></el-table-column>
                        <el-table-column prop="content" label="备注" min-width="120"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间" min-width="120">
                            <template slot-scope="scope">
                                <span >{{scope.row.createTime | dateFormater("YYYY-MM-DD HH:mm")}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="审核状态" min-width="120">
                            <template slot-scope="scope">
                                <span >{{scope.row.status | status}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="150" align="left">
                            <template slot-scope="scope">
                                <el-button-group class="operation-button-group">
                                    <el-button
                                        @click="toDetail(scope.row.guid)"
                                        type="primary" plain class="operation-button"
                                        size="small"
                                    ><i class="iconfont icon-bianji2"><span>查看详情</span></i></el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>
                    </self-table>
                </div>
                <div class="com-table-pagination clearfix" ref="table_pagination">
                    <v-pagination
                    :total="total"
                    :page="searchFormList.pageNo"
                    :limit="searchFormList.pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    ></v-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import PageCrumb from "@/components/PageCrumb";
    import VPagination from "@/components/VPagination";
    import mixins from "@/mixins/mixins";
    

    export default {
        name: "SysManage",
        mixins: [mixins],
        components: {PageCrumb,VPagination},
        filters: {
            status(value){
                let statusList = {
                    0:'待提交',
                    1:'已提交待审批',
                    2:'通过',
                    3:'驳回'
                }
                return statusList[value]
            }
        },
        mounted() {
            this.computeTableHeight();
        },
        data() {
            return {
                breadcrumbList: [
                    {label: '采购制度管理', link: ''}
                ],
                loading: false,
                total: 0,
                searchFormList:{
                    pageNo:1,
                    pageSize:10
                },
                tableData: []
            }
        },
        methods:{
            async getManageList(){
                const res = await this.portService.purchaseInstitutionList({
                    ...this.searchFormList
                })
                if (res && res.code == 1) {
                    this.loading = false
                    this.tableData = res.data.rows
                    this.total = res.data.total
                }
            },
             // 分页大小改变
            handleSizeChange(val) {
                this.searchFormList.pageSize = val
                this.getManageList()
            },
            // 页码改变
            handleCurrentChange(val) {
                this.searchFormList.pageNo = val
                this.getManageList()
            },
            toDetail(val){
                let route = {name:'sysManage'}
                if(typeof(val) == 'string'){
                    route.query = {id:val}
                }
                this.$router.push(route)
            }
        },
        created() {
            this.getManageList()
        }
    }
</script>

<style scoped>
.scanBtn:hover{
    color:#157EDF;
    cursor: pointer;
    text-decoration: underline;
}

</style>