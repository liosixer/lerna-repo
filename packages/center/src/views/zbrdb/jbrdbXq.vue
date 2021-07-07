<template>
    <section class="container">
        <div class="zbrdbAddHeader">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }"></PageCrumb>
            <div>
                <ul>
                    <li>
                        <h3>监标人-详情</h3>
                    </li>
                    <li>
                        <el-button @click="$router.go(-1)" size="small">返回</el-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="zbrdbAddContent">
            <div class="userInfoDiv">
                <h3>角色信息</h3>
                <div class="bottomLine"></div>
                <el-form :inline="true" :model="zbrdbData" size="small" class="zbrdbForm">
                    <el-form-item label="姓名:" :disabled="true">
                        <el-input placeholder="自动获取" v-model="zbrdbData.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.idNo" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.employer" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.phone" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.bankName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="所属地区:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.area" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账户:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.bankCard" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效:">
                        <el-input placeholder="自动获取" v-model="zbrdbData.status" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input type="textarea" :rows="4" autosize placeholder="自动获取" v-model="zbrdbData.beizhu" :disabled="true">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="zbrdbGxDiv">
                <div class="topDiv">
                    <ul>
                        <li>
                            <h3>监标人共享</h3>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>
                <div class="bottomLine"></div>
                <self-table border :data="zbrdbGxData" header-cell-class-name="headercell" style="width:100%;margin:0;" :fit="true">
                    <el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qiYe_Name" label="企业名称" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qiYe_BH" label="企业代码" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="100" align="left">
                        <template slot-scope="scope">
                            <span>无</span>
                        </template>
                    </el-table-column>
                </self-table>
                <el-form :inline="true" :model="zbrdbFormData" class="zbrdbGxForm">
                    <el-form-item label="创建人:">
                        <el-input placeholder="自动获取" v-model="zbrdbFormData.creatorName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间:">
                        <el-input placeholder="自动获取" v-model="zbrdbFormData.createTime" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="修改人:">
                        <el-input placeholder="自动获取" v-model="zbrdbFormData.updatorName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间:">
                        <el-input placeholder="自动获取" v-model="zbrdbFormData.updateTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
    import PageCrumb from "@/components/PageCrumb";
    export default {
        name: 'spPersonSz',
        components: { PageCrumb },
        data() {
            return {
                breadcrumbList: [
                    { label: "首页", link: "/qyxxgl" },
                    { label: "招标人代表", link: "/zbrdb/zbrdbTable" },
                    { label: "监标人", link: "/zbrdb/jbrdbTable" },
                    { label: "监标人-详情", link: "" }
                ],
                ckGuid: "",
                zbrdbData: {
                    name: "",
                    idNo: "",
                    employer: "",
                    phone: "",
                    bankName: "",
                    area: "",
                    bankCard: "",
                    status: "",
                    beizhu: ""
                },
                zbrdbGxData: [],
                zbrdbFormData: {
                    creatorName: "",
                    createTime: "",
                    updatorName: "",
                    updateTime: ""
                }
            }
        },
        methods: {
            //编辑和查看时候获取默认信息
            async queryZhaoBiaoRenDaiBiaoInfo() {
                var param = {
                    guid: this.ckGuid
                }
                const res = await this.portService.queryZhaoBiaoRenDaiBiaoInfo(param)
                if (res.data) {
                    var thisData = res.data.data
                    this.zbrdbData.name = thisData.name
                    this.zbrdbData.idNo = thisData.idNo
                    this.zbrdbData.employer = thisData.employer
                    this.zbrdbData.phone = thisData.phone
                    this.zbrdbData.bankName = thisData.bankName

                    this.zbrdbData.area = thisData.provinceName + "/" + thisData.cityName + "/" + thisData.areaName
                    this.zbrdbData.bankCard = thisData.bankCard
                    if (thisData.status === "1") {
                        this.zbrdbData.status = "有效"
                    } else if (thisData.status === "0") {
                        this.zbrdbData.status = "无效"
                    }
                    this.zbrdbData.beizhu = thisData.beizhu

                    var tableData = thisData.zbrdbGongXiangList
                    for (let i = 0; i < tableData.length; i++) {
                        var tableObj = {
                            qiYe_Name: tableData[i].qiYe_Name,
                            qiYe_BH: tableData[i].qiYe_BH
                        }
                        this.zbrdbGxData.push(tableObj)
                    }

                    this.zbrdbFormData.creatorName = thisData.creatorName
                    this.zbrdbFormData.createTime = this.formatDate(thisData.createTime)
                    this.zbrdbFormData.updatorName = thisData.updatorName
                    this.zbrdbFormData.updateTime = this.formatDate(thisData.updateTime)
                }
            },

            //时间戳转时间
            formatDate: function (value) {
                if(value===null){
                    return ""
                }else{
                    let date = new Date(value);
                    let y = date.getFullYear();
                    let MM = date.getMonth() + 1;
                    MM = MM < 10 ? ('0' + MM) : MM;
                    let d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let m = date.getMinutes();
                    m = m < 10 ? ('0' + m) : m;
                    let s = date.getSeconds();
                    s = s < 10 ? ('0' + s) : s;
                    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
                }
            }
        },
        create() {
        },
        mounted() {
            //路由获取id
            this.ckGuid = this.$route.params.xqid
            this.queryZhaoBiaoRenDaiBiaoInfo()
        },
        destroyed() { },
        watch: {
        },
    }

