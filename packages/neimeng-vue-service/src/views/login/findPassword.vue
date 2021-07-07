<template>
  <section class="container">
    <el-row :gutter="10" class="header-container">
      <el-col :span="2">
        <img src="@/assets/images/frame/logo.png" alt="" />
      </el-col>
      <el-col :span="16">
        <div class="title">
           <span class="title-font" @click="gotoLogin">{{ env.VUE_APP_TITLE }} | 找回密码</span>
          </div>
      </el-col>
      <el-col :span="6">
        <div class="operation fr">
          <span class="operation-font" @click="gotoLogin">已有账号登录</span>
        </div>
      </el-col>
    </el-row>
    <div class="contentDiv">
      <el-form
        :inline="true"
        :model="checkData"
        :rules="checkRuleData"
        ref="checkData"
        class="checkForm"
        label-position="left"
      >
        <el-form-item label="用户名:" prop="accountName">
          <el-input
            placeholder="请输入您的用户名或社会信用代码"
            v-model="checkData.accountName"
            @blur="jyzhPpFunc"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="userPhone">
          <el-input
            placeholder="请输入您的手机号码"
            v-model="checkData.userPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机验证码:" prop="yzm">
          <el-input
            placeholder="请输入您的手机验证码"
            v-model="checkData.yzm"
          ></el-input>
          <el-button type="text" @click="hasDxYzm" v-show="yzmShow"
            >获取短信验证码</el-button
          >
          <el-button
            type="text"
            class="blue"
            v-show="!yzmShow"
            disabled="disabled"
            >{{ count }}秒后重新发送</el-button
          >
        </el-form-item>
        <el-form-item label="重置密码:" prop="password">
          <el-input
            type="password"
            placeholder="请重新设置您的登录密码"
            v-model="checkData.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="passwordNext">
          <el-input
            type="password"
            placeholder="请再次输入您的登录密码"
            v-model="checkData.passwordNext"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginBtn(checkData)"
            >重置密码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="footerDiv"></div>
    <userAgreementDialog ref="userAgreementDialog"></userAgreementDialog>
  </section>
</template>

