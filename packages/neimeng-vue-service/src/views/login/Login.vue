<template>
  <div class="login">
    <div class="main-container">
      <img src="../../assets/images/login/logo.png" class="i-logo" alt="" />
      <div class="main-wrap">
        <!-- banner -->
        <el-carousel
          height="370px"
          arrow="never"
          indicator-position="none"
          :pause-on-hover="false"
        >
          <el-carousel-item>
            <img src="../../assets/images/login/swiper-1.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/login/swiper-2.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/login/swiper-3.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/login/swiper-4.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/login/swiper-5.png" alt="" />
          </el-carousel-item>
        </el-carousel>
        <!-- 登录表单 -->
        <div class="form-warp">
          <el-tabs v-model="activeName" @tab-click="checkLoginType">
            <el-tab-pane label="账号登录" name="formPane">
              <el-form
                :model="loginForm"
                ref="loginForm"
                :rules="loginRules"
                class="login-form"
                autocomplete="on"
                label-position="top"
              >
                <el-form-item prop="username">
                  <p class="form-title">用户名</p>
                  <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                  >
                    <template #prefix>
                      <img
                        src="@/assets/images/login/user.svg"
                        style="with:18px;height:18px;vertical-align: middle;"
                      />
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <p class="form-title">密码</p>
                  <el-input
                    ref="password"
                    v-model="loginForm.password"
                    placeholder="请输入用户密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    :type="passFlag ? 'text' : 'password'"
                  >
                    <template #prefix>
                      <img
                        src="@/assets/images/login/password.svg"
                        style="with:18px;height:18px;vertical-align: middle;"
                      />
                    </template>
                    <template #suffix>
                      <i
                        :class="[
                          passFlag
                            ? 'iconfont icon-xiaoyanjing-'
                            : 'iconfont icon-bukejian',
                        ]"
                        style="font-size:24px;margin-top:12px;cursor: pointer"
                        autocomplete="auto"
                        @click="passFlag = !passFlag"
                      />
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  class="btn-login"
                  @click="loginBtn"
                  >登录</el-button
                >
              </el-form>
              <div class="login-options-container">
                <span @click="zhuceBtn">免费注册</span>
                <span @click="findPasswordBtn">忘记密码?</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="CA登录" name="caPane">
              <div class="ca-container">
                <div class="u-pan-img">
                  <img src="@/assets/images/login/ca.png" alt="upan" />
                </div>
                <el-button
                  type="primary"
                  size="medium"
                  style="width:100%"
                  @click="loginBtn"
                  >登录</el-button
                >
                <div class="ca-bottom">
                  <p>
                    安装&nbsp;
                    <span class="pointer" @click="goto">客户端</span
                    >&nbsp;插锁登录
                  </p>
                  <div class="bottom-box">
                    <span class="pointer" @click="zhuceBtn">免费注册</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="pointer" @click="handleCert">办理证书</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <footer class="footer">{{ copyright }}</footer>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'querystring';
