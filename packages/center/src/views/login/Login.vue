<template>
  <div class="login-container">
    <el-row :gutter="0">
      <el-col :sm="15" :xs="24" class="left-container">
        <div class="login-title-container">
          <span @click="goHome">
          <img src="@/assets/images/login/logo.png" alt="logo" class="login-logo" />
          </span>
        </div>
        <div class="login-form-container">
          <div class="login-form-header">
            <p>
              <span>控制中心</span>&nbsp;登录
            </p>
            <!--<img src="@/assets/images/login/twoBarCode.png" alt="code" class="pointer" />-->
          </div>
<!--          <el-tabs v-model="activeName" @tab-click="checkLoginType">-->
<!--            <el-tab-pane label="账号登录" name="formPane">-->
              <el-form
                v-model="loginForm"
                ref="loginForm"
                :rules="loginRules"
                class="login-form"
                autocomplete="on"
                label-position="left"
                style="margin-top: 80px"
              >
                <el-form-item prop="username">
                  <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                    prefix-icon="el-icon-s-custom"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <!--                                    <el-input ref="password" v-model="loginForm.password" placeholder="请输入用户密码" name="password" tabindex="2" autocomplete="on" prefix-icon="el-icon-lock" show-password/>-->
                  <el-input
                    ref="password"
                    v-model="loginForm.password"
                    placeholder="请输入用户密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    prefix-icon="el-icon-lock"
                    :type="[passFlag?'text':'password']"
                  >
                    <i
                      slot="suffix"
                      :class="[passFlag?'iconfont icon-xiaoyanjing-':'iconfont icon-bukejian']"
                      style="font-size:24px;margin-top:12px;cursor: pointer"
                      autocomplete="auto"
                      @click="passFlag=!passFlag"
                    />
                  </el-input>
                </el-form-item>
                <el-button type="primary" size="medium" @click="loginBtn">登录</el-button>
              </el-form>
              <div class="login-options-container">
                <span @click="findPasswordBtn">忘记密码?</span>
              </div>
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="CA登录" name="caPane">-->
<!--              <div class="ca-container">-->
<!--                <div class="u-pan-img">-->
<!--                  <img src="@/assets/images/login/ca.png" alt="upan" />-->
<!--                </div>-->
<!--                <el-button type="primary" style="width:250px" @click="loginBtn">登录</el-button>-->
<!--                <p>-->
<!--                  安装&nbsp;-->
<!--                  <span class="pointer">客户端插锁</span>&nbsp;登录-->
<!--                </p>-->
<!--                <div class="bottom-box">-->
<!--                  &lt;!&ndash; <span class="pointer"  @click="zhuceBtn">免费注册</span>-->
<!--                  <el-divider direction="vertical"></el-divider>&ndash;&gt;-->
<!--                  <span class="pointer"></span>-->
<!--                  <span class="pointer" @click="handleCert">办理证书</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-tab-pane>-->
<!--          </el-tabs>-->
        </div>
        <div class="login-info-container">
          <div>
            <p>© Copyright 2012-2020 京ICP备20019515号 技术支持：北京筑龙信息技术有限责任公司</p>
            <p>平台运营单位：远东国际招标有限公司 地址：北京市海淀区上地信息产业基地创业路6号3层3019 客服电话：010-82895570</p>
          </div>
        </div>
      </el-col>
      <el-col :sm="9" :xs="0">
        <div class="right-img-container"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import qs from "querystring";
