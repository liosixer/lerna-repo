
<template>
  <div class="procurement-plan">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
    <!-- </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search"> -->
        <div class="search-btnGroud" slot="btns">
          <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
          <el-form ref="searchForm" :model="params" label-width="100px" size="small" label-position="right">
                <el-form-item label="一级专业" prop="level1">
                    <el-input v-model="params.level1" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="二级专业"  prop="level2">
                    <el-input v-model="params.level2"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="三级专业"  prop="level3">
                    <el-input v-model="params.level3"  placeholder="请输入"></el-input>
                </el-form-item>
                  <div class="search-form-footer">
                      <el-button @click.stop="handleSerach" size="small" type="primary" icon="el-icon-search">查询</el-button>
                      <el-button @click.stop="handleReset" size="small" icon="el-icon-refresh-right">重置</el-button>
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
        <div class="global-content-search clearfix" ref="table_search">
        </div>
        <div class="global-content-detail">
          <self-table border :data="tableData" :fit="true" ref="table" :height="tableHeight" v-loading="serachFlag">
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="level1" label="协同目录一级专业" show-overflow-tooltip></el-table-column>
              <el-table-column prop="level2" label="协同目录二级专业"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="level3" label="协同目录三级专业" show-overflow-tooltip></el-table-column>
              <el-table-column prop="gysCounts" label="协同供应商数量"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="modefyTime" sortable min-width="150px" label="修改时间"  show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.modefyTime | timestampChange}}
                </template>
              </el-table-column>
              <el-table-column prop="shenPiJiBie" label="操作" min-width="120" align="left" fixed="right" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button-group class="operation-button-group">
                    <el-button type="primary" plain class="operation-button" @click="handleCheck(scope.row.infoGuid)">
                      <i class="iconfont icon-xiangmuguanli"><span>设置供应商</span></i>
                    </el-button>
                   
                  </el-button-group>
                </template>
              </el-table-column>
          </self-table>
          <div class="com-table-pagination clearfix" ref="table_pagination">
              <v-pagination
                  :total="total"
                  :page="params.pageNo"
                  :limit="params.pageSize"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
              ></v-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import PageCrumb from "@/components/PageCrumb";
    import ContentHeader from "@/components/contentHeader/ContentHeader";
    import Tree from '@/components/tree/Tree'
  
    import Mixin from '../mixin'
    export default {
        name: "enterpriseInfoCheckList",
        mixins: [Mixin],
        components: {
            PageCrumb,
            ContentHeader,
            Tree
        },
        data () {
            return {
                total: 0,
                breadcrumbList: [
                    { label: "系统配置", link: "" },
                    { label: "协同供应商管理", link: "" }
                ],
                tableData: [],
                supplierList:[],
                serachFlag: false,
                params: {
                  level1:'',
                  level2:'',
                  level3:'',
                  pageSize: 10,
                  pageNo: 1
                },
                iscollapsider: false,
            }
        },
        created() {
          this.getData()
        },
        mounted () {
          this.computeTableHeight()
        },
        methods: {
          getData() {
            this.serachFlag = true
            this.portService.getXietongList(this.params).then(res => {
              if (res.code === 1) {
                this.tableData = res.data.rows
                this.total = res.data.total
              }
              this.serachFlag = false
            })
          },
          handleSerach (){
            this.iscollapsider= false
            this.params.pageNo = 1
            this.getData()
          },
          handleReset () {
            this.$refs.searchForm.resetFields()
            this.getData()
          },
          handleCheck (infoGuid) {
            this.$router.push({name: 'xietongSupplierManegementDetail', query: {infoGuid}})
          },
          handleSizeChange(val) {
              this.params.pageSize = val
              this.getData()
          },
          handleCurrentChange(val) {
              this.params.pageNo = val
              this.getData()
          }
        }
    }
</script>

<style lang="scss" scoped>
    .page-detail{
        padding-top: 0;
    }
    .body-wrapper{
        background: #fff;
        padding-top: 20px;
        padding-right: 20px;
    }
    .table-bar{
        text-align: right;
        padding: 10px 0;
    }
</style>
```
