<template>
    <section class="container">
        <el-dialog title="选择所属单位" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <el-form label-width="100" :model="allQiYeData" label-position="right" size="small">
              <div class="items">
                <div class="item">
                  <el-form-item label="企业名称:">
                      <el-input placeholder="请输入" v-model="allQiYeData.zbrName"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item label="企业代码:">
                      <el-input placeholder="请输入" v-model="allQiYeData.zbrBh"></el-input>
                  </el-form-item>
                </div>
                <div class="item item2">
                  <el-form-item>
                      <el-button type="primary" @click="searchTable" size="small" icon="el-icon-search">查询</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <self-table border :data="allQiYeTableData" height="422px" header-cell-class-name="headercell"
                style="width:100%;margin:0;" :fit="true">
                <el-table-column type="index" label="序号" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="qiYe_Name" label="企业名称" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qiYe_BH" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="100" align="left">
                    <template slot-scope="scope">
                        <el-button-group class="operation-button-group">
                            <el-button type="primary" plain class="operation-button" size="mini" @click="checkZbrFunc(scope.row)">
                                <i class="iconfont icon-xuanze-"><span>选择</span></i>
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
                <div slot="empty" class="custom-empty"></div>
            </self-table>
            <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
        </el-dialog>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";

    export default {
        name: 'allZBR',
        components: { VPagination },
        data() {
            return {
                allQiYeData: {
                    zbrName: "",
                    zbrBh: ""
                },
                allQiYeTableData: [],
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
                    zbrName: this.allQiYeData.zbrName,
                    zbrBh: this.allQiYeData.zbrBh,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows
                }

                const res = await this.portService.getAllZBR(this.searchForm)
                if (res.data) {
                    this.allQiYeTableData = res.data.rows
                    this.total = res.data.total
                }
            },
            //查询所有企业
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
            checkZbrFunc(row){
                this.$emit('zbrDataFunc',row);
                this.dialogTableVisible = false
            }
        },
        create() {
        },
        mounted() {
        },
        destroyed() { },
        watch: {

        },
    }

</script>

<style lang="scss" scoped>
.items{
  display: flex;
}
.item{
  box-sizing: border-box;
  padding: 0 20px;
  width: 350px;
}
.item2 {
  width: 100px
}
</style>
