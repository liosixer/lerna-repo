<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-popover class="search-term" placement="bottom" width="370" trigger="click" v-model="iscollapsider">
            <el-form ref="searchForm" :model="searchFormList" label-width="100px" size="small">
              <el-form-item label="采购用户名称" prop="zuHuName">
                <el-input v-model="searchFormList.zuHuName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="企业代码" prop="zuHuCode">
                <el-input v-model="searchFormList.zuHuCode" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="市场主体类型" prop="zuHuType">
                <el-select v-model="searchFormList.zuHuType" placeholder="请选择">
                  <el-option
                    v-for="item in globalSetting.platformConfig.marketType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人" prop="lianXiRen">
                <el-input v-model="searchFormList.lianXiRen" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="lianXiPhone">
                <el-input v-model="searchFormList.lianXiPhone" placeholder="请输入"></el-input>
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
          <el-table-column prop="zuHuName" label="采购用户名称" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zuHuCode" label="企业代码" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zuHuType" label="市场主体类型" min-width="120" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{getMarketType(row.zuHuType)}}
            </template>
          </el-table-column>
          <el-table-column prop="lianXiRen" label="联系人" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lianXiPhone" label="联系电话" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="入库时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.createTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleDetail(row, 'edit')" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-anniutubiao-"><span>设置权限</span></i>
                </el-button>
                <el-button @click="handleDetail(row, 'view')" size="mini" type="primary" plain class="operation-button">
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
          :page="searchFormList.pageNo"
          :limit="searchFormList.pageSize"
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
  name: "purchaseUserManagementList",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "平台配置", link: "" },
        { label: "采购用户管理", link: "" }
      ], // 面包屑配置
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        pageNo: 1,
        pageSize: 10,
        zuHuName: "",
        zuHuCode: "",
        zuHuType: "",
        lianXiRen: "",
        lianXiPhone: "",
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
      this.loading = true
      const res = await this.portService.fetchPurchaseUserList({
        ...this.searchFormList,
        // isZuHu: 0,
        // chanShengFangShi:3
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total
      }
    },
    // 市场类型转换
    getMarketType(data) {
      if (!data) return ""
      function translate(val, arr) {
        let res = arr.find((e) => e.code == val)
        if (res) return res.name
        else return val
      }
      let arr = data.split(",")
      let res = arr.map(i => translate(i, this.globalSetting.platformConfig.marketType))
      return res.join(",")
    },
    // 编辑/查看
    handleDetail(row, type) {
      this.$router.push({
        name: "purchaseUserManagementDetail",
        query: {
          guid: row.guid,
          type,
        }
      })
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.searchFormList.pageSize = val
      this.getList()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.searchFormList.pageNo = val
      this.getList()
    },
    // 搜索
    handleSearch() {
      this.searchFormList.pageNo = 1
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