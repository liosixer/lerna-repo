<template>
    <div>
        <div class="content_title">
            <h3>
                {{ departName }}
            </h3>
            <div class="content_title_con">
                <!-- <el-button type="primary" size="small" @click="handelSaveUser" :disabled="disabled"
                           v-if="!($route.query.methods === 'edit')">保存并继续
                </el-button> -->
                <el-button type="primary" size="small" @click="handelSaveUser(1)">保存</el-button>
                <!-- <el-button size="small" @click="handleBack">返回</el-button> -->
            </div>
        </div>
        <div class="content_form">
            <el-form
                    label-width="150px"
                    style="width: 450px"
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
            >
                <div class="from_wrapper">
                    <div>
                        <el-form-item label="企业名称" prop="deptName">
                            <el-input
                                    placeholder="自动读取，可修改"
                                    v-model="ruleForm.deptName"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="社会信用代码" prop="qiYeDaima">
                            <el-input
                                    placeholder="自动读取，可修改"
                                    size="small"
                                    v-model="ruleForm.qiYeDaima"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="交易主体类型" prop="zuHuType">
                            <el-radio-group v-model="ruleForm.zuHuType">
                                <el-radio :label="'0'">招标人/采购人</el-radio>
                                <el-radio :label="'1'">招标代理</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="邀请码">
                            <el-input disabled
                                    placeholder="自动生成"
                                    size="small"
                                    v-model="ruleForm.yaoQingCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="lianXiRen">
                            <el-input
                                    placeholder="自动读取，可修改"
                                    size="small"
                                    v-model="ruleForm.lianXiRen"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="lianXiPhone">
                            <el-input
                                    placeholder="自动读取，可修改"
                                    size="small"
                                    v-model="ruleForm.lianXiPhone"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="上级单位" class="el_form_item_pos" prop="departName">
                            <el-input
                                    v-if="ruleForm.parentGuid == 0"
                                    placeholder="请选择"
                                    size="small"
                                    disabled
                                    v-model="departName"
                            ></el-input>
                            <Tree
                                    v-else
                                    :lazy="true"
                                    :nodes="ManageList"
                                    :loadNode="loadNode"
                                    :showCheckbox="false"
                                    @click="handleShowSelector"
                                    v-model="ruleForm.parentGuid"
                                    :checkeds="userDepartment"
                                    :showctr="true"
                                    :objed="true"
                                    treeId="departGuid"
                                    ref="treeChecks"
                            ></Tree>
                        </el-form-item>
                        <!-- <el-form-item label="身份" prop="shenfen">
                            <el-radio-group v-model="ruleForm.shenfen">
                                <el-radio :label="1">普通成员</el-radio>
                                <el-radio :label="2">部门负责人</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="user_Email">
                            <el-input
                                    placeholder="请输入邮箱"
                                    size="small"
                                    v-model="ruleForm.user_Email"
                            ></el-input>
                        </el-form-item> -->
                        <el-form-item label="是否有效" prop="isDeleted">
                            <el-radio-group v-model="ruleForm.isDeleted">
                                <el-radio :label="0">有效</el-radio>
                                <el-radio :label="1">无效</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <!-- <div class="form_right">
                        <el-form-item class="uplader_wrapper" label-width="30px">
                            <Uploader
                                    action="/upload"
                                    buttonType="image"
                                    :uploadedList="[{guid:ruleForm.fuJianGuid, fileName:ruleForm.fuJianName}]"
                                    @sucData="handleUploadImage"
                                    :showFileList="false"
                            ></Uploader>
                        </el-form-item>
                    </div> -->
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    const ruleObject = {
        // accountName: 'zlcsydg1', //登录名
        // password: 'Abcd@123', //登陆密码
        // user_Name: '用户名测试', // 用户名
        // user_BH: '110101192006246359', //身份证编号
        // deptGuid: '', //所属部门guid
        // shenfen: 1, //身份 1：普通成员   2：部门负责人
        // user_Email: '11@qq.com', //邮箱
        // isYouXiao: 0, //是否有效
        // user_Guid: 'guid', //用户guid
        // fuJianGuid: '',
        // fuJianName: '',
        // user_Phone:'15519575900'
        deptName: '', // 企业名称
        qiYeDaima: '', // 企业代码
        zuHuType: '', //  租户类型
        yaoQingCode: '', // 邀请码
        guid: '', //所属部门guid
        lianXiRen: '', // 联系人
        lianXiPhone: '', // 联系人电话
        parentGuid: 0, // 所属上级id
        parentName: '', // 所属上级名称
        fuJianGuid: '', // 附件ID
        isDeleted: 1 // 是否有效0-有效，1-无效
    }
    import {saveUser, getUserInfo, isUserBHExist} from '@/service/roleAndDepartment'
    import Tree from '@/components/tree/Tree'
    import Uploader from '@/components/Upload'

    export default {
        data() {
            const reg = /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,20}$))/

            const vRule = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入密码'))
                } else {
                    // if (value.length < 8 || value.length > 20) {
                    //     callback(new Error('长度在 8 到 20 个字符'))
                    // } else
                        if (!reg.test(value)) {
                        callback(new Error('8-20位字符,至少包含大写字母、小写字母、数字、特殊字符中的三种'))
                    } else {
                        callback()
                    }
                }
            }
            const passwordValidate = (rule, value, callback) => {
                let reg = /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,20}$))/
                if (!this.$route.query.id) {
                    vRule(rule, value, callback)
                } else {
                    if (this.pwd === value) {
                        callback()
                    } else {
                        vRule(rule, value, callback)
                    }
                }
            }
            return {
                imageUrl: '',
                loaded: false,
                showSelector: true,
                disabled: false,
                pwd: '',
                ruleForm: Object.assign({}, ruleObject),
                rules: {
                    deptName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    qiYeDaima: [
                        { required: true, message: '请输入社会信用代码', trigger: 'blur' }
                    ],
                    zuHuType: [
                        { required: true, message: '请至少选择一种类型', trigger: 'change' }
                    ],
                    // lianXiRen: [
                    //     { required: true, message: '请输入联系人', trigger: 'blur' }
                    // ],
                    // lianXiPhone: [
                    //     { required: true, message: '请输入联系人电话', trigger: 'blur' }
                    // ],
                    isDeleted: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    parentGuid: [
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ],
                },
                copyId: '',
                copyName: '',
                userDepartment: [],
                loadlazy: false,
                ManageList: []
            }
        },
        props: {
            guid: {
                type: String,
                default: ''
            },
            // parentGuid: {
            //     type: String,
            //     default: ''
            // }
        },
        watch: {
            'guid': function(val) {
                this.userFindUser();
                this.ruleForm.deptGuid = val;
            }
        },
        components: {
            Tree,
            Uploader
        },
        created() {
            // console.log(this.$route.matched)
            // let guid = this.$route.query.id
            // let deptGuid = this.guid
            // console.log(guid
            // if (guid) {
            //   getUserInfo(`/user/queryUserInfo?guid=${guid}`).then((res) => {
            //     if (res.code === 1) {
            //       const d = JSON.parse(JSON.stringify(res.data))
            //       this.ruleForm = Object.assign(this.ruleForm, d)
            //       this.pwd = this.ruleForm.password
            //       this.copyId = this.ruleForm.user_BH
            //     }
            //     this.loaded = true
            //   })
            // } else {
            //   this.loaded = true
            // }
            this.userManageList()
            if (this.guid) {
                this.ruleForm.deptGuid = this.guid
                this.userFindUser();
            } else {
                this.ruleForm.zuHuType = ''
            }
            this.loadlazy = true
        },
        beforeDestroy() {
            this.loadlazy = false
        },
        computed: {
            departguid() {
                return this.$store.state.roleAnddepartment.currentDepartment.departGuid
            },
            departName() {
                if (this.ruleForm.parentGuid == 0) {
                    return '北京筑龙信息技术有限责任公司'
                } else {
                    return '北京筑龙信息技术有限责任公司 | '+this.ruleForm.parentName
                }
            },
            getnodes() {
                return this.$store.state.roleAnddepartment.department
            },
        },
        methods: {
            /**
             * 查询-加载子节点
             */
            userManageList() {
                this.portService.userManageList({pid: 0}).then((res) => {
                    let data = res.data.data;
                    data = data.filter(t => t.state === 'closed');

                    if (res.code) {
                        this.$nextTick(() => {
                            this.ManageList = data
                        })
                    }
                })
            },
            /**
             * 查询-加载子节点
             */
            loadNode(node, resolve) {
                if (node.data.departGuid) {
                    this.portService.userManageList({pid: node.data.departGuid}).then((res) => {
                        let data = res.data.data;
                        data = data.filter(t => t.state === 'closed');

                        if (res.code) resolve(data)
                    })
                } else {
                    resolve([])
                }
            },
            /**
             * 组织架构-用户管理-查询单个用户
             */
            async userFindUser() {
                let opt = {
                    parentGuid: this.parentGuid,
                    guid: this.guid
                }
                if (opt.guid) {
                    try {
                        let {data,code} = await this.portService.organizationJgManage(opt);
                        if (code) {
                            Object.assign(this.ruleForm, data);
                            // console.log(data.zuHuType.split(','));
                            // if (this.ruleForm.zuHuType) {
                            //     this.ruleForm.zuHuType = data.zuHuType.split(',')
                            // } else {
                            //     this.ruleForm.zuHuType = []
                            // }
                            if (data.guid) {
                                this.userDepartment = [data.parentGuid]
                                this.$nextTick(() => {
                                    if (data.parentGuid != 0 ) {
                                        this.$refs.treeChecks.selData = {departName: data.parentName}
                                    } else {
                                        this.$refs.treeChecks.selData = {departName: '中国电子科技集团电子采购平台'}
                                    }
                                })
                                this.ruleForm.parentName = data.parentName;
                            }
                        }
                    } catch(e) {
                        // this.ruleForm.zuHuType = [];
                        console.log(e);
                    }
                }
            },
            /**
             * 角色管理-保存
             */
            async userAddOrganization(fn) {
                const {code, data} = await this.portService.userAddOrganization(this.ruleForm);
                if (code) {
                    fn && fn(data)
                    this.$message({type: 'success', message: data.message});
                } else {
                    this.$message({type: 'error', message: data.message});
                }
            },
            /**
             * 角色管理-更新
             */
            async userUpdateOrganization() {
                this.disabled = true
                const {code, data} = await this.portService.userUpdateOrganization(this.ruleForm);

                this.disabled = false
                if (code) {
                    this.$router.go(-1)
                    this.$message({type: 'success', message: data.message});
                } else {
                    this.$message({type: 'error', message: data.message});
                }
            },
            /**
             * 身份证验证 统一添加时验证正确性
             */
            isUserBHExistValidate(rule, value, callback) {
                const me = this
                const validate = async function () {

                    const flag = await me.portService.userUserBH({userBH: value}).catch((e) => {
                        return callback(new Error('验证失败，请联系后台管理员' + e))
                    })

                    if (flag.code === '400') {
                        return callback(new Error(flag.result))
                    } else {
                        return callback()
                    }
                }
                if (me.$route.query.id) {
                    if (me.ruleForm.user_BH === me.copyId) {
                        callback()
                    } else {
                        validate()
                    }
                } else {
                    validate()
                }
            },
            /**
             * 组织架构-用户管理-添加用户 登录名称验证
             */
            isUserAccountNameValidate(rule, value, callback) {
                const me = this
                const validate = async function () {
                    let data = {account: value}
                    if (me.$route.query.id) data.guid = me.$route.query.id

                    const flag = await me.portService.userAccountName(data).catch((e) => {
                        return callback(new Error('验证失败，请联系后台管理员' + e))
                    })

                    if (flag.code === '400') {
                        return callback(new Error(flag.result))
                    } else {
                        return callback()
                    }
                }
                if (me.$route.query.id) {
                    if (me.ruleForm.accountName === me.copyName) {
                        callback()
                    } else {
                        validate()
                    }
                } else {
                    validate()
                }
            },
            /**
             * 进入时便利添加
             */
            // flatten (data) {
            //   var arr = []
            //   for(var i = 0; i < data.length; i++) {
            //     let obj ={}
            //     for (var e in data[i]) {
            //       if (e !== 'children') {
            //         obj[e] = data[i][e]
            //       }
            //     }
            //     arr.push(obj)
            //     if (data[i].children.length) {
            //       arr = arr.concat(this.flatten( data[i].children))
            //     }
            //   }
            //   return arr
            // },
            // 上传文件回调
            handleUploadImage(data) {
                this.ruleForm.fuJianGuid = data.guid
                this.ruleForm.fuJianName = data.name
            },
            handleBack() {
                this.$router.back()
            },
            handelSaveUser(type) {
                this.$refs.ruleForm.validate( async(valid) => {
                    if (valid) {
                        let opt = this.ruleForm;
                        opt.guid = this.guid || '';
                        // opt.zuHuType = opt.zuHuType.join(',');
                        if (opt.parentGuid == 0) opt.parentGuid = +opt.parentGuid
                        let {code, data} = await this.portService.updateJgDept(opt);
                        if (code != -1) {
                            this.$message.success('保存成功');
                            this.guid = data.guid;
                            this.userFindUser()
                            // this.$router.back()
                        }
                        // if (this.$route.query.methods === 'edit') {
                        //     this.userUpdateOrganization()
                        // } else {
                        //     this.userAddOrganization(() => {
                        //         // 添加后返回
                        //         if (type && type === 1) {
                        //             this.$router.back()
                        //         }
                        //         // 添加并继续
                        //         else {
                        //             this.$refs.ruleForm.resetFields()
                        //             this.ruleForm = Object.assign({}, ruleObject, {
                        //                 deptGuid: this.ruleForm.deptGuid
                        //             })
                        //         }
                        //     })
                        // }
                    } else {
                        return false;
                    }
                })
            },
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw)
            // },
            handleShowSelector() {
                this.showSelector = true
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content_title {
        height: 60px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        width: 100%;
        border-bottom: 1px solid #f4f5f9;

        h3 {
            font-size: 16px;
            font-weight: normal;
        }

        span {
            padding: 0px 5px;
            color: #666;
            opacity: 0.3;
        }
    }

    .content-btns {
        padding: 10px;
        background: #dfeffa;
        border: 1px solid #f4f5f9;
    }

    .form_left {
        width: 500px;
        float: left;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .form_right {
        width: 200px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .content_form {
        margin-top: 20px;
        position: relative;
    }

    .from_wrapper {
        display: flex;

    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #d9d9d9;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .input_mask {
        height: 100px;
        width: 400px;
        background: brown;
    }
</style>
