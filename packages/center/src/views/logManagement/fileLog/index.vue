<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-button size="small" type="text" @click="handleDownBatch">
            <i class="iconfont icon-bianzu"></i> 批量打包下载
          </el-button>
          <el-popover class="search-term" placement="bottom" width="370" trigger="click" v-model="iscollapsider">
            <el-form ref="searchForm" :model="searchFormList" label-width="100px" size="small">
              <el-form-item label="文件名称" prop="gcName">
                <el-input v-model="searchFormList.gcName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="文件MD5" prop="gcName">
                <el-input v-model="searchFormList.gcName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="所属系统" prop="xitong">
                <el-select v-model="searchFormList.xitong" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.logManagement.systemType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="searchFormList.status" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.logManagement.fileStatus"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div style="text-align: right">
                <el-button @click.stop="handleSearch" size="small" type="primary" icon="el-icon-search">查询</el-button>
                <el-button @click.stop="handleReset" size="small" icon="el-icon-refresh-right">重置</el-button>
              </div>
            </el-form>
            <el-button slot="reference" size="small" type="text">
              <i class="iconfont icon-biangengguanli"></i>筛选
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
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="gcBH" label="文件名称" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gcName" label="文件存储" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gcName" label="文件MD5" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xitong" label="所属系统" min-width="120" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.xitong | translate(globalSetting.logManagement.systemType)}}
            </template>
          </el-table-column>
          <el-table-column prop="gcName" label="文件大小" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="120" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.status | translate(globalSetting.logManagement.fileStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="gcName" label="上传时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.time | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleDown(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-bianzu"><span>下载</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
      <div class="com-table-pagination clearfix" ref="table_pagination">
        <v-pagination
          :total="total"
          :page="searchFormList.page"
          :limit="searchFormList.rows"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PageCrumb from "@/components/PageCrumb";
import VPagination from "@/components/VPagination";
import mixins from "@/mixins/mixins";
import utils from "@/utils/utils"

export default {
  name: "fileLogList",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "日志管理", link: "" },
        { label: "文件日志", link: "" }
      ], // 面包屑配置
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
      },
    }
  },
  created() {
    this.computeTableHeight()
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      // this.loading = true
      // const res = await this.portService.fetchRegistrationList({
      //   ...this.searchFormList,
      // })
      // if (res && res.code == 1) {
      //   this.loading = false
      //   this.tableData = res.data.rows
      //   this.total = res.data.total
      // }
    },
    // 下载
    async handleDown(row) {
      const url = await utils.getDownSrc(row.guid)
      window.open(url)
    },
    // 批量下载
    handleDownBatch() {},
    // 分页大小改变
    handleSizeChange(val) {
      this.searchFormList.rows = val
      this.getList()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.searchFormList.page = val
      this.getList()
    },
    // 搜索
    handleSearch() {
      this.searchFormList.page = 1
      this.iscollapsider= false
      this.getList()
    },
    // 重置
    handleReset(){
      this.$refs.searchForm && this.$refs.searchForm.resetFields()
    },
  },
}
</script>

<style scoped lang="scss">

</style>