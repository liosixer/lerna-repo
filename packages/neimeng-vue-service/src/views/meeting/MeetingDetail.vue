<template>
    <div class="meeting-detail">
        <div class="global-title" ref="table_title">
            <page-crumb :d="{breadcrumbList:breadcrumbList}">
                <div class="search-btnGroud" slot="btns">
                    <el-button size="small" type="text" @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i>返回</el-button>
                    <el-button size="small"  type="text"> <i class="iconfont icon-xiazai"></i>导出</el-button>
                    <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
                        <el-form :model="searchForm" class="global-form-top-line"  label-width="100px" label-position="right" size="small" >
                            <el-form-item label="标段名称" >
                                <el-input v-model="searchForm.bdName" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="会议室名称">
                                <el-input v-model="searchForm.hysName" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="预约时间" >
                                <el-date-picker
                                        style="width:100%"
                                        v-model="searchForm.yyTime"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd HH:mm"
                                        value-format="timestamp">
                                </el-date-picker>
                            </el-form-item>
                            <div class="search-form-footer">
                                <el-button @click.stop="searchClk()" size="small" type="primary" icon="el-icon-search">查询</el-button>
                                <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
                            </div>
                        </el-form>
                        <el-button slot="reference" size="small" type="text">
                            筛选条件<i class="el-icon-arrow-down"></i>
                        </el-button>
                    </el-popover>
                </div>
            </page-crumb>

        </div>
        <div class="global-content">
            <div class="global-content-search" ref="table_search">
            </div>
            <div class="global-content-detail">
                <self-table border :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
                    <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                    <el-table-column prop="hysName" label="会议室名称"></el-table-column>
                    <el-table-column prop="name" label="使用时间">
                        <template slot-scope="scope">
                            {{scope.row.startTime|dateFormater('YYYY-MM-DD HH:mm')}} - {{scope.row.endTime|dateFormater('YYYY-MM-DD HH:mm')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="useUserName" label="使用者"></el-table-column>
                    <el-table-column prop="bdBH" label="标段编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bdName" label="标段名称" show-overflow-tooltip></el-table-column>
                    <div slot="empty" class="custom-empty"></div>
                </self-table>
            </div>
            <div class="com-table-pagination clearfix" ref="table_pagination">
                <v-pagination
                        :total="total"
                        :page="searchForm.page"
                        :limit="searchForm.rows"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                ></v-pagination>
            </div>
        </div>
    </div>

</template>
<script>
    import PageCrumb from "@/components/PageCrumb";
    import VPagination from "@/components/VPagination";
    import moment from 'moment';
    import mixins from './mixins'

    export default {
        mixins: [mixins],
        components: {PageCrumb, VPagination},
        data() {
            return {
                breadcrumbList: [
                    {label: '工作台', link: '/dashboard'},
                    {label: '会议预约情况', link: '/meeting/list'},
                    {label: '查看', link: ''}
                ],
                searchForm: {
                    bdName: '',
                    hysName: '',
                    yyTime: [],
                    page: 1,
                    rows: 10,
                },
                total: 0,
                loading: false,
                tableData: [],
                options: [],
                iscollapsider:false,
            }
        },
        computed: {
            date() {
                return this.$route.query.date
            },
            isDuZhan() {
                return this.$route.query.isDuZhan
            }
        },
        created() {
            this.searchForm.yyTime[0] = moment(this.date + ' 00:00').valueOf()
            this.searchForm.yyTime[1] = moment(this.date + ' 23:59').valueOf()

            this.getList()
            this.computeTableHeight()
        },
        mounted() {
        },
        methods: {
            reset(){
                this.searchForm.bdName= ''
                this.searchForm.hysName= ''
                // this.searchForm.yyTime= []
            },
            async getList() {
                this.loading = true
                let startTime = '', endTime = ''
                if (this.searchForm.yyTime && this.searchForm.yyTime.length > 0) {
                    startTime = this.searchForm.yyTime[0]
                    endTime = this.searchForm.yyTime[1]
                }
                const param = {
                    page: this.searchForm.page,
                    rows: this.searchForm.rows,
                    bdName: this.searchForm.bdName,
                    hysName: this.searchForm.hysName,
                    startTime: startTime,
                    endTime: endTime,
                    isDuZhan: this.isDuZhan
                }
                const res = await this.portService.meetingDetailList(param)
                if (res && res.data) {
                    this.loading = false
                    let firList = res.data.rows
                    let lastList = []
                    firList.forEach((item1, index) => {
                        // lastList.push(item1)
                        if (item1.hysYuYueList.length > 0) {
                            item1.hysYuYueList.forEach((item2, index2) => {
                                lastList.push(
                                    {
                                        hysName: item1.hysName,
                                        startTime: item2.startTime,
                                        endTime: item2.endTime,
                                        useUserName: item2.useUserName,
                                        bdBH: item2.bdBH,
                                        bdName: item2.bdName,
                                    }
                                )
                            })
                        }
                    })
                    this.tableData = lastList
                    this.total = res.data.total
                }
            },
            searchClk() {
                console.log(this.searchForm.yyTime)
                this.getList()
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.getList()
            },
            yes() {
                this.iscollapsider = !this.iscollapsider;
                setTimeout( ()=> {
                    this.computeTableHeight()
                },600)
            }
        },
    };
</script>
<style lang="scss">
    .meeting-detail {
        .el-date-editor .el-range-separator {
            width: 6%;
        }

        .el-date-editor--datetimerange {
            width: 450px;
        }
    }
</style>
