<template>
    <el-dialog
        title="选择角色"
        :visible.sync="distributionUser"
        width="60%"
        append-to-body
        :before-close="handleClose">
        <div>
            <el-form :model="form" label-width="80px" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="角色名称">
                            <el-input v-model="form.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="角色编号">
                            <el-input v-model="form.code" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :push="2">
                        <el-button  size="small" type="primary">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                    <el-table-column type="index" label="序号" width="55"></el-table-column>
                    <el-table-column label="角色名称">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="角色编号"></el-table-column>
                    <el-table-column type="selection" width="55"></el-table-column>
            </el-table>
        </div>
        <div class="com-table-pagination clearfix" ref="table_pagination">
				<v-pagination
					:total="total"
					:page="form.page"
					:limit="form.rows"
                    :page-sizes="[5, 10, 30, 40]"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				></v-pagination>
			</div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary" @click="handleClose">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import PageCrumb from "@/components/PageCrumb";

    export default {
        props: {
            distributionUser: {
                type: Boolean,
                default: false
            },
            distributionIdUser: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                tableData: [],
                form: {
                    name: '',
                    code: '',
                    page: 1,
                    rows: 5
                },
                total: 0
            }
        },
        components: {
            PageCrumb
        },
        watch: {
            'distributionIdUser': function(val) {
                if (val) {
                    console.log('kkkk');
                }
            }
        },
        methods: {
            handleSelectionChange(val) {
                console.log(val);
            },
            handleClose() {
                this.$parent.distributionUserShow = false;
            },
            handleSizeChange(val) {
                this.form.rows = val;
            },
            handleCurrentChange(val) {
                this.form.page = val;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>