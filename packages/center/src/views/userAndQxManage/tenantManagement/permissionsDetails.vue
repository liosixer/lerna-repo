<template>
    <div class="page-detail">
        <div class="global-title">
            <page-crumb :d="{breadcrumbList:breadcrumbList}">
                <template slot="btns">
                    <el-button size="small" type="primary" @click="add">保存</el-button>
                    <el-button size="small" @click="$router.go(-1)">返回</el-button>
                </template>
            </page-crumb>
        </div>
        <div class="global-content">
            <!-- 基础信息 -->
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">基本信息</span>
                </div>
                <div class="global-card-content">
                    <el-form
                        label-width="150px"
                        :model="ruleForm"
                        ref="ruleForm"
                        size="small"
                        :rules="baseInfoCheck"
                    >
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="租户名称：" prop="zuHuName">
                                    <el-input v-model="ruleForm.zuHuName" disabled placeholder="请输入"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="租户类型：" prop="zuHuType">
                                    <!-- <el-checkbox-group v-model="ruleForm.zuHuType">
                                        <el-checkbox :label="0">招标人/采购人</el-checkbox>
                                        <el-checkbox :label="1">招标代理</el-checkbox>
                                    </el-checkbox-group> -->
                                    <el-radio-group v-model="ruleForm.zuHuType">
                                        <el-radio :label="'0'">招标人/采购人</el-radio>
                                        <el-radio :label="'1'">招标代理</el-radio>
                                    </el-radio-group>
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
                                    <Upload
                                        :uploadedList="fileList.length>0?[{guid: fileList[0].guid, fileName:fileList[0].name}]:[]"
                                        action="/upload"
                                        @sucData="successFile"
                                    ></Upload>
                                    <p v-if="uploadSuccess" class="item-info">请上传平台用户的相关文件。</p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <!-- 权限控制 -->
            <permission-form
                :base-form="ruleForm"
                :disabled-edit="disabledEdit"
                ref="permissionBox"
                @handleSelectAgency="handleSelectAgency"
            ></permission-form>

            <!-- 平台使用费收费规则 -->
            <platform-cost-rule-list
                v-if="ruleForm.isPingTaiFei == 0"
                :guid="ruleForm.guid"
                :disabled-edit="disabledEdit"
                :base-form="ruleForm"
                :is-show="ruleForm.isPingTaiFei == 0"
                :isLessee="true"
            ></platform-cost-rule-list>
        </div>
    </div>
