<template>
    <div class="container table-flex" :style="styless">
        <page-crumb :d="{breadcrumbList:breadcrumbList}">
            <template slot="btns">
                <el-button size="small" type="primary" @click="add">保存</el-button>
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </template>
        </page-crumb>
        <div class="global-content global-clear-bg">
            <!-- 基础信息 -->
            <el-form
                label-width="150px"
                :model="ruleForm"
                ref="ruleForm"
                :rules="baseInfoCheck"
            >
                <el-card>
                    <div slot="header">
                        <span class="global-card-header-name">基本信息</span>
                    </div>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="租户名称：" prop="zuHuName">
                                <el-input v-model="ruleForm.zuHuName" placeholder="请输入" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item label="租户类型：" prop="zuHuType">
                                <el-radio-group v-model="ruleForm.zuHuType">
                                    <el-radio :label="'0'">招标人/采购人</el-radio>
                                    <el-radio :label="'1'">招标代理</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="12">
                            <el-form-item label="租户类型：" prop="zuHuType">
                                <el-checkbox-group v-model="ruleForm.zuHuType" @change="handleCheckedCitiesChange">
                                    <el-checkbox label="0" name="zuHuType">招标人/采购人</el-checkbox>
                                    <el-checkbox label="1" name="zuHuType">招标代理</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="社会信用代码：" prop="qiYeDaiMa">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.qiYeDaiMa"></el-input>
                                <!-- <p class="item-info"></p> -->
                            </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="租户编号：">
                                <el-input size="small" placeholder="自动生成" disabled v-model="ruleForm.yaoQingCode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="联系人：">
                        <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiRen"></el-input>
                    </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话：">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="备注：">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.beiZhu" type="textarea" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="附件：" prop="attachmentGuid">
                                <div>
                                    <Upload
                                        :uploadedList="[{guid: fileList[0].guid, fileName: fileList[0].name}]"
                                        @sucData="successFile"
                                    ></Upload>
                                </div>
                                <!-- <p v-if="uploadedListShow" class="item_upload_info">请上传平台用户的相关文件。</p> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card v-if="$route.query.isGt != 1">
                    <div slot="header">
                        <span class="global-card-header-name">自定义logo</span>
                    </div>
                    <el-row :gutter="24" >
                        <el-col :span="24">
                            <el-form-item label="企业管理后台logo附件：" prop="logoGuid40">
                                <div>
                                    <Upload
                                        :uploadedList="[{guid: fileList40[0].guid, fileName: fileList40[0].name}]"
                                        @sucData="successFileLogo40"
                                        :acceptType="'.png,.jpg,.gif'"
                                    ></Upload>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="采购系统logo附件：" prop="logoGuid10">
                                <div>
                                    <Upload
                                        :uploadedList="[{guid: fileList10[0].guid, fileName: fileList10[0].name}]"
                                        @sucData="successFileLogo10"
                                        :acceptType="'.png,.jpg,.gif'"
                                    ></Upload>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="监督系统logo附件：" prop="logoGuid30">
                                <div>
                                    <Upload
                                        :uploadedList="[{guid: fileList30[0].guid, fileName: fileList30[0].name}]"
                                        @sucData="successFileLogo30"
                                        :acceptType="'.png,.jpg,.gif'"
                                    ></Upload>
                                </div>
                            </el-form-item>
                        </el-col>
                        <div style="color:red;margin-left:20px;font-size:16px;">请上传分辨率为457x28的图片文件</div>
                    </el-row>
                </el-card>
            </el-form>
        </div>
    </div>
