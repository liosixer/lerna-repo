<template>
  <div class="page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}"></page-crumb>
      <div class="global-title-box">
        <span class="global-title-name">模版文件--{{!checkout?'编辑':'查看'}}</span>
        <div class="global-title-btns fr">
<!--          <el-button>导出</el-button>-->
          <el-button @click="$router.go(-1)" size="small">返回</el-button>
        </div>
      </div>
    </div>
    <div class="global-content" >
      <el-card>
        <div slot="header">
          <span class="global-card-header-name">基本信息</span>
        </div>
        <div class="global-card-content">
          <el-form :model="basicInfoForm" label-width="125px" size="small" label-position="right" disabled>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="标段名称">
                  <el-input v-model="basicInfoForm.bdName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标段编号">
                  <el-input v-model="basicInfoForm.bdBh" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="采购单位">
                  <el-input v-model="basicInfoForm.zbrName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="代理机构">
                  <el-input v-model="basicInfoForm.zbdlName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="项目经理">
                  <el-input v-model="basicInfoForm.xmjlName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="basicInfoForm.phone" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="金额">
                  <el-input v-model="basicInfoForm.zbwjbsJinE" placeholder="请输入">
                    <template slot="suffix">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="购标截止时间">
                  <el-date-picker
                          v-model="basicInfoForm.gouBiaoEndTime"
                          type="date"
                          clear-icon="el-icon-circle-close"
                          format="yyyy-MM-dd hh:mm"
                          placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="已缴纳家数">
                  <el-input v-model="basicInfoForm.jiaoNaNum" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix" ref="second">
          <span class="global-card-header-name">缴纳记录</span>
        </div>
        <div class="global-card-content">
          <self-table border :data="paymentInfoList" stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="供应商名称" prop="tbrName" show-overflow-tooltip></el-table-column>
            <el-table-column label="联系人" prop="lxrName"></el-table-column>
            <el-table-column label="联系电话" prop="lxrPhone"></el-table-column>
            <el-table-column label="缴纳方式" prop="jnFangShi">
              <template slot-scope="{ row }">
                <span>{{row.jnFangShi | getTypeNameFilter('template','paymentType')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="金额(元)" prop="jnJe" class-name="table-column-money">
              <template slot-scope="{ row }">
                <span>{{row.jnJe?(row.jnJe/100).toFixed(2):''}}</span>
              </template>
            </el-table-column>
            <el-table-column label="缴纳时间" prop="jnTime" min-width="130px">
              <template slot-scope="{ row }">
                <span>{{row.jnTime | timestampChange}}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单号" prop="orderNum" show-overflow-tooltip></el-table-column>
            <el-table-column label="开票状态" prop="kpStatus">
              <template slot-scope="{ row }">
                <span>{{row.kpStatus | getTypeNameFilter('template','invoiceStates')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="120" align="left">
              <template slot-scope="{row}">
                <el-button-group class="operation-button-group">
                  <el-button @click="checkout(row)" size="small" type="primary" plain class="operation-button">
                    <i class="iconfont icon-anniutubiao-"><span>查看订单</span></i>
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import Upload from "@/components/Upload";
import PageCrumb from "@/components/PageCrumb";
import { timestampChange, getLabel } from "@/assets/js/filter";

export default {
  name: "templateDetail",
  mixins: [mixins],
  components: { Upload, PageCrumb },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      basicInfoForm: {},
      paymentInfoList: [{}],
      uploadAdress: "",
      breadcrumbList: [
        { label: "首页", link: "/template/template" },
        { label: "示例文件", link: "/template/template" },
        { label: "详情", link: "" }
      ],
      ggBdGuid:'',//标书id
    };
  },
  created() {
    this.ggBdGuid = this.$route.query.id
    this.getDetail()
  },
  methods:{

    async getDetail() {
      const { data, code } = await this.portService.biaoshuPageDetail({
        ggBdGuid:this.ggBdGuid
      });
      if (code) {
        this.basicInfoForm = data
        // console.log(this.basicInfoForm)
        if(this.basicInfoForm.zbdlName === ''){
          this.basicInfoForm.zbdlName = ' '
        }
        this.paymentInfoList = data.voList
        this.basicInfoForm.zbwjbsJinE = this.basicInfoForm.zbwjbsJinE?(this.basicInfoForm.zbwjbsJinE/100).toFixed(2):''
      }
    },
    //跳转到订单详情
    checkout(row) {

    },
  },

};
</script>
<style lang="scss" scoped>
.form-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