</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
    }
    /*头部样式*/

    .zbrdbAddHeader {
        width: 100%;
        height: 90px;
        background: #fff;
        div {
            width: calc(100% - 40px);
            height: 40px;
            margin: 0 auto;
            ul {
                overflow: hidden;
                width: 100%;
                height: 100%;
                li {
                    float: left;
                    width: 50%;
                    height: 100%;
                    h3 {
                        height: 40px;
                        color: #000;
                        font-size: 16px;
                        line-height: 40px;
                    }
                }
                li:last-child {
                    float: right;
                    text-align: right;
                     ::v-deep.el-button {
                        width:60px;
                        height: 40px!important;
                        padding:0;
                    }
                }
            }
        }
        div:first-child {
            color: #404040;
            font-size: 14px;
            line-height: 40px;
        }
    }
    /*主体内容样式*/

    .zbrdbAddContent {
        width: calc(100% - 10px);
        margin: 5px;
        .bottomLine {
            width: 100%;
            border-bottom: 1px solid #e9e9e9;
        }
        >div {
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
                 ::v-deep.el-form-item {
                    width: 50%;
                    height: 60px;
                    margin-right: 0;
                    margin-bottom:0;
                    .el-form-item__label {
                        width: 130PX!important;/*no*/
                        height: 40px;
                        padding-left: 12px;
                        font-size:14px;
                        line-height: 40px;
                    }
                    .el-form-item__content {
                        width: calc(100% - 130PX);/*no*/
                        line-height: 0;
                        height: 40px;
                        .el-input {
                            width: 100%;
                            height: 40px;
                            .el-input__inner {
                                width: 100%;
                                height: 40px;
                                font-size:14px;
                            }
                        }
                        .el-select {
                            width: 100%;
                            height: 40px;
                            font-size:14px;
                        }
                        .el-cascader{
                            width:100%;
                        }
                        .el-textarea{
                            height: 40px!important;
                            .el-textarea__inner{
                                width: 100%;
                                height: 40px!important;
                                line-height: 30px!important;
                                font-size:14px;
                            }
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
                        width:100%;
                        height:50px;
                        color: #333;
                        font-size: 14px;
                        line-height: 50px;
                    }
                }
            }
        }
         ::v-deep.el-table {
            margin-bottom: 20px!important;
            .el-table__header tr th{
                height:48px;
                padding:0;
            }
            .el-table__body tr td{
                height:48px;
                padding:0;
            }
            .cell {
                padding: 0;
                text-align: center;
            }
        }
        .zbrdbGxForm {
            width: calc(100% - 40px);
            height:120px;
            margin: 0 auto;
            ::v-deep.el-form-item {
                width: 50%;
                height: 60px;
                margin-bottom:0;
                margin-right: 0;
                .el-form-item__label {
                    width: 90PX!important;/*no*/
                    height: 40px;
                    padding-left: 12px;
                    font-size:14px;
                    line-height: 40px;
                }
                .el-form-item__content {
                    width: calc(100% - 90PX);/*no*/
                    line-height: 0;
                    height: 40px;
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
        }
    }
</style>
