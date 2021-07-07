<!--采购制度管理-->
<template>
    <div class="notice-page page-detail">
        <div class="global-title">
            <page-crumb :d="{breadcrumbList:breadcrumbList}">
                <div slot="btns">
                    <el-button type="primary" v-if="formInfo.status == 0 || formInfo.status == 3" size="small" @click="handleSave(1)">提交审核</el-button>
                    <el-button type="primary" v-if="formInfo.status == 1" size="small" @click="undo">撤回</el-button>
                    <el-button type="primary" v-if="formInfo.status == 2" size="small" @click="handleChange">变更</el-button>
                    <el-button type="primary" v-if="formInfo.status == 0 || formInfo.status == 3" size="small" @click="handleSave(0)">保存</el-button>
<!--                    <el-button @click="$router.back(-1)" size="small">返回</el-button>-->
                </div>
            </page-crumb>
        </div>
        <div class="global-content">
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">企业基本信息</span>
                </div>
                <div class="global-card-content">
                    <el-form size="small" :model="qyInfo" class="demo-form-inline" label-position="right"
                             label-width="130px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="企业名称">
                                    <el-input v-model="qyInfo.qiYeName" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="企业代码">
                                    <el-input v-model="qyInfo.qiYeBH" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="注册手机号">
                                    <el-input v-model="qyInfo.lianXiPhone" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册时间">
                                    <el-input :value='qyInfo.zhuCeTime |dateFormater("YYYY-MM-DD HH:mm")' disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="交易主体类型">
                                    <el-input :value="changeZTLX(qyInfo.zhuTiLeiXing)" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="企业状态">
                                    <el-input :value='qyInfo.qiYeStatus |kztQiyeStatus()' disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">企业采购制度</span>
                    <el-button type="primary" size="small" @click="openHis" class="fr">历史记录查看</el-button>
                    <el-button type="primary" size="small" @click="openSystem" class="fr" style="margin-right:10px">板块制度查看</el-button>
                </div>
                <div class="global-card-content">
                    <el-form :model="formInfo" :rules="rules" ref="formInfo" class="demo-form-inline" size="small" label-position="right"
                             label-width="130px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="工程招标限额" prop="gczbLimit">
                                    <el-input v-model.number="formInfo.gczbLimit" :disabled="formInfo.status == 1 || formInfo.status == 2">
                                        <template slot="suffix">万元</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="物资招标限额" prop="wzzbLimit">
                                    <el-input v-model.number="formInfo.wzzbLimit" :disabled="formInfo.status == 1 || formInfo.status == 2">
                                        <template slot="suffix">万元</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="服务招标限额" prop="fwzbLimit">
                                    <el-input v-model.number="formInfo.fwzbLimit" :disabled="formInfo.status == 1 || formInfo.status == 2">
                                        <template slot="suffix">万元</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="审核状态" prop="status">
                                    <el-input disabled :value="formInfo.status | status(formInfo.isBG)">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item
                                    label="采购制度"
                                    prop="cgzdAttachmentGuid"
                                >
                                    <div v-if="formInfo.status == 1 || formInfo.status == 2">
                                        <span class="scanBtn" v-if="formInfo.cgzdAttachmentGuid" @click="downloadpdf(cgzdAttachmentList[0].guid,cgzdAttachmentList[0].fileName)">{{cgzdAttachmentList[0].fileName}}</span>
                                    </div>
                                    <div v-else>
                                        <el-input
                                        type="text"
                                        size="small"
                                        style="display:none"
                                        v-model="formInfo.cgzdAttachmentGuid"
                                        ></el-input>
                                        <Upload action="/upload"
                                            :isDisabled="formInfo.status == 1 || formInfo.status == 2"
                                            :acceptType="'.pdf'"
                                            @sucData="cgzdAttachmentGuidUpdoadSuc"
                                            @onRemoveFn="onRemoveInstitution"
                                            :limitNumType = '1'
                                            :uploadedList="cgzdAttachmentList"
                                        ></Upload>
                                        <span class="scanBtn" v-if="formInfo.cgzdAttachmentGuid" @click="downloadFile(formInfo.cgzdAttachmentGuid,'采购制度附件.pdf')">在线预览</span>
                                        <span v-if="!formInfo.cgzdAttachmentGuid">请上传pdf格式的采购制度附件。</span>
                                        <div>请上传有效版本的采购制度。</div>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                    label="供应商专业申请模板"
                                    prop="zysqAttachmentGuid"
                                >
                                    <!-- <div v-if="formInfo.status == 1 || formInfo.status == 2">
                                        <span class="scanBtn" v-if="formInfo.zysqAttachmentGuid" @click="downloadFile(zysqAttachmentList[0].guid,zysqAttachmentList[0].fileName)">{{zysqAttachmentList[0].fileName}}</span>
                                    </div>  v-else-->
                                    <div>
                                        <el-input
                                        type="text"
                                        size="small"
                                        style="display:none"
                                        v-model="formInfo.zysqAttachmentGuid"
                                        ></el-input>
                                        <Upload action="/upload"
                                            :limitNumType = '1'
                                            :acceptType="'.doc,.docx'"
                                            @sucData="zysqAttachmentGuidUpdoadSuc"
                                            @onRemoveFn="onRemoveTemplate"
                                            :uploadedList="zysqAttachmentList"
                                        ></Upload>
                                        <span v-if="!formInfo.zysqAttachmentGuid">请上传word格式的专业申请模板附件。</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="备注" prop="content">
                                    <el-input v-model="formInfo.content"  :disabled="formInfo.status == 1 || formInfo.status == 2" type="textarea" rows="4" placeholder="请输入应招标而未招标的相对应的制度审批依据！" resize='none'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <span>请输入本单位采购制度中规定的达到应公开招标限额，但选择邀请招标或非招标方式的适用情形及审批流程。</span>
                    </el-form>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">审核记录</span>
                </div>
                <div class="global-card-content">
                    <self-table :data="tableData" border header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true" max-height="290">
                        <el-table-column type="index" label="序号" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="commitTime" label="提交时间" min-width="150px" show-overflow-tooltip
                        ><template slot-scope="scope">{{ scope.row.commitTime | timestampChange }}</template></el-table-column
                        >
                        <el-table-column prop="is_shenHe" label="操作类型" min-width="150px" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{ ["提交", "撤回", "审核", "审核"][scope.row.is_shenHe] }}
                        </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="审核时间" min-width="150px" show-overflow-tooltip
                        ><template slot-scope="scope">{{ scope.row.createTime | timestampChange }}</template></el-table-column
                        >
                        <el-table-column prop="shenHeRen" label="操作人" min-width="150px" show-overflow-tooltip align="left"></el-table-column>
                        <el-table-column prop="is_shenHe" label="操作结果" min-width="150px" show-overflow-tooltip
                        ><template slot-scope="scope">
                            <span class="status-going" v-if="scope.row.is_shenHe === 0">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                            <span class="status-success" v-else-if="scope.row.is_shenHe === 2">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                            <span class="status-fail" v-else-if="scope.row.is_shenHe === 3">{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                            <span class="status-other" v-else>{{ ["提交审核", "撤回审核", "审核通过", "审核不通过"][scope.row.is_shenHe] }}</span>
                        </template></el-table-column
                        >
                        <el-table-column prop="shenHeYiJian" label="审核意见" min-width="150px" show-overflow-tooltip></el-table-column>
                        <div slot="empty" class="custom-empty"></div>
                        <div slot="empty" class="custom-empty"></div>
                    </self-table>
                </div>
            </el-card>
        </div>
        <preview-dialog ref="previewDialog"></preview-dialog>
        <sh-his ref="ShHis"></sh-his>
        <system-dialog ref="systemDialog"></system-dialog>
    </div>
</template>

<script>
    import PageCrumb from "@/components/PageCrumb";
    import Upload from './components/Upload'
    import PreviewDialog from "@/components/Preview";
    import ShHis from "./ShHis";
    import SystemDialog from "./SystemDialog";
    import util from "@/utils/util";
    import config from "../../config/config";

    export default {
        name: "SysManage",
        components: {PageCrumb, Upload, PreviewDialog, ShHis,SystemDialog},
        filters: {
            optTrans(value) {
                const arr = [
                    {label: '撤回', value: '1'}
                ]
                let obj = arr.find(v => v.value == 1)
                return obj ? obj.label : value
            },
            status(value, isBG) {
                let statusList = {
                    0: '未提交',
                    1: '审核中',
                    2: '审核通过',
                    3: '审核不通过'
                }
                let statusListBG = {
                    0: '变更未提交',
                    1: '审核中',
                    2: '审核通过',
                    3: '审核不通过'
                }
                return isBG ? statusListBG[value] : statusList[value]
            },
            kztQiyeStatus(value){
                let statusList = {
                    1:'正常',
                    2:'暂停',
                    3:'无效'
                }
                return statusList[value]
            },
            qyStatus(value){
                let statusList = {
                    null:'正常',
                    0:'正常',
                    1:'暂停'
                }
                return statusList[value]
            }

        },
        data() {
            return {
                breadcrumbList: [
                    {label: '企业制度管理', link: ''},
                    {label: '详情', link: ''}
                ],
                rules: {
                    gczbLimit: [
                        { required: true, message: '请输入工程招标限额', trigger: 'blur' },
                        {
                            type:'integer',
                            min:0,
                            message: '请输入大于0的整数',
                            trigger: 'blur',
                        }
                    ],
                    wzzbLimit: [
                        { required: true, message: '请输入物资招标限额', trigger: 'blur' },
                        {
                            type:'integer',
                            min:0,
                            message: '请输入大于0的整数',
                            trigger: 'blur',
                        }
                    ],
                    fwzbLimit: [
                        { required: true, message: '请输入服务招标限额', trigger: 'blur' },
                        {
                            type:'integer',
                            min:0,
                            message: '请输入大于0的整数',
                            trigger: 'blur',
                        }
                    ],
                    cgzdAttachmentGuid:[
                        { required: true, message: '请上传pdf采购制度附件', trigger: 'blur' }
                    ],
                    content:[
                        { required: true, message: '请输入应招标而未招标的相对应的制度审批依据！', trigger: 'blur' }
                    ]
                },
                guid:'',
                formInfo: {
                    gczbLimit:400,
                    wzzbLimit:200,
                    fwzbLimit:100,
                    status:0,
                    cgzdAttachmentGuid:'',
                    zysqAttachmentGuid:'',
                    content:''
                },
                cgzdAttachmentList:[{}],
                zysqAttachmentList:[],
                loading: false,
                total: 0,
                tableData: [],
                qyInfo:{},
            }
        },
        watch:{
           'formInfo.cgzdAttachmentGuid':{
               async handler(n, o) {
                    if (n) {
                        const cgzdAttachmentObj = await util.getFiles(this.formInfo.cgzdAttachmentGuid);
                        this.cgzdAttachmentList = []
                        this.cgzdAttachmentList.push({guid:cgzdAttachmentObj.guid,fileName:cgzdAttachmentObj.name})
                    }
                },
           },
           'formInfo.zysqAttachmentGuid':{
               async handler(n, o) {
                    if (n) {
                        const zysqAttachmentObj = await util.getFiles(this.formInfo.zysqAttachmentGuid);
                        this.zysqAttachmentList = []
                        this.zysqAttachmentList.push({guid:zysqAttachmentObj.guid,fileName:zysqAttachmentObj.name})
                    }
                },
           },
        },
        methods:{
            changeZTLX(string) {
                if (!string) return;
                let arr = string.split(",").reduce((t, v) => {
                    return t.concat([{ B: "采购人" }, { T: "供应商" }, { A: "招标代理" }].filter((value) => v == Object.keys(value)[0]));
                }, []);
                if (arr.length) {
                    let a = [];
                    arr.map((v) => {
                    a.push(Object.values(v)[0]);
                    });
                    return a.join("/");
                }
            },
            cgzdAttachmentGuidUpdoadSuc(res, id){
                this.formInfo.cgzdAttachmentGuid = res.groupGuid;

            },
            onRemoveInstitution(data){
                this.formInfo.cgzdAttachmentGuid =  ''
            },
            zysqAttachmentGuidUpdoadSuc(res, id){
                this.formInfo.zysqAttachmentGuid = res.groupGuid;
                this.formInfo.zysqAttachmentName = res.name;
                this.portService.submitMoban(this.formInfo).then(res=>{
                    if(res.code == 1){
                        this.$message({type: 'success', message: res.info});
                    }
                })
            },
            onRemoveTemplate(data){
                this.formInfo.zysqAttachmentGuid = ''
            },
            downloadpdf(guid,name){
                util.getDownSrc(guid).then((res) => {
                console.log(res);
                window.location.href = res;
                });
            },
            //下载文件
            downloadFile(guid,name) {
                const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
                if (ext == ".pdf" || ext == ".png" || ext == ".jpg") {
                    this.$refs["previewDialog"].dialogVisible = true;
                    this.$refs["previewDialog"].guid = guid;
                    this.$refs["previewDialog"].fileName = name;
                    console.log(guid, name);
                } else {
                    util.getDownSrc(guid).then((res) => {
                    console.log(res);
                    window.location.href = res;
                    });
                }
            },
            async getDetail(){
                if(!this.guid) return
                const res = await this.portService.institutionDetail({guid:this.guid})
                if (res && res.code == 1) {
                    this.formInfo = res.data.object
                    if (this.formInfo.cgzdAttachmentGuid){
                        const cgzdAttachmentObj = await util.getFiles(this.formInfo.cgzdAttachmentGuid);
                        this.cgzdAttachmentList = []
                        this.cgzdAttachmentList.push({guid:cgzdAttachmentObj.guid,fileName:cgzdAttachmentObj.name})
                    }

                    if(this.formInfo.zysqAttachmentGuid){
                        const zysqAttachmentObj = await util.getFiles(this.formInfo.zysqAttachmentGuid);
                        this.zysqAttachmentList = []
                        this.zysqAttachmentList.push({guid:zysqAttachmentObj.guid,fileName:zysqAttachmentObj.name})
                    }
                }
            },
            handleParam(val,isBg){
                let data1 = {
                    guid:this.formInfo.guid,
                    creatorName:'',
                    createTime:util.getCurrentTime().getTime(),
                    status:val,
                    cgzdAttachmentName:this.cgzdAttachmentList.length != 0 ? this.cgzdAttachmentList[0].fileName  :'',
                    zysqAttachmentName:this.zysqAttachmentList.length !=0 ? this.zysqAttachmentList[0].fileName :'',
                    isBG:isBg||this.formInfo.isBG?1:''
                }
                let {status,isDeleted,approveOpinion,creatorGuid,...params} = this.formInfo
                let data = Object.assign(params,data1)
                console.log(data)
                return data
            },
            async handleSave(val, isBg) {
                if (val == 1) {
                    this.$refs.formInfo.validate(async (valid) => {
                        if (valid) {
                            let data = this.handleParam(val, isBg)
                            const res = await this.portService.institutionSave(data)
                            if (res && res.code == 1) {
                                this.$message({type: 'success', message: res.info});
                                this.getQyinfo()
                            }
                        }
                    })
                } else {
                    let data = this.handleParam(val, isBg)
                    const res = await this.portService.institutionSave(data)
                    if (res && res.code == 1) {
                        this.$message({type: 'success', message: res.info});
                        this.getQyinfo()
                    }
                }
            },
            undo(){
                this.$refs.formInfo.validate(async  (valid)=>{
                    if(valid){
                        let data1 = {
                            guid:this.formInfo.guid,
                            creatorName:'',
                            createTime:util.getCurrentTime().getTime(),
                            status:0,
                            action:'undo',
                            isBG:this.formInfo.isBG?1:''
                        }
                        let {status,isDeleted,approveOpinion,creatorGuid,...params} = this.formInfo
                        let data = Object.assign(params,data1)
                        const res = await this.portService.institutionSave(data)
                        if (res && res.code == 1) {
                            if (res.errCode && res.errCode == 0) {
                                this.$confirm("采购制度已被审核，不可撤回！", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning",
                                }).then(() => {
                                    this.getQyinfo()
                                })
                            } else {
                                this.$message({type: 'success', message: res.info});
                                this.getQyinfo()
                            }
                        }
                    }
                })
            },
            async getQyinfo(){
                const res = await this.portService.qyInfo()
                if (res && res.code == 1) {
                    this.qyInfo = res.data
                    if(this.qyInfo.caiGouZhiDu){
                        this.formInfo = this.qyInfo.caiGouZhiDu
                    }

                    if (this.formInfo.cgzdAttachmentGuid){
                        const cgzdAttachmentObj = await util.getFiles(this.formInfo.cgzdAttachmentGuid);
                        this.cgzdAttachmentList = []
                        this.cgzdAttachmentList.push({guid:cgzdAttachmentObj.guid,fileName:cgzdAttachmentObj.name})
                    }

                    if(this.formInfo.zysqAttachmentGuid){
                        const zysqAttachmentObj = await util.getFiles(this.formInfo.zysqAttachmentGuid);
                        this.zysqAttachmentList = []
                        this.zysqAttachmentList.push({guid:zysqAttachmentObj.guid,fileName:zysqAttachmentObj.name})
                    }

                    if(this.formInfo.guid){
                        this.getRecord()
                    }

                }
            },
            async getRecord(){
                const res = await this.portService.institutionApproveRecord({guid:this.formInfo.guid})
                if (res && res.code == 1) {
                    this.tableData = res.data.shjlList
                }
            },
            handleChange(){
                this.$confirm("请确认是否进行采购制度变更！", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                    this.handleSave(0,1)//是否变更，用于显示变更未提交状态
                    })
                    .catch(() => {
                    console.log(1)
                    });
            },
            openHis(){
                this.$refs.ShHis.openDialog()
            },
            openSystem(){
                this.$refs.systemDialog.openDialog()
            }
        },
        created() {
            this.guid = this.$route.query.id
            this.getQyinfo()

        }
    }
</script>

<style scoped lang="scss">
.scanBtn:hover{
    color:#157EDF;
    cursor: pointer;
    text-decoration: underline;
}
.global-card-content {
    ::v-deep.el-input.is-disabled .el-input__suffix {
        display: block;
    }
}
</style>
