<template>
  <div class="procurement-plan">
    <div class="procurement-plan-title global-title" ref="table_title">
      <!-- <page-crumb :d="{breadcrumbList:breadcrumbList}"></page-crumb> -->
      <div class="global-list-title-box">
        <span class="global-title-name">模版文件</span>
      </div>
    </div>
    <div class="global-content">
      <div class="global-content-search clearfix" ref="table_search">
        <el-form ref="form" :model="searchFormList" label-width="100px" size="small" class="global-form-top-line">
          <el-row :gutter="24">
            <el-col :md="8" :lg="8" :xl="6">
              <el-form-item label="标段/包编号">
                <el-input v-model="searchFormList.bdBH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :lg="8" :xl="6">
              <el-form-item label="标段/包名称">
                <el-input v-model="searchFormList.bdName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :lg="8" :xl="6" v-if="isWidescreen">
              <el-form-item label="供应商名称">
                <el-input v-model="searchFormList.tbrName"></el-input>
              </el-form-item>
            </el-col>
            <transition name="slide-fade" v-if="iscollapsider">
              <div>
                <el-col :md="8" :lg="8" :xl="6">
                  <el-form-item label="供应商名称">
                    <el-input v-model="searchFormList.tbrName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :lg="8" :xl="6">
                  <el-form-item label="状态">
                    <el-select v-model="searchFormList.status" placeholder="请选择">
                      <el-option
                        v-for="item in tenderWayOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :lg="8" :xl="6">
                  <el-form-item label="采购方式">
                    <el-select v-model="searchFormList.zbFangShi" placeholder="请选择">
                      <el-option
                        v-for="item in tenderMethodOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </transition>
            <el-col :md="7" :lg="7" :xl="5" class="global-top-button" style="padding-left:0;">
              <div class="collapse-open-close clearfix">
                <div>
                  <el-button @click.stop="search()" size="small" type="primary" icon="el-icon-search">查询</el-button>
                  <el-button @click.stop="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
<!--                  <el-button type="primary">导出</el-button>-->
                </div>
                <p class="folding_info">
                  <span v-if="!iscollapsider" @click="yes">
                      查看更多筛选项
                    <i class="el-icon-arrow-right"></i>
                  </span>
                  <span v-else @click="yes">
                    收起
                    <i class="el-icon-arrow-up"></i>
                  </span>
                </p>

              </div>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表格批量操作 -->
        <el-row class="global-content-search">
          <el-col
            class="global-search-table-top"
            :xl="{ span: 6 }"
            :lg="{ span: 6 }"
            :md="{ span: 18 }"
          >
            <el-button size="small" type="primary">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="global-content-detail">
        <self-table border :data="tableData" v-loading="loading" stripe style="width: 100%" :height="tableHeight">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="bdBH" label="标段/包编号" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bdName" label="标段/包名称" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zbwjJe" label="标书价格" min-width="70" align="right" class-name="table-column-money">
            <template slot-scope="{ row }">
              <span>{{(row.zbwjJe/100).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zbFangShi" label="采购方式" min-width="110">
            <template slot-scope="{ row }">
              <span>{{row.zbFangShi | getTypeNameFilter('template','tenderMethod')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gouMaiJiaShu" label="购标家数" min-width="70" align="right"></el-table-column>
          <el-table-column prop="jbTime" label="截标时间" min-width="130" >
            <template slot-scope="{ row }">
              <span>{{ row.jbTime| timestampChange}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="{ row }">
              <span>{{(row.status == 1)?'未截标':'已截标'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="70" align="left">
            <template slot-scope="{row}">
              <el-button-group class="operation-button-group">
                <el-button @click="checkout(row)" size="mini" type="primary" plain class="operation-button">
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
import { timestampChange, getLabel } from "@/assets/js/filter";
import mixins from "@/mixins/mixins";
import * as globalSetting from "@/setting";

export default {
  name: "templateList",
  mixins: [mixins],
  components: {
    PageCrumb,
    VPagination
  },
  data() {
    return {
      loading: false,
      total: 0,
      searchFormList: {
        page: 1,
        rows: 10,
        bdBH: "",
        bdName: "",
        tbrName: "",
        status: "",
        zbFangShi: "",
      },
      tableData: [],
      tenderWayOptions: [
        {code:1,name:'未截标'},
        {code:2,name:'已截标'},
      ],
      tenderMethodOptions:[],
    };
  },

  created() {
    console.log(globalSetting)
    this.tenderMethodOptions = globalSetting.template.tenderMethod
    this.getList();
    this.computeTableHeight()
  },
  methods: {

    handleSizeChange(val) {
      this.searchFormList.rows = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchFormList.page = val;
      this.getList();
    },
    checkout(row) {
      this.$router.push({
        name: "templateDetail",
        query: {
          methods: "checkout",
          id: row.ggBdGuid
        }
      });
    },
    edit(row) {
      this.$router.push({
        name: "templateDetail",
        query: {
          methods: "edit",
          id: row.ggBdGuid
        }
      });
    },
    search() {
      this.getList();
    },
    reset(){
      this.$refs.form.resetFields();
      this.searchFormList.bdBH = ''
      this.searchFormList.bdName = ''
      this.searchFormList.tbrName = ''
      this.searchFormList.status = ''
      this.searchFormList.zbFangShi = ''
    },
    async getList() {
      this.loading = true;
      const { data, code } = await this.portService.biaoshuPageList({
        ...this.trimJSON(this.searchFormList)
      });
      if (code) {
        this.loading = false;
        console.log(data)
        this.tableData = data.list;
        this.total = data.totalCount;
      }
    },
    yes() {
      this.iscollapsider = !this.iscollapsider;
      setTimeout( ()=> {
        this.computeTableHeight()
      },600)

    }
  },

};
</script>
  <style lang="scss">
.procurement-plan {
  text-align: left;
  ::v-deep.el-date-editor .el-range-separator {
    width: 10%;
  }
}
</style>