</template>
<script>
    import ContentHeader from "@/components/contentHeader/ContentHeader";
    import PageCrumb from "@/components/PageCrumb";
    import Upload from "@/components/Upload";
    import utils from "@/utils/utils";
    

    export default {
    data() {
        return {
            breadcrumbList: [
                { label: "租户详细信息", link: "" }
            ],
            ruleForm: {
                guid: '',
                zuHuName: '',
                zuHuType: [],
                beiZhu: '',
                qiYeDaiMa: '',
                attachmentGuid: '',
                lianXiRen: '',
                lianXiPhone: '',
                deptConfigList:[{type:40,logoGuid:""},{type:10,logoGuid:""},{type:30,logoGuid:""},],
                logoGuid40:"",
                logoGuid10:"",
                logoGuid30:"",
            },
            uploadedListShow: 1,
            baseInfoCheck: {
                zuHuType: [
                    { required: true, message: '请选至少选择一种交易类型', trigger: 'change' }
                ],
                zuHuName: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
                qiYeDaiMa: [
                    { required: true, message: '请填写社会信用代码，请与营业执照保持一致。', trigger: 'blur' }
                ]
            },
            fileList: [], // 附件list
            fileList40:[],
            fileList10:[],
            fileList30:[],
        };
    },
    computed: {
        styless() {
            return {
                paddingTop: 0
            };
        }
    },
    components: {
        ContentHeader,
        PageCrumb,
        Upload,
    },
    created() {
        this.ruleForm.guid = this.$route.query.id || '';
        if (this.ruleForm.guid) { // 编辑
            this.getZhUserByGuid();
        } else { // 新建
            this.fileList = [{guid: '', fileName: ''}];
            this.fileList40 = [{guid: '', fileName: ''}];
            this.fileList10 = [{guid: '', fileName: ''}];
            this.fileList30 = [{guid: '', fileName: ''}];
        }
    },
    methods: {
        handleCheckedCitiesChange(val) {
            
            
        },
        // 初始数据
        async getZhUserByGuid() {
            let id = {guid: this.ruleForm.guid};
            let {code, data} = await this.portService.getZhUserByGuid(id);
            if (code) {
                Object.assign(this.ruleForm, data);
                if(this.ruleForm.zuHuType){
                    this.ruleForm.zuHuType = this.ruleForm.zuHuType.split(",")
                }
                if (data && data.attachmentGuid) {
                    let obj = await utils.getFiles(data.attachmentGuid);
                    this.fileList = [obj];
                    this.uploadedListShow = 0
                } else {
                    this.fileList = [{guid: '', fileName: ''}];
                }
                if(this.ruleForm.deptConfigList.length>0){
                    this.ruleForm.deptConfigList.forEach(item=>{
                        if(item.logoGuid && item.type == 40){
                            utils.getFiles(item.logoGuid).then(res=>{
                                this.fileList40 = [res];
                            })
                        }else{
                            this.fileList40 = [{guid: '', fileName: ''}];
                        }
                        if(item.logoGuid && item.type == 10){
                            utils.getFiles(item.logoGuid).then(res=>{
                                this.fileList10 = [res];
                            })
                        }else{
                            this.fileList10 = [{guid: '', fileName: ''}];
                        }
                        if(item.logoGuid && item.type == 30){
                            utils.getFiles(item.logoGuid).then(res=>{
                                this.fileList30 = [res];
                            })
                        }else{
                            this.fileList30 = [{guid: '', fileName: ''}];
                        }
                    })
                }else{
                    this.ruleForm.deptConfigList = [{type:40,logoGuid:""},{type:10,logoGuid:""},{type:30,logoGuid:""},];
                    this.fileList40 = [{guid: '', fileName: ''}];
                    this.fileList10 = [{guid: '', fileName: ''}];
                    this.fileList30 = [{guid: '', fileName: ''}];
                }
                
            };
        },
        // 保存
        add() {
            this.ruleForm.zuHuType = this.ruleForm.zuHuType.join(',')
            this.ruleForm.deptConfigList = JSON.stringify(this.ruleForm.deptConfigList);
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let opt = this.ruleForm;
                    this.portService.saveZuHuInfo(this.ruleForm).then(res => {
                        if (res.code != -1) {
                            this.$message.success('保存成功');
                            this.ruleForm.guid = res.data.guid;
                            this.getZhUserByGuid();
                            this.$router.go(-1);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 附件上传成功后的钩子
        successFile(val, id) {
            this.ruleForm.attachmentGuid = val.guid;
            this.uploadedListShow = 0
        },
        successFileLogo40(val){
            this.ruleForm.logoGuid40 = val.guid;
            this.ruleForm.deptConfigList.forEach(item=>{
                if(item.type == 40){
                    item.logoGuid = val.guid;
                }
            })
        },
        successFileLogo10(val){
            this.ruleForm.logoGuid10 = val.guid;
            this.ruleForm.deptConfigList.forEach(item=>{
                if(item.type == 10){
                    item.logoGuid = val.guid;
                }
            })
        },
        successFileLogo30(val){
            this.ruleForm.logoGuid30 = val.guid;
            this.ruleForm.deptConfigList.forEach(item=>{
                if(item.type == 30){
                    item.logoGuid = val.guid;
                }
            })
        },
    }
};
</script>
<style lang="scss" scoped>
    .add_one {
        font-size: 18px;
        bottom: 15px;
        right: 0px;
        cursor: pointer;
        position: absolute;
    }
    .add_one:hover {
        color: #409eff;
    }
    .item_upload_info {
        margin-top: -10px;
        color: red;
        font-size: 12px;
    }
</style>