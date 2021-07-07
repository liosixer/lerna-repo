<template>
    <section class="container">
        <div class="global-title" ref="table_title">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
                <div class="search-btnGroud" slot="btns">
                    <el-popover class="search-term" placement="bottom" width="300" trigger="click"
                                v-model="iscollapsider">
                        <el-form :model="searchForm" class="global-form-top-line" label-width="100px" size="small"
                                 label-position="right">
                            <el-form-item label="审批事项名称:">
                                <el-input placeholder="请输入" v-model="searchForm.shiXiangName"></el-input>
                            </el-form-item>
                            <el-form-item label="审批级别:">
                                <el-select v-model="searchForm.shenPiJiBie" placeholder="请选择">
                                    <el-option v-for="item in levelOptions" :key="item.code" :label="item.name"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="search-form-footer">
                                <el-button type="primary" size="small" @click="queryShenPiShiXiangList"
                                           icon="el-icon-search">查询
                                </el-button>
                                <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置
                                </el-button>
                            </div>
                        </el-form>
                        <el-button slot="reference" size="small" type="text"> 筛选条件<i class="el-icon-arrow-down"></i>
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
                    <el-table-column prop="shiXiangName" label="审批事项名称" min-width="150px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="shenPiJiBie" label="审批级别" min-width="150px" show-overflow-tooltip
                                     :formatter="stauesChange"></el-table-column>
                    <el-table-column prop="freeLiuZhuanShenPi" label="自由流转审批" min-width="120px">
                        <template slot-scope="scope">{{scope.row.freeLiuZhuanShenPi==1?'是':'否'}}</template>
                    </el-table-column>
                    <el-table-column prop="modifyTime" label="设置时间" min-width="150px" show-overflow-tooltip
                                     :formatter="timeChange"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="120" align="left">
                        <template slot-scope="scope">
                            <el-button-group class="operation-button-group">
                                <el-button type="primary" plain class="operation-button" size="mini"
                                           @click="szSpPersonFun(scope.row)">
                                    <i class="iconfont icon-ziyuan"><span>设置审批人员</span></i>
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
        name: "splevelsz",
        mixins: [mixins],
        components: {VPagination, PageCrumb},
        data() {
            return {
                breadcrumbList: [{label: "审批级别设置", link: ""}],
                zzxxData: [],
                total: 0,
                searchForm: {
                    page: 1,
                    rows: 10,
                    shiXiangName: '',
                    shenPiJiBie: ''
                },
                iscollapsider: false,
                levelOptions: [
                    {code: '0', name: '不审批'},
                    {code: '1', name: '一级'},
                    {code: '2', name: '二级'},
                    {code: '3', name: '三级'},
                    {code: '4', name: '四级'},
                    {code: '5', name: '五级'}
                ]
            };
        },
        methods: {
            //查询主表格
            async queryShenPiShiXiangList() {
                this.searchForm = {
                    page: this.searchForm.page,
                    rows: this.searchForm.rows,
                    shiXiangName: this.searchForm.shiXiangName,
                    shenPiJiBie: this.searchForm.shenPiJiBie,
                };
                this.iscollapsider = false
                const res = await this.portService.queryShenPiShiXiangList(this.searchForm);
                if (res.data) {
                    this.zzxxData = res.data.rows;
                    this.total = res.data.total;
                }
            },
            //转换状态
            stauesChange(row, column, cellValue, index) {
                var str = "";
                if (cellValue != undefined && cellValue != null) {
                    if (cellValue === "0") {
                        str = "不审批";
                    } else if (cellValue === "1") {
                        str = "一级";
                    } else if (cellValue === "2") {
                        str = "二级";
                    } else if (cellValue === "3") {
                        str = "三级";
                    } else if (cellValue === "4") {
                        str = "四级";
                    } else if (cellValue === "5") {
                        str = "五级";
                    }
                }
                return str;
            },
            //转换时间格式
            timeChange(row, column, cellValue, index) {
                if (cellValue === null) {
                    return this.formatDate(row.sheZhiTime);
                } else {
                    console.log();
                    return this.formatDate(cellValue);
                }
            },
            //时间戳转时间
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? "0" + MM : MM;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let m = date.getMinutes();
                m = m < 10 ? "0" + m : m;
                let s = date.getSeconds();
                s = s < 10 ? "0" + s : s;
                return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
            },
            szSpPersonFun(row) {
                var sxGuid = row.shenPiGuid;
                this.$router.push({name: "spPersonSz", params: {id: sxGuid, shiXiangCode: row.shiXiangCode}});
            },
            handleSizeChange(val) {
                this.searchForm.rows = val;
                this.queryShenPiShiXiangList();
            },
            handleCurrentChange(val) {
                this.searchForm.page = val;
                this.queryShenPiShiXiangList();
            },
            reset() {
                this.searchForm.page = 1
                this.searchForm.rows = 10
                this.searchForm.shiXiangName = ''
                this.searchForm.shenPiJiBie = ''
            }
        },
        create() {
        },
        mounted() {
            this.queryShenPiShiXiangList();
            this.computeTableHeight();
        },
        destroyed() {
        },
        watch: {},
    };
</script>

<style lang="scss" scoped>
    .zzxxDiv {
        margin-bottom: 30px; /*no*/
    }
</style>
