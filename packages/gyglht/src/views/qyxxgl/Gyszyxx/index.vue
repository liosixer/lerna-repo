<template>
    <section class="container page-detail anchor-nav">
        <div class="gyszyxxHeader global-title">
            <page-crumb :d="{ breadcrumbList: breadcrumbList }">
                <div slot="btns">
                    <el-button type="primary" @click="handleCheckPurchaseInfo" size="small" v-loading="!canpost">提交审核
                    </el-button>
<!--                    <el-button @click="handleBack" size="small">返回</el-button>-->
                </div>
            </page-crumb>
            <!-- <div class="global-title-box">
              <span class="global-title-name">供应商专业信息</span>
              <div class="global-title-btns fr">
                  <el-button type="primary" @click="handleCheckPurchaseInfo" size="small">提交审核</el-button>
                  <el-button @click="handleBack" size="small">返回</el-button>
              </div>
            </div> -->
        </div>
        <Info ref="info"></Info>
    </section>
</template>

<script>
    import Info from "./info";
    import PageCrumb from "@/components/PageCrumb";
    import {checkPurchaseInfo} from "../../../service/enterpriseInfo";

    export default {
        data() {
            return {
                breadcrumbList: [
                    // { label: "首页", link: "/qyxxgl" },
                    {label: "供应商专业信息", link: ""},
                ],
                canpost: true,
            };
        },
        components: {
            Info,
            PageCrumb,
        },
        mounted() {
        },
        methods: {
            //提交审核
            handleCheckPurchaseInfo() {
                this.$confirm("请确认已补充资质信息及荣誉信息！", "提示", {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    type: "warning",
                }).then(() => {
                    if (this.$children[1].$data.formData.gongYingShangList.length) {
                        if (!this.canpost) return;
                        this.canpost = false;
                        checkPurchaseInfo().then((res) => {
                            if (res.code === 1) {
                                this.$message.success(res.info);
                                this.$refs.info._getInfo();
                            }
                            this.canpost = true;
                        });
                    } else {
                        this.$alert("请先添加供应商专业申请！", "提示", {
                            confirmButtonText: "确定",
                        });
                    }
                }).catch(() => {
                });
            },
            handleBack() {
                this.$router.back();
            },
        },
    };
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        background: rgba(240, 242, 245, 1);
    }

    /*头部样式*/
    .gyszyxxHeader {
        width: 100%;
        background: #fff;
    }

    /*主体内容样式*/
    .gyszyxxContent {
        .bottomLine {
            width: 100%;
            border-bottom: 1px solid #e9e9e9;
        }

        > div {
            width: 100%;
            margin-bottom: 20px;
            padding-bottom: 20px;
            background: #fff;
        }

        .topDiv {
            width: calc(100% - 40px);
            // height: 54px;
            margin: 0 auto;

            ul {
                overflow: hidden;
                width: 100%;

                li {
                    float: left;
                    width: 50%;

                    h3 {
                        color: #333;
                        font-size: 16px;
                    }
                }

                li:last-child {
                    text-align: right;

                    ::v-deep.el-button {
                        // height: 32px !important;
                    }
                }
            }
        }

        ::v-deep.el-table {
            .cell {
                padding: 0;
                font-size: 14px;
            }

            .el-button.del {
                color: #f00;
            }

            .blueBtn {
                color: #409eff;
            }
        }
    }

    .page-detail {
        // padding-top: 95PX
    }
</style>
