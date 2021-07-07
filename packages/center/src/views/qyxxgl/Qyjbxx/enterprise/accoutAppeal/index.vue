<template>
    <div class="procurement-plan">
      <div class="procurement-plan-title global-title" ref="table_title">
        <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <!-- </div>
      <div class="global-content ">
          <div class="global-content-search clearfix" ref="table_search"> -->
            <div class="search-btnGroud" slot="btns">
                <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
                <el-form ref="form" :model="searchData"  class="global-form-top-line"    label-width="100px" size="small" label-position="right">
                          <el-form-item label="企业名称">
                              <el-input  placeholder="请输入" v-model="searchData.qiYeName" size="small"></el-input>
                          </el-form-item>
                          <el-form-item label="企业代码">
                              <el-input  v-model="searchData.qiYeBH"  placeholder="请输入"></el-input>
                          </el-form-item>
                                  <el-form-item label="申诉电话">
                                      <el-input v-model="searchData.userPhone"  placeholder="请输入" size="small"></el-input>
                                  </el-form-item>
                                  <el-form-item label="申诉用户名">
                                      <el-input  v-model="searchData.userName"  placeholder="请输入"></el-input>
                                  </el-form-item>
                                  <el-form-item label="审核状态">
                                      <el-select v-model="searchData.shenPiZhuangTai" placeholder="请选择">
                                        <el-option :value="item.code" :label="item.name" v-for="item in registerStatus" :key="item.code"></el-option>
                                      </el-select>
                                  </el-form-item>
                              <div class="search-form-footer">
                                  <el-button @click.stop="searchBtn" size="small" type="primary" icon="el-icon-search">查询</el-button>
                                  <el-button @click.stop="resetBtn" size="small" icon="el-icon-refresh-right">重置</el-button>
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
              <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight">
                  <el-table-column type="index" label="序号"  min-width="80" align="center"></el-table-column>
                  <el-table-column prop="qiYeName" label="企业名称" min-width="150" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="shengSuUserPhone" label="申诉电话"  min-width="100" show-overflow-tooltip></el-table-column>
<!--                  <el-table-column prop="shengSuUserName" label="申诉用户名" show-overflow-tooltip></el-table-column>-->
                  <el-table-column prop="createTime" label="账户申诉时间" min-width="150"  show-overflow-tooltip>
                      <template slot-scope="{ row }">
                          <span>{{ row.createTime| timestampChange}}</span>
                      </template>
                  </el-table-column>
                  
                  <el-table-column prop="status" label="审核状态"  min-width="100" show-overflow-tooltip>
                      <template slot-scope="{ row }">
                        <span class="status-success" v-if="row.status===2">  {{['未审核','审核通过','审核不通过'][row.status - 1]}}</span>
                        <span class="status-fail" v-else-if="row.status===3">  {{['未审核','审核通过','审核不通过'][row.status - 1]}}</span>
                        <span class="status-other" v-else>  {{['未审核','审核通过','审核不通过'][row.status - 1]}}</span>

                      </template>
                  </el-table-column>
                  <el-table-column label="操作" fixed="right" min-width="120"  align="left">
                      <template slot-scope="scope">
                        <el-button-group class="operation-button-group">
                          <el-button v-if="scope.row.status===1" @click="checkout(scope.row,1)" size="mini" type="primary" plain class="operation-button">
                            <i class="iconfont icon-shenpi"><span>审核</span></i>
                          </el-button>
                          <el-button @click="checkout(scope.row,2)" size="mini" type="primary" plain class="operation-button">
                            <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                          </el-button>
                        </el-button-group>
                      </template>
                  </el-table-column>

              </self-table>
          </div>
          <div class="com-table-pagination clearfix" ref="table_pagination">
              <v-pagination
                      :total="total"
                      :page="searchData.page"
                      :limit="searchData.rows"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
              ></v-pagination>
          </div>
      </div>
    </div>
</template>

<script>
    import { timestampChange, getLabel } from "@/assets/js/filter";
    import Mixin from '../../mixin'
    import VPagination from "@/components/VPagination";
    import statusOptions from '@/setting/status'
    import PageCrumb from "@/components/PageCrumb";
    export default {
        name: "accountAppeal",
        mixins: [Mixin],
        components: {
            VPagination,
            PageCrumb
        },
        data () {
            return {
                breadcrumbList: [
                    { label: "交易用户管理", link: "" },
                    { label: "账户申诉审核", link: "" },
                ],
                loading: false,
                tableData: [],
                multipleSelection: [],
                iscollapsider: false,
                total: 0,
                searchData:{
                    page: 1,
                    rows: 10,
                    qiYeName: "",
                    qiYeBH: "",
                    userPhone: "",
                    userName: "",
                    shenPiZhuangTai: "",
                },
            }
        },
        created() {
            this.registerStatus = statusOptions.registerStatus
            this.getData()
            this.computeTableHeight()
        },
        methods: {
            async getData() {
                this.loading = true;
                const {code,data} = await this.portService.zhangHaoShenSuQueryList(this.searchData)
                this.loading =false
                if (code) {
                    this.tableData = data.list
                    this.total = data.totalCount
                }
            },
            resetBtn(){
                this.searchData.qiYeName = "";
                this.searchData.qiYeBH = "";
                this.searchData.userPhone = "";
                this.searchData.userName = "";
                this.searchData.shenPiZhuangTai = "";
                this.getData()
            },
            searchBtn() {
                this.iscollapsider= false
                this.getData();
            },
            checkout(row,type) {
                this.$router.push({
                    name: "accoutAppealDetail",
                    query: {
                        methods: type==1?'audit':'checkout',
                        id: row.guid
                    }
                });
            },
            handleSizeChange(val) {
                this.searchData.rows = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.searchData.page = val
                this.getData()
            },
        }
    }
</script>

<style lang="scss" scoped>
    .procurement-plan {
        text-align: left;
    }
</style>
