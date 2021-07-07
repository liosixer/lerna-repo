<template>
    <div class="header clearfix" :class="bdColor">
        <div class="logo fl">
            <span >
                <img class="logo-img" src="../../assets/images/frame/logo.png" alt />
            </span>
            <i class="common-header-fold " @click="collapseClk">
                <img v-if="headerOpen" src="../../assets/images/frame/header-close.png" alt=""/>
                <img v-else src="../../assets/images/frame/header-open.png" alt=""/>
            </i>
        </div>
        <div class="other-system fl">
            <template v-if="$store.state.roleAnddepartment.enterPriseInfo.zhuTiLeiXing">
                <div class="system-list" @click="goToOtherSystem(5)" v-if="$store.state.roleAnddepartment.enterPriseInfo.zhuTiLeiXing.indexOf('T') > -1 && $store.state.roleAnddepartment.isShow && $store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai == 2">
                    <i class="iconfont icon-gongyingshang iconfont-style"></i>
                    <span>供应商系统</span>
                </div>
            </template>
            <!-- <div class="system-list" @click="goToOtherSystem(3)" v-if="$store.state.roleAnddepartment.enterPriseInfo.jyUser.shenPi_ZhuangTai == 2">
                <i class="iconfont iconfont-style icon-idcard-tick"></i>
                <span>CA办理平台</span>
            </div> -->
        </div>
        <div class="tools fr clearfix">
            <cur-time class="fl" style="margin-right: 30px"></cur-time>
            <div class="help fl">
                <i class="iconfont icon-bangzhu1"></i>
                <!-- <img src="../../assets/images/frame/help.png" alt=""> -->
            </div>
            <el-popover placement="bottom" width="120" popper-class="popover-padding" v-model="firstVisible"
                        trigger="click">
                <div class="pull-down down">
                    <ul>
                        <el-popover placement="left-start" width="100" v-model="secondVisible" trigger="hover">
                            <div class="second-styles">
                                <div @click="chooseStyles('wight')">
                                    <span>简洁风格</span>
                                    <i class="el-icon-check" :class="{ i_active: isIchoosed1 }"></i>
                                </div>
                                <div @click="chooseStyles('dark')">
                                    <span>经典风格</span>
                                    <i class="el-icon-check" :class="{ i_active: isIchoosed2 }"></i>
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
                    <img class="user-img" :src="touxiangImg" alt/>
                    <span>{{ userName }}</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
            </el-popover>
        </div>
        <el-dialog title="更换头像" :visible.sync="showHeadPortrait" width="28%" :append-to-body="true">
            <div class="clearfix">
                <div class="fl head-portrait" style="text-align:center;">
                    <div>
                        <img :src="touxiangImg" alt/>
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
                            :buttonTxt="'上传头像'"
                    ></upload>
                </div>
                <div class="fr userInfo">
                    <span class="userInfoTil">基本信息</span>
                    <p class="clearfix">
                        <span class="fl">用户名：</span>
                        <span class="fl">{{userInfo.accountName}}</span>
                    </p>
                    <p class="clearfix">
                        <span class="fl">姓名：</span>
                        <span class="fl">{{userInfo.currentUserName}}</span>
                    </p>
                    <p class="clearfix">
                        <span class="fl">所属部门：</span>
                        <span class="fl">{{userInfo.deptName}}</span>
                    </p>
                    <p class="clearfix">
                        <span class="fl">所在单位：</span>
                        <span class="fl">{{userInfo.name}}</span>
                    </p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Upload from "@/components/Upload";
    import CurTime from "../../components/CurTime";
    import util from "../../utils/util";
    import config from "@/config/config";
    export default {
        name: "Headers",
        components: {CurTime, Upload},
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
                //头像数据
                touxiangImg: '',

                showHeadPortrait: false,
                fujianList: [],
                upParams: "",
                headImg:"",
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
            userInfo() {
                return this.$store.state.loginCookie.userInfo
            },
        },
        created() {
            this.$store.dispatch("addUserInfo");
            this.getAvar();
        },
        methods: {
            getAvar() {
                if (this.userInfo.userHeadImage == null) {
                    this.touxiangImg = require("../../assets/images/frame/touxiang.png");
                } else {
                    util.getDownSrc(this.userInfo.userHeadImage).then((res) => {
                        this.touxiangImg = res;
                    });
                }
                let headLogo = ""
                if(this.userInfo.deptConfigList.length>0){
                    headLogo = this.userInfo.deptConfigList.find(item=>item.type == 40)
                }
                if(headLogo.logoGuid){
                    util.getDownSrc(headLogo.logoGuid).then((res1) => {
                        this.headImg = res1;
                    });
                }else{
                    this.headImg = require("../../assets/images/frame/logo.png");
                }
            },
            collapseClk() {
                this.headerOpen = !this.headerOpen;
                this.$store.commit("toggleSideBar");
            },
            setUer() {
                this.userName = this.$store.state.loginCookie.userInfo.name;
            },
            quit() {
                this.$confirm("确定要退出登录吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.$store.commit("clearState");
                        window.sessionStorage.clear();
                        this.$router.push({path: "/login"});
                        this.$store.dispatch("addloginStaues", true);
                        this.$store.commit("setLoaded", false);
                        this.$store.commit("setEnterpriseInfo", {
                            jyUser: {
                                shenPi_ZhuangTai: 0,
                                accountName: "",
                            },
                        });
                    })
                    .catch(() => {
                    });
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
            //跳转其他系统地址
            goToOtherSystem(type) {
                if (type === 3) {
                    const url = config.caUrl+`?guid=${this.$store.state.loginCookie.userInfo.currentUserId}&type=81&xmlx=10`
                    const urlPro = config.caUrl+`Home/Index?guid=${this.$store.state.loginCookie.userInfo.currentUserId}&type=81&xmlx=10`
                    process.env.NODE_ENV === 'production'?window.open(urlPro):window.open(url)
                } else if (type === 5) {
                    window.open(`${window.location.protocol}//${window.location.host}/gt-jy-toubiao/index.html#/dashboard`);
                }
            },
            toHome() {
            },
            // 以下是头像方法
            changeHead() {
                this.showHeadPortrait = true;
            },
            getDataZb(res) {
                this.portService.changeHeadImages({userHeadImage: res.guid}).then(res => {
                    if (res.code == 1) {
                        this.$store.dispatch("addUserInfo")
                        this.$message({message: res.info, type: "success"});
                        this.showHeadPortrait = false;
                    } else {
                        this.$message({message: res.info, type: "warning"});
                    }
                });
            },
            changeFilelist(arr) {
                // this.fujianList1 = arr;
            },
        },
        mounted() {
            this.setUer();
        },
        watch: {
            "$store.state.loginCookie": {
                handler() {
                    this.setUer();
                    this.getAvar()
                },
                deep: true,
                immediate: true,
            }
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
                cursor: pointer;
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
            height: 100%;
            .system-list {
                cursor: pointer;
                margin-right: 30px;
                margin-left: 10px;
                float: left;
                line-height: 1;
                text-align: center;
                padding: 12px 10px 0px 10px;
                height: 100%;
                &:hover {
                    background-color: #fdf6f7;
                    color: #c42a32 !important;
                    font-weight: bold;
                }

                i {
                    vertical-align: middle;
                    font-size: 22px;
                    line-height: 1;
                }
                span {
                    display: block;
                    vertical-align: middle;
                    line-height: 1;
                    margin-top: 6px;
                    font-size: 16px; /*NO*/
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
                margin-right: 10px;
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
                        margin-right: 2px; /*no*/
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
        /*font-size: 18px; !*no*!*/
        /*color: #26263a;*/
        /*margin-right: 5px;*/
        /*font-weight: 900;*/
        /*vertical-align: middle;*/
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
