<template>
  <el-dialog
    title="供应商管理"
    :visible.sync="dialogVisible"
    width="980px"
    :append-to-body="true"
    :before-close="handleClose">
    <div class="m-wrapper">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="120px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="管理类型" prop="guanLiLeiXing">
              <el-select v-model="formData.guanLiLeiXing">
                <el-option label="限期暂停资格" :value="1"></el-option>
                <el-option label="暂停资格两年" :value="2"></el-option>
                <el-option label="暂停资格六个月" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行时间">
              <el-date-picker
                v-model="formData.time"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="执行原因" prop="guanLiLeiXing">
              <el-select v-model="formData.zhiXingYuanYin">
                <el-option label="不良行为" :value="1"></el-option>
                <el-option label="连续两次不合格" :value="2"></el-option>
                <el-option label="其他" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附件" prop="fuJianGuid">
              <el-input v-model="formData.fuJianGuid" style="display: none"></el-input>
              <Uploader
                action="/upload"
                :limitNum="1"
                :onRemoveFn ="handleOnRemoveFnImage"
                :uploadedList="formData.fuJianGuid?[{guid: formData.fuJianGuid, fileName:formData.fuJianName}]:[]"
                @sucData="handleImageUpdoadSuc"
              ></Uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="formData.beiZhu" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="handleSaveInfo" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Uploader from '@/components/Upload'
import {saveSupplierInfo} from '@/service/enterpriseInfo'
import util from "@/utils/utils.js"
export default {
  props: {
    sData: {
      type: Object
    }
  },
  components: {
    Uploader
  },
  data() {
    return {
      dialogVisible: true,
      formData: {
        guid:'',
        userQiYeGuid:'',
        gongYiShangZhuanYeShengQingGuid:'',
        guanLiLeiXing:'',
        zhiXingStartTime: '',
        zhiXingEndTime:'',
        zhiXingYuanYin:'',
        beiZhu:'',
        time: '',
        fuJianGuid: '',
        fuJianName: ''
      },
      rules: {
        guanLiLeiXing: [
          { required: true, message: '请输选择管理类型', trigger: 'change' }
        ],
        zhiXingYuanYin: [
          { required: true, message: '请输选择执行原因', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请输选择执行时间', trigger: 'change' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = util.getCurrentTime();
              const start = util.getCurrentTime();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = util.getCurrentTime();
              const start = util.getCurrentTime();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = util.getCurrentTime();
              const start = util.getCurrentTime();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      }
    }
  },
  methods: {
    handleSaveInfo () {
      this.$refs.formData.validate(err => {
        if (err) {
          saveSupplierInfo([this.formData]).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.handleClose()
            }
          })
        }
      })
    },
    handleClose () {

      this.formData = {
        guid:'',
        userQiYeGuid:'',
        gongYiShangZhuanYeShengQingGuid:'',
        guanLiLeiXing:'',
        zhiXingStartTime: '',
        zhiXingEndTime:'',
        zhiXingYuanYin:'',
        beiZhu:'',
        time: '',
        fuJianGuid: '',
        fuJianName: ''
      }
      this.$emit('onSuccess', false)
    },
    handleImageUpdoadSuc(data) {
      this.formData.fuJianGuid = data.groupGuid
      this.formData.fuJianName = data.name
    },
    handleOnRemoveFnImage (data) {
      this.formData.fuJianGuid = ''
      this.formData.fuJianName = ''
    }
  },
  watch: {
    'formData.time': {
      handler (data) {
        if (data.length > 1) {
          this.formData.zhiXingStartTime = new Date(data[0]).getTime()
            this.formData.zhiXingEndTime = new Date(data[0]).getTime()
        } else {
          this.formData.zhiXingStartTime = ''
          this.formData.zhiXingEndTime =''
        }
      }
    }
  }
}
</script>