import { PostData } from '../../assets/js/httpCa';
import config from '../../config/config';
const regDev = RegExp(/development/);
export default {
  name: 'Login',
  data() {
    return {
      passFlag: false,
      requestUrl: regDev.test(process.env.NODE_ENV) ? '' : config.requestUrl,
      isCaType: true,
      loginForm: {
        client_id: 'test_beijing',
        client_secret: 'test',
        grant_type: 'password',
        userType: 1,
        caType: 1,
        sign: '',
        username: '',
        password: '',
        refresh_token: '',
      },
      cmd: {
        Command: 'sign',
        ProjName: `${this.env.VUE_APP_LOGOTEXT}`,
        CaName: '滨海CA',
        Data: {
          Usage: '签名',
          CertType: '个人证书',
          ID: '',
          SourceString: '',
        },
      },
      cmdList: {
        Command: 'list',
        ProjName: `${this.env.VUE_APP_LOGOTEXT}`,
        CaName: '滨海CA',
        Data: {
          Usage: '签名',
          CertType: '个人证书',
          ShowSelection: true,
        },
      },
      loginRules: {},
      capsTooltip: false,
      redirect: undefined,
      otherQuery: {},
      activeName: 'formPane',
      loginToken: '',
      loginCheckType: 0,
      copyright: `版权所有：内蒙古自治区公共资源管理服务中心 | 技术支持：北京筑龙信息技术有限责任公司`,
    };
  },
  create() {},
  watch: {},
  mounted() {
    this.jclaqBb();
    window.addEventListener('keydown', this.keyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false);
  },
  methods: {
    goto() {
      window.open(
        config.homeUrl + '/xxgl/helpmenu?xinXiGuanLiType=21 ',
        '_blank'
      );
    },
    toHome() {
      window.open(config.homeUrl);
    },
    //切换登录类型
    checkLoginType(tab, event) {
      if (tab.name == 'formPane') {
        this.isCaType = true;
        this.loginForm.grant_type = 'password';
        this.loginForm.caType = '';
        this.loginForm.sign = '';
      } else if (tab.name == 'caPane') {
        this.isCaType = false;
        this.loginForm.grant_type = 'ca';
        this.loginForm.username = '';
        this.loginForm.password = '';
      }
    },
    trimJSON(params) {
      let newParams = {};
      for (let key in params) {
        if (typeof params[key] == 'string') {
          newParams[key] = params[key].toString().replace(/(^\s*)|(\s*$)/g, '');
        } else {
          newParams[key] = params[key];
        }
      }
      return newParams;
    },
    //登录接口--分账号密码以及ca登录方式
    async login(infoObj) {
      this.$router.push({ path: '/dashboard' });
      return false;
      await axios
        .post(
          `${this.requestUrl}/guotou-auth/oauth/token`,
          qs.stringify(this.trimJSON(this.loginForm)),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          var nowTime = new Date();
          nowTime = nowTime.getTime();
          this.loginToken = res.data.access_token;
          this.userInfo();
          this.$store.commit('changeToken', res.data.access_token);
          this.$store.dispatch('addToken', res.data.access_token);
          this.$store.dispatch('addloginData', res.data);
          this.$store.dispatch('addloginTime', nowTime);
          this.$router.push({ path: '/dashboard' });
        })
        .catch((error) => {
          if (error.response.status != 200) {
            let message = '';
            if (this.isCaType == true) {
              if (error.response.status == 400) {
                message = '系统错误!';
              } else if (error.response.status == 401) {
                message = error.response.data.error_description;
              } else if (error.response.status == 500) {
                message = '登录服务错误';
              }
              this.$message({
                type: 'warning',
                center: true,
                duration: 2000,
                message: message,
              });
            } else {
              if (error.response.status == 400) {
                message = '系统错误!';
              } else if (error.response.status == 500) {
                message = '登录服务错误';
              } else {
                message =
                  infoObj.name + ': ' + error.response.data.error_description;
              }
              //message = infoObj.name+":此证书未注册,请先注册ca证书,或者选择已经注册证书进行登录!"
              this.$alert(message, '提示', {
                confirmButtonText: '确定',
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
        if (this.loginForm.username == '') {
          this.$message({
            type: 'warning',
            center: true,
            duration: 1000,
            message: '请输入用户名!',
          });
          return false;
        } else if (this.loginForm.password == '') {
          this.$message({
            type: 'warning',
            center: true,
            duration: 1000,
            message: '请输入用户密码!',
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
        .then((res) => {
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
        .catch((error) => {
          this.$message({
            type: 'error',
            center: true,
            duration: 2000,
            message: '服务错误!',
          });
        });
    },

    //选择证书
    selectSign() {
      var _this = this;
      var successFunc = function(data) {
        var date = new Date().getTime();
        var ValidityDayStart = new Date(
          data[0].ValidityDayStart.replace('T', ' ')
        ).getTime();
        var ValidityDayEnd = new Date(
          data[0].ValidityDayEnd.replace('T', ' ')
        ).getTime();
        if (date > ValidityDayEnd) {
          var message = '证书已过期,请更新证书!';
          _this.$alert(message, '提示', {
            confirmButtonText: '确定',
          });
          return false;
        }
        var infoObj = {
          ID: data[0].ID,
          name: data[0].Name,
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
            Authorization: 'Bearer ' + this.loginToken,
          },
        })
        .then((res) => {
          this.$store.dispatch('addUserInfo', res.data);
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            center: true,
            duration: 2000,
            message: '服务错误!',
          });
        });
    },

    //回车直接登录
    keyDown(e) {
      if (
        this.$route.path == '/login' &&
        (e.keyCode == 13 || e.keyCode == 13)
      ) {
        //
        this.loginBtn(); //登录函数
      }
    },

    //点击注册
    zhuceBtn() {
      this.$confirm(
        '请点击确定按钮到企业控制台进行注册,注册并审核成功后可登录本系统！',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
        }
      )
        .then(() => {
          window.open(config.requestUrl + '/tj-jy-qyglht/#/Register', '_blank');
        })
        .catch(() => {});
    },
    //点击找回密码
    findPasswordBtn() {
      this.$router.push({ path: '/findPassword' });
    },
    //检查IE浏览器版本,低于10禁止登陆
    jclaqBb() {
      const { userAgent } = window.navigator;
      console.log('【Login】 ' + userAgent);
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
            '您当前使用的IE浏览器版本较低,为保证您的正常操作,请您尽快升级至IE11或以上版本登录系统!',
            '提示',
            {
              confirmButtonText: '去更新',
              cancelButtonText: '稍后更新',
              type: 'warning',
            }
          )
            .then(() => {
              window.open(
                'https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads',
                '_blank'
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
      // let url = window.location.host === '116.196.83.187:8053' ? 'http://112.zhulong.com.cn:10080/capt/ca-tianjin' : 'http://122.9.38.25/capt/ca'
      // window.open(url);
      window.open(config.caUrl);
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(../../assets/images/login/bg.png);
  background-size: cover;
}
.main-container {
  flex: 1;
  width: 100%;
  background-color: rgba(20, 79, 186, 0.3);
  padding-top: 8%;
  .i-logo {
    display: block;
    margin: 0 auto 6%;
  }
}
.footer {
  width: 100%;
  height: 70px;
  background-color: #eff2f5;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-wrap {
  position: relative;
  margin: 0 auto;
  width: 800px;

  ::v-deep .el-carousel--horizontal {
    border-radius: 10px;
    box-shadow: 1px 3px 54px 0px rgba(20, 79, 186, 0.13);
  }

  ::v-deep .el-carousel__item {
    img {
      width: 800px;
      height: 370px;
      background-size: 800px 370px;
    }
  }

  .form-warp {
    position: absolute;
    width: 350px;
    height: 430px;
    right: 30px;
    top: -30px;
    z-index: 2;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 1px 3px 54px 0px rgba(0, 0, 0, 0.13);
    padding: 15px;

    .form-title {
      text-align: left;
    }

    .svg {
      font-size: 18px;
    }

    .btn-login {
      margin-top: 40px;
      width: 100%;
      box-shadow: 1px 3px 54px 0px rgba(0, 0, 0, 0.13);
    }

    .login-options-container {
      margin-top: 50px;
      width: 100%;
      height: 30px;
      text-align: center;
      color: #144fba;
      & > span {
        display: inline-block;
        height: 15px;
        font-size: 14px;
        line-height: 15px;
        text-align: left;
        cursor: pointer;
        padding: 0 20px;
        &:hover {
          color: #144fba;
        }
      }
      span:last-child {
        color: #7d7d7d;
        text-align: right;
        border-left: 1px solid #666;
      }
    }

    ::v-deep .el-tabs__header {
      margin-bottom: 40px !important;
    }

    ::v-deep .el-tabs__content {
      padding: 0 15px;
    }

    ::v-deep .el-tabs__nav {
      float: none;
    }

    ::v-deep .el-tabs__nav-wrap::after {
      display: none;
    }

    ::v-deep .el-tabs__item {
      width: 50%;
      padding: 0;
      font-size: 18px;
      text-align: center;
    }

    ::v-deep .el-tabs__active-bar {
      left: 0;
      height: 3px;
      width: 115px !important;
      left: 25px;
    }

    .ca-container {
      .u-pan-img {
        margin-top: 30px;
        margin-bottom: 60px;
        text-align: center;
        img {
          width: 77px;
        }
      }
      .ca-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;
        font-size: 14px;
        & > p {
          span {
            color: #144fba;
            font-weight: bold;
          }
        }
        .bottom-box {
          font-weight: bold;
          color: #666;
        }
      }
    }
  }
}
</style>
