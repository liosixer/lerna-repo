<template>
  <div class="global-content" :class="{ fold_content: !foldMemu }" ref="info">
    <!-- <div > -->
    <!-- <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">资质信息</span>
           <el-button size="small"
                type="primary"
                v-if="location"
                style="float:right;"
                @click="handleQualification(null, 0)"
                >添加</el-button>
        </div>
        <div class="global-card-content" ref="basicInfo">
        <self-table :data="formData.ziZhiXinXiList"
          border
          header-cell-class-name="headercell"
          style="width:100%;margin:0;"
          :fit="true"
          max-height="290"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="ziZhiZhengShuName"
            label="资质证书名称"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="ziZhiZhengShuBH"
            label="资质证书编号"
            min-width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="ziZhiZhengShuJiBie"
            label="资质证书级别"
            min-width="150px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{
              ['初级','中级','高级'][scope.row.ziZhiZhengShuJiBie]
              }}</template>
          </el-table-column>
          <el-table-column
            prop="ziZhiZhengShuStartTime"
            label="资质有效期开始时间"
            min-width="150px"
            show-overflow-tooltip
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.ziZhiZhengShuStartTime | timestampChange
            }}</template></el-table-column
          >
          <el-table-column
            prop="ziZhiZhengShuEndTime"
            label="资质有效期结束时间"
            min-width="150px"
            show-overflow-tooltip
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.ziZhiZhengShuEndTime | timestampChange
            }}</template>
          </el-table-column>
          <el-table-column
            prop="ziZhiZhengShuFuJianName"
            label="资质证书附件"
            min-width="150px"
            show-overflow-tooltip
            ><template slot-scope="scope"
              ><span
                class="linkurl"
                @click="downloadFile(scope.row.ziZhiZhengShuFuJianGuid)"
                >{{ scope.row.ziZhiZhengShuFuJianName }}</span
              ></template
            ></el-table-column
          >
          <el-table-column fixed="right" label="操作" min-width="150" align="left">
            <template slot-scope="scope" v-if="location">
              <el-button-group class="operation-button-group">
                <el-button
                  type="primary" plain
                  size="mini"
                  @click="handleQualification(scope.row)"
                  class="operation-button">
                  <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>
                <el-button
                  type="info" plain
                  size="mini"
                  class="operation-button"
                  @click="handleDelQualifications(scope.row.guid)">
                  <i class="iconfont icon-shanchu1"><span>删除</span></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
    </el-card>-->

    <el-card>
      <div slot="header" class="clearfix">
        <span class="global-card-header-name">供应商专业申请</span>
        <el-button size="small" type="primary" @click="handleshowPurchaseDailog" v-if="location" style="float:right;">添加</el-button>
      </div>
      <div class="global-card-content" ref="frdbInfo">
        <self-table :data="listData" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290" :span-method="objectSpanMethod">
          <el-table-column type="index" label="序号" align="center" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zhuanYeFenLeiName" label="行业分类" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="caiGouDanWei" label="采购单位" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="shenQiZiLiaoMoBanName" label="申请资料模板下载" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="linkurl" @click="downloadFile(scope.row.shenQiZiLiaoMoBanGuid, scope.row.shenQiZiLiaoMoBanName)">{{ scope.row.shenQiZiLiaoMoBanName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="shenQiZiLiaoName" label="申请资料上传" min-width="150px" show-overflow-tooltip>
            <!-- 需要补全guid -->
            <template slot-scope="scope">
              <span class="linkurl" @click="downloadFile(scope.row.shenQiZiLiaoGuid, scope.row.shenQiZiLiaoName)">{{ scope.row.shenQiZiLiaoName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gongXiangFanWei" label="专业范围" min-width="150px" show-overflow-tooltip>
            <template slot-scope="{row}">
              <template v-if="row.gongXiangFanWei">
                {{row.gongXiangFanWei == 1 ? "板块共享" : "集团共享"}}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="入库状态" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.status !== null">
                <span class="status-going" v-if="scope.row.status === 1">{{ statusArr[scope.row.status] }}</span>
                <span class="status-going" v-else-if="scope.row.status === 21">审核中</span>
                <span class="status-success" v-else-if="scope.row.status === 2">{{ statusArr[scope.row.status] }}</span>
                <span class="status-fail" v-else-if="scope.row.status === 3">{{ statusArr[scope.row.status] }}</span>
               <span class="status-fail" v-else-if="scope.row.status === 31">审核不通过</span>
                <span class="status-going" v-else-if="scope.row.status === 32">审核中</span>
                <span class="status-other" v-else>{{ statusArr[scope.row.status] }}</span>
              </div>
              <div v-else>
                <span class="status-other">未提交</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="isYouXiao" label="是否有效" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
<!--              <div v-if="scope.row.status > 1 && scope.row.status != 21">-->
                <span v-if="scope.row.status === 2" class="status-success">有效</span>
                <span v-else class="status-fail">无效</span>
<!--              </div>-->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="250" align="left">
            <template slot-scope="scope">
              <el-button-group class="operation-button-group">
                <!-- <el-button
                  type="primary" plain class="operation-button blueBtn"
                  v-if="scope.row.status == 2"
                  size="mini"
                  @click="handleChangePurchaseStatus(scope.row.guid)">
                  <i class="iconfont icon-biangengguanli"><span>变更</span></i>
                </el-button>-->
                <!-- <el-button
                    type="primary" plain class="operation-button blueBtn"
                    size="mini"
                    v-if="scope.row.status == 2"
                    @click="EditPurcase(scope.row)"
                    v-if="scope.row.status != 2">
                    <i class="iconfont icon-bianji2"><span>编辑</span></i>
                </el-button>-->
                <!-- statusArr: ['未提交', '审核中', '审核通过', '审核未通过'], -->
                <el-button type="primary" plain class="operation-button blueBtn" size="mini" @click="handleEditPurcase(scope.row)" v-if="!scope.row.status || scope.row.status == 3">
                  <i class="iconfont icon-bianji2">
                    <span>编辑</span>
                  </i>
                </el-button>
                <el-button type="info" plain class="operation-button blueBtn" v-if="scope.row.status == 3 || !scope.row.status" @click="handleDelSupplier(scope.row.guid)" size="mini">
                  <i class="iconfont icon-shenhe">
                    <span>删除</span>
                  </i>
                </el-button>
                <el-button type="primary" plain class="operation-button blueBtn" size="mini" v-if="[1,21,31].includes(scope.row.status)" @click="handleTreatPurcase2(scope.row.guid)">
                  <i class="iconfont icon-bianji2">
                    <span>撤回</span>
                  </i>
                </el-button>
                <el-button type="primary" plain class="operation-button blueBtn" size="mini" v-if="[2].includes(scope.row.status)" @click="handleTreatPurcase(scope.row.guid)">
                  <i class="iconfont icon-bianji2">
                    <span>撤销</span>
                  </i>
                </el-button>

                <el-button type="primary" plain class="operation-button blueBtn" @click="handleShowRecord(scope.row.guid)" size="mini">
                  <i class="iconfont icon-shenhe">
                    <span>审核记录</span>
                  </i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span class="global-card-header-name">业绩信息</span>
        <el-button size="small" type="primary" @click="handleAddPerformance" v-if="location" style="float:right;">添加</el-button>
      </div>
      <div class="global-card-content" ref="bankInfo">
        <self-table :data="formData.yeJiXinXiList" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290">
          <el-table-column type="index" label="序号" align="center" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xiangMuName" label="项目名称" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zhuanYeFenLeiName" label="行业分类" width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column class-name="table-column-money" prop="heTongJinE" label="合同金额（万元）" align="right" width="140" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.heTongJinE / 1000000 }}</template>
          </el-table-column>
          <el-table-column prop="xiangMuEndTime" label="合同签订时间" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.xiangMuEndTime | timestampChange }}
            </template>
          </el-table-column>
          <el-table-column prop="heTongQianDingFang" label="合同签订方" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="heTongQianDingFang" label="项目类型" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{ ["工程", "物资", "服务"][scope.row.xmLeiXing] }}</template>
          </el-table-column>
          <el-table-column prop="xiangMuHeTongFuJianName" label="合同附件" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="linkurl" @click="downloadFile(scope.row.xiangMuHeTongFuJianGuid, scope.row.xiangMuHeTongFuJianName)">{{ scope.row.xiangMuHeTongFuJianName }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="160" align="left">
            <template slot-scope="scope" v-if="location">
              <el-button-group class="operation-button-group">
                <el-button type="primary" plain class="operation-button" @click="handleEditPerformance(scope.row)" size="mini">
                  <i class="iconfont icon-bianji2">
                    <span>编辑</span>
                  </i>
                </el-button>
                <el-button type="info" plain class="operation-button" @click="deletEditPerformance(scope.row.guid)" size="mini">
                  <i class="iconfont icon-shanchu1">
                    <span>删除</span>
                  </i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span class="global-card-header-name">本平台项目</span>
      </div>
      <div class="global-card-content" ref="fbInfo">
        <self-table :data="platformProjects" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290">
          <el-table-column type="index" label="序号" align="center" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gcName" label="项目名称" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hangYeLeiBie" label="行业类别" min-width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="heTongFuJianName" label="项目合同附件" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="linkurl" @click="downloadFile(scope.row.heTongFuJianGuid, scope.row.heTongFuJianName)">{{ scope.row.heTongFuJianName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zbr" label="采购人/招标人" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.zbr }}</template>
          </el-table-column>
          <el-table-column prop="xmLeiXing" label="项目类型" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.zbr }}</template>
          </el-table-column>
          <el-table-column class-name="table-column-money" prop="zhongBiaoJinE" label="中标/成交金额(元)" min-width="150px" show-overflow-tooltip align="right"></el-table-column>
          <el-table-column prop="zhongBiaoTime" label="中标/成交时间" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.zhongBiaoTime && scope.row.zhongBiaoTime | timestampChange }}</template>
          </el-table-column>
          <el-table-column prop="gongYingShangPingJia" label="供应商评价" min-width="150px" show-overflow-tooltip></el-table-column>
          <div slot="empty" class="custom-empty"></div>
        </self-table>
      </div>
    </el-card>
    <!-- </div> -->
    <preview-dialog ref="previewDialog"></preview-dialog>
    <QualificationsDailog @uploadQualification="handleUploadQualification" @onClose="handleOnClose" :qData="qData" v-if="showDialogVisible"></QualificationsDailog>
    <PurchaseDailog v-if="showPurchaseDailog" @onShow="handleOnShow" :subjectCat="subjectCat" @onSuc="handleonSuc" :pData="pData"></PurchaseDailog>
    <RecordDailog v-if="showRecordDailog" :records="records" @showRecord="handleShowRecordfn"></RecordDailog>
    <PerformanceDailog v-if="showPerformanceDailog" :subjectCat="subjectCat" :perData="perData" @onSuccess="handleOnSuccess" @showPerformance="handleShowPerformance"></PerformanceDailog>
    <!-- <h1>{{isPadding}}</h1> -->
    <AnchorNav :dataArr="arrData" wapper=".global-content" :offsetTop="0" @changeFold="handleChangeFold"></AnchorNav>
  </div>
