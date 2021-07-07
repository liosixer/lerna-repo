<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-button size="small" type="text" @click="handleWhiteList">
            <i class="iconfont icon-bianzu"></i> 平台使用费白名单
          </el-button>
          <el-button size="small" type="text" @click="handleAdd">
            <i class="iconfont icon-xinzeng"></i> 添加规则
          </el-button>
          <el-popover class="search-term" placement="bottom" width="370" trigger="click" v-model="iscollapsider">
            <el-form ref="searchForm" :model="searchFormList" label-width="100px" size="small">
              <el-form-item label="规则名称" prop="ruleName">
                <el-input v-model="searchFormList.ruleName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="规则编号" prop="ruleBH">
                <el-input v-model="searchFormList.ruleBH" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="计算方式" prop="ptfwRuleType">
                <el-select v-model="searchFormList.ptfwRuleType" placeholder="请选择">
                  <el-option :value="1" label="标准累进制"></el-option>
                  <el-option :value="2" label="梯度进制"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="isYouXiao">
                <el-select v-model="searchFormList.isYouXiao" placeholder="请选择">
                  <el-option :value="0" label="无效"></el-option>
                  <el-option :value="1" label="有效"></el-option>
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
          <el-table-column prop="ruleName" label="规则名称" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ruleBH" label="规则编号" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ptfwRuleType" label="计算方式" min-width="120" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span v-if="row.ptfwRuleType === 1">标准累进制</span>
              <span v-else-if="row.ptfwRuleType === 2">梯度进制</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatTime" label="规则创建时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.creatTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column prop="cgLeiBie" label="状态" min-width="120" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span v-if="row.isYouXiao === 1" class="cost-success">有效</span>
              <span v-if="row.isYouXiao === 0" class="cost-error">无效</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleDetail(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button @click="handleDel(row)" size="mini" type="info" plain class="operation-button">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
                <el-button  @click="handleSetInvalid(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-feiqi"><span>{{row.isYouXiao == 0 ? "设为有效" : "设为无效"}}</span></i>
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
  name: "chargeRulesList",
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
        { label: "收费规则设置", link: "" }
      ], // 面包屑配置
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
        ruleName: "",
        ruleBH: "",
        ptfwRuleType: "",
        isYouXiao: "",
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
      const res = await this.portService.fetchRuleList({
        ...this.searchFormList,
      })
      if (res && res.code == 1) {
        const { list, total, totalCount } = res.data
        this.loading = false
        this.tableData = list
        this.total = total || totalCount
      }
    },
    // 添加
    handleAdd() {
      this.$router.push({
        name: "chargeRulesAdd",
      })
    },
    // 编辑
    handleDetail(row) {
      this.$router.push({
        name: "chargeRulesDetail",
        query: {
          guid: row.guid,
          type: row.ptfwRuleType
        }
      })
    },
    // 删除
    handleDel(row) {
      this.$confirm('此操作将永久删除该服务代理费, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        let res = await this.portService.fetchRuleDel({ guid: row.guid })
        if (res && res.code == 1) {
          this.$message.success("删除成功")
          this.getList()
        } else {
          this.$message.error(res.data.info)
        }
      })
      // .catch(() => {
      //   this.$message({ type: 'info', message: '已取消删除' });
      // });
    },
    // 设为无效/有效
    async handleSetInvalid(row) {
      let res = await this.portService.fetchRuleInvalid({
        guid: row.guid,
        isYouXiao: row.isYouXiao == 1 ? 0 : 1,
      })
      if (res && res.code == 1) {
        this.$message.success("设置成功")
        this.getList()
      } else {
        this.$message.error(res.data.info)
      }
    },
    // 白名单
    handleWhiteList() {
      this.$router.push({
        name: "whiteList"
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
.cost-success{
    padding-left: 10px;
    position: relative;
    &::before {
        content: '';
        width: 6px;
        height: 6px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0 , -50%);
        border-radius: 50%;
        background-color: #52C41A;
    }
}
.cost-error{
    padding-left: 10px;
    position: relative;
    &::before {
        width: 6px;
        height: 6px;
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0 , -50%);
        border-radius: 50%;
        background-color: #F5222D;
    }
}
</style>