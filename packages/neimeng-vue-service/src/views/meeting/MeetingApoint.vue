<template>
  <div class="appoint-detail page-detail">
    <div class="global-title">
      <page-crumb :d="{breadcrumbList:breadcrumbList}">
        <div slot="btns">
          <el-button type="primary"
            v-if="(this.type==1 || this.type==3) && !(shenpijibie != 0 || formInline.isDuZhan == 2)"
            @click="sureMeeting" :loading="sureLoading" size="small">确认
          </el-button>
          <el-button type="primary"
            v-if="(this.type==1 || this.type==3) && (shenpijibie != 0 || formInline.isDuZhan == 2)" @click="submit"
            :loading="submitLoading" size="small">提交审核
          </el-button>
          <el-button type="primary" v-if="this.type==1 || this.type==3" @click="saveMeeting" size="small"
            :loading="saveLoading">保存
          </el-button>
          <el-button type="primary" v-if="this.type==4" @click="selectSign(1,checkSubmmit)" :loading="checkPassLoading"
            size="small">审核通过
          </el-button>
          <el-button type="primary" v-if="this.type==4" @click="selectSign(2,checkSubmmit)" :loading="checkNopassLoading"
            size="small">审核不通过
          </el-button>
          <el-button size="small" @click="$router.back(-1)">返回</el-button>
        </div>
      </page-crumb>
    </div>
    <div class="global-content">
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">新增会议预约</span>
        </div>
        <div class="global-card-content">
          <el-form :model="formInline" size="small" class="demo-form-inline" label-position="right" ref="formInline"
            label-width="135px" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="会议类型" prop="hylx" :rules="validate.vdRequired()">
                  <el-select v-model="formInline.hylx" placeholder="请选择" @change="typeChange"
                    :disabled="type==2 || type == 4">
                    <el-option v-for="item in globalSetting.common.meetingtype" :key="item.code" :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会议名称" prop="hyName" :rules="validate.vdLength(255,true)">
                  <el-input v-model="formInline.hyName" placeholder="请输入" :disabled="type==2 || type == 4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="预约人" prop="yuYueRenName" :rules="validate.vdRequired()">
                  <el-input v-model="formInline.yuYueRenName" placeholder="请输入" :disabled="type==2 || type == 4">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="lianXiPhone" :rules="validate.vdTel(true)">
                  <el-input v-model="formInline.lianXiPhone" placeholder="请输入" :disabled="type==2 || type == 4">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="预约人" prop="owner" :rules="validate.vdRequired()">
                                    <el-input v-model="formInline.owner" placeholder="请输入"
                                              :disabled="type==2"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系电话" prop="phone" :rules="validate.vdTel()">
                                    <el-input v-model="formInline.phone" placeholder="请输入"
                                              :disabled="type==2"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> -->
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="会议开始时间" prop="startTime">
                  <el-date-picker :disabled="type==2 || type == 4" v-model="formInline.startTime"
                    format="yyyy-MM-dd HH:mm" type="datetime" value-format="timestamp" placeholder="选择日期时间"
                    @change="clearHyxTime(1)">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预计会议结束时间" prop="endTime">
                  <el-date-picker :disabled="type==2 || type == 4" v-model="formInline.endTime"
                    format="yyyy-MM-dd HH:mm" type="datetime" value-format="timestamp" placeholder="选择日期时间"
                    @change="clearHyxTime(2)">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="isGt?'设备总数':'电脑总数'" prop="zhuanJiaCount" :rules="validate.vdNumber(true)">
                  <el-input v-model="formInline.zhuanJiaCount" placeholder="请输入" :disabled="type==2 || type == 4"
                    @keyup.native.space="trimData" @change="clearHyx">
                    <template slot="suffix">台</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="场地是否独占" prop="isDuZhan" :rules="validate.vdRequired(true)">
                  <div style="display: inline-block">
                    <el-radio-group :disabled="type==2 || type == 4" v-model="formInline.isDuZhan" @change="clearHyx">
                      <el-radio :label="1">独占</el-radio>
                      <el-radio :label="2">共享</el-radio>
                    </el-radio-group>
                    <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                      <div slot="content">若选择独占，则会议开始时间起至结束时间止，其他项目无法选定此次会议预约的会议室</div>
                      <span class="tool"><img class="info-tit-form" src="@/assets/help.png" alt="" /></span>
                    </el-tooltip>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">标段/包信息</span>
          <el-button type="primary" size="small" style="float: right;" v-if="this.type!=2" @click="openBidDialog">添加
          </el-button>
          <el-tooltip style="float: right;margin-right: 10px" placement="top" v-if="$store.state.logoType == 1">
            <div slot="content">此处可选择对应会议的标段包，一个会议可选择多个标段包</div>
            <span class="tool"><img class="info-tit-form" src="@/assets/help.png" alt="" /></span>
          </el-tooltip>
        </div>
        <div class="global-card-content">
          <self-table border :data="tableData" stripe style="width: 100%;">
            <el-table-column prop="bdBH" label="标段/包编号" show-overflow-tooltip min-width="160px"></el-table-column>
            <el-table-column prop="bdName" label="标段/包名称" show-overflow-tooltip min-width="160px"></el-table-column>
            <el-table-column fixed="right" label="操作" v-if="this.type!=2" align="left">
              <template slot-scope="scope">
                <el-button-group class="operation-button-group">
                  <el-button @click="bidsDel(scope.row)" type="info" plain size="mini" class="operation-button">
                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
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
          <span class="global-card-header-name">会议地点</span>
          <el-button type="primary" style="float: right;" size="small" v-if="this.type!=2" @click="openHomeDialog">添加
          </el-button>
          <el-tooltip style="float: right;margin-right: 10px" placement="top" v-if="$store.state.logoType == 1">
            <div slot="content">此处可选择对应会议的标段包，一个会议可选择多个标段包</div>
            <span class="tool"><img class="info-tit-form" src="@/assets/help.png" alt="" /></span>
          </el-tooltip>
        </div>
        <div class="global-card-content">
          <self-table border :data="roomTableData" stripe style="width: 100%">
            <el-table-column prop="hysName" label="会议室名称"></el-table-column>
            <el-table-column prop="diQuName" label="所属地区"></el-table-column>
            <el-table-column prop="xiangXiDiZhi" label="详细地址"></el-table-column>
            <el-table-column prop="suoShuDanWei" label="所属单位"></el-table-column>
            <el-table-column fixed="right" label="操作" v-if="this.type!=2" align="left">
              <template slot-scope="scope">
                <el-button-group class="operation-button-group">
                  <el-button @click="roomDel(scope.row,scope.$index)" type="info" plain class="operation-button"
                    size="mini">
                    <i class="iconfont icon-shanchu1"><span>删除</span></i>
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
            <div slot="empty" class="custom-empty"></div>
          </self-table>
        </div>
      </el-card>
      <el-card v-if="type == 2 || type == 4">
        <div slot="header" class="clearfix">
          <span class="global-card-header-name">审核记录</span>
        </div>
        <div class="global-card-content">
          <approval-list v-if="businessKey" ref="ApprovalList" :businessKey="businessKey"></approval-list>
        </div>
      </el-card>
    </div>
    <el-dialog title="选择标段" :visible.sync="bidDialogVisible" :append-to-body="true" width="1200px">
      <el-form :inline="true" :model="bdSearchForm" class="demo-form-inline" label-position="left" size="small"
        label-width="80px" style="padding: 0 50px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="标段名称">
              <el-input v-model="bdSearchForm.bdName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="标段编号">
              <el-input v-model="bdSearchForm.bdBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="searchTable" type="primary" size="small" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <self-table border :data="bidTableData2" stripe style="width: 100%" :height="300"
        @selection-change="bidHandleSelectionChange" v-loading="bidLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="bdName" label="标段/包名称" show-overflow-tooltip min-width="180px"></el-table-column>
        <el-table-column prop="bdBH" label="标段/包编号" show-overflow-tooltip min-width="180px"></el-table-column>
        <div slot="empty" class="custom-empty"></div>
      </self-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="bidDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addBidSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择会议地点" :visible.sync="areaDialogVisible" :append-to-body="true">
      <el-form :inline="true" :model="hysParam" class="demo-form-inline" label-position="left" size="small"
        label-width="100px" style="padding: 0 50px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属地区">
              <el-input v-model="hysParam.diQuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="getAllHomes" type="primary" size="small" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table border :data="roomTableData2" stripe style="width: 100%" ref="tableHy" class="hy-table"
        @selection-change="roomHandleSelectionChange" :height="400">
        <el-table-column type="selection" width="55" :selectable="selectableX"></el-table-column>
        <el-table-column prop="useable" label="是否被占用">
          <!-- 是1可用，2占用-->
          <template slot-scope="scope">
            {{scope.row.useable==1?'可用':'占用'}}
          </template>
        </el-table-column>
        <el-table-column prop="hysName" label="会议室名称"></el-table-column>
        <el-table-column prop="diQuName" label="所属地区"></el-table-column>
        <el-table-column prop="xiangXiDiZhi" label="详细地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="suoShuDanWei" label="所属单位"></el-table-column>

        <div slot="empty" class="custom-empty"></div>
      </el-table>
      <v-pagination :total="hysTotal" :page="hysParam.page" :limit="hysParam.rows" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></v-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="areaDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addRoomSure">确 定</el-button>
      </span>
    </el-dialog>
    <nopass-dialog ref="nopassDialog" @getOpinion="getOpinion"></nopass-dialog>
    <approval-dialog ref="approvalDialog" @getApprovalMan="getApprovalMan"></approval-dialog>
  </div>
