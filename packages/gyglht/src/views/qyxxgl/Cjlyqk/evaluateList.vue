<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-popover class="search-term" placement="bottom" width="370" trigger="click" v-model="iscollapsider">
            <el-form ref="searchForm" :model="searchFormList" label-width="100px" size="small">
              <el-form-item label="标段/包名称" prop="bdName">
                <el-input v-model="searchFormList.bdName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="标段/包编号" prop="bdBH">
                <el-input v-model="searchFormList.bdBH" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="项目经理" prop="xmJingLi">
                <el-input v-model="searchFormList.xmJingLi" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="项目类型" prop="xmLeiXing">
                <el-select v-model="searchFormList.xmLeiXing" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.supplierManagement.projectType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="采购方式" prop="zbFangShi">
                <el-select v-model="searchFormList.zbFangShi" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.supplierManagement.purchaseType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="评价结果" prop="pingJiaJieGuo">
                <el-select v-model="searchFormList.pingJiaJieGuo" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.supplierManagement.evaluation"
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
        <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight" ref="tableRef">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="bdName" label="标段/包名称" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bdBH" label="标段/包编号" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmJingLi" label="项目经理" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmLeiXing" label="项目类型" min-width="140" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.xmLeiXing | translateUnstrict(globalSetting.supplierManagement.projectType)}}
            </template>
          </el-table-column>
          <el-table-column prop="zbFangShi" label="采购方式" min-width="140" show-overflow-tooltip>
            <template slot-scope="{ row }">
              {{row.zbFangShi | translateUnstrict(globalSetting.supplierManagement.purchaseType)}}
            </template>
          </el-table-column>
          <el-table-column prop="pingJiaJieGuo" label="评价结果" min-width="140">
            <template slot-scope="{ row }">
              <template v-if="row.pingJiaJieGuo">
                {{row.pingJiaJieGuo | translateUnstrict(globalSetting.supplierManagement.evaluation)}}
              </template>
              <template v-else>未评价</template>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="评价时间" min-width="140">
            <template slot-scope="{ row }">
              {{row.createdTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button  @click="handleDetail(row, 'view')" size="mini" type="primary" plain class="operation-button">
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
  name: "evaluateList",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "供应商评价结果", link: "" }
      ],
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
        bdName: "",
        bdBH: "",
        xmJingLi: "",
        xmLeiXing: "",
        zbFangShi: "",
        pingJiaJieGuo: "",
      },
      routeName: "evaluateList"
    }
  },
  created() {
    this.fetchInit()
  },
  methods: {
    // 初始化
    fetchInit() {
      this.routeName = this.$route.name
      this.computeTableHeight()
      this.getList()
    },
    // 获取列表数据
    async getList() {
      this.loading = true
      let params = { ...this.searchFormList }
      const { pingJiaJieGuo } = this.searchFormList
      let result
      if (pingJiaJieGuo === "") {
        result = 10
      } else if (pingJiaJieGuo == 0) {
        result = ""
      } else {
        result = pingJiaJieGuo
      }
      params.pingJiaJieGuo = result
      const res = await this.portService.fetchEvaluateList({
        ...params,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total
        this.$nextTick(() => {
          this.$refs.tableRef.$refs.selfTable.doLayout()
        })
      }
    },
    // 查看
    handleDetail(row, type) {
      this.$router.push({
        name: "evaluateDetail",
        query: {
          guid: row.guid,
          type,
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
  },
}
</script>

<style scoped lang="scss">

</style>