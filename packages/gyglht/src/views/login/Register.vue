<template>
    <section class="container">
        <div class="headerDiv">
            <ul>
                <li>
                    <router-link to="/login">
                        <div class="bjs" v-if="$route.query.from==='bjs'">
                            <img src="@/assets/logo.png" alt="">
                            <!-- <span> | 用户注册</span> -->
                        </div>
                        <h2 v-else>中国电子科技集团电子采购平台 | 用户注册</h2>
                    </router-link>
                </li>
                <li>
                    <span @click="hasLoginBtn">已有账号登录</span>
                </li>
            </ul>
        </div>
        <div class="contentDiv">
            <el-form :inline="true" :model="checkData" :rules="checkRuleData" ref="checkData" class="checkForm" label-position="left">
                <el-form-item label="企业名称:" prop="qiYe_Name">
                    <el-input placeholder="请输入企业名称" v-model="checkData.qiYe_Name" @change="value => handleCheckQiye(value, 'qiYe_Name')"></el-input>
                </el-form-item>
                <el-form-item label="社会信用代码:" prop="qiYe_BH" class="qiye-code-item">
                    <el-input placeholder="请输入社会信用代码" v-model="checkData.qiYe_BH" @change="value => handleCheckQiye(value, 'qiYe_BH')"></el-input>
                    <p class="qiye-item-tip">填写社会信用代码，请与营业执照保持一致。</p>
                </el-form-item>
                <el-form-item label="企业用户名:" prop="accountName">
                    <el-input placeholder="请输入您的登录账号" v-model="checkData.accountName" @blur="jyzhPpFunc"></el-input>
                </el-form-item>
                <el-form-item label="登录密码:" prop="password">
                    <el-input type="password" placeholder="请设置您的登录密码" v-model="checkData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="passwordNext">
                    <el-input type="password" placeholder="请再次输入您的登录密码" v-model="checkData.passwordNext"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="userPhone">
                    <el-input placeholder="请输入您的手机号码" v-model="checkData.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="手机验证码:" prop="yzm">
                    <el-input placeholder="请输入您的手机验证码" v-model="checkData.yzm"></el-input>
                    <el-button type="text" @click="hasDxYzm" v-show="yzmShow">获取短信验证码</el-button>
                    <el-button type="text" class="blue" v-show="!yzmShow" disabled="disabled">{{count}}秒后重新发送</el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px">
                    <el-button :disabled="$route.query.from=='bjs'" type="primary" :loading="regDis" @click="loginBtn(checkData)">注册并完善机构信息</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="footerDiv" v-if="$route.query.from!='bjs'">
            <el-checkbox-group v-model="agreeXy">
                <el-checkbox label="同意《中国电子科技集团电子采购平台用户协议》" v-model="checked" @change="ydsmBtn"></el-checkbox>
            </el-checkbox-group>
        </div>
        <userAgreementDialog ref="userAgreementDialog"></userAgreementDialog>
    </section>
</template>

