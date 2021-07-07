<template>
    <section class="container">
        <div class="headerDiv">
            <ul>
                <li>
                    <img v-if="$route.query.from==='bjs'" src="@/assets/logo.png" alt="logo" class="login-logo"/>
                    <router-link to="/login" v-else>
                        <h2>中国电子科技集团电子采购平台 | 账号申诉</h2>
                    </router-link>
                </li>
                <li>
                    <span @click="hasLoginBtn">用户登录</span>
                </li>
            </ul>
        </div>
        <div class="contentDiv">
            <el-form :inline="true" :model="checkData" :rules="checkRuleData" ref="checkData" class="checkForm" label-position="left">
                <el-form-item label="企业名称:" prop="qiYeName">
                    <el-input placeholder="请输入您申诉的企业名称" v-model="checkData.qiYeName"></el-input>
                </el-form-item>
                <el-form-item label="社会信用代码:" prop="qiYeBH">
                    <el-input placeholder="请输入您申诉的社会信用代码" v-model="checkData.qiYeBH"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="userPhone">
                    <el-input placeholder="请输入您的手机号码" v-model="checkData.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="手机验证码:" prop="yzm">
                    <el-input placeholder="请输入您的手机验证码" v-model="checkData.yzm"></el-input>
                    <el-button type="text" @click="hasDxYzm" v-show="yzmShow">获取短信验证码</el-button>
                    <el-button type="text" class="blue" v-show="!yzmShow" disabled="disabled">{{count}}秒后重新发送</el-button>
                </el-form-item>
                <el-form-item label="申诉状态:">
                    <el-input placeholder="自动获取" v-model="checkData.ssStaues" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="申诉意见:">
                    <el-input placeholder="自动获取" v-model="checkData.shenHeYiJian" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginBtn(checkData)">查询申诉情况</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="footerDiv">
            <!-- <el-checkbox-group v-model="agreeXy">
                <el-checkbox :label="$store.state.logoType == 1?'同意《中国电子科技集团电子采购平台用户协议》':'同意《电子招标采购交易平台用户协议》'" v-model="checked" @change="ydsmBtn"></el-checkbox>
            </el-checkbox-group> -->
        </div>
        <userAgreementDialog ref="userAgreementDialog"></userAgreementDialog>
    </section>
</template>

<script>
    import userAgreementDialog from "./userAgreementDialog";

    export default {
        name: 'register',
        components: { userAgreementDialog },
        inject: ["globalSetting"],
        data() {
            return {
                checkData: {
                    qiYeName: "",
                    qiYeBH: "",
                    userPhone: "",
                    yzm: "",
                    ssStaues:"",
                    shenHeYiJian:""
                },
                checkRuleData:{
                    qiYeName: [
                        { required: true, message: '请输入企业名称！', trigger: 'blur' }
                    ],
                    qiYeBH: this.validate.qyshxydmJy(true),
                    userPhone: this.validate.vdTel(true),
                    yzm: [
                        { required: true, message: '请输入正确的手机验证码', trigger: 'blur' }
                    ]
                },
                agreeXy: [],
                formData:{
                    qiYeName:"",
                    qiYeBH:"",
                    yzm:"",
                    fileId:""
                },
                count: '',
                timer: null,
                yzmShow: true,
                checked:false,
                zhSsData:{
                    qiYe_Name:"",
                    qiYe_BH:""
                }
            }
        },
        methods: {
            //获取验证码
            async getUserPhoneMessage() {
                var formData={
                    userPhone:this.checkData.userPhone,
                    sendType: 2,
                }
                const res = await this.portService.getUserPhoneMessage(formData)
                .then(res => {
                    if(res.code==1){
                        this.$message({
                            type: "success",
                            center: true,
                            duration: 2000,
                            message: "短信发送成功,请注意查收!"
                        });
                    }
                    // else{
                    //     this.$message({
                    //         type: "error",
                    //         center: true,
                    //         duration: 2000,
                    //         message: "短信发送失败!"
                    //     });
                    // }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        center: true,
                        duration: 2000,
                        message: "服务错误!!"
                    });
                })
            },
            //点击获取短信验证码按钮
            hasDxYzm(){
                this.$refs.checkData.validateField("userPhone" , (errorMessage) => {
                    if(!errorMessage){
                       this.getUserPhoneMessage()
                       this.getCode()
                    }else{
                        this.$message({
                            type: "error",
                            center: true,
                            duration: 2000,
                            message: errorMessage
                        });
                    }
                });
            },
            //获取验证码倒计时
            getCode() {
                const num = 60;
                if (!this.timer) {
                    this.count = num;
                    this.yzmShow = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= num) {
                            this.count--;
                        } else {
                            this.yzmShow = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                }
            },
            //提交申诉材料
            async zhangHaoShengSuJinDu() {
                this.formData={
                    qiYeName:this.checkData.qiYeName,
                    qiYeBH: this.checkData.qiYeBH,
                    userPhone:this.checkData.userPhone,
                    yzm:this.checkData.yzm
                }
                const res = await this.portService.zhangHaoShengSuJinDu(this.formData)
                .then(res => {
                    if(res.code==1){
                        this.$message({
                            type: "success",
                            center: true,
                            duration: 1000,
                            message: "查询申诉进度成功!"
                        });
                        for(var i=0;i< this.globalSetting.status.registerStatus.length;i++){
                            if(this.globalSetting.status.registerStatus[i].code== res.data.shenHeStatus){
                                this.checkData.ssStaues= this.globalSetting.status.registerStatus[i].name
                            }
                        }
                        this.checkData.shenHeYiJian=res.data.shenHeYiJian
                    }else{
                        this.$message({
                            type: "error",
                            center: true,
                            duration: 2000,
                            message: "查询申诉进度失败!"
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        center: true,
                        duration: 2000,
                        message: "服务错误!!"
                    });
                })
            },
            //账号申诉判断账号是否存在
            async isZhangHaoExists() {
                /* if(this.checked==false){
                    this.$message({
                        type: "warning",
                        center: true,
                        duration: 2000,
                        message: "请先阅读《中国电子科技集团电子采购平台用户协议》!"
                    });
                }else{ */
                    this.zhSsData={
                        qiYe_Name:this.checkData.qiYeName,
                        qiYe_BH: this.checkData.qiYeBH
                    }
                    const res = await this.portService.isZhangHaoExists(this.zhSsData)
                    .then(res => {
                        if(res.code==1){
                            this.zhangHaoShengSuJinDu()
                        }else{
                            this.$message({
                                type: "warning",
                                center: true,
                                duration: 5000,
                                message: "企业名称和社会信用代码不匹配,请输入正确的企业名称和社会信用代码!"
                            });
                            this.checkData.qiYeName=""
                            this.checkData.qiYeBH=""
                            this.$refs.checkData.validate()
                        }
                    }).catch(error => {
                        this.$message({
                            type: "error",
                            center: true,
                            duration: 2000,
                            message: "服务错误!!"
                        });
                    })
                //}
            },
            //点击查看申诉进度诉钮
            loginBtn(checkData){
                this.$refs.checkData.validate((valid) => {
                    if (valid){
                        this.isZhangHaoExists()
                    } else {
                        this.$message({
                            type: "error",
                            center: true,
                            duration: 1000,
                            message: "部分内容校验失败,请核查!"
                        });
                        return false;
                    }
                });
            },
            hasLoginBtn(){
                if(this.$route.query.from==='bjs'){
                    this.$router.push({ path: "/login" ,query:{from:'bjs'}});
                }else{
                    this.$router.push({ path: "/login" });
                }
            },
            //阅读说明按钮
            ydsmBtn(){
                this.checked=!this.checked
                if(this.checked==true){
                    this.$refs.userAgreementDialog.qyBoolen()
                }
            }
        },
        create() {
        },
        mounted() {

        },
        destroyed() { },
        watch: {
        },
    }

