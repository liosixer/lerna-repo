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
        label-width="130px"
        label-position="right"
        size="small"
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
              <Tree
                  :nodes="cats"
                  v-if="catFlag"
                  :showCheckbox="false"
                  :checkeds="typeof formData.hangYeFenLei === 'string' ? formData.hangYeFenLei.split(','):formData.hangYeFenLei"
                  v-model="formData.hangYeFenLei"
                  treeId="hangYeFenLeiDaiMa"
                  fullPath
                  nodeKey="hangYeFenLeiDaiMa"
                  refName="hangYeFenLei"
                  :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

<!--          <el-col :span="12">-->
<!--            <el-form-item label="项目合同附件" prop="xiangMuHeTongFuJianName">-->
<!--              <el-input-->
<!--                type="text"-->
<!--                size="small"-->
<!--                style="display:none"-->
<!--                v-model="formData.xiangMuHeTongFuJianName"-->
<!--                placeholder="请输入"-->
<!--              ></el-input>-->
<!--              <Upload-->
<!--                action="/upload"-->
<!--                @onRemoveFn="handleOnRemoveFnContract"-->
<!--                :uploadedList="formData.xiangMuHeTongFuJianName?[{guid: formData.xiangMuHeTongFuJianGuid, fileName:formData.xiangMuHeTongFuJianName}]:[]"-->
<!--                @sucData="handleContractUpdoadSuc"-->
<!--              ></Upload>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
            <el-col :span="12">
                <el-form-item label="合同金额(万元)" prop="heTongJinE">
                    <el-input type="text" v-model="formData.heTongJinE"  placeholder="请输入合同金额"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="合同签订时间" prop="xiangMuEndTime">
                    <el-date-picker
                            v-model="formData.xiangMuEndTime"
                            type="date"
                            size="small"
                            style="width:315px"
                            placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同签订方" prop="heTongQianDingFang">
              <el-input
                type="text"
                size="small"
                placeholder="请输入合同签订方"
                v-model="formData.heTongQianDingFang"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="项目类型" prop="xmLeiXing">
                  <el-radio-group v-model="formData.xmLeiXing">
                      <el-radio :label="0">工程</el-radio>
                      <el-radio :label="1">物资</el-radio>
                      <el-radio :label="2">服务</el-radio>
                  </el-radio-group>
              </el-form-item>

          </el-col>
        </el-row>
          <el-row :gutter="20">
              <el-col :span="24">
                  <el-form-item
                    label="合同附件"
                    prop="xiangMuHeTongFuJianName"
                  >
                    <el-input
                      type="text"
                      size="small"
                      style="display:none"
                      v-model="formData.xiangMuHeTongFuJianName"
                    ></el-input>
                    <Upload action="/upload" @sucData="handleContractUpdoadSuc" @onRemoveFn="handleOnRemoveFnContract" :uploadedList="formData.xiangMuHeTongFuJianGuid?[{guid: formData.xiangMuHeTongFuJianGuid, fileName:formData.xiangMuHeTongFuJianName}]:[]"></Upload>
                  </el-form-item>
              </el-col>
          </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button type="primary" @click="handleCansel" size="small"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/Upload'
import Tree from '@/components/tree/Tree'
import { savePerformanceInfo, getCascaderCat, queryYeJiZhuanYeList } from '@/service/enterpriseInfo'
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
      catFlag: false,
      dialogVisible: true,
      cats: [],
      formData: {
          xmLeiXing: 0,
          heTongJinE: '',
        guid: '',
        xiangMuName: '',
        hangYeFenLei: '',
        xiangMuHeTongFuJianName: '',
        xiangMuHeTongFuJianGuid: '',
        xiangMuEndTime: '',
        jiangXiangName: '',
        huoJiangZhengShuFuJianName: '',
        huoJiangZhengShuFuJianGuid: '',
        heTongQianDingFang: ''
      },
      rules: {

        xiangMuName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }, {
          pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
          message: '项目名称不能包含特殊字符',
          trigger: 'blur',
        }],
          xiangMuHeTongFuJianName: [
              { required: true, message: '请输上传合同附件', trigger: 'change' }
          ],
        heTongJinE: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          {
              pattern:  /^\d+(\.\d{1,6})?$/,
              message: '请输入大于0并且小数位数不能多于6的金额',
              trigger: 'blur',
          }
        ],
        hangYeFenLei: [{ required: true, message: '请选择行业分类', trigger: 'change' },],
        jiangXiangName: [{
          pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi,
          message: '奖项名称不能包含特殊字符',
          trigger: 'blur',
        }],
          heTongQianDingFang:[
              { required: true, message: '请输入合同签署方', trigger: 'blur' },
          ],
          xiangMuEndTime:[
              { required: true, message: '请输选择项目结束时间', trigger: 'change' },
          ]
      }
    };
  },
  components: {
    Upload,
    Tree
  },
  created () {
    queryYeJiZhuanYeList().then(res => {
      const data = res
      // data.forEach(i => {
      //   if (i.children.length) {
      //     i.children.forEach(j => {
      //       Reflect.deleteProperty(j, 'children')
      //     })
      //   }
      // })
      this.cats = data
      this.catFlag = true
    })
  },
  mounted () {
    if (this.perData) {
      const data = JSON.parse(JSON.stringify(this.perData))
      if (data.heTongJinE) data.heTongJinE = data.heTongJinE / 1000000
      this.formData = Object.assign(this.formData, data)
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
                const data = JSON.parse(JSON.stringify(this.formData))
                data.xiangMuEndTime = new Date(data.xiangMuEndTime).getTime();
                data.heTongJinE = data.heTongJinE * 1000000 // 将元单位的数据转成分为单外
                if(Array.prototype.isPrototypeOf(data.hangYeFenLei)){
                    data.hangYeFenLei = this.formData.hangYeFenLei.join(',')
                }
                savePerformanceInfo(data).then(res => {
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