import { PostData } from "../../assets/js/httpCa";
import config from "../../config/config";
export default {
  name: "Login",
  data() {
    const regDev = RegExp(/development/);
    return {
      requestUrl: regDev.test(process.env.NODE_ENV) ? "" : config.requestUrl,
      passFlag: false,
      isCaType: true,
      loginForm: {
        client_id: "test_beijing",
        client_secret: "test",
        grant_type: "password",
        userType: 4,
        caType: "",
        sign: "",
        username: "",
        password: "",
        refresh_token: ""
      },
      cmd: {
        Command: "sign",
        ProjName: "中国电子科技集团",
        CaName: "北京CA",
        Data: {
          Usage: "签名",
          CertType: "机构证书",
          ID: "",
          SourceString: ""
        }
      },
      cmdList: {
        Command: "list",
        ProjName: "中国电子科技集团",
        CaName: "北京CA",
        Data: {
          Usage: "签名",
          CertType: "机构证书",
          ShowSelection: true
        }
      },
      loginRules: {},
      capsTooltip: false,
      redirect: undefined,
      otherQuery: {},
      activeName: "formPane",
      loginToken: "",
      loginCheckType: 0
    };
  },
  create() {},
  watch: {},
  mounted() {
    this.jclaqBb();
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  methods: {
    //切换登录类型
    checkLoginType(tab, event) {
      if (tab.name == "formPane") {
        this.isCaType = true;
        this.loginForm.grant_type = "password";
        this.loginForm.caType = "";
        this.loginForm.sign = "";
      } else if (tab.name == "caPane") {
        this.isCaType = false;
        this.loginForm.grant_type = "ca";
        this.loginForm.caType = 1;
        this.loginForm.username = "";
        this.loginForm.password = "";
      }
    },
    trimJSON(params){
      let newParams = {}
      for(let key in params){
        if(typeof params[key] == 'string'){
          newParams[key] = params[key].toString().replace(/(^\s*)|(\s*$)/g, "")
        }else{
          newParams[key] = params[key]
        }
      }
      return newParams;
    },
    //登录接口--分账号密码以及ca登录方式
    async login(infoObj) {
      await axios
        .post(
          `${this.requestUrl}/guotou-auth/oauth/token`,
          qs.stringify(this.trimJSON(this.loginForm)),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var nowTime = new Date();
          nowTime = nowTime.getTime();
          this.loginToken = res.data.access_token;
          this.userInfo();
          // this.$store.commit("changeToken", res.data.access_token)
          this.$store.dispatch("addToken", res.data.access_token);
          this.$store.dispatch("addloginData", res.data);
          this.$store.dispatch("addloginTime", nowTime);
          this.$router.push({ path: "/baseInfo/registerList" });
        })
        .catch(error => {
          if (error.response.status != 200) {
            let message = "";
            if (this.isCaType == true) {
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
                message: message
              });
            } else {
              message =
                infoObj.name +
                ":此证书未注册,请先注册ca证书,或者选择已经注册证书进行登录!";
              this.$alert(message, "提示", {
                confirmButtonText: "确定"
              });
            }
          }
        });
    },

    //点击登录按钮
    loginBtn() {
      this.loginCheckType = 1;
      this.jclaqBb();
    },

    //登陆函数
    loginFuc() {
      // 账户密码登录
      if (this.isCaType == true) {
        if (this.loginForm.username == "") {
          this.$message({
            type: "warning",
            center: true,
            duration: 1000,
            message: "请输入用户名!"
          });
          return false;
        } else if (this.loginForm.password == "") {
          this.$message({
            type: "warning",
            center: true,
            duration: 1000,
            message: "请输入用户密码!"
          });
          return false;
        }
        this.login();
      } else {
        //多个证书，先选择证书
        this.selectSign();
      }
    },

    //获取ca随机数
    async caRandom(infoObj) {
      await axios
        .get(`${this.requestUrl}/guotou-auth/login/support/caRandom`, {})
        .then(res => {
          this.cmd.Data.SourceString = res.data.data;
          this.cmd.Data.ID = infoObj.ID;

          // ca登录
          var _this = this;
          var successFunc = function(data) {
            _this.loginForm.sign = data;
            _this.login(infoObj);
          };
          //请求本地服务获取签名,之后通过回调函数获取反参数据
          PostData(JSON.stringify(this.cmd), successFunc);
        })
        .catch(error => {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: "服务错误!"
          });
        });
    },

    //选择证书
    selectSign() {
      var _this = this;
      var successFunc = function(data) {
        var date = new Date().getTime();
        var ValidityDayStart = new Date(
          data[0].ValidityDayStart.replace("T", " ")
        ).getTime();
        var ValidityDayEnd = new Date(
          data[0].ValidityDayEnd.replace("T", " ")
        ).getTime();
        if (date > ValidityDayEnd) {
          var message = "证书已过期,请更新证书!";
          _this.$alert(message, "提示", {
            confirmButtonText: "确定"
          });
          return false;
        }
        var infoObj = {
          ID: data[0].ID,
          name: data[0].Name
        };
        //先获取ca随机数,再获取签名
        _this.caRandom(infoObj);
      };
      //请求本地服务获取签名,之后通过回调函数获取反参数据
      PostData(JSON.stringify(this.cmdList), successFunc);
    },

    async userInfo() {
      await axios
        .get(`${this.requestUrl}/guotou-auth/resource/userInfo`, {
          headers: {
            Authorization: "Bearer " + this.loginToken
          }
        })
        .then(res => {
          this.$store.dispatch("addUserInfo", res.data);
        })
        .catch(error => {
          this.$message({
            type: "error",
            center: true,
            duration: 2000,
            message: "服务错误!"
          });
        });
    },

    keyDown(e) {
      if (
        this.$route.path == "/login" &&
        (e.keyCode == 13 || e.keyCode == 13)
      ) {
        //
        this.login(); //登录函数
      }
    },

    //点击注册
    zhuceBtn() {
      this.$router.push({ path: "/Register" });
    },
    //点击找回密码
    findPasswordBtn() {
      this.$router.push({ path: "/findPassword" });
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
              type: "warning"
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
          if (this.loginCheckType == 1) {
            this.loginFuc();
          }
        }
      } else {
        if (this.loginCheckType == 1) {
          this.loginFuc();
        }
      }
    },
    handleCert() {
      // window.open("http://112.zhulong.com.cn:10080/capt/ca-guotou/Home/Index");
    },
    goHome() {
      if (process.env.NODE_ENV === "development") {
        window.open(config.requestUrl+"/gt-center-home-web/","_blank");
      } else if (process.env.NODE_ENV === "testgt") {
        window.open(config.requestUrl+"/gt-center-home-web/", "_blank");
      } else if (process.env.NODE_ENV === "prodgt") {
        window.open(config.requestUrl, "_blank");
      }
    },
  }
};
</script>

