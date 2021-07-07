
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
                <el-form-item label="供应商名称" prop="qiYeName">
                    <el-input v-model="params.qiYeName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="企业代码"  prop="qiYeBH">
                    <el-input v-model="params.qiYeBH"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系人"  prop="lianXiRen">
                    <el-input v-model="params.lianXiRen"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="申请专业"  prop="zhuanYe">
                    <!-- <el-input v-model="params.zhuanYe"  placeholder="请输入"></el-input> -->
                    <Tree
                      :nodes="cats"
                      v-model="params.zhuanYe"
                      treeId="hangYeFenLeiDaiMa"
                      :showCheckbox="false"
                      nodeKey="hangYeFenLeiDaiMa"
                      refName="hangYeFenLei"
                      objed
                      :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
                    ></Tree>
                </el-form-item>
                <el-form-item label="审核状态" prop="shenPiZhuangTai" placeholder="请选择">
                    <el-select  v-model="params.shenPiZhuangTai">
                      <el-option label="未审核" :value="1"></el-option>
                      <el-option label="审核通过" :value="2"></el-option>
                      <el-option label="审核不通过" :value="3"></el-option>
                    </el-select>
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
              <el-table-column prop="qiYeName" label="供应商名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="qiYeBH" label="企业代码"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="lianXiRenName" label="联系人" show-overflow-tooltip></el-table-column>
              <el-table-column prop="lianXiRenPhone" label="联系电话"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="zhuanYeFenLeiName" label="申请专业" show-overflow-tooltip></el-table-column>
              <el-table-column prop="submitTime" sortable min-width="150px" label="专业申请时间"  show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.submitTime | timestampChange}}
                </template>
              </el-table-column>
              <el-table-column prop="status" label="审核状态" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="status-success" v-if="scope.row.status===2">  {{['未审核','审核通过','审核不通过'][scope.row.status - 1]}}</span>
                  <span class="status-fail" v-else-if="scope.row.status===3">  {{['未审核','审核通过','审核不通过'][scope.row.status - 1]}}</span>
                  <span class="status-other" v-else>  {{['未审核','审核通过','审核不通过'][scope.row.status - 1]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="shenPiJiBie" label="操作" min-width="120" align="left" fixed="right" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button-group class="operation-button-group">
                     <el-button type="primary" plain class="operation-button" @click="handleCheck(scope.row.guid)">
                      <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                    </el-button>
                    <el-button type="primary" plain class="operation-button" @click="handleCheck(scope.row.guid)">
                      <i class="iconfont icon-xiangmuguanli"><span>管理</span></i>
                    </el-button>
                   
                  </el-button-group>
                </template>
              </el-table-column>
          </self-table>
          <div class="com-table-pagination clearfix" ref="table_pagination">
              <v-pagination
                  :total="total"
                  :page="params.page"
                  :limit="params.rows"
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
    import {supplierList, catList} from '@/service/enterpriseInfo'
    import Mixin from '../../mixin'
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
                    { label: "交易用户管理", link: "" },
                    { label: "专业供应商管理", link: "" }
                ],
                tableData: [],
                supplierList,
                serachFlag: false,
                params: {
                  qiYeName:'',
                  qiYeBH:'',
                  lianXiRen:'',
                  zhuanYe: '',
                  shenPiZhuangTai: 1,
                  page: 1,
                  rows: 10
                },
                iscollapsider: false,
                cats: []
            }
        },
        created() {
          catList().then(res => {
            if (res.code === 1) {
              this.cats = res.data
            }
          })
          this.getData()
        },
        mounted () {
          this.computeTableHeight()
        },
        methods: {
          getData() {
            this.serachFlag = true
            supplierList(this.params).then(res => {
              if (res.code === 1) {
                this.tableData = res.data.list
                this.total = res.data.totalCount
              }
              this.serachFlag = false
            })
          },
          handleSerach (){
            this.iscollapsider= false
            this.getData()
          },
          handleReset () {
            this.$refs.searchForm.resetFields()
            this.getData()
          },
          handleCheck (guid) {
            this.$router.push({name: 'supplierManegementDetail', query: {guid}})
          },
          handleSizeChange(val) {
              this.params.rows = val
              this.getData()
          },
          handleCurrentChange(val) {
              this.params.page = val
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