</template>
<script>
import PageCrumb from "@/components/PageCrumb";
import moment from "moment"
import util from "../../utils/utils";
import ApprovalDialog from "@/components/dailog/ApproverDialog";
import nopassDialog from "@/views/steps-pages/bidfile/file-detail/NopassDialog";
import ApprovalList from "@/components/ApprovalList";
import { caCheckMixin } from "@/views/procurement-plan/mixins";

export default {
  components: {
    PageCrumb,
    ApprovalList,
    ApprovalDialog,
    nopassDialog,
  },
  inject: ['globalSetting'],
  mixins: [ caCheckMixin ],
  data () {
    const validateStartTime = (rule, value, callback) => {
      // console.log(value.getTime())
      if (value === '') {
        callback(new Error('不能为空！'))
      } else if (value < moment().valueOf() - 59000) {
        callback(new Error('不能小于当前时间！'))
      } else if (this.formInline.endTime) {
        if (util.remSe(value) > util.remSe(this.formInline.endTime)) {
          callback(new Error('不能大于会议结束时间！'))
        } else if ((moment(this.formInline.startTime).format("YYYY-MM-DD") != moment(this.formInline.endTime).format("YYYY-MM-DD")) && this.$store.state.logoType == 2) {
          callback(new Error('不能跨天选择！'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateEndTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空！'))
      } else if (value < moment().valueOf() - 59000) {
        callback(new Error('不能小于当前时间！'))
      } else if (this.formInline.startTime) {
        if (util.remSe(value) < util.remSe(this.formInline.startTime)) {
          callback(new Error('不能小于会议开始时间！'))
        } else if ((moment(this.formInline.startTime).format("YYYY-MM-DD") != moment(this.formInline.endTime).format("YYYY-MM-DD")) && this.$store.state.logoType == 2) {
          callback(new Error('不能跨天选择！'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      bidDialogVisible: false,
      areaDialogVisible: false,
      sureLoading: false,
      saveLoading: false,
      breadcrumbList: [
        { label: '工作台', link: '/dashboard' },
        { label: '场地预约', link: '/meeting/tblist' },
        { label: '编辑（新增）', link: '' }
      ],
      formInline: {
        user: "",
        region: "",
        date1: "",
        hylx: '',
        hyName: '',
        yuYueRenName: '',
        lianXiPhone: '',
        startTime: '',
        endTime: '',
        zhuanJiaCount: '',
        isDuZhan: this.$store.state.logoType == 1 ? '' : 2
      },
      //标段相关数据
      tableData: [],
      bidTableData2: [],
      selectBidsArray: [],
      bidLoading: false,
      bdSearchForm: {
        bdName: '',
        bdBH: ''
      },
      //会议室相关数据
      roomTableData: [],
      roomTableData2: [],
      selectroomArray: [],


      hyyyGuid: '',//会议预约id
      rules: {
        startTime: [
          { required: true, message: '不能为空！', trigger: 'blur' },
          { validator: validateStartTime, trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '不能为空！', trigger: 'blur' },
          { validator: validateEndTime, trigger: 'blur' }
        ],
      },
      hysTotal: 0,
      hysParam: {
        page: 1,
        rows: 10,
        diQuName: '',
        suoShuDanWei: ''
      },
      submitLoading: false,
      checkNopassLoading: false,
      checkPassLoading: false,
      submitData: {
        zbHeTongGuid: this.$route.query.id,
        nextApproveUserId: "495d439f-0803-4111-9856-e499253d6fdd",
        nextApproveUserName: "个人三十三",
        spLevel: 1,
      },
      // 审批流审核参数
      auditData: {
        approveRecordId: this.$store.state.bids.waitIdsInfo.approveRecordId,
        approveUserId: this.$store.state.bids.waitIdsInfo.currentUserId,
        approveUserName: this.$store.state.bids.waitIdsInfo.currentUserName,
        nextUserId: "",
        nextUserName: "",
        opValue: "",
        opinion: "",
        qmContent: "",
        qmResult: "",
      },
      shenpijibie: 0,
      itemType: 2014,
      //传给审核记录数据
      businessKey: "ZBHyyyWenJian:" + this.$route.query.guid,
    };
  },
  computed: {
    type () { //1.编辑 2：查看//3新增 //4审核
      return this.$route.query.type
    },
    guid () { //会议室id
      return this.$route.query.guid
    },
    bdGuid () { //标段guid
      return this.$route.query.bdGuid
    },
    pbhZhuangTai () { //评标会状态 如果为4则已生效   已生效的会议类型需要为空
      return this.$route.query.pbhZhuangTai
    },
    bdName () {
      return this.$route.query.bdName
    },
    bdBH () {
      return this.$route.query.bdBH
    },
    isGt () {
      return this.$store.state.logoType == 1
    }
  },
  created () {
    // window.console.log(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'));
    // console.log(moment('2020-06-09').endOf('day').format("YYYY-MM-DD HH:mm:ss"));
    if (this.guid) {
      this.meetingGetEditInfo()//编辑查看时查询页面信息
    }
    if (this.bdGuid) { //从工作台进来
      this.getBdMeeting()
    }
    if (this.type == 3) {
      this.formInline.hylx = 'PBH'
      this.typeChange()
    }
    util.getShenpiJibie(this.itemType).then((res) => {
      console.log('------------------------',res)
      this.shenpijibie = res;
    });
  },
  mounted () {
  },
  methods: {
    selectableX (row, index) {
      if (row.useable != 1) {
        return 0
      } else {
        return 1
      }
    },
    getBdMeeting () { //从标段过来 1.会议类型默认开标会 2.默认添加上标段
      if (this.pbhZhuangTai != 4) {
        this.formInline.hylx = 'PBH'
      }
      this.tableData = []
      this.tableData.push({ bdBH: this.bdBH, bdGuid: this.bdGuid, bdName: this.bdName })
      this.formInline.hyName = this.bdName + '评标会'
    },
    async meetingGetEditInfo () {
      var res = await this.portService.meetingGetEditInfo({ guid: this.guid })
      if (res && res.data) {
        this.hyyyGuid = this.guid
        this.formInline = res.data
        this.tableData = res.data.bdList
        this.roomTableData = res.data.hysList
        // this.typeChange()
      }
    },
    //会议类型变的话 弹出标段列表 重新选标段
    async typeChange () {
      this.bidLoading = true
      this.bidDialogVisible = true
      this.bdSearchForm.bdName = ''
      this.bdSearchForm.bdBH = ''
      this.tableData = []
      this.roomTableData = []
      this.searchTable()
    },
    //查询标段列表
    async searchTable () {
      const param = {
        page: 1,
        row: 1000,
        bdName: this.bdSearchForm.bdName,
        bdBH: this.bdSearchForm.bdBH,
        hylx: this.formInline.hylx
      }
      var res = await this.portService.meetingBidsList(param)
      if (res.code == 1) {
        this.bidTableData2 = res.data.rows
        // if(this.type==3){
        this.bidLoading = false
        // }
      }
    },
    openBidDialog () {
      this.bidDialogVisible = true
      this.typeChange()
    },
    bidHandleSelectionChange (row) {
      this.selectBidsArray = row
    },
    addBidSure () {
      if (this.selectBidsArray.length > 0) {
        this.tableData = this.selectBidsArray
        //名称默认问题
        // let arr = []
        // this.tableData.forEach(item => {
        //     arr.push(item.bdName)
        // })
        let str = this.tableData[0].bdName
        const obj = this.globalSetting.common.meetingtype.find(v => v.code == this.formInline.hylx)
        this.formInline.hyName = str + obj.name

      }
      this.bidDialogVisible = false
    },
    bidsDel (row) {
      const index = this.tableData.findIndex(v => v.bdGuid == row.bdGuid)
      // this.bidTableData2.push(this.tableData[index])
      this.tableData.splice(index, 1)
    },

    //会议室相关方法
    openHomeDialog () {
      this.$refs['formInline'].validate(async (valid) => {
        if (valid) {
          this.areaDialogVisible = true
          this.getAllHomes()
        }
      })
    },
    //获取所有会议室
    async getAllHomes () {
      let str = '', arr = []
      if (this.roomTableData.length > 0) {
        this.roomTableData.forEach(item => {
          arr.push(item.hysGuid)
        })
      }
      str = arr.join()
      const param = {
        page: this.hysParam.page,
        row: this.hysParam.rows,
        diQuName: this.hysParam.diQuName,
        hylx: this.formInline.hylx,
        // isDuZhan: this.isGt ? '' : this.formInline.isDuZhan,
        isDuZhan: this.formInline.isDuZhan,
        startTime: this.formInline.startTime,
        endTime: this.formInline.endTime,
        zhuanJiaCount: this.formInline.zhuanJiaCount,
        excludeHysGuids: str
      }
      var res = await this.portService.meetingHooms(param)
      if (res.code == 1) {
        this.roomTableData2 = res.data.rows
        this.hysTotal = res.data.total
      }
    },
    roomHandleSelectionChange (row) {
      if (row.length > 1 && this.$store.state.logoType == 2) {
        this.$refs.tableHy.clearSelection()
        this.$refs.tableHy.toggleRowSelection(row.pop())
      } else {
        this.selectroomArray = row
      }
    },
    //把弹窗的所有会议室按选择加入到页面
    addRoomSure () {
      this.roomTableData.push(...this.selectroomArray)
      this.areaDialogVisible = false
    },
    //删除页面中的会议室
    async roomDel (row, index) {
      this.roomTableData.splice(index, 1)
    },
    handleSizeChange (val) {
      this.hysParam.rows = val
      this.getAllHomes()
    },
    handleCurrentChange (val) {
      this.hysParam.page = val
      this.getAllHomes()
    },
    //处理保存参数
    handleParam () {
      let bidsArray = []
      this.tableData.forEach(item => {
        bidsArray.push(item.bdGuid)
      })
      let bidsNameArray = []
      this.tableData.forEach(item => {
        bidsNameArray.push(item.bdName)
      })
      let roomsArray = []
      this.roomTableData.forEach(item => {
        roomsArray.push(item.hysGuid)
      })
      let roomsNameArray = []
      this.roomTableData.forEach(item => {
        roomsNameArray.push(item.hysName)
      })
      const param = {
        bdGuids: bidsArray.join(),
        bdNames: bidsNameArray.join(),
        huiYiShiGuids: roomsArray.join(),
        huiYiShiNames: roomsNameArray.join(),
        hylx: this.formInline.hylx,
        hyName: this.formInline.hyName,
        startTime: this.formInline.startTime,
        endTime: this.formInline.endTime,
        yuYueRenName: this.formInline.yuYueRenName,
        lianXiPhone: this.formInline.lianXiPhone,
        hyyyLXR: "",
        hyyyLXDH: "",
        isDuZhan: this.formInline.isDuZhan,
        zhuanJiaCount: this.formInline.zhuanJiaCount,
        guid: ''
      }
      return param
    },
    //保存会议预约
    saveMeeting () {
      return new Promise((resoleve, reject) => {
        this.requireData(async () => {
          const param = this.handleParam()
          this.saveLoading = true
          if (this.guid || this.hyyyGuid) {
            param.guid = this.guid ? this.guid : this.hyyyGuid
            const res = await this.portService.meetingUpdateMeeting(param)
            this.saveLoading = false
            if (res.code == 1) {
              this.saveLoading = false
              this.$message.success(res.info)
              resoleve(res)
            }
          } else {
            const res = await this.portService.meetingSaveMeeting(param)
            this.saveLoading = false
            if (res.code == 1) {
              this.saveLoading = false
              this.hyyyGuid = res.data.hyyyGuid
              this.$message.success(res.info)
              resoleve(res)
            }
          }
        })
      })

    },
    async sureMeeting () {
      this.sureLoading = true
      this.saveMeeting().then(async res => {
        console.log(res)
        if (res) {
          const res1 = await this.portService.meetingSureMeeting({ guid: this.hyyyGuid })
          if (res1.code == 1) {
            this.sureLoading = false
            this.$message({
              type: 'success',
              message: '确认成功！'
            })
            this.$router.back(-1)
          }
        }
      })
      setTimeout(() => {
        this.sureLoading = false
      }, 3000)
    },
    clearHyx (value) {
      if (value) {
        this.roomTableData = []
      }
    },
    clearHyxTime (type) {
      this.roomTableData = []
      if (type == 1) {
        this.$refs['formInline'].validateField(`endTime`)
      } else {
        this.$refs['formInline'].validateField(`startTime`)
      }
    },
    // 验证表格
    requireData (fun) {
      this.$refs.formInline.validate((validate) => {
        if (validate) {
          fun();
        }
      });
    },
    // 提交审批流
    async commitCheck (param) {
      this.requireData(() => {
        this.submitLoading = true
        this.saveMeeting().then(async res => {
          console.log(res)
          if (res) {
            param.guid = this.hyyyGuid
            const res1 = await await this.portService.meetingCommitCheck(param)
            console.log(param)
            this.submitLoading = false
            if (res1.code == 1) {
              this.$message.success(res1.info)
              this.$router.back(-1)
            }
          }
        })
      })


    },
    // 提交审批
    submit () {
      let data = this.handleParam()
      if (this.guid) {
        data.guid = this.guid
      }
      
      if (this.shenpijibie == 0) {
        let data = this.handleParam()
        if (this.guid) {
          data.guid = this.guid
        }
        this.commitCheck(data);
      } else {
        if(this.formInline.isDuZhan == 1){
          // 提交审核弹出审核人列表
          this.$refs["approvalDialog"].searchFormList.shiXiangCode = this.itemType;
          this.$refs["approvalDialog"].searchFormList.spLevel = 1;
          this.$refs["approvalDialog"].isSubmitSh = 1;
          this.$refs["approvalDialog"].dialogFormVisible = true;
        }else{
          this.commitCheck(data);
        }
      }
    },
    // 获取审批人
    getApprovalMan (shenpiren) {
      this.submitData.spLevel = this.shenpijibie;
      this.submitData.nextApproveUserId = shenpiren.user_Guid;
      this.submitData.nextApproveUserName = shenpiren.user_Name;
      let data = this.handleParam()
      if (this.guid) {
        data.guid = this.guid
      }
      let param = { ...data, ...this.submitData };
      this.commitCheck(param);
    },
    //审批
    async auditMethod () {
      //走审批流
      if (this.auditData.opValue == 1) {
        this.checkPassLoading = true
      } else {
        this.checkNopassLoading = true
      }
      let result = await this.portService.waitsCheckPass(this.auditData);
      if (result.code == 1) {
        this.checkPassLoading = false
        this.checkNopassLoading = false
        this.$message({ message: result.info, type: "success" });
        this.$router.go(-1);
      }
    },
    // 审核通过
    checkSubmmit (type) {
      this.auditData.opValue = type;
      if (type == 2) {
        this.$refs["nopassDialog"].dialogFormVisible = true;
      } else {
        if (this.$store.state.bids.waitIdsInfo.isLastNode == 0) {
          this.$refs["approvalDialog"].isSubmitSh = 0;
          this.$refs["approvalDialog"].searchFormList.shiXiangCode = this.itemType;
          this.$refs["approvalDialog"].searchFormList.spLevel = this.$store.state.bids.waitIdsInfo.currentSpLevel;
          this.$refs["approvalDialog"].dialogFormVisible = true;
        } else {
          this.auditMethod();
        }
      }
    },
    // 获取审核不通过理由
    getOpinion (val) {
      this.auditData.opinion = val;
      this.auditMethod();
    },
  }
};
</script>
<style lang="scss" scoped>
.hy-table {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
</style>
<style lang="scss">
</style>