</template>

<script>
import AnchorNav from "@/components/AnchorNav/";
import {
  getSupplierInfo,
  getSubjectRecords,
  treatPurcase2,
  delQualifications,
  treatPurcase,
  getSubjectCategory,
  getPlatformProjects,
  changePurchaseStatus,
  deletePerformance,
  delSuppliseAsk,
} from "@/service/enterpriseInfo";
import u from "@/utils/util";
import previewDialog from "@/components/Preview";
import QualificationsDailog from "./dailog/qualificationsDailog";
import PurchaseDailog from "./dailog/purchaseDailog";
import RecordDailog from "./dailog/recordDailog";
import PerformanceDailog from "./dailog/performanceDailog";
import utils from "../../../utils/utils";
export default {
  name: "Info",
  props: {
    isPadding: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    QualificationsDailog,
    PurchaseDailog,
    RecordDailog,
    PerformanceDailog,
    AnchorNav,
    previewDialog,
  },
  data() {
    return {
      foldMemu: false,
      arrData: [
        // {
        //   name: '资质信息',
        //   id:'basicInfo'
        // },
        {
          name: "供应商专业申请",
          id: "frdbInfo",
        },
        {
          name: "业绩信息",
          id: "bankInfo",
        },
        {
          name: "本平台项目",
          id: "fbInfo",
        },
      ],
      isYouxiao: ["无效", "有效"],
      statusArr: ["未提交", "审核中", "审核通过", "审核未通过"],
      showPurchaseDailog: false,
      showDialogVisible: false,
      showRecordDailog: false,
      showPerformanceDailog: false,
      qData: {}, //临时保存编辑资质证书要传递的数据
      pData: {}, // 临时保存供应商数据
      perData: {}, // 临时存储业绩数据
      records: [],
      formData: {
        ziZhiXinXiList: [],
        yeJiXinXiList: [],
        gongYingShangList: [],
      },
      showQ: false,
      subjectCat: [], //专业或者行业分类
      platformProjects: [],
      foldMemu: false,
      rowList: [],
      spanArr: [],
      position: 0,
      spanArr2: [],
      position2: 0,
      listData: [],
    };
  },
  computed: {
    location() {
      return this.$route.path === "/qyxxgl/gyszyxx";
    },
    token() {
      return window.sessionStorage.getItem("access_token");
    },
  },
  created() {
    this._getInfo();
    // 获取分类信息
    getSubjectCategory()
      .then((res) => {
        if (res.code === 1) {
          this.subjectCat = res.data.zhuanYeList;
        }
      })
      .catch((e) => {
        console.error(e);
      });
    // 获取本平台的项目
    getPlatformProjects()
      .then((res) => {
        if (res.code === 1) {
          this.platformProjects = res.data.rows;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    handleTreatPurcase(guid) {
      treatPurcase({ guid }).then((res) => {
        if (res.code === 1) {
          this.$message.success(res.info);
          this._getInfo();
        }
      });
    },
    handleTreatPurcase2(guid) {
      treatPurcase2({ guid }).then((res) => {
        if (res.code === 1) {
          this.$message.success(res.info);
          this._getInfo();
        }
      });
    },
    handleDelSupplier(guid) {
      this.$confirm("确定要删除该条记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delSuppliseAsk({ guid }).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.info);
            this._getInfo();
          }
        });
      });
    },
    rowspan() {
      var countztfw = 0;
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.listData[index].zhuanYeFenLeiName === this.listData[index - 1].zhuanYeFenLeiName) {
            if (this.listData[index].status === 2) {
              countztfw++;
            }
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
      console.log(this.spanArr);
    },
    rowspan2() {
      var countztfw = 0;
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr2.push(1);
          this.position2 = 0;
          if (this.listData[index].status === 2) {
            countztfw += 1;
          }
        } else {
          if (this.listData[index].caiGouDanWei === this.listData[index - 1].caiGouDanWei) {
            if (this.listData[index].status === 2) {
              countztfw += 1;
            }
            this.spanArr2[this.position2] += 1;
            this.spanArr2.push(0);
          } else {
            // if (countztfw > 1) {
            //   this.listData[this.position2].zyfw = "全集团共享";
            // } else {
            //   this.listData[this.position2].zyfw = "仅申请单位";
            // }
            countztfw = 0;
            this.spanArr2.push(1);
            this.position2 = index;
          }
        }
      });
      console.log(this.spanArr);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //表格合并行
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        const _row2 = this.spanArr2[rowIndex];
        const _col2 = _row2 > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else if (columnIndex === 3) {
        const _row2 = this.spanArr2[rowIndex];
        const _col2 = _row2 > 0 ? 1 : 0;
        return {
          rowspan: _row2,
          colspan: _col2,
        };
      } else if (columnIndex === 2) {
        const _row2 = this.spanArr2[rowIndex];
        const _col2 = _row2 > 0 ? 1 : 0;
        return {
          rowspan: _row2,
          colspan: _col2,
        };
      }
    },
    handleChangeFold(data) {
      this.foldMemu = data;
    },
    handleOnSuccess() {
      this._getInfo();
    },
    downloadFile(guid, name) {
      console.log(name);
      const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
      if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
        this.$refs["previewDialog"].dialogVisible = true;
        this.$refs["previewDialog"].guid = guid;
        this.$refs["previewDialog"].fileName = name;
      } else {
        u.getDownSrc(guid).then((res) => {
          window.location.href = res;
        });
      }
    },
    handleOnClose(data) {
      this.showDialogVisible = data;
    },
    handleOnShow(data) {
      this.showPurchaseDailog = data;
    },
    handleonSuc() {
      this._getInfo();
      // window.location.reload()
    },
    handleshowPurchaseDailog() {
      this.showPurchaseDailog = true;
      this.pData = {};
    },
    _getInfo() {
      this.rowList = [];
      this.spanArr = [];
      this.spanArr2 = [];
      this.position = 0;
      this.position2 = 0;
      // this.listData = []
      // this.formData.gongYingShangList = []
      getSupplierInfo().then((res) => {
        if (res.code === 1) {
          var data = res.data;
          this.listData = data.gongYingShangList;
          this.rowspan();
          this.rowspan2();
          this.formData = Object.assign(this.formData, data);
        }
      });
    },
    handleUploadQualification(data) {
      this.showQ = false;
      this._getInfo();
    },
    handleQualification(data) {
      this.showDialogVisible = true;
      this.qData = data;
    },
    //删除资质证书
    handleDelQualifications(guid) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delQualifications({ guid })
            .then((res) => {
              if (res.code === 1) {
                this.$message.success("删除成功");
                this.formData.ziZhiXinXiList = this.formData.ziZhiXinXiList.filter((item) => {
                  if (item.guid !== guid) {
                    return item;
                  }
                });
              }
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查看变更记录
    handleShowRecord(guid) {
      this.records = [];
      this.showRecordDailog = true;
      getSubjectRecords({ guid })
        .then((res) => {
          if (res.code === 1) {
            this.records = res.data.shjlList;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    //编辑业绩
    handleEditPerformance(data) {
      const d = JSON.parse(JSON.stringify(data));
      d.hangYeFenLei = d.hangYeFenLei.split(",");
      this.perData = d;
      this.showPerformanceDailog = true;
    },
    //删除业绩
    deletEditPerformance(guid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePerformance({ guid }).then((res) => {
            if (res.code === 1) {
              this.$message.success(res.info);
              this.formData.yeJiXinXiList = this.formData.yeJiXinXiList.filter((item) => {
                if (item.guid !== guid) {
                  return item;
                }
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleShowRecordfn(data) {
      this.showRecordDailog = data;
    },
    handleShowPerformance(data) {
      this.showPerformanceDailog = data;
    },
    handleAddPerformance() {
      this.perData = {};
      this.showPerformanceDailog = true;
    },
    // 编辑供应商zil
    handleEditPurcase(data) {
      let d = JSON.parse(JSON.stringify(data));
      d.zhuanYeFenLei = d.zhuanYeFenLei.split(",");
      this.pData = d;
      this.showPurchaseDailog = true;
    },
    // 变更供应商审核状态
    // handleChangePurchaseStatus (guid) {
    //   changePurchaseStatus({ guid }).then(res => {
    //     if (res.code === 1) {
    //       this._getInfo()
    //     }
    //   }).catch(e => {
    //     console.error(e)
    //   })
    // }
  },
};
</script>
<style lang="scss" scoped></style>
