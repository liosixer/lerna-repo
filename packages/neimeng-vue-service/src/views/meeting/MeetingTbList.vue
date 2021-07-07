<template>
  <div class="project-list">
    <div class="global-title" ref="table_title">
      <page-crumb :d="{ breadcrumbList: breadcrumbList }">
        <div class="search-btnGroud" slot="btns">
          <el-button size="small" type="text" @click="goDetail(3, '')"><i class="iconfont icon-xinzeng"></i> 新增 </el-button>
          <el-button size="small" type="text" @click="$router.back(-1)"
            ><i class="iconfont icon-fanhui"></i>
            返回工作台
          </el-button>
          <el-popover class="search-term" placement="bottom" width="300" trigger="click" v-model="iscollapsider">
            <el-form ref="form" :model="searchForm" label-width="100px" size="small" class="global-form-top-line" label-position="right">
              <el-form-item label="场地预约名称" prop="hyAddress">
                <el-input v-model="searchForm.hyAddress" @keyup.native.space="trimData"></el-input>
              </el-form-item>
              <el-form-item label="标段/包名称" prop="bdName">
                <el-input v-model="searchForm.bdName" @keyup.native.space="trimData"></el-input>
              </el-form-item>
              <el-form-item label="会议类型" prop="hylx">
                <el-select v-model="searchForm.hylx" placeholder="请选择">
                  <el-option v-for="item in globalSetting.common.meetingtype" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="zhuangTai">
                <el-select v-model="searchForm.zhuangTai" placeholder="请选择">
                  <el-option v-for="item in globalSetting.common.meetappointStatus" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
              <div class="search-form-footer">
                <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">搜索 </el-button>
                <el-button type="" size="small" @click="resetFunc" icon="el-icon-refresh-right">重置 </el-button>
              </div>
            </el-form>
            <el-button slot="reference" size="small" type="text"> 筛选条件<i class="el-icon-arrow-down"></i> </el-button>
          </el-popover>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <div class="global-content-search" ref="table_search"></div>
      <div class="global-content-detail pos-re">
        <self-table border :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
          <el-table-column prop="huiYiShiNames" label="场地预约名称" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bdNames" label="标段/包名称" min-width="260" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hylx" label="会议类型" min-width="100">
            <template slot-scope="scope">
              {{ scope.row.hylx | translate(globalSetting.common.meetingtype) }}
            </template>
          </el-table-column>
          <el-table-column prop="kbTime" label="场地预约时间" min-width="280">
            <template slot-scope="scope">
              {{ scope.row.startTime | dateFormater("YYYY-MM-DD HH:mm") }} 至
              {{ scope.row.endTime | dateFormater("YYYY-MM-DD HH:mm") }}
            </template>
          </el-table-column>
          <el-table-column prop="zhuangTai" label="状态" min-width="100">
            <template slot-scope="scope">
              <span class="status-success" v-if="scope.row.zhuangTai == 1012">{{ scope.row.zhuangTai | translate(globalSetting.common.meetappointStatus) }}</span>
              <span class="status-fail" v-else-if="scope.row.zhuangTai==1011">{{scope.row.zhuangTai|translate(globalSetting.common.meetappointStatus)}}</span>
              <span class="status-other" v-else>{{ scope.row.zhuangTai | translate(globalSetting.common.meetappointStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="left" fixed="right">
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <el-button v-if="scope.row.zhuangTai == 1001 || scope.row.zhuangTai == 1011" type="primary" plain size="mini" class="operation-button" @click="goDetail(1, scope.row)">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button v-if="scope.row.zhuangTai == 1009 || scope.row.zhuangTai == 1012" type="priamry" plain size="mini" class="operation-button" @click="goDetail(2,scope.row)">
                    <i class="iconfont icon-anniutubiao-"><span>查看</span></i>
                </el-button>
                 <el-button v-if="scope.row.zhuangTai == 1009" type="primary" plain size="mini" class="operation-button" @click="recall(scope.row.guid,scope.row.isDuZhan)">
                  <i class="iconfont icon-bianji2"><span>撤回</span></i>
                </el-button>
                <el-button v-if="scope.row.zhuangTai == 1001 || scope.row.zhuangTai == 1011" type="info" plain size="mini" class="operation-button" @click="delFunc(scope.row)">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <template slot="emptyDis" v-if="$store.state.logoType == 1">
            <div><i class="el-icon-info info-tit"></i>您当前暂无项目场地预约信息</div>
            <div>
              您可以对项目的开标/评标/谈判等环节预约会议室，会议室场地在“<span style="color: blue">信息资源--场地维护</span>”页面进行设置
            </div>
          </template>
        </self-table>
      </div>
      <div class="com-table-pagination clearfix" ref="table_pagination">
        <v-pagination :total="total" :page="searchForm.page" :limit="searchForm.rows" @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import PageCrumb from "@/components/PageCrumb";
import VPagination from "@/components/VPagination";
import mixins from "./mixins";
import { mixin_pagination } from '@/mixins';

export default {
  mixins: [mixins, mixin_pagination],
  components: { PageCrumb, VPagination },
  inject: ["globalSetting"],
  data() {
    return {
      breadcrumbList: [
        { label: "工作台", link: "/dashboard" },
        { label: "场地预约", link: "" },
      ],
      searchForm: {
        bdName: "",
        page: 1,
        rows: 10,
        hyAddress: "",
        bdName: "",
        hylx: "",
        zhuangTai: "",
      },
      total: 0,
      activeName: "first",
      isList: true,
      tableData: [],
      loading: false,
      iscollapsider: false,
    };
  },
  computed: {
    //从标前传过来的bdName
    bdName() {
      return this.$route.query.bdName;
    },
    orign() {
      return this.$route.query.from;
    },
  },
  created() {
    if (this.bdName) {
      this.searchForm.bdName = this.bdName;
    }
    this.initPagination(this.$route.query, this.searchForm);
    this.getList();
    this.computeTableHeight();
  },
  mounted() {},
  methods: {
    async getList() {
      this.loading = true;
      const param = {
        page: this.searchForm.page,
        rows: this.searchForm.rows,
        bdName: this.searchForm.bdName,
        hyAddress: this.searchForm.hyAddress,
        hylx: this.searchForm.hylx,
        zhuangTai: this.searchForm.zhuangTai,
      };
      var res = await this.portService.meetingTbList(param);
      if (res && res.data) {
        this.loading = false;
        this.tableData = res.data.rows;
        this.total = res.data.total;
      }
    },
    async goDetail(type, row) {
      if (type == 1) {
        var res = await this.portService.meetingSx({ guid: row.guid });
        if (res && res.code == 1) {
          this.$router.push({ path: "/meeting/appoint", query: { type: type, guid: row.guid } });
        }
      } else {
        this.$router.push({ path: "/meeting/appoint", query: { type: type, guid: row.guid } });
      }
    },
    delFunc(row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          var res0 = await this.portService.meetingSx({ guid: row.guid });
          if (res0 && res0.code == 1) {
            var res = await this.portService.meetingDelTbList({ guid: row.guid });
            if (res && res.code == 1) {
              this.$message.success(res.info);
              this.getList();
            }
          }
        })
        .catch(() => {});
    },
    handleSearch() {
      this.getList();
      this.iscollapsider = false;
    },
    resetFunc() {
      this.$refs.form.resetFields();
    },
    handleSizeChange(val) {
      this.searchForm.rows = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getList();
    },
    yes() {
      this.iscollapsider = !this.iscollapsider;
      setTimeout(() => {
        this.computeTableHeight();
      }, 600);
    },
    handleUpdateData() {
      this.$confirm("是否确认撤回信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chehui().then((res) => {
            if (res.code === 1) {
              this.$message.success(res.info);
              this.getPageInfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤回",
          });
        });
    },
    // 撤回
    async recall(entrustId,isDuZhan){
        let businessKey = "PurchasingProcurementEntrust:"+entrustId;
        if(isDuZhan == 2){
          let result = await this.portService.huiYiYuYueCallBack({guid:entrustId});
          if(result.code == 1){
              this.getList();
              this.$message({message:result.info,type: 'success'});
          }
        }else {
          let result = await this.portService.revokeApproval({businessKey:businessKey});
          if(result.code == 1){
              this.getList();
              this.$message({message:result.info,type: 'success'});
          }
        }
        
    },
  },
};
</script>
<style lang="scss">
.project-list {
  .type-list {
    span {
      margin-left: 20px;
      font-size: 14px; /*no*/
      cursor: pointer;
      display: inline-block;
      padding: 0px 12px;
      border-radius: 6px;
      height: 30px;
      line-height: 30px;
    }

    .active {
      background-color: #409eff;
      color: #ffffff;
    }
  }

  .show-switch {
    font-size: 32px;
    color: #aaaaaa;
    position: absolute;
    top: 28px;
    right: 18px;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }

  .el-tabs {
    background-color: #fff;
  }

  .card-type {
    .card-box {
      padding: 10px;
      box-sizing: border-box;

      .card-cont {
        border: 1px solid #cccccc;
        padding: 20px;
        height: 180px;
        position: relative;

        .card-name-box {
          padding-left: 50px;
          position: relative;

          i {
            position: absolute;
            left: 10px;
            top: 0px;
            font-size: 30px;
            color: blue;
          }

          .card-name {
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
          }
        }

        .card-step {
          margin-top: 20px;
          padding-left: 10px;
        }

        .card-sc {
          position: absolute;
          right: 20px;
          bottom: 10px;

          i {
            cursor: pointer;
            font-size: 20px;
          }
        }
      }
    }
  }

  .pos-re {
    position: relative;
  }
}

@media screen and (max-width: 1366px) {
  .project-list {
    .type-list {
      span {
        font-size: 12px; /*no*/
      }
    }
  }
}
</style>
