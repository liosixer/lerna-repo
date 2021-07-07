<template>
        <el-dialog
                title="添加荣誉信息"
                :append-to-body="true"
                :visible.sync="dialogVisible"
                width="960px"
                :before-close="handleClose"
        >
            <div class="q_body">
                <el-form :model="honorData" :rules="rules" ref="honorData" label-width="120px">
                    <el-row :gutter="10">
                        <el-col :span="12"
                        ><el-form-item label="荣誉/奖项名称" prop="rongYuName">
                            <el-input
                                    v-model="honorData.rongYuName"
                                    size="small"
                                    placeholder="请输入荣誉/奖项名称"
                            ></el-input> </el-form-item
                        ></el-col>
                        <el-col :span="12"
                        ><el-form-item label="获奖时间" prop="huoJiangTime">
                            <el-date-picker
                                    v-model="honorData.huoJiangTime"
                                    type="date"
                                    size="small"
                                    placeholder="请选择获奖时间">
                            </el-date-picker>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12"
                        ><el-form-item label="颁奖单位" prop="huoJiangDanWei">
                            <el-input
                                    v-model="honorData.huoJiangDanWei"
                                    placeholder="请输入颁奖单位"
                                    size="small"
                            ></el-input> </el-form-item
                        ></el-col>
                        <el-col :span="12"
                        ><el-form-item label="获奖证书附件" prop="fuJianName">
                            <Upload
                                    action="/upload"
                                    :limitNum="1"
                                    @onRemoveFn="handleonRemoveFnImage"
                                    :uploadedList="honorData.fuJianName?[{guid: honorData.fuJianGuid, fileName:honorData.fuJianName}]:[]"
                                    @sucData="handleImageUpdoadSuc"
                            ></Upload>
                            <el-input
                                    type="text"
                                    style="display:none"
                                    v-model="honorData.fuJianName"
                            ></el-input
                            ></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="beiZhu" label="备注">
                                <el-input type="textarea" class="beizhu" v-model="honorData.beiZhu"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button type="primary" @click="handleQOK" size="small"
      >确 定</el-button
      >
    </span>
        </el-dialog>
</template>

<script>
    import Upload from "@/components/Upload";
    import {submitHonor} from '@/service/enterpriseInfo'
    export default {
        name: "honor",
        props: {
          hData: {
            type: Object,
            default: null
          }
        },
        data () {
            return {
                dialogVisible: true,
                honorData: {
                    rongYuName:'',
                    huoJiangTime: '',
                    huoJiangDanWei: '',
                    fuJianName:'',
                    fuJianGuid:'',
                    beiZhu:''
                },
                rules:{
                    rongYuName:{
                        required: true, message: '请输入荣誉/奖项名称', trigger: 'blur'
                    },
                    huoJiangTime: {
                        required: true, message: '请选择获奖时间', trigger: 'blur'
                    },
                    huoJiangDanWei: {
                        required: true, message: '请输入颁奖单位', trigger: 'blur'
                    },
                    // fuJianName:{
                    //     required: true, message: '请上传获奖证书附件', trigger: 'change'
                    // },
                }
            }
        },
        created () {
          if (this.hData) {
            this.honorData = this.hData
          }
        },
        components: {
            Upload
        },
        methods: {
            handleQOK() {
                this.$refs['honorData'].validate((valid) => {
                    if (valid) {
                        this.honorData.huoJiangTime = new Date(this.honorData.huoJiangTime).getTime()
                        submitHonor(this.honorData).then(res => {
                            this.$emit('onHonorClose', false)
                            this.$emit('onHonorSuccess')
                        })
                    }
                });
            },
            handleClose (){
                this.$refs.honorData.resetFields()
                this.$emit('onHonorClose', false)
            },
            handleImageUpdoadSuc (data) {
                console.log(data)
                this.honorData.fuJianName = data.name
                this.honorData.fuJianGuid = data.groupGuid
            },
            handleonRemoveFnImage(){
                this.honorData.fuJianName =''
                this.honorData.fuJianGuid = ''
            }
        }
    }
</script>

<style scoped>
</style>
