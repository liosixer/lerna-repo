<template>
    <el-dialog title="板块单位制度" :visible.sync="dialogVisible" width="1200px" append-to-body>
        <el-form ref="form" :model="searchForm" label-width="120px" size="small">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="单位名称" prop="qiyeName">
                        <el-input v-model="searchForm.qiyeName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位制度" prop="type">
                        <el-radio-group v-model="searchForm.type">
                            <el-radio :label="1" @change="changeType">上级单位制度</el-radio>
                            <el-radio :label="2" @change="changeType">下级单位制度</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div class="clearfix">
                    <div>
                        <el-button @click.stop="search()" type="primary" size="small" icon="el-icon-search">查询</el-button>
                        <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
                    </div>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <self-table :data="tableData" border stripe style="width: 100%;" v-loading="tbLoading">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="qiyeName" label="单位名称" min-width="160"></el-table-column>
            <el-table-column prop="gczbLimit" label="工程限额（万）" min-width="160"></el-table-column>
            <el-table-column prop="wzzbLimit" label="物资限额（万）" min-width="160"></el-table-column>
            <el-table-column prop="fwzbLimit" label="服务限额（万）" min-width="160"></el-table-column>
            <el-table-column prop="id" label="操作" min-width="120">
                <template slot-scope="scope">
                    <a @click="download(scope.row.cgzdAttachmentGuid)" class="downloadA">下载制度</a>
                </template>
            </el-table-column>
            <div slot="empty" class="custom-empty"></div>
        </self-table>
        <div class="com-table-pagination clearfix">
            <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
        </div>
    </el-dialog>
</template>
<script>
    import util from "../../utils/util";
    import VPagination from "@/components/VPagination";
    export default {
        name: "ShHis",
        inject: ['globalSetting'],
        components:{VPagination},
        data() {
            return {
                dialogVisible: false,
                tbLoading: false,
                tableData: [],
                searchForm:{
                    page:1,
                    rows:10,
                    type:1,
                    qiyeName:""
                },
                total:0
            }
        },
        created() {
        },
        methods: {
            openDialog() {
                this.dialogVisible = true
                this.getTable()
            },
            //获取表格信息
            async getTable() {
                const res = await this.portService.systemList(this.searchForm)
                if (res && res.code == 1) {
                    this.tableData = res.data.rows;
                    this.total = res.data.total;
                }
            },
            handleSizeChange(val){
                this.searchForm.rows = val;
                this.getTable();
            },
            handleCurrentChange(val){
                this.searchForm.page = val;
                this.getTable();
            },
            search(){
                this.getTable()
            },
            reset(){
                this.$refs['form'].resetFields();
            },
            download(guid){
                util.getDownSrc(guid).then(res=>{
                    window.location.href = res;
                })
            },
            changeType(){
                this.getTable()
            }
        },

    }
</script>
