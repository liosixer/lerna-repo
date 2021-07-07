<template>
  <section class="container">
    <div class="global-title" ref="table_title">
      <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
        <div class="search-btnGroud" slot="btns">
          <el-button type="text" size="small" @click="zbrdbAddFun"><i class="iconfont icon-xinzeng"></i> 添加</el-button>
          <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
            <el-form ref="form" :model="zbrdbCheckData" class="global-form-top-line" label-width="100px" size="small" label-position="right">
              <el-form-item label="姓名:">
                <el-input placeholder="请输入" v-model="zbrdbCheckData.nameVal"></el-input>
              </el-form-item>

              <el-form-item label="身份证号码:">
                <el-input placeholder="请输入" v-model="zbrdbCheckData.idNoVal"></el-input>
              </el-form-item>

              <el-form-item label="所属单位:">
                <el-input placeholder="请输入" v-model="zbrdbCheckData.employerVal"></el-input>
              </el-form-item>

              <el-form-item label="联系电话:">
                <el-input placeholder="请输入" v-model="zbrdbCheckData.phoneVal"></el-input>
              </el-form-item>

              <el-form-item label="当前状态:">
                <el-select v-model="zbrdbCheckData.zbrdbCheckVal" placeholder="请选择">
                  <el-option v-for="item in zbrdbCheckData.zbrdbCheck" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <div class="search-form-footer">
                <el-button type="primary" size="small" @click="searchTable" icon="el-icon-search">查询</el-button>
                <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
              </div>
            </el-form>
            <el-button slot="reference" size="small" type="text"> 筛选条件<i class="el-icon-arrow-down"></i> </el-button>
          </el-popover>
        </div>
      </PageCrumb>
      <!-- <div class="global-title-box">
                <span class="global-title-name">监标人代表</span>
            </div> -->
    </div>
    <div class="zbrdbContent global-content">
      <div class="global-content-search" ref="table_search"></div>
      <div class="global-content-detail">
        <self-table border :data="zbrdbTableData" header-cell-class-name="headercell" style="width:100%;" v-loading="loading" stripe :fit="true" :height="tableHeight">
          <el-table-column type="index" label="序号" show-overflow-tooltip width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="idNo" label="身份证号码" min-width="150px" show-overflow-tooltip align="left"></el-table-column>
          <el-table-column prop="employer" label="所属单位" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deptName" label="所属部门" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="联系电话" min-width="150px" show-overflow-tooltip align="right"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150px" show-overflow-tooltip :formatter="timeChange"></el-table-column>
          <el-table-column prop="status" label="当前状态" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="status-success" v-if="scope.row.status == 1">有效</span>
              <span class="status-fail" v-else>无效</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="160" align="left">
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button type="primary" plain class="operation-button" size="mini" @click="zbrdbBjFun(scope.row.guid)">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button type="primary" plain class="operation-button" size="mini" @click="zbrdbXqFun(scope.row.guid)">
                  <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <template slot="emptyDis" v-if="$store.state.logoType == 1">
            <div style="color: #ccc">您当前无可用的监标人，请点击右上角“<span style="color: blue">添加</span>”按钮添加招标人代表</div>
            <div style="color: #ccc">此处添加的监标人，在招标项目中，可由项目经理在开标阶段选择</div>
          </template>
        </self-table>
      </div>
      <div class="com-table-pagination clearfix" ref="table_pagination">
        <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import VPagination from "@/components/VPagination";
import PageCrumb from "@/components/PageCrumb";
import mixins from "./mixins";
export default {
  name: "superviseRsz",
  mixins: [mixins],
  components: { VPagination, PageCrumb },
  data() {
    return {
      breadcrumbList: [{ label: "监标人", link: "" }],
      loading: true,
      zbrdbCheckData: {
        nameVal: "",
        idNoVal: "",
        employerVal: "",
        phoneVal: "",
        zbrdbCheck: [
          {
            label: "全部",
            value: "",
          },
          {
            label: "有效",
            value: 1,
          },
          {
            label: "无效",
            value: 0,
          },
        ],
        zbrdbCheckVal: "",
      },
      zbrdbTableData: [],
      total: 0,
      searchForm: {
        name: "",
        idNo: "",
        employer: "",
        phone: "",
        status: "",
        type: 2,
        page: 1,
        rows: 10,
      },
      iscollapsider: false,
    };
  },
  methods: {
    reset() {
      this.zbrdbCheckData.nameVal = "";
      this.zbrdbCheckData.idNoVal = "";
      this.zbrdbCheckData.employerVal = "";
      this.zbrdbCheckData.phoneVal = "";
      this.zbrdbCheckData.zbrdbCheckVal = "";
    },
    //查询主表格
    searchTable() {
      this.iscollapsider = !this.iscollapsider;
      this.ZhaoBiaoRenDaiBiaoList();
    },
    //转换状态
    stauesChange(row, column, cellValue, index) {
      var str = "";
      if (cellValue != undefined && cellValue != null) {
        if (cellValue === "1") {
          str = "有效";
        } else if (cellValue === "0") {
          str = "无效";
        }
      }
      return str;
    },
    //转换时间格式
    timeChange(row, column, cellValue, index) {
      return this.formatDate(cellValue);
    },
    //查询主表格
    async ZhaoBiaoRenDaiBiaoList() {
      this.searchForm = {
        name: this.zbrdbCheckData.nameVal,
        idNo: this.zbrdbCheckData.idNoVal,
        employer: this.zbrdbCheckData.employerVal,
        phone: this.zbrdbCheckData.phoneVal,
        status: this.zbrdbCheckData.zbrdbCheckVal,
        type: this.searchForm.type,
        page: this.searchForm.page,
        rows: this.searchForm.rows,
      };
      const res = await this.portService.ZhaoBiaoRenDaiBiaoList(this.searchForm);
      if (res.data) {
        this.zbrdbTableData = res.data.rows;
        this.total = res.data.total;
        this.loading = false;
      }
    },
    //时间戳转时间
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    //跳转新增页面
    zbrdbAddFun() {
      this.$router.push({ path: "/zbrdb/jbrdbAdd" });
    },
    //跳转编辑页面
    zbrdbBjFun(guid) {
      this.$router.push({ name: "jbrdbBj", params: { bjid: guid } });
    },
    //跳转详情页面
    zbrdbXqFun(guid) {
      this.$router.push({ name: "jbrdbXq", params: { xqid: guid } });
    },
    handleSizeChange(val) {
      this.searchForm.rows = val;
      this.ZhaoBiaoRenDaiBiaoList();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.ZhaoBiaoRenDaiBiaoList();
    },
    yes() {
      this.iscollapsider = !this.iscollapsider;
      setTimeout(() => {
        this.computeTableHeight();
      }, 600);
    },
  },
  create() {},
  mounted() {
    //默认加载查询表格
    this.ZhaoBiaoRenDaiBiaoList();
    this.computeTableHeight();
  },
  destroyed() {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
