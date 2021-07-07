<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-button size="small" type="text" @click="handleDetail('', 'create')">
            <i class="iconfont icon-xinzeng"></i> 添加
          </el-button>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search">
      </div>
      <div class="global-content-detail">
        <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="biaoqianName" label="专业标签" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qiyeName" label="所属单位" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="yijiName" label="所属行业分类" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.yijiName && (row.yijiName+(row.erjiName && "-"+row.erjiName))}}
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="添加时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="{ row }">
              {{row.createdTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column prop="isYouxiao" label="状态" min-width="120">
            <template slot-scope="{ row }">
              {{row.isYouxiao | translate(globalSetting.supplierManagement.majorLabelStatus)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <template v-if="row.creatorGuid == $store.state.roleAnddepartment.enterPriseInfo.userQiYe_Guid">
                  <el-button @click="handleDetail(row, 'edit')" size="mini" type="primary" plain class="operation-button" v-if="row.edit">
                    <i class="iconfont icon-bianji2"><span>编辑</span></i>
                  </el-button>
                  <el-button @click="handleDel(row)" size="mini" type="info" plain class="operation-button" v-if="row.edit">
                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
                  </el-button>
                </template>
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
  name: "gyszybqList",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "供应商专业标签", link: "" }
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
      this.loading = true
      const res = await this.portService.fetchLabelList({
        ...this.searchFormList,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.rows
        this.total = res.data.total
      }
    },
    // 新建/编辑/查看
    handleDetail(row, type) {
      let query = {
        type
      }
      if (type != "create") {
        query = {
          type,
          guid: row.guid,
        }
      }
      this.$router.push({
        name: "GyszybqDetail",
        query
      })
    },
    // 删除
    handleDel(row) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.portService.fetchDelLabel({
          guid: row.guid,
        })
        if (res && res.code == 1) {
          this.$message.success('删除成功')
          this.getList()
        }
      }).catch(() => {})
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
  },
}
</script>

<style scoped lang="scss">

</style>