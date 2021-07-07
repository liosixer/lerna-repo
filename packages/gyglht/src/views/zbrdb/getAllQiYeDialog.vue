<template>
    <section class="container">
        <el-dialog title="选择共享企业" width="900px"  :append-to-body="true" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <el-form  :model="allQiYeData" label-width="80px" size="small" label-position="right">
              <div class="items">
                <div class="item">
                  <el-form-item label="企业名称:">
                      <el-input placeholder="请输入" v-model="allQiYeData.qiYe_Name"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item label="企业代码:">
                      <el-input placeholder="请输入" v-model="allQiYeData.qiYe_BH"></el-input>
                  </el-form-item>
                </div>
                <div class="item item2">
                  <el-form-item label-width="0px">
                      <el-button type="primary" @click="searchTable" size="small" icon="el-icon-search">查询</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <self-table border :data="allQiYeTableData" height="422px" @selection-change="handleSelectionChange" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                <el-table-column type="index" width="80px" label="序号" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="qiYe_Name" label="企业名称" min-width="150px"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column prop="qiYe_BH" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column type="selection" min-width="55" align="center"></el-table-column>
                <div slot="empty" class="custom-empty"></div>
            </self-table>
            <div class="com-table-pagination clearfix" ref="table_pagination">
                <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows"
                              @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogSureBtn" size="small">确定</el-button>
                <el-button @click="dialogQxBtn" size="small">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import VPagination from "@/components/VPagination";

    export default {
        name: 'allQiYe',
        components: { VPagination },
        data() {
            return {
                allQiYeData:{
                    qiYe_Name:"",
                    qiYe_BH:""
                },
                allQiYeTableData:[],
                total:0,
                searchForm:{
                    qiYe_Name:"",
                    qiYe_BH:"",
                    page:1,
                    rows:10
                },
                multipleSelection:[],
                dialogTableVisible:false
            }
        },
        methods: {
            //查询所有企业
            async getAllQiYe() {
                this.searchForm={
                    qiYe_Name:this.allQiYeData.qiYe_Name,
                    qiYe_BH:this.allQiYeData.qiYe_BH,
                    page: this.searchForm.page,
                    rows: this.searchForm.rows
                }
                const res = await this.portService.getAllQiYe(this.searchForm)
                if (res.data) {
                    this.allQiYeTableData = res.data.rows
                    this.total = res.data.total
                }
            },
            //查询所有企业
            searchTable(){
                this.getAllQiYe()
            },
            handleSizeChange(val) {
                this.searchForm.rows = val
                this.getAllQiYe()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.getAllQiYe()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            dialogSureBtn(){
                this.dialogTableVisible = false
                this.$emit('qyDataFunc', this.multipleSelection);
            },
            dialogQxBtn(){
                this.dialogTableVisible = false
            },
            qyBoolen(){
                this.dialogTableVisible = true
                this.getAllQiYe()
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