</script>

<style lang="scss" scoped>
    .container {
        width: 1200px;
        height: 100vh;
        margin: 30px auto;
        .headerDiv {
            width: 100%;
            height: 50px;
            margin-bottom: 30px;
            ul {
                overflow: hidden;
                width: 100%;
                height: 50px;
                li {
                    float: left;
                    width: 50%;
                    height: 50px;
                    h2 {
                        height: 50px;
                        padding-left: 50px;
                        background: url(../../assets/images/frame/user-logo.png) no-repeat left;
                        background-size:35px 35px;
                        background-position: left center;
                        font-size: 26px;
                        color: #333;
                        line-height: 50px;
                        &.isSzLogo{
                            background-size:200px 43px;
                            padding-left:200px;
                        }
                    }
                }
                li:last-child {
                    text-align: right;
                    line-height: 50px;
                    span {
                        display: inline-block;
                        font-size: 14px;
                        color: #7f7f7f;
                    }
                    span:hover {
                        cursor: pointer;
                        color: #1674df;
                    }
                    span:first-child {
                        margin-right: 20px;
                    }
                }
            }
        }
        .contentDiv {
            width: 100%;
            background: #fff;
            .checkForm {
                width: 700px;
                margin: 0 auto;
                padding: 30px 0 10px;
                 ::v-deep.el-form-item {
                    width: 100%;
                    height: 40px;
                    margin-bottom: 30px;
                    .el-form-item__label {
                        width: 120PX!important;/*no*/
                        height: 40px;
                        font-size:14px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 120PX);/*no*/
                        .el-input {
                            width: 100%;
                            height: 40px;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size:14px;
                            }
                        }
                    }
                }
                 ::v-deep.el-form-item:nth-child(4) {
                    .el-form-item__content {
                        .el-input {
                            width: calc(100% - 110px);
                            .el-input__inner {
                                width: 100%;
                            }
                        }
                        .el-button {
                            width: 110px;
                            margin-left: 0;
                        }
                    }
                }
                ::v-deep.el-form-item:nth-child(5),
                ::v-deep.el-form-item:nth-child(6) {
                    .el-form-item__label{
                        padding-left:10px;
                    }
                }
                 ::v-deep.el-form-item:last-child {
                    margin-bottom: 0;
                    text-align: center;
                    .el-button {
                        width: 60%;
                        height:40px;
                        padding:0;
                        background: #22659b;
                    }
                }
            }
        }
        .footerDiv {
            width: 100%;
            height: 60px;
            background: #fff;
            line-height: 50px;
            text-align: center;
            color: #333;
            ::v-deep.el-checkbox__label{
                font-size:14px;
            }
        }
    }
</style>
