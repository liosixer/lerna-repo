<template>
  <div class="header clearfix" :class="bdColor">
    <div class="logo fl">
      <span >
        <img class="logo-img" src="../../assets/images/frame/logo.png" alt />
      </span>

      <i class="common-header-fold" @click="collapseClk">
        <img
          v-if="headerOpen"
          src="../../assets/images/frame/header-close.png"
          alt
        />
        <img v-else src="../../assets/images/frame/header-open.png" alt />
      </i>
    </div>

    <div class="tools fr clearfix">
      <div class="help fl">
        <cur-time class="fl" style="margin-right: 30px"></cur-time>
        <i class="iconfont icon-bangzhuzhongxin2"></i>
        <!-- <img src="../../assets/images/frame/help.png" alt=""> -->
      </div>

      <el-popover
        placement="bottom"
        width="120"
        popper-class="popover-padding"
        v-model="firstVisible"
        trigger="click"
      >
        <div class="pull-down down">
          <ul>
            <el-popover
              placement="left-start"
              width="100"
              v-model="secondVisible"
              trigger="hover"
            >
              <div class="second-styles">
                <div @click="chooseStyles('wight')">
                  <span>简洁风格</span>
                  <i
                    class="el-icon-check"
                    :class="{ i_active: isIchoosed1 }"
                  ></i>
                </div>
                <div @click="chooseStyles('dark')">
                  <span>经典风格</span>
                  <i
                    class="el-icon-check"
                    :class="{ i_active: isIchoosed2 }"
                  ></i>
                </div>
              </div>
              <li slot="reference">
                <p>
                  <i class="iconfont icon-qiehuan"></i>
                  <span>风格切换</span>
                  <i class="el-icon-arrow-right"></i>
                </p>
              </li>
            </el-popover>
            <li @click="changePassword">
              <p>
                <i class="iconfont icon-mima"></i>
                <span>修改密码</span>
              </p>
            </li>
            <li @click="changeHead">
              <p>
                <i class="iconfont icon-genghuantouxiang-"></i>
                <span>更换头像</span>
              </p>
            </li>
            <li @click="quit">
              <p>
                <i class="iconfont icon-tuichu"></i>
                <span>退出</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="user-img-box fl" slot="reference">
          <img class="user-img" :src="touxiangImg" alt />
          <span>{{ $store.state.frame.userType.currentUserName }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </el-popover>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="showModal"
      width="30%"
      :append-to-body="true"
      ref="changePassword"
    >
      <div>
        <el-form
          label-width="120px"
          :model="formPassword"
          ref="passWord"
          size="small"
        >
          <el-form-item
            label="原密码："
            prop="oldPassword"
            :rules="validate.vdZcPassWord(true)"
          >
            <el-input
              v-model="formPassword.oldPassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码："
            prop="newPassword"
            :rules="validate.vdZcPassWord(true)"
          >
            <el-input
              v-model="formPassword.newPassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="重复输入新密码："
            prop="newPassword1"
            :rules="validate.vdZcPassWord(true)"
          >
            <el-input
              v-model="formPassword.newPassword1"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="small" @click="showModal = false">取 消</el-button>
        <el-button type="primary" size="small" @click="confirmModal"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="更换头像"
      :visible.sync="showHeadPortrait"
      width="28%"
      :append-to-body="true"
    >
      <div class="clearfix">
        <div class="fl head-portrait" style="text-align: center">
          <div>
            <img :src="touxiangImg" alt />
          </div>
          <upload
            @sucData="getDataZb"
            :fileList="fujianList"
            :action="upUrl"
            :fileSize="'3072'"
            :acceptType="'.jpg,.png'"
            :data="upParams"
            :isDisabled="false"
            @changeFilelist="changeFilelist"
            :showFileList="false"
            @fileRemove="deleteFile"
            :buttonTxt="'上传头像'"
          ></upload>
        </div>
        <div class="fr userInfo">
          <span class="userInfoTil">基本信息</span>
          <p class="clearfix">
            <span class="fl">用户名：</span>
            <span class="fl">{{
              $store.state.frame.userType.accountName
            }}</span>
          </p>
          <p class="clearfix">
            <span class="fl">姓名：</span>
            <span class="fl">{{
              $store.state.frame.userType.currentUserName
            }}</span>
          </p>
          <p class="clearfix">
            <span class="fl">所属部门：</span>
            <span class="fl">{{ $store.state.frame.userType.deptName }}</span>
          </p>
          <p class="clearfix">
            <span class="fl">所在单位：</span>
            <span class="fl">{{ $store.state.frame.userType.name }}</span>
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CurTime from "../../components/CurTime";
import Upload from "@/components/Upload";
import util from "@/utils/utils";
import config from "../../config/config";

export default {
  name: "Headers",
  components: { CurTime, Upload },
  data() {
    return {
      firstVisible: false,
      secondVisible: false,
      options: [
        {
          value: "dark",
          label: "默认",
        },
        {
          value: "wight",
          label: "简洁",
        },
      ],
      userName: "",
      headerOpen: true,
      iscollapsider: false,
      iscollapsider1: false,
      isIchoosed1: false,
      isIchoosed2: false,
      formPassword: {
        oldPassword: "",
        newPassword: "",
        newPassword1: "",
      },
      // 上传地址
      uploadSrc: "",
      fujianList: [],
      upParams: "",
      touxiangImg: "",
      headerOpen: true,
      showModal: false,
      showHeadPortrait: false,
    };
  },
  computed: {
    collapse() {
      return this.$store.state.collapse;
    },
    bdColor() {
      return this.$store.state.frame.colors;
    },
    upUrl() {
      return "/upload";
    },
    touxiangImgWatch() {
      return this.$store.state.frame.userType.userHeadImage;
    },
  },
  created() {
    console.log(this.$store.state.frame, "this.$store.state.frame");
    if (this.$store.state.frame.userType.userHeadImage == null) {
      this.touxiangImg = require("../../assets/images/frame/touxiang.png");
    } else {
      util
        .getDownSrc(this.$store.state.frame.userType.userHeadImage)
        .then((res) => {
          this.touxiangImg = res;
        });
    }
  },
  methods: {
    collapseClk() {
      this.headerOpen = !this.headerOpen;
      this.$store.commit("toggleSideBar");
    },
    // 控制显示隐藏
    changeShow() {
      this.iscollapsider1 = !this.iscollapsider1;
    },
    changeHide() {
      this.iscollapsider1 = !this.iscollapsider1;
    },
    handleCommand(item) {
      this.$store.commit("changeColor", item.value);
    },
    beforeHandleCommand(item) {
      return item;
    },
    setUer() {
      this.userName = this.$store.state.loginCookie.userInfo.name;
    },
    //退出
    // quitBtn(){
    //     this.$confirm('确定要退出登录吗?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //     })
    //     .then(() => {
    //         sessionStorage.clear()
    //         this.$router.push({ path: "/login" })
    //     })
    //     .catch(() => {})
    // },
    quit() {
      this.$store.commit("changeToken", "");
      window.sessionStorage.clear();
      this.$router.push({ path: "/login" });
      this.$store.dispatch("addloginStaues", true);
    },
    pullDown(type) {
      if (type == 1) {
        this.iscollapsider = true;
      } else {
        this.iscollapsider = false;
        this.iscollapsider1 = false;
      }
    },
    styleChange() {
      this.iscollapsider1 = !this.iscollapsider1;
    },
    // 控制显示隐藏
    changeShow() {
      this.iscollapsider1 = !this.iscollapsider1;
    },
    changeHide() {
      this.iscollapsider1 = !this.iscollapsider1;
    },
    chooseStyles(type) {
      this.firstVisible = false;
      this.secondVisible = false;
      this.$store.commit("changeColor", type);
      if (type == "dark") {
        this.isIchoosed1 = false;
        this.isIchoosed2 = true;
      } else {
        this.isIchoosed1 = true;
        this.isIchoosed2 = false;
      }
      this.iscollapsider = false;
      this.iscollapsider1 = false;
    },
    confirmModal() {
      this.$refs["passWord"].validate((valid) => {
        if (valid) {
          if (this.formPassword.newPassword == this.formPassword.newPassword1) {
            this.portService
              .changePassword({
                oldPassword: this.formPassword.oldPassword,
                newPassword: this.formPassword.newPassword,
              })
              .then((res) => {
                if (res.code == 1) {
                  this.$message({ message: res.info, type: "success" });
                  this.showModal = false;
                } else {
                  this.$message({ message: res.info, type: "warning" });
                }
              });
          } else {
            this.$message({ message: "两次密码不一致", type: "warning" });
          }
        }
      });
    },
    changePassword() {
      this.iscollapsider = false;
      this.iscollapsider1 = false;
      this.showModal = true;
      this.$refs["changePassword"].oldPassword = "";
      this.$refs["changePassword"].newPassword = "";
    },
    // 上传成功钩子
    uploadSuccess() {},
    // 更换头像
    changeHead() {
      this.iscollapsider = false;
      this.iscollapsider1 = false;
      this.showHeadPortrait = true;
    },
    getDataZb(res) {
      this.portService
        .changeHeadImages({ userHeadImage: res.guid })
        .then((res) => {
          if (res.code == 1) {
            util.getUserInfo();
            this.$message({ message: res.info, type: "success" });
            this.showHeadPortrait = false;
          } else {
            this.$message({ message: res.info, type: "warning" });
          }
        });
    },
    changeFilelist(arr) {
      this.fujianList1 = arr;
    },
    // 移除文件
    deleteFile(file, fileList) {},
    goHome() {
      // if (process.env.NODE_ENV === "development") {
      //   window.open(config.requestUrl+"/gt-center-home-web/","_blank");
      // } else if (process.env.NODE_ENV === "testgt") {
      //   window.open(config.requestUrl+"/gt-center-home-web/", "_blank");
      // } else if (process.env.NODE_ENV === "prodgt") {
      //   window.open(config.requestUrl, "_blank");
      // }
    },
  },
  mounted() {
    this.setUer();
  },
  watch: {
    "$store.state.loginCookie": {
      handler() {
        this.setUer();
      },
      deep: true,
      immediate: true,
    },
    touxiangImgWatch(oldVal, newVal) {
      if (oldVal != newVal) {
        util
          .getDownSrc(this.$store.state.frame.userType.userHeadImage)
          .then((res) => {
            this.touxiangImg = res;
          });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.header {
  height: 70px !important;
  line-height: 70px;
  background-color: #fff;
  position: relative;
  width: 100%;

  .logo {
    margin-left: 13px;

    .logo-img {
      vertical-align: middle;
    }

    .szlogo-img {
      vertical-align: middle;
      max-height: 60px;
    }

    // .el-icon-s-fold {
    //   font-size: 28px;
    //   margin-left: 28px;
    //   cursor: pointer;
    //   vertical-align: middle;
    // }
    .logo-sesc {
      display: inline-block;
      height: 100%;
      line-height: 60px;
      vertical-align: top;
      margin-left: 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .other-system {
    margin-left: 34px;

    .system-list {
      cursor: pointer;
      margin-right: 30px;
      float: left;

      .iconfont {
        vertical-align: middle;
      }

      img {
        margin-right: 10px;
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
        font-size: 14px; /*NO*/
      }
    }
  }

  .tools {
    margin-right: 20px;

    .el-icon-setting {
      margin-right: 20px;
      font-size: 30px;
      color: #bbbbbb;
      vertical-align: middle;
      cursor: pointer;
    }

    .item {
      margin-left: 40px;
      margin-top: 5px;

      .el-icon-chat-dot-round {
        font-size: 30px;
        color: #bbbbbb;
      }
    }

    .user-img-box {
      cursor: pointer;

      img {
        vertical-align: middle;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }

      span {
        font-size: 14px !important; /*no*/
        margin-left: 10px;
        vertical-align: middle;
      }

      i {
        margin-left: 10px;
      }
    }

    .help {
      img {
        cursor: pointer;
        margin-right: 20px;
        vertical-align: middle;
      }

      .icon-bangzhuzhongxin2 {
        font-size: 20px; /*no*/
        cursor: pointer;
        line-height: 80px;
        margin-right: 20px;
      }
    }
  }

  .pull-down-active {
    height: 200px !important;
  }

  .styles-active {
    width: 150px !important;
  }

  .pull-down ul li p:hover .header .styles {
    width: 150px !important;
    // right: 180px;
  }
}

.pull-down {
  position: relative;
  z-index: 100000 !important;
  /*right: 30px;*/
  /*top: 80px;*/
  /*width: 150px;*/
  /*background-color: #fff;*/
  /*box-shadow: 0px 1px 10px 0px rgba(0, 22, 42, 0.1);*/
  border-radius: 6px;
  overflow: hidden;
  /*height: 0;*/
  transition: all 0.2s ease-in;

  ul {
    & > li:nth-last-child(1) {
      border-bottom: none;
    }

    li {
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      position: relative;
      border-bottom: 1px solid #f2f2f2;

      p {
        display: flex;
        align-items: center;
        font-size: 14px; /*no*/
        padding-left: 10px;

        span {
          flex: 1;
        }

        i {
          // float: left;
          font-size: 14px; /*no*/
          margin-right: 10px;
          margin-top: 0px;
        }

        .icon-qiehuan {
          font-size: 16px; /*no*/
        }

        .icon-tuichu {
          font-size: 15px; /*no*/
          color: #2c3e50;
        }

        i.icon-qiehuan {
          margin-right: 10px; /*no*/
        }

        i.el-icon-arrow-right {
          float: right;
          text-align: right;
        }
      }

      p:hover {
        color: #d6001d;
      }

      p:hover i {
        color: #d6001d;
      }
    }
  }
}

.second-styles {
  position: relative;
  /*background-color: #fff;*/
  /*box-shadow: 0px 1px 10px 0px rgba(0, 22, 42, 0.1);*/
  border-radius: 6px;
  /*z-index: 10000;*/
  /*top: 90px;*/
  /*overflow: hidden;*/
  /*width: 0;*/
  /*transition: all 0.2s ease-in;*/

  div {
    height: 50px;
    line-height: 50px;
    padding-left: 13px; /*no*/
    font-size: 14px; /*no*/
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      flex: 1;
    }

    .i_active {
      display: inline-block;
    }

    i {
      float: right;
      margin-right: 10px;
      margin-top: 0px;
      display: none;
    }
  }
}

.head-portrait {
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-bottom: 10px;
  }
}

.userInfo {
  .userInfoTil {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    display: inline-block;
  }

  p {
    margin-bottom: 20px;

    span {
      display: inline-block;
      font-size: 16px;
    }

    span:nth-child(1) {
      width: 100px;
    }

    span:nth-child(2) {
      width: 160px;
    }
  }
}

// 合并展开图片样式
.common-header-fold {
  display: inline-block;
  width: 20px; /*no*/
  height: 20px; /*no*/
  margin-left: 28px; /*no*/
  cursor: pointer;

  img {
    width: 100%;
    vertical-align: middle;
  }
}

.iconfont-style {
  font-size: 14px; /*no*/
  color: #26263a;
  margin-right: 5px;
  font-weight: 900;
  vertical-align: middle;
}

.icon-dashuju1 {
  font-size: 17px; /*no*/
}
</style>
<style lang="scss">
.item {
  .el-badge__content {
    top: 10px;
  }
}

.el-popper.popover-padding {
  padding-top: 0px;
  padding-bottom: 0px;
}

@media screen and (max-width: 1366px) {
  .header .tools .user-img-box span,
  .header .pull-down ul li p {
    font-size: 14px !important; /*no*/
  }
  .header .tools .user-img-box i {
    font-size: 14px; /*no*/
  }
  .header .pull-down ul li p {
    font-size: 14px; /*no*/
  }
  .header {
    .pull-down {
      // position: absolute;
      // z-index: 100000!important;
      // right: 30px;
      // top: 80px;
      width: 120px !important; /*no*/
      // background-color: #fff;
      // box-shadow: 0px 1px 10px 0px rgba(0, 22, 42, 0.1);
      // border-radius: 6px;
      // overflow: hidden;
      // height: 0;
      // transition: all 0.2s ease-in;
      ul {
        li {
          height: 60px;
          line-height: 60px;

          p {
            font-size: 14px; /*no*/
            padding-left: 12px !important; /*no*/
            i {
              font-size: 14px; /*no*/
            }

            .icon-qiehuan {
              font-size: 16px; /*no*/
            }

            .icon-tuichu {
              font-size: 15px; /*no*/
              color: #2c3e50;
            }

            i.icon-qiehuan {
              margin-right: 2px; /*no*/
            }

            i.el-icon-arrow-right {
              float: right;
              margin: 0px 3px 0 0; /*no*/
              text-align: right;
            }
          }
        }
      }
    }

    .styles {
      right: 140px !important; /*no*/
      div {
        font-size: 14px !important; /*no*/
        padding-left: 13px; /*no*/
      }
    }

    .pull-down ul li p:hover .styles {
      // width: 150px !important;
      right: 140px !important; /*no*/
    }
  }
  .iconfont-style {
    margin-right: 5px;
  }
}
</style>
