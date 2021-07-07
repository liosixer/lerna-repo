<template>
  <section class="container">
    <div class="headerDiv">
      <ul>
        <li>
          <router-link to="/login">
            <h2>{{ env.VUE_APP_TITLE }} | 找回密码</h2>
          </router-link>
        </li>
        <li>
          <span @click="hasLoginBtn">已有账号登录</span>
        </li>
      </ul>
    </div>
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
            placeholder="请输入您的登录账号"
            v-model="checkData.accountName"
            @blur="jyzhPpFunc"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码:" prop="password">
          <el-input
            type="password"
            placeholder="请设置您的登录密码"
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
        <el-form-item>
          <el-button type="primary" @click="loginBtn(checkData)"
            >注册并完善机构信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="footerDiv">
      <el-checkbox-group v-model="agreeXy">
        <el-checkbox
          :label="`同意《${env.VUE_APP_TITLE}用户协议》`"
          v-model="checked"
          @change="ydsmBtn"
        ></el-checkbox>
      </el-checkbox-group>
    </div>
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
  name: "register",
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
      this.isUserNameExists();
    },
    //校验用户名是否存在
    async isUserNameExists() {
      var formData = {
        user_Name: this.checkData.accountName,
      };
      await axios
        .post("/qykzt/reg/isUserNameExists", formData, {})
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: "warning",
              center: true,
              duration: 2000,
              message: "用户名已经注册,请修改！",
            });
            this.checkData.accountName = "";
          }
        })
        .catch((error) => {});
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
      };
      await axios
        .post("/qykzt/reg/getUserPhoneMessage", qs.stringify(formData), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              center: true,
              duration: 2000,
              message: "短信发送成功,请注意查收!",
            });
          }
        })
        .catch((error) => {});
    },
    //点击获取短信验证码按钮
    hasDxYzm() {
      this.$refs.checkData.validateField("userPhone", (errorMessage) => {
        if (!errorMessage) {
          this.getUserPhoneMessage();
          this.getCode();
        } else {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: errorMessage,
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
      if (this.checked == false) {
        this.$message({
          type: "warning",
          center: true,
          duration: 2000,
          message: `请先阅读《${this.env.VUE_APP_TITLE}用户协议》!`,
        });
      } else {
        this.formData = {
          accountName: this.checkData.accountName,
          password: this.checkData.password,
          userPhone: this.checkData.userPhone,
          yzm: this.checkData.yzm,
        };
        await axios
          .post("/qykzt/reg/register", this.formData, {})
          .then((res) => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                center: true,
                duration: 1000,
                message: "注册成功!",
              });
              //注册成功后直接登录完善用户信息
              this.login();
            } else {
              this.$message({
                type: "error",
                center: true,
                duration: 1000,
                message: "注册失败,请核查注册信息!",
              });
            }
          })
          .catch((error) => {});
      }
    },
    //点击注册按钮
    loginBtn(checkData) {
      this.$refs.checkData.validate((valid) => {
        if (valid) {
          this.register();
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
          this.loginToken = res.data.access_token;
          this.userInfo();
          this.$store.dispatch("addToken", res.data.access_token);
          this.$router.push({ path: "/dashboard" });
        })
        .catch((error) => {});
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
        .catch((error) => {});
    },
    hasLoginBtn() {
      this.$router.push({ path: "/login" });
    },
    //阅读说明按钮
    ydsmBtn() {
      this.checked = !this.checked;
      if (this.checked == true) {
        this.$refs.userAgreementDialog.qyBoolen();
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
        width: 75%;
        height: 50px;
        h2 {
          height: 50px;
          padding-left: 100px;
          background-size: 50px 50px;
          background: url(../../assets/images/frame/logo.png) no-repeat left;
          font-size: 26px;
          color: #333;
          line-height: 50px;
        }
      }
      li:last-child {
        width: 25%;
        text-align: right;
        line-height: 50px;
        span {
          display: inline-block;
          font-size: 18px;
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
          width: 100px !important; /*no*/
          font-size: 14px;
        }
        .el-form-item__content {
          width: calc(100% - 100px); /*no*/
          .el-input {
            height: 40px;
            width: 100%;
            .el-input__inner {
              width: 100%;
              max-width: 100%;
              height: 40px;
              font-size: 14px;
            }
          }
        }
      }
      ::v-deep.el-form-item:nth-child(5) {
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
            span {
              font-size: 14px;
            }
          }
        }
      }
      ::v-deep.el-form-item:last-child {
        margin-bottom: 0;
        text-align: center;
        .el-button {
          width: 60%;
          background: #22659b;
          height: 40px;
          padding: 0;
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
    ::v-deep.el-checkbox__label {
      font-size: 14px;
    }
  }
}
</style>