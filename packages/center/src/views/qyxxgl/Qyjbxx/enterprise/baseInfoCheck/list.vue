
<template>
  <div>
    <div class="procurement-plan-title global-title" ref="table_title">
      <!-- <ContentHeader title="基础信息审核"></ContentHeader> -->
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <!-- </div>
        <div class="global-content">
        <div class="body-wrapper global-content-search" ref="table_search">-->
        <div class="search-btnGroud" slot="btns">
          <el-popover
            class="search-term"
            placement="bottom"
            width="300"
            trigger="click"
            v-model="iscollapsider"
          >
            <el-form
              ref="form"
              :model="params"
              label-width="80px"
              size="small"
              label-position="right"
            >
              <el-form-item label="企业名称">
                <el-input v-model="params.qiYeName" placeholder="请输入" size="small"></el-input>
              </el-form-item>

              <el-form-item label="企业代码">
                <el-input v-model="params.qiYeBH" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="params.accountName" placeholder="请输入" size="small"></el-input>
              </el-form-item>
              <el-form-item label="市场主体">
                <el-select v-model="params.zhuTiLeiXing" clearable>
                  <el-option label="投标人" value="T"></el-option>
                  <el-option label="招标人" value="B"></el-option>
                  <el-option label="招标代理机构" value="A"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-select v-model="params.shenPiZhuangTai" clearable>
                  <el-option :value="1" label="未审核"></el-option>
                  <el-option :value="2" label="审核通过"></el-option>
                  <el-option :value="3" label="审核未通过"></el-option>
                </el-select>
              </el-form-item>
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
              筛选条件
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search"></div>
      <div class="global-content-detail">
        <self-table
          border
          :data="tableData"
          v-loading="loaded"
          :fit="true"
          ref="table"
          :height="tableHeight"
        >
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="accountName" label="用户名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qiYeName" label="企业名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qiYeBH" label="企业代码" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zhuTiLeiXing" label="交易市场主体" show-overflow-tooltip>
            <template slot-scope="scope">
              {{
              scope.row.zhuTiLeiXing | enterPriseType
              }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="联系人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userPhone" label="联系电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.createTime| timestampChange}}</template>
          </el-table-column>
          <el-table-column prop="shenPiZhuangTai" label="审核状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- {{['未审核', '审核通过','审核不通过'][scope.row.shenPiZhuangTai - 1]}} -->
              <span
                class="status-success"
                v-if="scope.row.shenPiZhuangTai===2"
              >{{['未审核','审核通过','审核不通过'][scope.row.shenPiZhuangTai - 1]}}</span>
              <span
                class="status-fail"
                v-else-if="scope.row.shenPiZhuangTai===3"
              >{{['未审核','审核通过','审核不通过'][scope.row.shenPiZhuangTai - 1]}}</span>
              <span
                class="status-other"
                v-else
              >{{['未审核','审核通过','审核不通过'][scope.row.shenPiZhuangTai - 1]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left" fixed="right" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="gotoSp(scope.row.userQiYeGuid)">
                <!-- <router-link
                  :to="{name:'enterpriseBaseInfo', query:{userQiYeGuid: scope.row.userQiYeGuid}}"
                >{{scope.row.shenPiZhuangTai == 2 || scope.row.shenPiZhuangTai == 3 ? '查看' : '审核'}}</router-link>-->
                {{scope.row.shenPiZhuangTai == 2 || scope.row.shenPiZhuangTai == 3 ? '查看' : '审核'}}
              </el-button>
            </template>
          </el-table-column>
        </self-table>
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
import { getEnterpriseList } from "@/service/enterpriseInfo";
import Mixin from "../../mixin";
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
      total: 0,
      params: {
        qiYeBH: "",
        qiYeName: "",
        accountName: "",
        shenPiZhuangTai: 1,
        zhuTiLeiXing: "",
        page: 1,
        rows: 10
      },
      loaded: true,
      iscollapsider: false,
      breadcrumbList: [
        { label: "交易用户管理", link: "" },
        { label: "基础信息审核", link: "" }
      ]
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.computeTableHeight();
  },
  filters: {
    enterPriseType(val) {
      const data = { T: "投标人", B: "招标人", A: "招标代理机构" };
      let arr = [];
      Object.keys(data).forEach(i => {
        if (val.split(",").includes(i)) arr.push(data[i]);
      });
      return arr.join(",");
    }
  },
  methods: {
    getData() {
      this.loaded = true;
      getEnterpriseList(this.params).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.list;
          this.total = res.data.totalCount;
        }
        this.loaded = false;
      });
    },
    handleSerach() {
      this.iscollapsider = false;
      this.getData();
    },
    handleReset() {
      this.params = {
        accountName: "",
        qiYeName: "",
        shenPiZhuangTai: 1,
        zhuTiLeiXing: ""
      };
      this.getData();
    },
    handleSizeChange(val) {
      this.params.rows = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getData();
    },
    gotoSp(id) {
      this.$router.push({
        name: "enterpriseBaseInfo",
        query: { userQiYeGuid: id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-detail {
  padding-top: 0;
  background: none;
  overflow: hidden;
}
.body-wrapper {
  background: #fff;
  padding-top: 20px;
  padding-right: 20px;
}
.table-bar {
  text-align: right;
  padding: 10px 0;
}
</style>
```
