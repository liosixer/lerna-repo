<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <template v-if="this.$route.query.methods !='checkout'">
            <el-button :loading="saving" type="primary" size="small" @click="checkSubmmit(2)">审核通过</el-button>
            <el-button :loading="saving" type="warning" size="small" @click="checkSubmmit(3)">审核不通过</el-button>
          </template>
          <el-button @click="$router.go(-1)" size="small">返回</el-button>
        </div>
      </page-crumb>
      <!-- <div class="global-title-box">
        <span class="global-title-name">账户申诉审核--{{$route.query.methods =='checkout'?'查看':'审核'}}</span>
        <div class="global-title-btns fr">
          <template v-if="this.$route.query.methods !='checkout'">
            <el-button type="primary" size="small" @click="checkSubmmit(2)">审核通过</el-button>
            <el-button type="warning" size="small" @click="checkSubmmit(3)">审核不通过</el-button>
          </template>
          <el-button @click="$router.go(-1)" size="small">返回</el-button>
        </div>
      </div>-->
    </div>
    <div class="global-content">
      <el-card>
        <div slot="header">
          <span class="global-card-header-name">账户初始信息</span>
        </div>
        <div class="global-card-content">
          <el-form
            :model="qiYeBaseMessForm"
            label-width="125px"
            size="small"
            label-position="right"
            disabled
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户名">
                  <el-input v-model="qiYeBaseMessForm.userName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核状态">
                  <el-input v-model="shenPiZhuangTai" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="注册手机号">
                  <el-input v-model="qiYeBaseMessForm.userPhone" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册时间">
                  <el-date-picker
                    disabled
                    v-model="userBaseInfo.modifyTime"
                    type="date"
                    value-format="timestamp"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期"
                  ></el-date-picker>

                  <!--                  <el-date-picker v-model="qiYeBaseMessForm.createTime" type="datetime" disabled></el-date-picker>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户类别">
                  <el-radio-group v-model="qiYeBaseMessForm.userType">
                    <el-radio
                      v-for="item in userTypeOptions"
                      :key="item.code"
                      :label="item.code"
                    >{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="qiYeBaseMessForm.qiYeName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="交易主体类型">
                  <!--                  <el-input v-model="qiYeBaseMessForm.zhuTiLeiXing" placeholder="请输入"></el-input>-->
                  <el-checkbox-group v-model="qiYeBaseMessForm.zhuTiLeiXing">
                    <el-checkbox label="T">投标人/供应商</el-checkbox>
                    <el-checkbox label="B">招标人/采购人</el-checkbox>
                    <el-checkbox label="A">招标代理</el-checkbox>
                    <!-- <el-checkbox label="B" v-if="formData.userLeiBie == 2"
                      >采购人/招标人</el-checkbox
                    >-->
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="企业代码类型">
                  <el-radio-group v-model="qiYeBaseMessForm.qiYeBHType">
                    <el-radio
                      v-for="item in enterpriseCodeOptions"
                      :key="item.code"
                      :label="item.code"
                    >{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="社会信用代码">
                  <el-input v-model="qiYeBaseMessForm.qiYeBH" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照附件" class="fujianFile-list">
                  <ul>
                    <li
                      v-for="item in zzFujianList"
                      :key="item.guid"
                      @click="downLoadFileItem(item.guid,item.name)"
                    >
                      <i class="el-icon-document"></i>
                      <span>{{item.name}}</span>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="营业范围" prop="yeWuFanWei">
                  <el-input v-model="qiYeBaseMessForm.yeWuFanWei" placeholder="请输入"></el-input>
                  <!--                  <el-select v-model="qiYeBaseMessForm.yeWuFanWei" multiple-->
                  <!--                             class="custom-mul-select"-->
                  <!--                             :disabled="false">-->
                  <!--                    <el-option-->
                  <!--                            v-for="item in options"-->
                  <!--                            :key="item.value"-->
                  <!--                            :label="item.label"-->
                  <!--                            :value="item.value">-->
                  <!--                    </el-option>-->
                  <!--                  </el-select>-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="24">
                  <el-form-item label="注册资金">
                    <!--                  <el-input v-model="qiYeBaseMessForm.zhuCeZiJin" placeholder="请输入"></el-input>-->
                    <!--                  <el-input v-model="qiYeBaseMessForm.zhuCeZiJinBiZhong" placeholder="请输入"></el-input>-->
                    <!--                  <el-input v-model="qiYeBaseMessForm.zhuCeZiJinDanWei" placeholder="请输入"></el-input>-->
                    <el-col :span="12">
                      <el-input
                        type="number"
                        v-model="qiYeBaseMessForm.zhuCeZiJin"
                        placeholder="请请输入注册资金"
                      ></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-select
                        style="width:100%"
                        v-model="qiYeBaseMessForm.zhuCeZiJinDanWei"
                        placeholder="请选择单位"
                      >
                        <el-option value="1" label="元"></el-option>
                        <el-option value="2" label="万元"></el-option>
                        <el-option value="3" label="千元"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-select
                        style="width:100%"
                        v-model="qiYeBaseMessForm.zhuCeZiJinBiZhong"
                        placeholder="请选择币种"
                      >
                        <el-option
                          v-for="i of moneyType"
                          :value="i.huoBiDaiMaNumber"
                          :key="i.guid"
                          :label="i.huoBiDaiMa_Name"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所在行政区域" prop="arear">
                  <el-input v-model="areaArrStr" placeholder="请输入"></el-input>
                  <!--                  <el-cascader-->
                  <!--                          :options="arearOptions"-->
                  <!--                          v-model="areaArr"-->
                  <!--                          style="width:100%"-->
                  <!--                          placeholder="请选择"-->
                  <!--                  ></el-cascader>-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通讯地址">
                  <el-input v-model="qiYeBaseMessForm.jinYingDiZhi" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="注册地址">
                  <el-input v-model="qiYeBaseMessForm.zhuCeDiZhi" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮编号码">
                  <el-input v-model="qiYeBaseMessForm.youBian" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card>
        <div slot="header">
          <span class="global-card-header-name">账户申诉信息</span>
        </div>
        <div class="global-card-content">
          <el-form
            :model="zhangHaoShengSuVO"
            label-width="125px"
            size="small"
            label-position="right"
            disabled
          >
            <el-row :gutter="20">
<!--              <el-col :span="12">-->
<!--                <el-form-item label="申诉用户名">-->
<!--                  <el-input v-model="zhangHaoShengSuVO.shengSuUserName" placeholder="请输入"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="12">
                <el-form-item label="申诉手机号">
                  <el-input v-model="zhangHaoShengSuVO.shengSuUserPhone" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="原注册手机号">
                  <el-input v-model="zhangHaoShengSuVO.zhuCePhone" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">

              <el-col :span="12">
                <el-form-item label="申诉时间">
                  <el-date-picker
                    disabled
                    v-model="zhangHaoShengSuVO.createTime"
                    type="date"
                    value-format="timestamp"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申诉状态">
                  <el-select v-model="zhangHaoShengSuVO.status" placeholder="请输入">
                    <el-option
                        v-for="item in appealStatus"
                        :value="item.code"
                        :label="item.name"
                        :key="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="申诉材料" class="fujianFile-list">
                  <ul>
                    <li
                      v-for="item in zzFujianList"
                      :key="item.guid"
                      @click="downLoadFileItem(item.guid,item.name)"
                    >
                      <i class="el-icon-document"></i>
                      <span>{{item.name}}</span>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix" ref="second">
          <span class="global-card-header-name">审核记录</span>
        </div>
        <div class="global-card-content">
          <self-table border :data="shenHeJiLuList" stripe>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="提交时间" prop="createTime" show-overflow-tooltip>
              <template slot-scope="{ row }">
                <span>{{row.createTime | timestampChange}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作类型" prop="lxrName">
              <template slot-scope="{ row }">
                <span>{{row.isShenHe | getTypeNameFilter('auditOptionType')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作时间" prop="commitTime">
              <template slot-scope="{ row }">
                <span>{{row.commitTime | timestampChange}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作人" prop="shenHeRen"></el-table-column>
            <el-table-column label="操作结果" prop="jnJe">
              <template slot-scope="{ row }">
                <span>{{row.isShenHe | getTypeNameFilter('registerStatus')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核意见" prop="shenHeYiJian" min-width="130px"></el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
    </div>
    <audit-dialog ref="nopassDialog" @getOpinion="getOpinion"></audit-dialog>
    <preview-dialog ref="previewDialog"></preview-dialog>
  </div>
</template>
<script>
import Upload from "@/components/Upload";
import PageCrumb from "@/components/PageCrumb";
import Mixin from "../../mixin";
import registerStatus from "@/setting/status";
import util from "@/utils/utils";
import bizhong from "@/service/bi";
import AuditDialog from "@/components/dailog/AuditDialog";
import statusOptions from "@/setting/status";
import previewDialog from "@/components/Preview";
export default {
  name: "accountAppealDetail",
  mixins: [Mixin],
  components: { Upload, PageCrumb, AuditDialog, previewDialog },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      qyStatus: "",
      qiYeBaseMessForm: {},
      zhangHaoShengSuVO: {},
      userBaseInfo: {},
      shenHeJiLuList: [],
      moneyType: bizhong,
      breadcrumbList: [
        { label: "交易用户管理", link: "" },
        { label: "账户审核申诉", link: "/baseInfo/accoutAppeal" },
        {
          label: this.$route.query.methods == "checkout" ? "查看" : "审核",
          link: ""
        }
      ],
      guid: "", //审核id
      areaArr: [],
      areaArrStr: "",
      auditData: {
        guid: "",
        shenHeYiJian: "",
        shenHeStatus: "",
        shenHeYiJianType: ""
      },
      appealStatus: [],
      zzFujianList: [],
      clFujianList: [],
      userTypeOptions: [
        {
          code: 1,
          name: "企业"
        },
        {
          code: 2,
          name: "自然人"
        }
      ],
      enterpriseCodeOptions: [
        {
          code: 1,
          name: "组织机构代码"
        },
        {
          code: 2,
          name: "统一社会信用代码"
        }
      ],
      saving:false
    };
  },
  created() {
    this.registerStatus = statusOptions.registerStatus;
    this.appealStatus = statusOptions.registerStatus;
    this.guid = this.$route.query.id;
    this.getDetail();
  },
  computed: {
    shenPiZhuangTai: {
      get: function() {
        let name = "";
        this.registerStatus.forEach(v => {
          if (v.code == this.qiYeBaseMessForm.shenPiZhuangTai) {
            name = v.name;
          }
        });
        return name;
      },
      set: function(value) {
        let code = "";
        this.registerStatus.forEach(v => {
          if (v.name == value) {
            code = v.code;
          }
        });
        return code;
      }
    }
  },
  methods: {
    async getDetail() {
      const { data, code } = await this.portService.zhangHaoShenSudetail({
        guid: this.guid
      });
      console.log("data", data);
      if (code) {
        this.qiYeBaseMessForm = data.qiYeBaseMessForm;
        this.userBaseInfo = data.userBaseInfo;
        this.zhangHaoShengSuVO = data.zhangHaoShengSuVO;
        this.shenHeJiLuList = data.shenHeJiLuList;
        this.zzFujianList.push({
          guid: this.qiYeBaseMessForm.zhiZhaoFuJian,
          name: this.qiYeBaseMessForm.zhiZhaoFuJianName
        });
        this.qiYeBaseMessForm.zhuTiLeiXing = this.qiYeBaseMessForm.zhuTiLeiXing.split(
          ","
        );
        this.areaArr.push(this.qiYeBaseMessForm.shengId.toString());
        this.areaArr.push(this.qiYeBaseMessForm.shiId.toString());
        this.areaArr.push(this.qiYeBaseMessForm.areaId.toString());
        this.areaArrStr =
          this.qiYeBaseMessForm.provinceName +
          "," +
          this.qiYeBaseMessForm.cityName +
          "," +
          this.qiYeBaseMessForm.areaName;
        this.auditData.guid = data.guid;

        const { files, filesCode } = await util.getFiles(
          data.zhangHaoShengSuVO.fileId
        );
        console.log("files", files);
        if (filesCode) {
        }

        // this.qiYeBaseMessForm.createTime = timestampChange(data.qiYeBaseMessForm.createTime)
      }
    },
    // 下载附件
    async downLoadFileItem(guid, name) {
      // util.downLoad(item.guid);
      // let url = await util.getDownSrc(item.guid)
      // window.open(url)
      const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
      if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
        this.$refs["previewDialog"].dialogVisible = true;
        this.$refs["previewDialog"].guid = guid;
        this.$refs["previewDialog"].fileName = name;
      } else {
        util.getDownSrc(guid).then(res => {
          window.location.href = res;
        });
      }
    },
    async checkSubmmit(type) {
      // type 2通过 3不通过
      this.auditData.shenHeStatus = type;
      if (type === 2) {
        this.auditData.shenHeYiJianType = '',
        this.auditData.shenHeYiJian = '',
        this.saving = true;
        this.portService.zhangHaoShengSuShenHe(this.auditData).then(res => {
          if (res.code === 1) {
            this.saving = false;
            this.$message.success("通过审核");
            this.getPageInfo();
          }
        });
      }else{
        this.$refs["nopassDialog"].dialogFormVisible = true;
      }

    },
    // 获取审核不通过理由
    getOpinion(val) {
      this.auditData.shenHeYiJian = val.opinion;
      this.auditData.shenHeYiJianType = val.shenHeYiJianType;
      this.auditMethod();
    },
    async auditMethod() {
      var result = await this.portService.zhangHaoShengSuShenHe(this.auditData);
      if (result.code == 1) {
        this.$message({ message: result.data, type: "success" });
        this.$router.go(-1);
      } else {
        this.$message({ message: result.data, type: "warning" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.fujianFile-list {
  .el-form-item__content {
    vertical-align: middle;
  }
  ul {
    font-size: 14px;
    i {
      margin-right: 5px;
    }
    span {
      color: #157edf;
    }
    li {
      line-height: 1.7;
      cursor: pointer;
    }
  }
}
</style>
