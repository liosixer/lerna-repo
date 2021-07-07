
<template>
  <div>
    <div class="global-title"  ref="table_title">
    <!-- <ContentHeader :d="{breadcrumbList:breadcrumbList}"></ContentHeader> -->
     <page-crumb :d="{breadcrumbList:breadcrumbList}">
    <!-- </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search"> -->
        <div class="search-btnGroud" slot="btns">
          <el-button size="mini" @click="handleExportData" type="text"><i class="iconfont icon-xiazai"></i>导出</el-button>
          <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
          <el-form ref="searchForm" :model="params" label-width="70px" size="small" label-position="right">
              <el-form-item prop="accountName" label="用户名">
                <el-input v-model="params.accountName" placeholder="请输入" size="small"></el-input>
              </el-form-item>
              <el-form-item prop="qiYeName" label="企业名称">
                <el-input v-model="params.qiYeName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item prop="qiYeBH" label="社会企业信用代码">
                <el-input v-model="params.qiYeBH" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item prop="userPhone" label="联系电话">
                <el-input v-model="params.userPhone" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item prop="time" label="申请时间">
                <el-date-picker
                  v-model="params.time"
                  style="width: 100%"
                  type="daterange"
                  timestamp
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="请选择"
                  end-placeholder="请选择"
                ></el-date-picker>
              </el-form-item>
              <div style="display: none">
                <el-form-item prop="endTime">
                  <el-input type="number" v-model="params.endTime"></el-input>
                </el-form-item>
                <el-form-item prop="startTime">
                  <el-input type="number" v-model="params.startTime"></el-input>
                </el-form-item>
              </div>
              <div class="search-form-footer">
                <el-button
                  @click.stop="handleSerach"
                  size="small"
                  type="primary"
                  icon="el-icon-search"
                >查询</el-button>
                <el-button @click.stop="handleReset" size="small" icon="el-icon-refresh-right">重置</el-button>
              </div>
            </el-form>
            <el-button slot="reference" size="small" type="text">
                筛选条件<i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
      </page-crumb>
        <!-- 表格批量操作 -->
        <!-- <el-row class="global-content-search">
          <el-col
                  class="global-search-table-top"
                  :xl="{ span: 6 }"
                  :lg="{ span: 6 }"
                  :md="{ span: 18 }"
          >
            <el-button size="mini" @click="handleExportData" type="primary">导出</el-button>
          </el-col>
        </el-row> -->
      </div>
      <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search">
      </div>
        <div class="global-content-detail">
          <el-table border :data="tableData" :fit="true" ref="table" :height="tableHeight"  @sort-change="handleSortChange">
            <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
            <el-table-column prop="accountName" label="用户名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qiYeName" label="企业名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userPhone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" width="250px" sortable="custom" label="申请时间" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.createTime | timestampChange}}</template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="left">
              <template slot-scope="{row}">
                <el-button-group class="operation-button-group">
                  <el-button size="mini" type="primary" v-if="row.shenPiZhuangTai==0" plain class="operation-button" @click="deleteXxcxMethods(row.userGuid)">
                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
                  </el-button>
                </el-button-group>
              </template>
          </el-table-column>
          </el-table>
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
// import ContentHeader from "@/components/contentHeader/ContentHeader";
import PageCrumb from "@/components/PageCrumb";
import { getReigsterEmtetpriseList, exportData,deleteXxcx } from "@/service/enterpriseInfo";
import Mixin from '../mixin'
import config from '@/config/config'
export default {
  name: "enterpriseInfoCheckList",
  mixins: [Mixin],
  components: {
    // ContentHeader,
    PageCrumb
  },
  data() {
    return {
      tableData: [],
      params: {
        accountName: "",
        qiYeName: "",
        qiYeBH: "",
        userPhone: "",
        startTime: 0,
        endTime: 0,
        time: "",
        orderType: 0,
        page: 1,
        rows: 10
      },
      total: 0,
      loaded: true,
      iscollapsider: false,
      breadcrumbList: [
        { label: "交易用户管理", link: "" },
        { label: "注册信息查询", link: "" }
      ],
    };
  },
  created() {
      this.getData()
  },
  mounted () {
    this.computeTableHeight()
  },
  methods: {
    getData () {
      this.loaded = true
      getReigsterEmtetpriseList(this.params).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.list
          this.total = res.data.totalCount
        }
        this.loaded = false
      })
    },
    handleSerach() {
        this.iscollapsider= false
        const len  = this.params.time.length
        this.params.endTime = len && new Date(this.params.time[1]).getTime()
        this.params.startTime = len && new Date(this.params.time[0]).getTime()
        this.getData()
    },
    handleReset() {
        this.$refs.searchForm.resetFields()
        this.getData()
    },
    handleExportData () {
      exportData(this.params).then(res => {
        log(res)
      })
      const d = this.params
      const domain = config.requestUrl
      window.location.href = `${domain}/center-web-api/admin/center/queryUserListout?accountName=${d.accountName}&qiYeName=${d.qiYeName}&qiYeBH=${d.qiYeBH}&userPhone=${d.userPhone}&startTime=${d.startTime}&endTime=${d.endTime}&orderType=${d.orderType}0&page=${d.page}&rows=${d.rows}`
    },
    handleSortChange (data) {
      if (data.order === 'ascending') {
        this.params.orderType = 1
      }else {
        this.params.orderType = 0
      }
      this.getData()
    },
    handleSizeChange(val) {
        this.params.rows = val
        this.getData()
    },
    handleCurrentChange(val) {
        this.params.page = val
        this.getData()
    },
    deleteXxcxMethods(guid){
      deleteXxcx({userGuid:guid}).then(res=>{
        if(res.code == 1){
          this.$message.success("删除成功")
          this.getData();
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.page-detail {
  padding-top: 0;
  height: 100%;
  overflow: hidden;
}
.body-wrapper {
  background: #fff;
  padding-top: 20px;
  padding-right: 20px;
}
.table-bar {
  text-align: right;
  padding: 20px;
}
.ctrs-span {
  padding: 0 10px;
}
</style>