<style lang="scss" scoped>
$dark_gray: #666;

.login-container {
  background: #fff;
  .login-logo {
    width: 377px;
    height: 43px;
  }

  .left-container {
    text-align: center;
    position: relative;
    height: 100vh;

    .login-title-container {
      text-align: left;
      padding: 20px 30px;
    }

    .login-form-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 440px;
      height: 480px;
      margin: -230px 0 0 -250px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      ::v-deep.el-tabs__header {
        margin-bottom: 40px !important;
      }
      ::v-deep.el-input__suffix {
        margin-top: 5px !important;
      }
      ::v-deep.el-tabs__nav {
        float: none;
      }

      ::v-deep.el-tabs__item {
        width: 50%;
        padding: 0;
        font-size: 18px;
      }
      ::v-deep.el-tabs__active-bar {
        left: 0;
        height: 4px;
      }
      ::v-deep.login-form {
        margin-bottom: 30px;
        padding: 0;
      }
      ::v-deep.el-input__inner {
        width: 100%;
        height: 50px;
        max-width: 100% !important;
        margin-bottom: 15px;
        padding: 0 0 0 35px;
        font-size: 16px;
      }
      ::v-deep.el-input__prefix {
        top: -4px;
      }
      ::v-deep.el-input__icon {
        font-size: 24px;
      }
      ::v-deep.el-button {
        width: 100%;
        height: 50px;
        span {
          font-size: 20px !important;
        }
      }
    }

    .login-info-container {
      position: absolute;
      bottom: 20px;
      padding: 0 150px;
      color: $dark_gray;
      font-size: 14px !important;
    }

    @media screen and (max-width: 992px) {
      .login-info-container {
        padding: 0 10px;
      }
    }
  }

  .right-img-container {
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 2;
    background: url("../../assets/images/login/banner.png") right center
      no-repeat;
    @media screen and (max-width: 992px) {
      .right-img {
        display: none;
      }
    }
  }

  .login-form-header {
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    p {
      display: inline-block;
      width: 100%;
      height: 50px !important;
      line-height: 50px;
      font-size: 24px;
      text-align: left;
      span {
        font-size: 30px;
        font-weight: bold;
      }
    }
    img {
      width: 41px;
      height: 41px;
      vertical-align: bottom;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .login-options-container {
    width: 100%;
    height: 30px;
    color: #1674df;
    & > span {
      display: inline-block;
      float: left;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      text-align: left;
      cursor: pointer;
      &:hover {
        color: #1674df;
      }
    }
    span:last-child {
      float: right;
      color: #7d7d7d;
      text-align: right;
    }
  }
  .ca-container {
    .u-pan-img {
      padding: 10px 0;
      img {
        width: 81px;
      }
    }
    & > p {
      padding: 10px 0;
      font-size: 16px;
      span {
        color: #1890ff;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .bottom-box {
      font-weight: bold;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>
