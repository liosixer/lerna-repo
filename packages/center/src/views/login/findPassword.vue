<template>
    <section class="container">
        <div class="headerDiv">
            <ul>
                <li>
                    <router-link to="/login">
                        <h2 v-if="$store.state.logoType == 1">中国电子科技集团电子采购平台 | 找回密码</h2>
                    </router-link>
                </li>
                <li>
                    <!-- <span @click="zhssBnt">账号申诉</span> -->
                    <span @click="hasLoginBtn">已有账号登录</span>
                </li>
            </ul>
        </div>
        <div class="contentDiv">
            <el-form :inline="true" :model="checkData" :rules="checkRuleData" ref="checkData" class="checkForm" label-position="left">
                <el-form-item label="用户名:" prop="userName">
                    <el-input placeholder="请输入您的用户名" v-model="checkData.userName" @blur="jyzhPpFunc"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="phone">
                    <el-input placeholder="请输入您的手机号码" v-model="checkData.phone"></el-input>
                </el-form-item>
                <el-form-item label="手机验证码:" prop="code">
                    <el-input placeholder="请输入您的手机验证码" v-model="checkData.code"></el-input>
                    <el-button type="text" @click="hasDxYzm" v-show="yzmShow">获取短信验证码</el-button>
                    <el-button type="text" class="blue" v-show="!yzmShow" disabled="disabled">{{count}}秒后重新发送</el-button>
                </el-form-item>
                <el-form-item label="重置密码:" prop="password">
                    <el-input type="password" placeholder="请重新设置您的登录密码" v-model="checkData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="repeatPassword">
                    <el-input type="password" placeholder="请再次输入您的登录密码" v-model="checkData.repeatPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginBtn(checkData)">重置密码</el-button>
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
    import axios from "axios";
    import qs from 'querystring'
    import config from "../../config/config"
    export default {
        name: 'reModifyPassword',
        components: { userAgreementDialog },
        data() {
            const regDev = RegExp(/development/);
            return {
                szjyjt8083:regDev.test(process.env.NODE_ENV)?'':config.requestUrl,
                checkData: {
                    userName: "",
                    password: "",
                    repeatPassword: "",
                    phone: "",
                    yzm: ""
                },
                checkRuleData:{
                    userName: this.validate.vdZcZhangHao(true),
                    password: this.validate.vdZcPassWord(true),
                    repeatPassword: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: this.vdZcPassWordNext, trigger: 'blur' },
                    ],
                    phone: this.validate.vdTel(true),
                    code: [
                        { required: true, message: '请输入正确的手机验证码', trigger: 'blur' }
                    ]
                },
                agreeXy: [],
                formData:{
                    userName:"",
                    password:"",
                    repeatPassword:'',
                    userPhone:"",
                    code:""
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
                loginToken:""
            }
        },
        methods: {
            //光标移开校验用户名是否存在
            jyzhPpFunc(){
                var isZc=0
                this.isUserNameExists(isZc)
            },
            //校验用户名是否存在
            async isUserNameExists(isZc) {
                var formData={
                    userName:this.checkData.userName
                }
                const res = await this.portService.isUserNameExists('/admin/user/checkAdminUserNameOrBh?userNameOrBh=' + this.checkData.userName)
                .then(res => {
                    if(res.code==0&& this.checkData.userName!=""){
                        this.$message({
                            type: "warning",
                            center: true,
                            duration: 2000,
                            message: "用户名不存在！"
                        });
                        this.checkData.userName = ""
                    }else if(res.code==1){
                        if(isZc==1){
                            this.reModifyPassword()
                        }
                    }else{
                        // this.$message({
                        //     type: "warning",
                        //     center: true,
                        //     duration: 2000,
                        //     message: res.data.info
                        // });
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        center: true,
                        duration: 2000,
                        message: "服务错误!"
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
                    userPhone:this.checkData.phone,
                    accountName:this.checkData.userName,
                    sendType: 3,
                }
                const res = await this.portService.getUserPhoneMessage('/admin/user/sendAdminCode?phone=' + formData.userPhone + '&userName=' + formData.userName )
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
            hasDxYzm() {
                // this.getUserPhoneMessage()
                // this.getCode()
                this.$refs.checkData.validateField("phone", (errorMessage) => {
                    if (!errorMessage) {
                        this.$refs.checkData.validateField("userName", (errorMessage2) => {
                            if (!errorMessage2) {
                                this.getUserPhoneMessage()
                                this.getCode()
                            }
                        })
                    }
                    // else{
                    //     this.$message({
                    //         type: "error",
                    //         center: true,
                    //         duration: 1000,
                    //         message: errorMessage
                    //     });
                    // }
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
            //找回密码
            async reModifyPassword() {
                /* if(this.checked==false){
                    this.$message({
                        type: "warning",
                        center: true,
                        duration: 2000,
                        message: "请先阅读《中国电子科技集团电子采购平台用户协议》!"
                    });
                }else{ */
                // userName:"",
                // password:"",
                // repeatPassword:'',
                // userPhone:"",
                // code:""
                    this.formData={
                        userNameorBh:this.checkData.userName,
                        password:this.checkData.password,
                        repeatPassword:this.checkData.repeatPassword,
                        phone:this.checkData.phone,
                        code:this.checkData.code
                    }
                    const res = await this.portService.reModifyPassword(this.formData)
                    .then(res => {
                        if(res.code==1){
                            this.$message({
                                type: "success",
                                center: true,
                                duration: 1000,
                                message: "密码重置成功!"
                            });
                            this.login()
                        }else{
                            this.$message({
                                type: "error",
                                center: true,
                                duration: 1000,
                                message: res.info
                            });
                        }
                    }).catch(error => {
                        this.$message({
                            type: "error",
                            center: true,
                            duration: 1000,
                            message: "服务错误!"
                        });
                    })
                //}
            },
            //点击找回密码按钮
            loginBtn(checkData){
                this.$refs.checkData.validate((valid) => {
                    if (valid){
                        this.jclaqBb()
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
            //修改密码成功后直接登录
            async login() {
                this.loginForm={
                    grant_type: "password",
                    client_id: "test_beijing",
                    client_secret: "test",
                    username: this.checkData.accountName,
                    password: this.checkData.password,
                    userType: 3
                }
                await axios.post(`${this.szjyjt8083}/guotou-auth/oauth/token`, qs.stringify(this.loginForm),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    var nowTime=new Date()
                    nowTime=nowTime.getTime()
                    this.loginToken = res.data.access_token
                    this.userInfo()
                    // this.$store.commit("changeToken", res.data.access_token)
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
                await axios.get(`${this.szjyjt8083}/guotou-auth/resource/userInfo`, {
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
                        message: "服务错误!"
                    });
                })
            },
            //账号申诉
            zhssBnt(){
                this.$router.push({ path: "/zhAccount" })
            },
            hasLoginBtn(){
                this.$router.push({ path: "/login" })
            },
            //阅读说明按钮
            ydsmBtn(){
                this.checked=!this.checked
                if(this.checked==true){
                    this.$refs.userAgreementDialog.qyBoolen()
                }
            },
            //检查IE浏览器版本,低于10禁止登陆
            jclaqBb(){
                var theUA = window.navigator.userAgent.toLowerCase();
                if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
                    var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0]
                    if (ieVersion < 12) {
                        this.$confirm('您当前使用的IE浏览器版本较低,为保证您的正常操作,请您尽快升级至IE11或以上版本登录系统!', '提示', {
                            confirmButtonText: '去更新',
                            cancelButtonText: '稍后更新',
                            type: 'warning'
                        }).then(() => {
                            window.open("https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads","_blank")
                        }).catch(() => {

                        });
                    }else{
                        var isZc=1
                        this.isUserNameExists(isZc)
                    }
                }else{
                    var isZc=1
                    this.isUserNameExists(isZc)
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
        margin:30px auto;
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
                        background-size:50px 50px;
                        background:url(../../assets/images/frame/user-logo.png) no-repeat left;
                        font-size:26px;
                        color:#333;
                        line-height:50px;
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
                    /* span:first-child{
                        margin-right:20px;
                    } */
                }
            }
        }
        .contentDiv{
            width:100%;
            background:#fff;
            .checkForm {
                width: 700px;
                margin: 0 auto;
                padding: 30px 0 10px;
                ::v-deep.el-form-item {
                    width: 100%;
                    height: 40px;
                    margin-bottom: 30px;
                    .el-form-item__label {
                        width: 100PX!important;/*no*/
                        font-size:14px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 100PX);/*no*/
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
                ::v-deep.el-form-item:nth-child(3) {
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
                        }
                    }
                }
                 ::v-deep.el-form-item:last-child {
                    margin-bottom:0;
                    text-align: center;
                    .el-button{
                        width:60%;
                        height:40px;
                        padding:0;
                        background:#22659b;
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
