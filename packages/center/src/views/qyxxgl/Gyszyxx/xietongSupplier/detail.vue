<template>
  <section class="container page-detail">
     <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <div slot="btns">
        <el-button @click="$router.back()" size="small">返回</el-button>
      </div>
     </page-crumb>
<!--    <div class="qyxxglContent" :class="{fold_content : !foldMemu}">-->
    <div class="qyxxglContent global-content" :class="{fold_content : !foldMemu}">

      <el-form
        :model="dataView"
        ref="dataView"
        label-position="right"
        label-width="130px"
        width="100%"
        size="small"
      >
        <!-- </div> -->
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">基础信息</span>
        </div>
        <div class="global-card-content"  ref="frdbInfo">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="协同一级专业" prop="level1">
                  <el-input
                    type="text"
                    disabled
                    v-model="dataView.baseInfo.level1"
                    placeholder="请输入协同一级专业"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="协同二级专业" prop="level2">
                  <el-input
                    type="text"
                    disabled
                    v-model="dataView.baseInfo.level2"
                    placeholder="请输入协同二级专业"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="协同三级专业" prop="level3">
                  <el-input
                    type="text"
                    disabled
                    v-model="dataView.baseInfo.level3"
                    placeholder="请输入协同三级专业"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="协同供应商" prop="gysCounts">
                  <el-input
                    type="text"
                    disabled
                    v-model="dataView.baseInfo.gysCounts"
                    placeholder="请输入协同供应商"
                  >
                    <template slot="suffix">家</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
      </el-card>
      <el-card>
            <div slot="header" class="clearfix">
              <span class="global-card-header-name">协同供应商</span>
              <div style="float: right; margin-top: 10px">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleChooseSupplier"
                >从供应商库中选择</el-button>
              </div>
            </div>
            <div class="global-card-content" ref="frdbInfo">
            <self-table :data="dataView.gongYingShangList"
              border
              header-cell-class-name="headercell"
              style="width:100%;margin:0;"
              :fit="true"
              max-height="540"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="80"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="qiYeName"
                label="供应商名称"
                min-width="150px"
                show-overflow-tooltip
              >
                <template  slot-scope="scope" >
                  <div>
                    {{scope.row.qiYeName}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="qiYeBH"
                label="企业代码"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div>
                    {{scope.row.qiYeBH}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="xieTongLevel"
                label="协同级别"
                min-width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div>
                    <el-select  :disabled="!scope.row.isEdit" v-model="scope.row.xieTongLevel" placeholder="请选择">
                      <el-option
                              v-for="item in xietongLevel"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" min-width="120" align="left">
                <template slot-scope="scope" >
                  <el-button-group class="operation-button-group">
                    <el-button type="primary" plain class="operation-button" v-if="!scope.row.isEdit"
                                  size="small" @click="handleDel(scope.row.detailGuid)">
                                  <i class="iconfont icon-shanchu"><span>删除</span></i></el-button>
                    <el-button type="primary" plain class="operation-button" v-if="scope.row.isEdit"
                                  size="small" @click="handleAddRequst(scope.row)">
                                  <i class="iconfont icon-baocun"><span>保存</span></i></el-button>
                    <el-button type="primary" plain class="operation-button" v-if="!scope.row.isEdit"
                                  size="small" @click="handleEdit(scope.row)">
                                  <i class="iconfont icon-baocun"><span>编辑</span></i></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
              <div slot="empty" class="custom-empty"></div>
            </self-table>
          </div>
        </el-card>
      </el-form>
    </div>
    <AddSupplierDialog v-if="showSupplierDialog" @onSuccess="handleOnSuccess" :selectedGongyingshangGuid="selectedGongyingshangGuid" :infoGuid="infoGuid"></AddSupplierDialog>
  </section>
</template>

<script>
import PageCrumb from "@/components/PageCrumb"
import AnchorNav from '@/components/AnchorNav/'
import AddSupplierDialog from './addSupplierDialog'
import {supplierDetail, recordInfo, delSupplier} from '@/service/enterpriseInfo'
import u from '@/utils/utils'
export default {
  name: 'qyjbexx',
  data () {
    return {
      showSupplierDialog: false,
      checkDialogVisible: false,
      breadcrumbList: [
        { label: "专业供应商管理", link: "/supplier/management" },
        { label: "查看", link: "" }
      ],
      foldMemu: true,
      loading: true,
      dataView: {
       baseInfo: {},
       gongYingShangList:[],
       showSupplierDialog: true,
      },
      xietongLevel:[
        {
          name:'须选择',
          value:0
        },
        {
          name:'优先选择',
          value:1
        },
        {
          name:'鼓励选择',
          value:2
        }

      ],
      formData:{
        gongyingshangName:'',
        qiyeBH:''
      },
      isAdd:false,
      selectedGongyingshangGuid:'',
      infoGuid:''
    }
  },
  components: {
    PageCrumb,
    AddSupplierDialog,
  },
  created () {
    this.infoGuid = this.$route.query.infoGuid
    this.getPageInfo()
  },
  computed: {
    logoType () {
      return JSON.parse(window.sessionStorage.getItem('vuex')).logoType == 2
    }
  },
  methods: {
    handleDel (guid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.portService.deleteXietongSupplier({detailGuid:guid}).then(res => {
            if (res.code === 1) {
              this.$message.success('删除成功')
              this.getXietongSupplier()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    handleOnSuccess (data) {
      this.showSupplierDialog = data
      this.getXietongSupplier()
    },
    handleAddRequst(row){
      const {isEdit , ...rowData} = row
      let data = []
      data.push(rowData)
      let queryData = {}
      queryData.infoGuid = this.infoGuid
      queryData.qiyeArray = data
      this.portService.saveXietongDetail(queryData).then(res => {
        if (res.code === 1) {
          this.$message.success('保存成功')
          this.getXietongSupplier()
        }
      })
    },
    handleEdit(row){
      row.isEdit = true
    },
    handleChooseSupplier () {
      this.showSupplierDialog = true
    },
    getXietongSupplier(){
      this.portService.queryXietongDetailList({infoGuid:this.infoGuid}).then(res => {
        if (res.code === 1) {
          const data = res.data.list
          data.forEach((item)=>{
            item.isEdit = false
          })
          this.dataView.gongYingShangList = data
          
          let arrLength = data.length
       
          this.selectedGongyingshangGuid = data.reduce((total,item,index)=>{
            if(index == arrLength - 1){
              total = total + item.qiYeGuid
            }else{
              total = total + `${item.qiYeGuid}`
            }
            return total 
          },'')
        }
      })
    },
    getBaseInfo(){
      this.portService.getXietongDetail({infoGuid:this.$route.query.infoGuid}).then(res => {
        if (res.code === 1) {
          const data = res.data
          this.dataView.baseInfo = data
        }
      })
    },
    getPageInfo () {
      this.getXietongSupplier()
      this.getBaseInfo()
    }
  },
  watch: {
  }
}


</script>

<style lang="scss" scoped>
.page-detail{
  width: 100%;
  background: #fff;
  padding-top: 0;
  height: 100%;
  overflow: hidden;
}
.a_links{
  color: red;
  font-weight: bold;
}
.a_links:hover{
  text-decoration: underline;
}
.container {
  width: 100%;
  background: rgba(240, 242, 245, 1);
}
.zzxxDiv {
  background: #fff;
  margin-bottom: 20px;
  li{
    width: 50%;
    float: left;
    height: 54px;
  }
  li:last-child{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 20px;
  }
  .topDiv{
    height: 54px;
  }
}
.btn_record {
  color: #566df4;
  border-radius: 3px;
  padding: 5px 20px;
  border: 1px solid #566df4;
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
}
.ztt_label {
  padding-right: 10px;
}
.shztSpan {
  color: #eba23c;
}
.h_row {
  padding: 10px;
}
/*头部样式*/
.qyxxglHeader {
  width: 100%;
  background: #fff;
}
.item-info{
  color: #cccccc;
}
/*主体内容样式*/
.qyxxglContent {
  /*width: calc(100% - 18px);*/
  /*padding-right: 40px;*/
  /*padding-right: 160px;*/
  /*margin: 5PX 4PX;no*/
  .bottomLine {
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
  }
  > div {
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
  }
  > div:last-child{
    margin-bottom:0;
  }
  h3 {
    width: calc(100% - 40px);
    height: 54px;
    margin: 0 auto;
    color: #333;
    font-size: 16px;
    line-height: 55px;
  }
  .zhxxDiv {
    div {
      margin-bottom: 0;
    }
    ul {
      overflow: hidden;
      width: calc(100% - 40px);
      height: 126px;
      margin: 0 auto;
      li {
        float: left;
        width: 50%;
        height: 63px;
        span {
          display: inline-block;
          height: 63px;
          font-size: 14px;
          color: #000;
          line-height: 63px;
        }
        span:first-child {
          width: 90px;
          padding-right: 12px;
          text-align: right;
        }
        span:last-child {
          width: calc(100% - 90px);
        }
        span.shztSpan {
          padding-right: 20px;
          color: #e6a23c;
        }
        ::v-deep.el-button {
          height: 32px !important;
          color: #566df4;
          border-color: #566df4;
        }
      }
    }
  }
  .shjlxxDiv {
    .bottomLine {
      margin-bottom: 0;
    }
    ::v-deep.cell {
      padding: 0 10px;
      font-size: 14px;
    }
  }
}
.item_wrapper {
  background: #fff;
  margin-bottom: 20px;
}
.item_content {
  padding: 0 20px;
}
.el-form-item__content .el-textarea__inner{
  width: 100% !important;
}
.el-upload-list__item-name{
  color: #157EDF;
}
::v-deep.el-input.is-disabled .el-input__suffix{
  display: inline !important;
}
</style>
