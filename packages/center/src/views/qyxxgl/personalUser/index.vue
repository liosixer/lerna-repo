<template>
  <div class="project-registration">
    <div class="procurement-plan-title global-title" ref="table_title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div class="search-btnGroud" slot="btns">
          <el-popover class="search-term" placement="bottom" width="370" trigger="click" v-model="iscollapsider">
            <el-form ref="searchForm" :model="searchFormList" label-width="100px" size="small">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="searchFormList.userName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="user_BH">
                <el-input v-model="searchFormList.user_BH" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="所属企业名称" prop="creator_Name">
                <el-input v-model="searchFormList.creator_Name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="userPhone">
                <el-input v-model="searchFormList.userPhone" placeholder="请输入"></el-input>
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
          <el-table-column prop="accountName" label="个人用户名" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userName" label="姓名" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="user_BH" label="身份证号码" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userPhone" label="联系电话" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creator_Name" label="所属企业名称" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="suoShuShangJiZuZhi" label="所属上级组织" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="roleName" label="已分派角色" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="{ row }">
              {{row.createTime | timestampFormat("minute")}}
            </template>
          </el-table-column>
          <el-table-column prop="isYouXiao" label="是否有效" min-width="120">
            <template slot-scope="{row}">
              <span v-if="row.isYouXiao == 0" class="cost-success">有效</span>
              <span v-if="row.isYouXiao ==1" class="cost-error">无效</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="220" align="left" fixed="right">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="handleDetail(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                </el-button>
                <el-button @click="handleResetPwd(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-mima"><span>重置密码</span></i>
                </el-button>
                <el-button v-if="row.isYouXiao !== ''" @click="handleSetInvalid(row)" size="mini" type="primary" plain class="operation-button">
                  <i class="iconfont icon-feiqi"><span>{{row.isYouXiao == 1 ? "设为有效" : "设为无效"}}</span></i>
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
  name: "personalUserList",
  mixins: [mixins],
  inject: ["globalSetting"],
  components: {
    PageCrumb,
    VPagination,
  },
  data() {
    return {
      breadcrumbList: [
        { label: "企业信息管理", link: "" },
        { label: "个人用户查询", link: "" }
      ], // 面包屑配置
      loading: false,
      total: 0,
      tableData: [],
      searchFormList: {
        page: 1,
        rows: 10,
        userName: "",
        creator_Name: "",
        user_BH: "",
        userPhone: "",
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
      const res = await this.portService.fetchPersonalUserList({
        ...this.searchFormList,
      })
      if (res && res.code == 1) {
        this.loading = false
        this.tableData = res.data.list
        this.total = res.data.totalCount
      }
    },
    // 排序--column, prop, order
    handleChangeSort(row) {
      console.log(row, "row")
    },
    // 查看
    handleDetail(row) {
      this.$router.push({
        name: "personalUserDetail",
        query: {
          guid: row.userGuid,
        }
      })
    },
    // 重置密码
    async handleResetPwd(row) {
      let res = await this.portService.fetchResetPwd({
        userGuid: row.userGuid,
      })
      if (res && res.code == 1) {
        this.$message.success("重置成功")
      }
    },
    // 设为无效/有效
    async handleSetInvalid(row) {
      let res = await this.portService.fetchSetInvalid({
        userGuid: row.userGuid,
        isYouXiao: row.isYouXiao == 1 ? 0 : 1,
      })
      if (res && res.code == 1) {
        this.$message.success("设置成功")
        this.getList()
      }
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