<script>
import axios from "axios";
import qs from "querystring";
import userAgreementDialog from "./userAgreementDialog";
import config from "@/config/config";
const regDev = RegExp(/development/);
export default {
  name: "reModifyPassword",
  components: { userAgreementDialog },
  data() {
    return {
      requestUrl: regDev.test(process.env.NODE_ENV) ? "" : config.requestUrl,
      checkData: {
        accountName: "",
        password: "",
        passwordNext: "",
        userPhone: "",
        yzm: "",
      },
      checkRuleData: {
        accountName: this.validate.vdZcZhangHao(true),
        password: this.validate.vdZcPassWord(true),
        passwordNext: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: this.vdZcPassWordNext, trigger: "blur" },
        ],
        userPhone: this.validate.vdTel(true),
        yzm: [
          {
            required: true,
            message: "请输入正确的手机验证码",
            trigger: "blur",
          },
        ],
      },
      agreeXy: [],
      formData: {
        accountName: "",
        password: "",
        userPhone: "",
        yzm: "",
      },
      count: "",
      timer: null,
      yzmShow: true,
      checked: false,
      loginForm: {
        grant_type: "password",
        client_id: "test_beijing",
        client_secret: "test",
        username: "",
        password: "",
        userType: 1,
      },
      loginToken: "",
    };
  },
  methods: {
    //光标移开校验用户名是否存在
    jyzhPpFunc() {
      var isZc = 0;
      this.isUserNameExists(isZc);
    },
    //校验用户名是否存在
    async isUserNameExists(isZc) {
      var formData = {
        user_Name: this.checkData.accountName,
      };
      await axios
        .post(`${this.requestUrl}/qykzt/reg/isUserNameExists`, formData, {})
        .then((res) => {
          if (res.data.code == 0 && this.checkData.accountName != "") {
            this.$message({
              type: "warning",
              center: true,
              duration: 2000,
              message: "用户名不存在！",
            });
            this.checkData.accountName = "";
          } else if (res.data.code == 1) {
            if (isZc == 1) {
              this.reModifyPassword();
            }
          } else {
            this.$message({
              type: "warning",
              center: true,
              duration: 2000,
              message: res.data.info,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: "服务错误!",
          });
        });
    },
    //密码再次校验
    vdZcPassWordNext(rule, value, callback) {
      if (value != this.checkData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    //获取验证码
    async getUserPhoneMessage() {
      var formData = {
        userPhone: this.checkData.userPhone,
        accountName: this.checkData.accountName,
        sendType: 3,
      };
      await axios
        .post(
          `${this.requestUrl}/qykzt/reg/getUserPhoneMessage`,
          qs.stringify(formData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              center: true,
              duration: 2000,
              message: "短信发送成功,请注意查收!",
            });
          } else {
            this.$message({
              type: "error",
              center: true,
              duration: 2000,
              message: "短信发送失败!",
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: "服务错误!!",
          });
        });
    },
    //点击获取短信验证码按钮
    hasDxYzm() {
      this.$refs.checkData.validateField("userPhone", (errorMessage) => {
        if (!errorMessage) {
          this.$refs.checkData.validateField("accountName", (errorMessage2) => {
            if (!errorMessage2) {
              this.getUserPhoneMessage();
              this.getCode();
            }
          });
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
      this.formData = {
        accountName: this.checkData.accountName,
        password: this.checkData.password,
        userPhone: this.checkData.userPhone,
        yzm: this.checkData.yzm,
      };
      await axios
        .post(
          `${this.requestUrl}/qykzt/reg/reModifyPassword`,
          this.formData,
          {}
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              center: true,
              duration: 1000,
              message: "密码重置成功!",
            });
            this.login();
          } else {
            this.$message({
              type: "error",
              center: true,
              duration: 1000,
              message: res.data.info,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            center: true,
            duration: 1000,
            message: "服务错误!",
          });
        });
      //}
    },
    //点击找回密码按钮
    loginBtn(checkData) {
      this.$refs.checkData.validate((valid) => {
        if (valid) {
          this.jclaqBb();
        } else {
          this.$message({
            type: "error",
            center: true,
            duration: 1000,
            message: "部分内容校验失败,请核查!",
          });
          return false;
        }
      });
    },
    //注册成功后直接登录
    async login() {
      this.loginForm = {
        grant_type: "password",
        client_id: "test_beijing",
        client_secret: "test",
        username: this.checkData.accountName,
        password: this.checkData.password,
        userType: 1,
      };
      await axios
        .post(
          `${this.requestUrl}/guotou-auth/oauth/token`,
          qs.stringify(this.loginForm),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          var nowTime = new Date();
          nowTime = nowTime.getTime();
          this.loginToken = res.data.access_token;
          this.userInfo();
          this.$store.commit("changeToken", res.data.access_token);
          this.$store.dispatch("addToken", res.data.access_token);
          this.$store.dispatch("addloginData", res.data);
          this.$store.dispatch("addloginTime", nowTime);
          this.$router.push({ path: "/dashboard" });
        })
        .catch((error) => {
          if (error.response.status != 200) {
            let message = "";
            if (error.response.status == 400) {
              message = "系统错误!";
            } else if (error.response.status == 401) {
              message = error.response.data.error_description;
            } else if (error.response.status == 500) {
              message = "登录服务错误";
            }
            this.$message({
              type: "warning",
              center: true,
              duration: 2000,
              message: message,
            });
          }
        });
    },
    //注册后获取用户信息
    async userInfo() {
      await axios
        .get(`${this.requestUrl}/guotou-auth/resource/userInfo`, {
          headers: {
            Authorization: "Bearer " + this.loginToken,
          },
        })
        .then((res) => {
          this.$store.dispatch("addUserInfo", res.data);
        })
        .catch((error) => {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: "服务错误!",
          });
        });
    },
    //返回登录页
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    //阅读说明按钮
    ydsmBtn() {
      this.checked = !this.checked;
      if (this.checked == true) {
        this.$refs.userAgreementDialog.qyBoolen();
      }
    },
    //检查IE浏览器版本,低于10禁止登陆
    jclaqBb() {
      var theUA = window.navigator.userAgent.toLowerCase();
      if (
        (theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) ||
        (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])
      ) {
        var ieVersion =
          theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] ||
          theUA.match(/trident\s?\d+/)[0];
        if (ieVersion < 12) {
          this.$confirm(
            "您当前使用的IE浏览器版本较低,为保证您的正常操作,请您尽快升级至IE11或以上版本登录系统!",
            "提示",
            {
              confirmButtonText: "去更新",
              cancelButtonText: "稍后更新",
              type: "warning",
            }
          )
            .then(() => {
              window.open(
                "https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads",
                "_blank"
              );
            })
            .catch(() => {});
        } else {
          var isZc = 1;
          this.isUserNameExists(isZc);
        }
      } else {
        var isZc = 1;
        this.isUserNameExists(isZc);
      }
    },
  },
  create() {},
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "./styles/mixin.scss";

</style>