</template>
<script>
    import ContentHeader from "@/components/contentHeader/ContentHeader";
    import PageCrumb from "@/components/PageCrumb";
    import Upload from "@/components/Upload";
    import utils from "@/utils/utils";
    import permissionForm from "../../platformConfig/purchaseUserManagement/permissionForm"
    import platformCostRuleList from "../../platformConfig/purchaseUserManagement/platformCostRuleList"

    export default {
        inject: ["globalSetting"],
        data() {
            return {
                breadcrumbList: [
                    { label: "租户详细信息", link: "" }
                ],
                uploadSuccess: true,
                ruleForm: {
                    guid: '',
                    zuHuName: '',
                    zuHuType: '',
                    attachmentGuid: '',
                    isUsedPlanModule: 0,
                    isUsedPurchaseCommission: 0,
                    isUsedHomeWebsite: 1,
                    homeWebsite: '',
                    daiLiFeiMethod: [0],
                    biaoShuFeiMethod: [1],
                    isPingTaiFei: 0,
                    isUsedExpertSystem: 0,
                    extractExpertInfo: 0,
                    isUsedFeiZhaoZYFL: 0,
                    isUsedSupplierManage: 0,
                    isUsedJianBiaoRen: 0,
                    isUsedZiChaBaoGao: 0,
                    isCaiGouRenFuHe: 0,
                    isUsedZBFangAn: 0,
                    projectNumber: 0,
                    isUsedCA: 0,
                    purchaseMethod: [3,4,5,6],
                    yunXuZhaoBiaoDaiLi: "",
                    yunXuZhaoBiaoDaiLiNames: "",
                    isZuHu: 1
                },
                disabledEdit: false,
                baseInfoCheck: {
                    zuHuType: [
                        { required: true, message: '请选至少选择一种交易类型', trigger: 'change' }
                    ],
                    zuHuName: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    zuHuCode: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ]
                },
                fileList: [] // 附件list
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
            permissionForm,
            platformCostRuleList
        },
        created() {
            this.ruleForm.guid = this.$route.query.id || '';
            if (this.ruleForm.guid) this.getZhUserByGuid();
        },
        methods: {
            // 初始数据
            async getZhUserByGuid() {
                let id = {guid: this.ruleForm.guid};
                let {code, data} = await this.portService.getZhUserByGuid(id);
                if (code) {
                    Object.assign(this.ruleForm, data);
                    this.ruleForm.daiLiFeiMethod = this.checkEmptyArray(data.daiLiFeiMethod)
                    this.ruleForm.biaoShuFeiMethod = this.checkEmptyArray(data.biaoShuFeiMethod)
                    this.ruleForm.purchaseMethod = this.checkEmptyArray(data.purchaseMethod)
                    // if (data && data.zuHuType) {
                        // this.ruleForm.zuHuType = data.zuHuType.split(',');
                        // this.ruleForm.zuHuType = +this.ruleForm.zuHuType;
                    // } else {
                    //     this.ruleForm.zuHuType = [0,1]
                    // }
                    this.ruleForm.purchaseMethod = [1,2,4,6,7,10];
                    this.ruleForm.isUsedPlanModule = 0;
                    this.ruleForm.biaoShuFeiMethod = [0,1];
                    this.ruleForm.isUsedExpertSystem = 0;
                    this.ruleForm.extractExpertInfo = 0;
                    this.ruleForm.isUsedFeiZhaoZYFL = 0;
                    this.ruleForm.isUsedSupplierManage = 0;
                    this.ruleForm.isUsedJianBiaoRen = 0;
                    this.ruleForm.isUsedZiChaBaoGao = 0;
                    this.ruleForm.isCaiGouRenFuHe = 0;
                    this.ruleForm.isUsedZBFangAn = 0;
                    this.ruleForm.projectNumber = 0;
                    this.ruleForm.isUsedCA = 1;
                    if (data && data.attachmentGuid) {
                        let obj = await utils.getFiles(data.attachmentGuid);
                        this.fileList.unshift(obj);
                        this.uploadSuccess = false;
                    } else {
                        this.fileList = [{guid: '', fileName: ''}];
                    }
                };
            },
            checkEmptyArray(data) {
                if (!data) {
                    data = []
                } else {
                    data = data.split(",");
                    data = data.map(item => +item)
                }
                return data
            },
            // 保存
            add() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$refs.permissionBox.$refs.permissionForm.validate((valid) => {
                            if (valid) {
                                let opt = {...this.ruleForm};
                                // opt.zuHuType = opt.zuHuType.join(",")
                                opt.daiLiFeiMethod = opt.daiLiFeiMethod.join(",")
                                opt.biaoShuFeiMethod = opt.biaoShuFeiMethod.join(",")
                                opt.purchaseMethod = opt.purchaseMethod.join(",")
                                this.portService.fetchSavePurchaseUserPermission(opt).then(res => {
                                    if (res.code != -1) {
                                        this.$message.success('保存成功');
                                        // this.getZhUserByGuid();
                                        this.$router.go(-1);
                                    }
                                });
                            } else {
                                return false;
                            }
                        })
                    } else {
                        
                    }
                });
            },
            // 选择招标代理
            handleSelectAgency(vals, names) {
                this.ruleForm = Object.assign({}, this.ruleForm, {
                    yunXuZhaoBiaoDaiLi: vals.join(","),
                    yunXuZhaoBiaoDaiLiNames: names.join(","),
                })
            },
            // 附件上传成功后的钩子
            successFile(val, id) {
                this.ruleForm.attachmentGuid = val.guid;
                this.uploadSuccess = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .item-info {
        margin-top: -7px;
        font-size: 12px;
    }
</style>