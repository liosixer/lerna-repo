<template>
  <el-dialog
    title="添加资质信息"
    :append-to-body="true"
    :visible.sync="dialogVisible"
    width="950px"
    :before-close="handleClose"
  >
    <div class="q_body">
      <el-form :model="qForm" :rules="rules" ref="qForm" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="资质证书名称" prop="ziZhiZhengShuName">
              <el-input
                v-model="qForm.ziZhiZhengShuName"
                size="small"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="资质证书编号" prop="ziZhiZhengShuBH">
              <el-input
                v-model="qForm.ziZhiZhengShuBH"
                size="small"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="资质证书级别" prop="ziZhiZhengShuJiBie">
              <el-select
                v-model="qForm.ziZhiZhengShuJiBie"
                size="small"
                style="width: 100%"
              >
                <el-option value="0" label="初级"></el-option>
                <el-option value="1" label="中级"></el-option>
                <el-option value="2" label="高级"></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="资质证书附件" prop="ziZhiZhengShuFuJianName">
              <el-input
                type="text"
                style="display:none"
                v-model="qForm.ziZhiZhengShuFuJianGuid"
              ></el-input>
              <upLoader
                action="/upload"
                :limitNum="1"
                :onRemoveFn ="handleOnRemoveFnImage"
                :uploadedList="qForm.ziZhiZhengShuFuJianGuid?[{guid: qForm.ziZhiZhengShuFuJianGuid, fileName:qForm.ziZhiZhengShuFuJianName}]:[]"
                @sucData="handleImageUpdoadSuc"
              ></upLoader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="资质开始时间" prop="ziZhiZhengShuStartTime">
              <el-date-picker
                v-model="qForm.ziZhiZhengShuStartTime"
                type="date"
                size="small"
                :picker-options="pickerOptionsStart"
                style="width: 100%"
                placeholder="选择日期"
              >
              </el-date-picker></el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="资质结束时间" prop="ziZhiZhengShuEndTime">
              <el-date-picker
                v-model="qForm.ziZhiZhengShuEndTime"
                type="date"
                size="small"
                :picker-options="pickerOptionsEnd"
                style="width: 100%"
                placeholder="选择日期"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-form-item style="display:none">
            <el-input v-model="qForm.ziZhiZhengShuFuJianGuid"></el-input
          ></el-form-item>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleQCancel" size="small">取 消</el-button>
      <el-button type="primary" @click="handleQOK" size="small"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import upLoader from '@/components/Upload'
import { saveQualifications } from '@/service/enterpriseInfo'
export default {
  props: {
    guid: {
      type: String,
    },
    qData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      dialogVisible: true,
      qForm: {
        ziZhiZhengShuEndTime: '',
        ziZhiZhengShuStartTime: '',
        ziZhiZhengShuJiBie: '',
        ziZhiZhengShuBH: '',
        ziZhiZhengShuName: '',
        ziZhiZhengShuFuJianName: '',
        ziZhiZhengShuFuJianGuid: ''
      },
      rules: {
        ziZhiZhengShuEndTime: [{ required: true, message: '请输入资质结束时间', trigger: 'blur' },],
        ziZhiZhengShuStartTime: [{ required: true, message: '请输入资质开始时间', trigger: 'blur' }],
        ziZhiZhengShuJiBie: [{ required: true, message: '请输入资质证书级别', trigger: 'blur' },],
        ziZhiZhengShuBH: [{ required: true, message: '请输入资质证书编号', trigger: 'blur' }, {
          pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
          message: '资质证书编号不能包含特殊字符',
          trigger: 'blur'
        }],
        ziZhiZhengShuName: [{ required: true, message: '请输入资质证书名称', trigger: 'blur' }, {
          pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
          message: '资质证书名称不能包含特殊字符',
          trigger: 'blur'
        }],
        ziZhiZhengShuFuJianName: [{ required: true, message: '请上传资质证书附件', trigger: 'blur' },]
      },
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.qForm.ziZhiZhengShuEndTime) {
            return time.getTime() > new Date(this.qForm.ziZhiZhengShuEndTime).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.qForm.ziZhiZhengShuStartTime) {
            return time.getTime() < new Date(this.qForm.ziZhiZhengShuStartTime).getTime()
          }
        }
      }
    }
  },
  components: {
    upLoader
  },
  mounted () {
    if (this.qData) {
      this.qForm = Object.assign(this.qForm, this.qData)
    }
  },
  methods: {
    // 关闭窗口后清空数据
    handleClose (done) {
      this.$emit('onClose', false)
      this.$refs.qForm.resetFields()
    },
    handleQCancel () {
      this.handleClose()
    },
    handleQOK () {
      this.$refs.qForm.validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.qForm))
          data.ziZhiZhengShuEndTime = new Date(data.ziZhiZhengShuEndTime).getTime()
          data.ziZhiZhengShuStartTime = new Date(data.ziZhiZhengShuStartTime).getTime()
          // console.log(this.qData)
          saveQualifications(data).then(res => {
            if (res.code === 1) {
              this.$emit('uploadQualification', this.qForm)
              this.$message.success('添加资质信息成功！')
              this.handleClose()
            }
          }).catch(e => {
            console.error(e)
          })
        }
        return false
      })
    },
    // 上传成功后将图片guid赋值给表单的ziZhiZhengShuFuJianGuid
    handleImageUpdoadSuc (data) {
      this.qForm.ziZhiZhengShuFuJianGuid = data.groupGuid
      this.qForm.ziZhiZhengShuFuJianName = data.name
    },
    handleOnRemoveFnImage () {
      this.qForm.ziZhiZhengShuFuJianGuid = ''
      this.qForm.ziZhiZhengShuFuJianName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>