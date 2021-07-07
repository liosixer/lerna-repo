<template>
  <el-dialog
    title="添加业绩信息"
    :visible.sync="dialogVisible"
    width="950px"
    :append-to-body="true"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-width="110px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="xiangMuName">
              <el-input
                type="text"
                size="small"
                placeholder="请输入项目名称"
                v-model="formData.xiangMuName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业分类" prop="hangYeFenLei">
              <!-- <el-select
                v-model="formData.hangYeFenLei"
                size="small"
                style="width:335px"
                placeholder="请选择企业"
              >
                <el-option
                  v-for="i of subjectCat"
                  :key="i.guid"
                  :value="i.guid"
                  :label="i.hangYeFenLeiName"
                ></el-option> -->
              <el-cascader
                v-model="formData.hangYeFenLei"
                size="small"
                style="width:305px"
                placeholder="请选择行业分类"
                :props="{
                  value: 'hangYeFenLeiDaiMa',
                  label: 'hangYeFenLeiName'
                }"
                :options="cats"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目结束时间" prop="xiangMuEndTime">
              <el-date-picker
                v-model="formData.xiangMuEndTime"
                type="date"
                size="small"
                style="width:335px"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目合同附件" prop="xiangMuHeTongFuJianName">
              <el-input
                type="text"
                size="small"
                style="display:none"
                v-model="formData.xiangMuHeTongFuJianName"
              ></el-input>
              <Upload
                action="/upload"
                @onRemoveFn="handleOnRemoveFnContract"
                :uploadedList="formData.xiangMuHeTongFuJianName?[{guid: formData.xiangMuHeTongFuJianGuid, fileName:formData.xiangMuHeTongFuJianName}]:[]"
                @sucData="handleContractUpdoadSuc"
              ></Upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="奖项名称" prop="jiangXiangName">
              <el-input
                type="text"
                size="small"
                placeholder="请输入奖项名称"
                v-model="formData.jiangXiangName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="获奖证书附件"
              prop="huoJiangZhengShuFuJianName"
            >
              <el-input
                type="text"
                size="small"
                style="display:none"
                v-model="formData.huoJiangZhengShuFuJianName"
              ></el-input>
              <Upload action="/upload" @sucData="handleAwardUpdoadSuc" @onRemoveFn="handleOnRemoveFnAward" :uploadedList="formData.huoJiangZhengShuFuJianName?[{guid: formData.huoJiangZhengShuFuJianGuid, fileName:formData.huoJiangZhengShuFuJianName}]:[]"></Upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small" >取 消</el-button>
      <el-button type="primary" @click="handleCansel" size="small"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/Upload'
import { savePerformanceInfo, getCascaderCat } from '@/service/enterpriseInfo'
export default {
  props: {
    subjectCat: {
      type: Array,
      default: () => []
    },
    perData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      dialogVisible: true,
      cats: [],
      formData: {
        guid: '',
        xiangMuName: '',
        hangYeFenLei: '',
        xiangMuHeTongFuJianName: '',
        xiangMuHeTongFuJianGuid: '',
        xiangMuEndTime: '',
        jiangXiangName: '',
        huoJiangZhengShuFuJianName: '',
        huoJiangZhengShuFuJianGuid: '',
      },
      rules: {
        xiangMuName: [{ required: true, message: '请输入项目名称', trigger: 'change' }, {
          pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
          message: '项目名称不能包含特殊字符',
          trigger: 'blur',
        }],
        hangYeFenLei: [{ required: true, message: '请选择行业分类', trigger: 'change' },],
        jiangXiangName: [{
          pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
          message: '奖项名称不能包含特殊字符',
          trigger: 'blur',
        }]
      }
    };
  },
  components: {
    Upload
  },
  created () {
    getCascaderCat().then(res => {
      const data = res
      data.forEach(i => {
        if (i.children.length) {
          i.children.forEach(j => {
            Reflect.deleteProperty(j, 'children')
          })
        }
      })
      this.cats = data
    })
  },
  mounted () {
    if (this.perData) {
      this.formData = Object.assign(this.formData, this.perData)
    }
  },
  methods: {
    handleClose () {
      this.$emit('showPerformance', false)
    },
    handleContractUpdoadSuc (data) {
      this.formData.xiangMuHeTongFuJianName = data.name
      this.formData.xiangMuHeTongFuJianGuid = data.groupGuid
    },
    handleOnRemoveFnContract(){
      this.formData.xiangMuHeTongFuJianName = data.name
      this.formData.xiangMuHeTongFuJianGuid = data.groupGuid
    },
    handleAwardUpdoadSuc (data) {
      this.formData.huoJiangZhengShuFuJianName = data.name
      this.formData.huoJiangZhengShuFuJianGuid = data.groupGuid
    },
    handleOnRemoveFnAward (){
      this.formData.huoJiangZhengShuFuJianName = ''
      this.formData.huoJiangZhengShuFuJianGuid = ''
    },
    handleCansel () {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.formData.xiangMuEndTime = new Date(this.formData.xiangMuEndTime).getTime()
          this.formData.hangYeFenLei = this.formData.hangYeFenLei.join(',')
          savePerformanceInfo(this.formData).then(res => {
            if (res.code === 1) {
              this.$message.success(res.info)
              this.$emit('onSuccess')
              this.handleClose()
            }
          }).catch(e => {
            console.error(e)
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
