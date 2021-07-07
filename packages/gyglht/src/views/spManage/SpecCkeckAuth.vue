<template>
    <section class="container">
        <div class="global-title" ref="table_title">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
                <div class="search-btnGroud" slot="btns">
                    <!-- <el-button type="primary" size="small" @click="allSetAuth(1)"><i class=""></i> 统一设置为有</el-button>
                    <el-button type="primary" size="small" @click="allSetAuth(0)"><i class=""></i> 统一设置为无</el-button> -->
                    <el-popover class="search-term" placement="bottom" width="300" trigger="click"
                                v-model="iscollapsider">
                        <el-form :model="searchForm" label-width="100px" size="small" label-position="right">
                            <el-form-item label="企业名称:">
                                <el-input placeholder="请输入" v-model="searchForm.qiYe_Name"></el-input>
                            </el-form-item>
                            <el-form-item label="企业编号:">
                                <el-input placeholder="请输入" v-model="searchForm.qiYe_BH"></el-input>
                            </el-form-item>
                            <el-form-item label="权限状态:">
                                <el-input placeholder="请输入"
                                          v-model="searchForm.zhuanYeChuShenQuanXian_status"></el-input>
                            </el-form-item>
                            <div class="search-form-footer">
                                <el-button type="primary" size="small" @click="searchTable" icon="el-icon-search">查询
                                </el-button>
                                <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置
                                </el-button>
                            </div>
                        </el-form>
                        <el-button slot="reference" size="small" type="text">
                            筛选条件<i class="el-icon-arrow-down"></i>
                        </el-button>
                    </el-popover>
                </div>
            </PageCrumb>
        </div>
        <div class="spLevelSzContent global-content">
            <div style="padding:10px;" ref="table_search"></div>
            <div class="global-content-detail">
                <self-table border :data="zzxxData" header-cell-class-name="headercell" style="width:100%;margin:0;"
                            :fit="true" :height="tableHeight">
                    <el-table-column type="index" label="序号" show-overflow-tooltip width="80"
                                     align="center"></el-table-column>
                    <el-table-column prop="qiYe_Name" label="企业名称" min-width="150px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qiYe_BH" label="企业代码" min-width="150px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="auth_status_name" label="专业初审权限" min-width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.zhuanYeChuShenQuanXianStatus == 0 || scope.row.zhuanYeChuShenQuanXianStatus == null">无</span>
                            <span v-else-if="scope.row.zhuanYeChuShenQuanXianStatus == 1">有</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="120" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button v-if="scope.row.zhuanYeChuShenQuanXianStatus == 1" type="primary" plain
                                           class="operation-button" size="mini"
                                           @click="setAuth(scope.row.userQiYe_Guid,0,'zhuanyechushen')">
                                    <i class="iconfont icon-ziyuan"><span>设置为无</span></i>
                                </el-button>
                                <el-button v-else type="primary" plain class="operation-button" size="mini"
                                           @click="setAuth(scope.row.userQiYe_Guid,1,'zhuanyechushen')">
                                    <i class="iconfont icon-ziyuan"><span>设置为有</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auth_status_name" label="专业终审权限" min-width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.zhuanYeZhongShenQuanXianStatus == 0 || scope.row.zhuanYeZhongShenQuanXianStatus == null">无</span>
                            <span v-else-if="scope.row.zhuanYeZhongShenQuanXianStatus == 1">有</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="120" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button v-if="scope.row.zhuanYeZhongShenQuanXianStatus == 1" type="primary" plain
                                           class="operation-button" size="mini"
                                           @click="setAuth(scope.row.userQiYe_Guid,0,'zhuanyezhongshen')">
                                    <i class="iconfont icon-ziyuan"><span>设置为无</span></i>
                                </el-button>
                                <el-button v-else type="primary" plain class="operation-button" size="mini"
                                           @click="setAuth(scope.row.userQiYe_Guid,1,'zhuanyezhongshen')">
                                    <i class="iconfont icon-ziyuan"><span>设置为有</span></i>
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="custom-empty"></div>
                </self-table>
            </div>
            <div class="com-table-pagination clearfix" ref="table_pagination">
                <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows"
                              @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            </div>
        </div>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";
    import PageCrumb from "@/components/PageCrumb";
    import mixins from "./mixins";

    export default {
        name: "speccheckauth",
        mixins: [mixins],
        components: {VPagination, PageCrumb},
        data() {
            return {
                breadcrumbList: [{label: "专业审核权限", link: ""}],
                zzxxData: [],
                total: 0,
                searchForm: {
                    page: 1,
                    rows: 10,
                },
                iscollapsider: false
            };
        },
        created() {
            this.queryShenPiShiXiangList();
            this.computeTableHeight();
        },
        methods: {
            //查询主表格
            async queryShenPiShiXiangList() {
                this.searchForm = {
                    qiYe_Name: this.searchForm.qiYe_Name,
                    qiYe_BH: this.searchForm.qiYe_BH,
                    zhuanYeChuShenQuanXian_status: this.searchForm.zhuanYeChuShenQuanXian_status,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows,
                };
                const res = await this.portService.querySpecCheckAuthList(this.searchForm);
                if (res.data) {
                    this.zzxxData = res.data.rows;
                    this.total = res.data.total;
                }
            },
            searchTable() {
                this.queryShenPiShiXiangList()
            },
            async setAuth(id, type,shenheType) {
                let mes;
                let til;
                if(shenheType == 'zhuanyechushen'){
                    til = "专业初审权限设置"
                    if(type == 0){
                        mes = '请您确认是否将专业初审权限设置为无！'
                    }else if(type == 1){
                        mes = '请您确认是否将专业初审权限设置为有！'
                    }
                }else if(shenheType == 'zhuanyezhongshen'){
                    til = "专业终审权限设置"
                    if(type == 0){
                        mes = '请您确认是否将专业终审权限设置为有！'
                    }else if(type == 1){
                        mes = '请您确认是否将专业终审权限设置为有！'
                    }
                }
                this.$confirm(
                    mes,
                    til,
                    {
                        confirmButtonText: "确 定",
                        cancelButtonText: "取 消",
                        type: "warning",
                    }
                ).then(async () => {
                    const res = await this.portService.SpecCheckAuthSetOne({userQiyeGuid: id, status: type,type:shenheType});
                    if (res && res.code == 1) {
                        this.queryShenPiShiXiangList()
                        this.$message.success(res.info)
                    }
                })
            },
            handleSizeChange(val) {
                this.searchForm.rows = val;
                this.queryShenPiShiXiangList();
            },
            handleCurrentChange(val) {
                this.searchForm.page = val;
                this.queryShenPiShiXiangList();
            },
            async allSetAuth(type) {
                const res = await this.portService.SpecCheckAuthSetAll({status: type});
                if (res && res.code == 1) {
                    this.queryShenPiShiXiangList()
                    this.$message.success(res.info)
                }
            },
            reset() {
                this.searchForm.qiYe_Name = ''
                this.searchForm.qiYe_BH = ''
                this.searchForm.zhuanYeChuShenQuanXian_status = ''
            }
        },

    };
</script>

<style lang="scss" scoped>
    .zzxxDiv {
        margin-bottom: 30px; /*no*/
    }
</style>
