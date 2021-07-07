<template>
    <section class="container page-detail">
        <div class="zbrdbAddHeader global-title">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
                <div slot="btns">
                    <el-button type="primary" size="small" @click="saveFunc(zbrdbData)" v-loading="!canpost"
                               :loading="saveLoading">保存
                    </el-button>
                    <el-button @click="$router.go(-1)" size="small">返回</el-button>
                </div>
            </PageCrumb>
            <!-- <div class="global-title-box">
                      <span class="global-title-name">监标人-编辑</span>
                      <div class="global-title-btns fr">
                          <el-button type="primary" size="small" @click="saveFunc(zbrdbData)">保存</el-button>
                          <el-button @click="$router.go(-1)" size="small">返回</el-button>
                      </div>
                  </div> -->
        </div>
        <div class="zbrdbAddContent global-content">
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">角色信息</span>
                </div>
                <div class="global-card-content">
                    <el-form :model="zbrdbData" :rules="zbrdbRuleData" ref="zbrdbData" label-width="100px" size="small"
                             label-position="right">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="姓名:" prop="name" class="flex_choose">
                                    <div class="flex_choose_input">
                                        <el-input placeholder="请输入" v-model="zbrdbData.name" disabled></el-input>
                                    </div>
                                    <el-button class="flex_choose_button" type="primary" @click="openUserDialog">选择
                                    </el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="身份证号码:" prop="idNo">
                                    <el-input placeholder="请输入" disabled v-model="zbrdbData.idNo"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="所属单位:" prop="employer">
                                    <el-input placeholder="请点击查询按钮选择" v-model="zbrdbData.employer"
                                              :disabled="true"></el-input>
                                    <!--                        <el-button type="primary" @click="checkSsdwFunc">选择</el-button>-->
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系电话:" prop="phone">
                                    <el-input placeholder="请输入" v-model="zbrdbData.phone" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="所属部门:" prop="deptName">
                                    <el-input placeholder="" v-model="zbrdbData.deptName"
                                              :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="开户行:" prop="bankName">
                                    <el-input placeholder="请输入" v-model="zbrdbData.bankName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="所属地区:" prop="administrativeArea">
                                    <el-cascader size="large" :options="regionData" style="width:100%;"
                                                 v-model="zbrdbData.administrativeArea"
                                                 @change="handleChange"></el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="银行账户:" prop="bankCard">
                                    <el-input placeholder="请输入" v-model="zbrdbData.bankCard"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否有效:" prop="statusVal">
                                    <el-select v-model="zbrdbData.statusVal" placeholder="请选择">
                                        <el-option v-for="item in zbrdbData.status" :key="item.value"
                                                   :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="备注12:">
                                    <el-input type="textarea" :rows="4" autosize placeholder="请输入"
                                              v-model="zbrdbData.beizhu"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">监标人共享</span>
                    <el-button type="primary" @click="addGxQy" style="float:right;">添加</el-button>
                </div>
                <div class="global-card-content">
                    <self-table border :data="zbrdbGxData" header-cell-class-name="headercell"
                                style="width:100%;margin:0;" :fit="true">
                        <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="qiYe_Name" label="企业名称" min-width="150px"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="qiYe_BH" label="企业代码" min-width="150px"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="100" align="left">
                            <template slot-scope="scope">
                                <el-button-group class="operation-button-group">
                                    <el-button type="info" plain class="operation-button" size="small"
                                               @click="deleteGxQy(scope.$index, zbrdbGxData)">
                                        <i class="iconfont icon-shanchu1"><span>删除</span></i>
                                    </el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>
                        <div slot="empty" class="custom-empty"></div>
                    </self-table>
                </div>

                <el-form :model="zbrdbFormData" label-width="100px" size="small" label-position="right">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="创建人:">
                                <el-input placeholder="自动获取" v-model="zbrdbFormData.createRen"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建时间:">
                                <el-input placeholder="自动获取" v-model="zbrdbFormData.createTime"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="修改人:">
                                <el-input placeholder="自动获取" v-model="zbrdbFormData.xiugaiRen"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="修改时间:">
                                <el-input placeholder="自动获取" v-model="zbrdbFormData.xiugaiTime"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <GetAllQiYeDialog ref="GetAllQiYeDialog" @qyDataFunc="getQyData"></GetAllQiYeDialog>
            <getAllZBRDialog ref="getAllZBRDialog" @zbrDataFunc="getZbrData"></getAllZBRDialog>
            <user-dialog ref="UserDialog" @emitUser="getUserInfo"></user-dialog>
        </div>
    </section>
