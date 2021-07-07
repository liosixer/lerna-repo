<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-popover class="search-term" placement="bottom" width="370" trigger="click" v-model="iscollapsider">
            <el-form ref="searchForm" :model="searchFormList" label-width="100px" size="small">
              <!-- <el-form-item label="所属系统" prop="xitong">
                <el-select v-model="searchFormList.xitong" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.logManagement.systemType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="操作人" prop="operator">
                <el-input v-model="searchFormList.operator" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="日志类型" prop="type">
                <el-select v-model="searchFormList.type" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.logManagement.operateType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="事项类型" prop="shixiangStr">
                <el-input v-model="searchFormList.shixiangStr" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="操作时间" prop="operateTime">
                <el-date-picker v-model="searchFormList.operateTime" type="datetimerange" style="width:100%;" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp"></el-date-picker>
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
        <el-tabs v-model="activeName" @tab-click="handleClickTab">
          <el-tab-pane v-for="item in systemType" :key="item.code" :label="item.name" :name="item.code"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="global-content-detail">
        <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="xitong" label="所属系统" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.xitong | formatVal(systemType)}}
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="操作人" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="日志类别" min-width="140" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.type | formatVal(globalSetting.logManagement.operateType)}}
            </template>
          </el-table-column>
          <el-table-column prop="shixiangType" label="事项类型" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!-- {{getMatterVal(row)}} -->
              {{row.shixiangType | formatVal(matterList)}}
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="操作时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.createdTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleDetail(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
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

export default {
  name: "operationLogList",
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
        { label: "操作日志", link: "" }
      ], // 面包屑配置
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
        xitong: "",
        operator: "",
        type: "",
        shixiangStr: "",
        operateTime: [],
      },
      logList: [],
      matterTypeData: {},
      activeName: "",
      systemType: [],
      matterList: [],
    }
  },
  filters: {
    formatVal(val, arr) {
      let res = arr.find((e) => e.code == val)
      if (res) return res.name
      else return val
    }
  },
  async created() {
    this.computeTableHeight()
    let res1 = await this.portService.fetchSystemType()
    if (res1 && res1.code == 1) {
      this.systemType = res1.data || []
      this.searchFormList.xitong = res1.data[0].code
      this.activeName = res1.data[0].code
    }
    await this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      this.loading = true
      let resMatter = await this.portService.fetchMatterType({
        code: this.searchFormList.xitong,
      })
      if (resMatter && resMatter.code == 1) {
        this.matterList = resMatter.data || []
      }
      let params = {...this.searchFormList}
      let isTimeArray = Array.isArray(params.operateTime)
      params.startTime = isTimeArray ? params.operateTime[0] : ""
      params.endTime = isTimeArray ? params.operateTime[1] : ""
      delete params.operateTime
      const res = await this.portService.fetchOperateLogList({
        ...params,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total
      }
    },
    // 列表返回事项名
    getMatterVal(row) {
      let arr = this.matterTypeData[row.xitong]
      function translate(val, arr) {
        let res = arr.find((e) => e.code === val)
        if (res) return res.name
        else return val
      }
      return translate(row.shixiangType, arr)
    },
    // 新建/编辑/查看
    handleDetail(row) {
      this.$router.push({
        name: "operationLogDetail",
        query: {
          guid: row.guid,
          xitong: row.xitong,
        }
      })
    },
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
    // tab 切换
    handleClickTab(tab, event) {
      this.activeName = tab.name
      this.searchFormList.xitong = tab.name
      this.handleReset()
      this.getList()
    },
  },
}
</script>

<style scoped lang="scss">

</style>