<template>
    <section class="container">
        <el-dialog title="选择个人用户" :visible.sync="dialogTableVisible" :close-on-click-modal="false" append-to-body
                   width="1000px">
            <el-form label-width="100px" :model="userForm" label-position="right" size="small">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="姓名:">
                            <el-input placeholder="请输入" v-model="userForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="身份证号:">
                            <el-input placeholder="请输入" v-model="userForm.idNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button style="margin-left: 20px" type="primary" @click="searchTable" size="mini" icon="el-icon-search">查询
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <self-table border :data="userTable" height="422px" header-cell-class-name="headercell"
                        style="width:100%;margin:0;" :fit="true">
                <el-table-column type="index" label="序号" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="user_Name" label="姓名" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="user_BH" label="身份证号" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="100" align="left">
                    <template slot-scope="scope">
                        <el-button-group class="operation-button-group">
                            <el-button type="primary" plain class="operation-button" size="mini"
                                       @click="checkZbrFunc(scope.row)">
                                <i class="iconfont icon-xuanze-"><span>选择</span></i>
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
                <div slot="empty" class="custom-empty"></div>
            </self-table>
            <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows"
                          @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
        </el-dialog>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";

    export default {
        name: 'allZBR',
        components: {VPagination},
        data() {
            return {
                userForm: {
                    zbrName: "",
                    zbrBh: ""
                },
                userTable: [],
                total: 0,
                searchForm: {
                    zbrName: "",
                    zbrBh: "",
                    page: 1,
                    rows: 10
                },
                dialogTableVisible: false
            }
        },
        methods: {
            //查询所属单位
            async getAllZBR() {
                this.searchForm = {
                    userName: this.userForm.userName,
                    idNo: this.userForm.idNo,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows
                }

                const res = await this.portService.getAllUser(this.searchForm)
                if (res.data) {
                    this.userTable = res.data.rows
                    this.total = res.data.total
                }
            },
            //查询所有个人
            searchTable() {
                this.getAllZBR()
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.getAllZBR()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.getAllZBR()
            },
            qyBoolen() {
                this.dialogTableVisible = true
                this.getAllZBR()
            },
            checkZbrFunc(row) {
                this.$emit('emitUser', row);
                this.dialogTableVisible = false
            }
        },
        create() {
        },
        mounted() {
        },
        destroyed() {
        },
        watch: {},
    }

</script>