</template>

<script>
    import GetAllQiYeDialog from "./getAllQiYeDialog";
    import getAllZBRDialog from "./getAllZBRDialog";
    import UserDialog from "./UserDialog";
    import PageCrumb from "@/components/PageCrumb";
    //import { regionData } from "element-china-area-data";
    export default {
        name: "spPersonSz",
        components: {GetAllQiYeDialog, getAllZBRDialog, PageCrumb, UserDialog},
        data() {
            return {
                breadcrumbList: [
                    {label: "监标人", link: "/zbrdb/jbrdbTable"},
                    {label: "编辑", link: ""},
                ],
                saveLoading: false,
                ckGuid: "",
                zbrdbData: {
                    name: "",
                    idNo: "",
                    employer: "",
                    employerCode: "",
                    phone: "",
                    bankName: "",
                    administrativeArea: [],
                    bankCard: "",
                    status: [
                        {
                            label: "有效",
                            value: "1",
                        },
                        {
                            label: "无效",
                            value: "0",
                        },
                    ],
                    statusVal: "",
                    beizhu: "",
                },
                zbrdbRuleData: {
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}],
                    idNo: this.validate.peopleID(true),
                    employer: [{required: true, message: "请选择所属单位"}],
                    phone: this.validate.vdTel(true),
                    // bankName: [{ required: true, message: "请输入开户行", trigger: "blur" }],
                    administrativeArea: [{required: true, message: "请选择所属地区", trigger: "change"}],
                    // bankCard: [{ required: true, message: "请输入银行账户", trigger: "blur" }],
                    statusVal: [{required: true, message: "请选择是否有效", trigger: "change"}],
                },
                zbrdbGxData: [],
                gongXiangQiYeGuidsArr: [],
                gongXiangQiYeGuids: "",
                zbrdbFormData: {
                    createRen: "",
                    createTime: "",
                    xiugaiRen: "",
                    xiugaiTime: "",
                },
                regionData: [],
                canpost: true,
                addData: {
                    name: "",
                    idNo: "",
                    employer: "",
                    employerCode: "",
                    phone: "",
                    bankName: "",
                    shengId: "",
                    shiId: "",
                    areaId: "",
                    bankCard: "",
                    status: "",
                    beizhu: "",
                    type: 2,
                    gongXiangQiYeGuids: "",
                    guid: "",
                },
            };
        },
        methods: {
            //编辑和查看时候获取默认信息
            async queryZhaoBiaoRenDaiBiaoInfo() {
                var param = {
                    guid: this.ckGuid,
                };
                const res = await this.portService.queryZhaoBiaoRenDaiBiaoInfo(param);
                if (res.data) {
                    var thisData = res.data.data;
                    this.zbrdbData.name = thisData.name;
                    this.zbrdbData.idNo = thisData.idNo;
                    this.zbrdbData.employer = thisData.employer;
                    this.zbrdbData.employerCode = thisData.employerCode;
                    this.zbrdbData.phone = thisData.phone;
                    this.zbrdbData.bankName = thisData.bankName;
                    this.zbrdbData.deptName = thisData.deptName;
                    this.zbrdbData.deptGuid = thisData.deptGuid;

                    this.zbrdbData.administrativeArea = [thisData.shengId, thisData.shiId, thisData.areaId];
                    this.zbrdbData.bankCard = thisData.bankCard;
                    this.zbrdbData.statusVal = thisData.status;
                    this.zbrdbData.beizhu = thisData.beizhu;
                    this.zbrdbGxData = thisData.zbrdbGongXiangList;

                    this.zbrdbFormData.createRen = thisData.creatorName;
                    this.zbrdbFormData.createTime = this.formatDate(thisData.createTime);
                    this.zbrdbFormData.xiugaiRen = thisData.updatorName;
                    this.zbrdbFormData.xiugaiTime = this.formatDate(thisData.updateTime);
                }
            },
            addGxQy() {
                this.$refs.GetAllQiYeDialog.qyBoolen();
            },
            checkSsdwFunc() {
                this.$refs.getAllZBRDialog.qyBoolen();
            },
            //选择共享企业
            getQyData(payload) {
                for (let i = 0; i < payload.length; i++) {
                    this.zbrdbGxData.push(payload[i]);
                }

                this.zbrdbGxData = this.arrayQC(this.zbrdbGxData);
            },
            //选择所属单位
            getZbrData(payload) {
                this.zbrdbData.employer = payload.qiYe_Name;
                this.zbrdbData.employerCode = payload.user_Guid;
            },
            //选择行政区域
            handleChange(value) {
                //console.log(value)
            },
            //对象数组去重
            arrayQC(arr) {
                var arr2 = arr.filter((x, index, self) => {
                    var arrids = [];
                    arr.forEach((item, i) => {
                        arrids.push(item.userQiYe_Guid);
                    });
                    return arrids.indexOf(x.userQiYe_Guid) === index;
                });
                return arr2;
            },
            //删除共享企业
            deleteGxQy(index, list) {
                list.splice(index, 1);
            },
            //保存新增招标人
            async saveOrUpdateZhaoBiaoRenDaiBiao() {
                if (!this.canpost) return;
                this.canpost = false;
                for (let i = 0; i < this.zbrdbGxData.length; i++) {
                    this.gongXiangQiYeGuidsArr.push(this.zbrdbGxData[i].userQiYe_Guid);
                }

                this.gongXiangQiYeGuids = this.gongXiangQiYeGuidsArr.join(",");

                this.addData = {
                    name: this.zbrdbData.name,
                    idNo: this.zbrdbData.idNo,
                    employer: this.zbrdbData.employer,
                    employerCode: this.zbrdbData.employerCode,
                    phone: this.zbrdbData.phone,
                    bankName: this.zbrdbData.bankName,
                    shengId: this.zbrdbData.administrativeArea[0],
                    shiId: this.zbrdbData.administrativeArea[1],
                    areaId: this.zbrdbData.administrativeArea[2],
                    bankCard: this.zbrdbData.bankCard,
                    status: this.zbrdbData.statusVal,
                    beizhu: this.zbrdbData.beizhu,
                    zbrdbguid: this.zbrdbData.zbrdbguid,
                    type: 2,
                    gongXiangQiYeGuids: this.gongXiangQiYeGuids,
                    guid: this.ckGuid,
                };
                const res = await this.portService
                    .saveOrUpdateZhaoBiaoRenDaiBiao(this.addData)
                    .then((res) => {
                        if (res.code == 1) {
                            this.saveLoading = false
                            this.$message({
                                type: "success",
                                center: true,
                                duration: 1000,
                                message: "保存成功!",
                            });
                            this.$router.push({path: "/zbrdb/jbrdbTable"});
                        }
                    })
                    .catch((error) => {
                    });
                this.canpost = true;
            },
            //保存新增信息
            saveFunc(zbrdbData) {
                this.saveLoading = true
                this.$refs.zbrdbData.validate((valid) => {
                    if (valid) {
                        this.isPhoneExist();
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
                setTimeout(() => {
                    this.saveLoading = false
                }, 3000)
            },
            //查询地区三级联动
            async dictAllAreaList() {
                const res = await this.portService
                    .dictAllAreaList()
                    .then((res) => {
                        this.regionData = res;
                    })
                    .catch((error) => {
                    });
            },
            //电话号重复判断
            async isPhoneExist() {
                var phoneData = {
                    phone: this.zbrdbData.phone,
                    type: 2,
                };
                const res = await this.portService
                    .isPhoneExist(phoneData)
                    .then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                type: "error",
                                center: true,
                                duration: 1000,
                                message: "该手机号已被使用,请核查!",
                            });
                            return false;
                        } else {
                            this.$confirm("确定保存监标人修改信息吗?", "提示", {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消",
                                type: "warning",
                            })
                                .then(() => {
                                    this.saveOrUpdateZhaoBiaoRenDaiBiao();
                                })
                                .catch(() => {
                                });
                        }
                    })
                    .catch((error) => {
                    });
            },
            //时间戳转时间
            formatDate: function (value) {
                if (value === null) {
                    return "";
                } else {
                    let date = new Date(value);
                    let y = date.getFullYear();
                    let MM = date.getMonth() + 1;
                    MM = MM < 10 ? "0" + MM : MM;
                    let d = date.getDate();
                    d = d < 10 ? "0" + d : d;
                    let h = date.getHours();
                    h = h < 10 ? "0" + h : h;
                    let m = date.getMinutes();
                    m = m < 10 ? "0" + m : m;
                    let s = date.getSeconds();
                    s = s < 10 ? "0" + s : s;
                    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
                }
            },
            //选择人
            openUserDialog() {
                this.$refs.UserDialog.qyBoolen()
            },
            getUserInfo(data){
                this.zbrdbData.name = data.user_Name;
                this.zbrdbData.idNo = data.user_BH;
                this.zbrdbData.phone = data.user_Phone;
                this.zbrdbData.deptName = data.deptName;
                this.zbrdbData.deptGuid = data.deptGuid;
                this.zbrdbData.zbrdbguid = data.user_Guid;
            }
        },
        create() {
        },
        mounted() {
            //路由获取id
            this.ckGuid = this.$route.params.bjid;
            this.dictAllAreaList();
            this.queryZhaoBiaoRenDaiBiaoInfo();
        },
        destroyed() {
        },
        watch: {},
    };
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
    }

    /*头部样式*/

    .zbrdbAddHeader {
        width: 100%;
        background: #fff;
    }

    /*主体内容样式*/

    .zbrdbAddContent {
        width: calc(100% - 10px);
        margin: 5px;

        .bottomLine {
            width: 100%;
            border-bottom: 1px solid #e9e9e9;
        }

        > div {
            width: 100%;
            margin-bottom: 20px;
            padding-bottom: 10px;
            background: #fff;
        }

        h3 {
            width: calc(100% - 40px);
            height: 40px;
            margin: 0 auto;
            color: #333;
            font-size: 16px;
            line-height: 40px;
        }

        .userInfoDiv {
            padding-bottom: 0;

            .bottomLine {
                margin-bottom: 10px;
            }

            .zbrdbForm {
                width: calc(100% - 40px);
                margin: 0 auto;
                width: calc(100% - 40px);
                margin: 0 auto;

                ::v-deep.el-form-item {
                    width: 50%;
                    height: 60px;
                    margin-right: 0;
                    margin-bottom: 0;

                    .el-form-item__label {
                        width: 130px !important;
                        /*no*/
                        height: 40px;
                        padding-left: 12px;
                        font-size: 14px;
                        line-height: 40px;
                    }

                    .el-form-item__content {
                        width: calc(100% - 130px);
                        /*no*/
                        line-height: 0;
                        height: 40px;

                        .el-input {
                            width: 100%;
                            height: 40px;

                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size: 14px;
                            }
                        }

                        .el-select {
                            width: 100%;
                            height: 40px;
                            font-size: 14px;
                        }

                        .el-cascader {
                            width: 100%;
                        }

                        .el-textarea {
                            height: 40px !important;

                            .el-textarea__inner {
                                width: 100%;
                                height: 40px !important;
                                line-height: 30px !important;
                                font-size: 14px;
                            }
                        }
                    }
                }

                ::v-deep.el-form-item:nth-child(3) {
                    .el-form-item__content {
                        width: calc(100% - 130px);
                        /*no*/
                        .el-input {
                            /*width: calc(100% - 58PX);*/
                            /*no*/
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size: 14px;
                            }
                        }

                        .el-button {
                            width: 40px;
                            /*no*/
                            height: 32px;
                            margin-left: 10px;
                            padding: 0;
                        }
                    }
                }

                ::v-deep.el-form-item:nth-child(9) {
                    width: 100%;
                }
            }
        }

        .topDiv {
            width: calc(100% - 40px);
            height: 50px;
            margin: 0 auto;

            ul {
                overflow: hidden;
                width: 100%;
                height: 50px;

                li {
                    float: left;
                    width: 50%;
                    height: 50px;
                    line-height: 50px;

                    h3 {
                        width: 100%;
                        height: 50px;
                        color: #333;
                        font-size: 14px;
                        line-height: 50px;
                    }
                }

                li:last-child {
                    text-align: right;

                    ::v-deep.el-button {
                        width: 60px;
                        height: 40px !important;
                        padding: 0;
                    }
                }
            }
        }

        ::v-deep.el-table {
            margin-bottom: 20px !important;

            .el-table__header tr th {
                height: 48px;
                padding: 0;
            }

            .el-table__body tr td {
                height: 48px;
                padding: 0;
            }

            .cell {
                padding: 0;
                text-align: center;
            }

            .el-button {
                color: #f00;
            }
        }

        .zbrdbGxForm {
            width: calc(100% - 40px);
            height: 120px;
            margin: 0 auto;

            ::v-deep.el-form-item {
                width: 50%;
                height: 60px;
                margin-bottom: 0;
                margin-right: 0;

                .el-form-item__label {
                    width: 90px !important;
                    /*no*/
                    height: 40px;
                    padding-left: 12px;
                    font-size: 14px;
                    line-height: 40px;
                }

                .el-form-item__content {
                    width: calc(100% - 90px);
                    /*no*/
                    line-height: 0;
                    height: 40px;

                    .el-input {
                        width: 100%;
                        height: 40px;

                        .el-input__inner {
                            width: 100%;
                            height: 40px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>
