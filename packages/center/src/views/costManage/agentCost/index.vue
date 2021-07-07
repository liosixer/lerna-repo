<template>
    <div class="container table-flex">
        <div class="procurement-plan-title global-title" ref="table_title">
        <!-- <ContentHeader title="代理服务费设置"></ContentHeader> -->
        <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <!-- <div class="global-content">
            
            <div class="global-content-search global-form-top-line"> -->
            <div class="search-btnGroud" slot="btns">
                <el-button
                    @click="handleAdd"
                    type="text"
                    size="small"
                ><i class="iconfont icon-xinzeng"></i>添加</el-button>
                <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
                <cost-header @on-search="handleSearch"></cost-header>
                <el-button slot="reference" size="small" type="text">
                    筛选条件<i class="el-icon-arrow-down"></i>
                    </el-button>
                </el-popover>
                </div>
            </page-crumb>
            </div>

            <!-- <div class="global-content-search global-clear-fr">
                <el-button
                    class="fr"
                    @click="handleAdd"
                    type="primary"
                    size="small"
                >添加</el-button>
            </div> -->
            <div class="global-content">
                <div class="global-content-search clearfix" ref="table_search">
                </div>
                <div class="global-content-detail">
                    <cost-table 
                        @on-handleDel="handleDel"
                        @on-handleEdit="handleEdit"
                        :tableData="tableData"
                        :loading="loading"></cost-table>
                </div>
            
            <div class="com-table-pagination clearfix">
                <VPagination
                    :total="total"
                    :page="searchFrom.page"
                    :limit="searchFrom.rows"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"></VPagination>
            </div>
        </div>
    </div>
</template>

<script>
import costHeader from '../templates/cost-header'
import PageCrumb from "@/components/PageCrumb";
import costTable from '../templates/cost-table'
// import ContentHeader from "@/components/contentHeader/ContentHeader";
import mixin from '../templates/mixin'

export default {
    name: 'agentCost',
    components: {
        costHeader,
        PageCrumb,
        costTable,
        // ContentHeader
    },
    mixins: [mixin],
    data(){
        return {
            searchFrom: {
                page: 1,
                rows: 10
            },
            tableData: [],
            loading: false,
            breadcrumbList: [
                { label: "费用管理 ", link: "" },
                { label: "代理服务费设置", link: "" }
            ],
            iscollapsider:false
        }
    },
    created() {
        this.searchList();
    },
    methods: {
        /**
         * 查询表格数据
         */
        async searchList() {
            this.loading = true;
            const { code, data, total } = await this.portService.costQueryDaiLi(this.searchFrom);
            this.loading = false;
            if (code) {
                this.tableData = data.list;
                if (total) {
                    this.total = total;
                } else {
                    this.total = data.totalCount
                }
            }
        },
        /**
         * 表格数据-删除
         */
        async costDelete(row) {
            const data = await this.portService.costDelete({ guid: row.guid });

            if (data.code) {
                this.searchList();
                this.$message({ type: 'success', message: data.info });
            } else {
                this.$message({ type: 'error', message: data.info });
            }
        },
        /**
         * 查询 表头查询
         */
        handleSearch(data) {
            this.iscollapsider= false
            this.searchFrom = Object.assign({}, this.searchFrom, data);
            this.searchList();
        },
        /**
         * 表格 删除按钮被点击
         * @param {Object} row 表格的当前条数据
         */
        handleDel(row) {
            
            this.$confirm('此操作将永久删除该服务代理费, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.costDelete(row);
            })
            .catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },
        /**
         * 添加 代理服务费
         */
        handleAdd() {
            this.$router.push({ 
                name: "agentAdd", 
                query: { 
                    type: 1
                } 
            })
        },
        /**
         * 表格 编辑按钮被点击
         * @param {Object} row 表格的当前条数据
         */
        handleEdit(row) {
            this.$router.push({ 
                name: "agentDetails", 
                query: { 
                    type: 1,
                    guid: row.guid 
                } 
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