<script>
    import axios from "axios";
    import qs from 'querystring'
    import userAgreementDialog from "./userAgreementDialog";
    import config from "../../config/config"
    export default {
        name: 'register',
        components: { userAgreementDialog },
        data() {
            const regDev = RegExp(/development/);
            const checkQiyeCode = (rule, value, callback) => {
                if (!value || (value && value.match(/^[ ]*$/))) {
                    return callback(new Error("社会信用代码不能为空！"))
                } else if (value && value.length !== 18) {
                    return callback(new Error("请输入18位由数字或大字母组成的社会信用代码！"))
                } else {
                    callback()
                }
            }
            return {
                requestUrl:regDev.test(process.env.NODE_ENV)?'':config.requestUrl,
                checkData:{
                    qiYe_Name: "",
                    qiYe_BH: "",
                    accountName:"",
                    password:"",
                    passwordNext: "",
                    userPhone:"",
                    yzm:""
                },
                checkRuleData:{
                    qiYe_Name: [
                        { required: true, message: '企业名称不能为空！', trigger: 'blur' },
                    ],
                    qiYe_BH: [
                        { required: true, message: '社会信用代码不能为空！', trigger: 'blur' },
                        {
                            pattern: /^[0-9A-Z]{18}$/,
                            message: '请输入18位由数字或大字母组成的社会信用代码',
                            trigger: 'blur',
                        }
                        // { validator: checkQiyeCode },
                    ],
                    accountName: this.validate.vdZcZhangHao(true),
                    password: this.validate.vdZcPassWord(true),
                    passwordNext: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: this.vdZcPassWordNext, trigger: 'blur' },
                    ],
                    userPhone: this.validate.vdTel(true),
                    yzm: [
                        { required: true, message: '请输入正确的手机验证码', trigger: 'blur' }
                    ]
                },
                agreeXy:[],
                formData:{
                    accountName:"",
                    password:"",
                    userPhone:"",
                    yzm:""
                },
                count: '',
                timer: null,
                yzmShow: true,
                checked:false,
                loginForm:{
                    grant_type: "password",
                    client_id: "test_beijing",
                    client_secret: "test",
                    username: "",
                    password: "",
                    userType: 3
                },
                loginToken:"",
                regDis:false
            }
        },
        methods: {
            //光标移开校验用户名是否存在
            jyzhPpFunc(){
                let isZc=0
                this.isUserNameExists(isZc)
            },
            //校验用户名是否存在
            async isUserNameExists(isZc) {
                var formData={
                    user_Name:this.checkData.accountName
                }
                const res = await this.portService.isUserNameExists(formData)
                .then(res => {
                    if(res.code==1){
                        this.$message({
                            type: "warning",
                            center: true,
                            duration: 2000,
                            message: "用户名已经注册,请修改！"
                        });
                        this.checkData.accountName = ""
                    }else{
                        if(isZc==1){
                            this.register()
                        }
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
            //密码再次校验
            vdZcPassWordNext(rule, value, callback){
                if (value!= this.checkData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            },
            //获取验证码
            async getUserPhoneMessage() {
                var formData={
                    userPhone:this.checkData.userPhone,
                    sendType:this.$route.query.from == 'bjs'?34:1,
                    accountName:''
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
                    }else{
                        this.$message({
                            type: "error",
                            center: true,
                            duration: 2000,
                            message: "短信发送失败!"
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
            //注册
            async register() {
                if(this.checked==false){
                    this.$message({
                        type: "warning",
                        center: true,
                        duration: 2000,
                        message: '请先阅读《中国电子科技集团电子采购平台用户协议》!'
                    });
                }else{
                    this.regDis=true
                    this.formData={
                        accountName:this.checkData.accountName,
                        password:this.checkData.password,
                        userPhone:this.checkData.userPhone,
                        yzm:this.checkData.yzm,
                        qiYe_Name: this.checkData.qiYe_Name,
                        qiYe_BH: this.checkData.qiYe_BH,
                    }
                    const checkName = await this.handleCheckQiye(this.checkData.qiYe_Name, "qiYe_Name")
                    const checkCode = await this.handleCheckQiye(this.checkData.qiYe_BH, "qiYe_BH")
                    if (!checkName || !checkCode) return
                    const res = await this.portService.register(this.formData)
                    .then(res => {
                        if(res.code==1){
                            this.regDis=false
                            this.$message({
                                type: "success",
                                center: true,
                                duration: 1000,
                                message: "注册成功!"
                            });
                            //注册成功后直接登录完善用户信息
                            this.login()
                        }else{
                            this.regDis=false
                            this.$message({
                                type: "error",
                                center: true,
                                duration: 1000,
                                message: "注册失败!"
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
                }
            },
            //点击注册按钮
            loginBtn(checkData){
                this.$refs.checkData.validate((valid) => {
                    if (valid){
                        let isZc=1
                        this.isUserNameExists(isZc)
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
            //注册成功后直接登录
            async login() {
                this.loginForm={
                    grant_type: "password",
                    client_id: "test_beijing",
                    client_secret: "test",
                    username: this.checkData.accountName,
                    password: this.checkData.password,
                    userType: 3
                }
                await axios.post(`${this.requestUrl}/guotou-auth/oauth/token`, qs.stringify(this.loginForm),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    var nowTime=new Date()
                    nowTime=nowTime.getTime()
                    this.loginToken = res.data.access_token
                    this.userInfo()
                    this.$store.dispatch("addToken", res.data.access_token)
                    this.$store.dispatch("addloginData", res.data)
                    this.$store.dispatch("addloginTime",nowTime)
                    this.$router.push({ path: "/qyxxgl" })
                }).catch(error => {
                    if(error.response.status!=200){
                        let message=""
                        if(error.response.status==400){
                            message= "系统错误!"
                        }else if(error.response.status==401){
                            message= error.response.data.error_description
                        }else if(error.response.status==500){
                            message= "登录服务错误"
                        }
                        this.$message({
                            type: "warning",
                            center: true,
                            duration: 2000,
                            message: message
                        });
                    }
                })
            },
            //注册后获取用户信息
            async userInfo() {
                await axios.get(`${this.requestUrl}/guotou-auth/resource/userInfo`, {
                    headers: {
                        'Authorization': "Bearer " +this.loginToken
                    },
                }).then(res => {
                    this.$store.dispatch("addUserInfo", res.data)
                }).catch(error => {
                    this.$message({
                        type: "error",
                        center: true,
                        duration: 2000,
                        message: "服务错误!!"
                    });
                })
            },
            hasLoginBtn(){
                if(this.$route.query.from!='bjs'){
                    this.$router.push({ path: "/login" })
                }else{
                    this.$router.push({ path: "/login",query:{from:"bjs"}})
                }
            },
            //阅读说明按钮
            ydsmBtn(){
                this.checked=!this.checked
                if(this.checked==true){
                    this.$refs.userAgreementDialog.qyBoolen()
                }
            },
            // 检查企业名称、代码
            handleCheckQiye(val, field) {
                let params = {}
                if (field === "qiYe_Name") {
                    params = {
                        qiYe_Name: (val && val.trim()) || "",
                    }
                } else {
                    params = {
                        qiYe_BH: (val && val.trim()) || "",
                    }
                }
                return new Promise(async (resolve, reject) => {
                    const res = await this.portService.fetchExistQiye(params)
                    if (res.code == 1) {
                        this.$nextTick(() => {
                            this.$message.warning(res.info)
                            this.checkData[field] = ""
                            resolve(false)
                        })
                    } else {
                        resolve(true)
                    }
                })
            },
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
    .bjs{
        height: 46px;
        line-height: 46px;
    }
    .container {
        width: 1200px;
        height: 100vh;
        margin:30px auto;
        overflow-y: auto;
        .headerDiv{
            width:100%;
            height:50px;
            margin-bottom:30px;
            ul{
                overflow: hidden;
                width:100%;
                height:50px;
                li{
                    float:left;
                    width:50%;
                    height:50px;
                    h2{
                        height:50px;
                        padding-left:50px;
                        background:url(../../assets/images/frame/user-logo.png) no-repeat left;
                        background-size:44px 44px;
                        background-position: left center;
                        font-size:26px;
                        color:#333;
                        line-height:50px;
                        &.isSzLogo{
                            background-size:200px 43px;
                            padding-left:200px;
                        }
                    }
                }
                li:last-child{
                    text-align: right;
                    line-height:50px;
                    span{
                        display:inline-block;
                        font-size:14px;
                        color:#7f7f7f;
                    }
                    span:hover{
                        cursor:pointer;
                        color:#1674df;
                    }
                }
            }
        }
        .contentDiv{
            width:100%;
            background:#fff;
            overflow-y: auto;
            .checkForm {
                width: 700px;
                margin: 0 auto;
                padding: 30px 0 5px;
                ::v-deep.el-form-item {
                    width: 100%;
                    height: 40px;
                    margin-bottom: 30px;
                    .el-form-item__label {
                        width: 120PX!important;/*no*/
                        font-size:14px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 120PX);/*no*/
                        .el-input {
                            height: 40px;
                            width: 100%;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size:14px;
                            }
                        }
                    }
                }
                ::v-deep.el-form-item:nth-last-child(2) {
                    .el-form-item__content {
                        .el-input {
                            width: calc(100% - 110px);
                            .el-input__inner {
                                width: 100%;
                            }
                        }
                        .el-button{
                            width:110px;
                            margin-left:0;
                            span{
                                font-size:14px;
                            }
                        }
                    }
                }
                 ::v-deep.el-form-item:last-child {
                    /*margin-bottom:0;*/
                    text-align: center;
                    .el-button{
                        width:60%;
                        background:#22659b;
                        height:40px;
                        padding:0;
                    }
                }
                .qiye-code-item{
                    height: 65px;
                    .qiye-item-tip{
                        color: #999999;
                        line-height: 1.5;
                    }
                }
            }
        }
        .footerDiv{
            width:100%;
            height:60px;
            background:#fff;
            line-height:50px;
            text-align: center;
            color:#333;
            ::v-deep.el-checkbox__label{
                font-size:14px;
            }
        }
    }
</style>
