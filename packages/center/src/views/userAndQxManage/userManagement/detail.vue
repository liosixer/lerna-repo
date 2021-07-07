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
            <el-card>
                <div slot="header">
                    <span class="global-card-header-name">基本信息</span>
                </div>
                <el-form
                    label-width="150px"
                    :model="ruleForm"
                    ref="ruleForm"
                    :rules="baseInfoCheck"
                >
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="登录名：">
                        <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiRen"></el-input>
                    </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码：">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="姓名：">
                        <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiRen"></el-input>
                    </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="省份证号码：">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="手机号：">
                        <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiRen"></el-input>
                    </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="座机号：">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="用户级别：" prop="authLeiXing">
                                <el-radio-group v-model="ruleForm.authLeiXing">
                                    <el-radio :label="3">平台及</el-radio>
                                    <el-radio :label="6">组户级</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属租户：" prop="zuHuName">
                                <el-input v-model="ruleForm.zuHuName" placeholder="请输入" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="是否有效：">
                                <el-radio-group v-model="ruleForm.lianXiRen">
                                    <el-radio :label="1">有效</el-radio>
                                    <el-radio :label="0">无效</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建时间：">
                                <el-input size="small" placeholder="请输入" v-model="ruleForm.lianXiPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <!-- 分配角色 -->
            <el-card>
                <div slot="header" class="user_title">
                    <p class="global-card-header-name">分配角色</p>
                    <el-button type="primary" @click="distributionUserShow = true" size="small">添加</el-button>
                </div>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column prop="index" label="序号" width="55"></el-table-column>
                    <el-table-column prop="date" label="角色名称"></el-table-column>
                    <el-table-column prop="name" label="角色编号"></el-table-column>
                    <el-table-column prop="address" label="分配时间"></el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="{ row }">
                            <el-button type="info" plain class="operation-button redBtn" size="small">
							    <i class="iconfont icon-shanchu1"><span v-if="row.guid">删除</span></i>
							</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <userMergeDialog :distributionUser="distributionUserShow" :distributionIdUser="ruleForm.guid"></userMergeDialog>
    </div>
</template>
<script>
    import ContentHeader from "@/components/contentHeader/ContentHeader";
    import PageCrumb from "@/components/PageCrumb";
    import Upload from "@/components/Upload";
    import utils from "@/utils/utils";
    import userMergeDialog from './userMergeDialog';


    export default {
    data() {
        return {
            breadcrumbList: [
                { label: "用户详细信息", link: "" }
            ],
            distributionUserShow: false,
            ruleForm: {
                guid: '',
                authLeiXing: [],
                zuHuName: '',
                zuHuType: '',
                zuHuCode: '',
                attachmentGuid: '',
                lianXiRen: '',
                lianXiPhone: ''
            },
            tableData: [],
            baseInfoCheck: {
                authLeiXing: [
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
        userMergeDialog,
        Upload
    },
    created() {
        this.ruleForm.guid = this.$route.query.id || '';
        if (this.ruleForm.guid) { // 编辑
            this.getZhUserByGuid();
        } else { // 新建
            this.fileList = [{guid: '', fileName: ''}];
        }
    },
    methods: {
        // 初始数据
        async getZhUserByGuid() {
            let id = {guid: this.ruleForm.guid};
            let {code, data} = await this.portService.getZhUserByGuid(id);
            if (code) {
                Object.assign(this.ruleForm, data);
                if (data && data.zuHuType) {
                    this.ruleForm.authLeiXing = data.zuHuType.split(',');
                }
                if (data && data.attachmentGuid) {
                    let obj = await utils.getFiles(data.attachmentGuid);
                    this.fileList.unshift(obj);
                } else {
                    this.fileList = [{guid: '', fileName: ''}];
                }
            };
        },
        // 保存
        add() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.ruleForm.zuHuType = this.ruleForm.authLeiXing.join(',');
                    let opt = this.ruleForm;
                    delete opt.authLeiXing;
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
        }
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
    .item-info {
        margin-top: -10px;
        color: red;
        font-size: 12px;
    }
    .user_title {
        display: flex;
        justify-content: space-between;
        p {
            line-height: 35PX;
        }
    }
</style>