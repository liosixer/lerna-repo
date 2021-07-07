<template>
    <div class="touzhishu">
        <div class="global-title">
            <page-crumb :d="{breadcrumbList:breadcrumbList}">
                <div slot="btns">
                    <el-button type="primary" size="small" @click="saveFunc"
                               :loading="saveLoading">保存
                    </el-button>
                    <el-button @click="$router.back(-1)" size="small">返回</el-button>
                </div>
            </page-crumb>
        </div>
        <div class="global-content">
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">基本信息</span>
                </div>
                <div class="global-card-content">
                    <el-form size="small" :model="formInline" class="demo-form-inline" label-position="right"
                             label-width="130px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="登录名" :rules="validate.vdRequired()" prop="accountName">
                                    <el-input v-model="formInline.accountName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="密码" :rules="validate.vdRequired()" prop="password">
                                    <el-input v-model="formInline.password" show-password
                                              class="no-show-pas"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名" :rules="validate.vdRequired()" prop="user_Name">
                                    <el-input v-model="formInline.user_Name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="身份证号" :rules="validate.peopleID(true)" prop="user_BH">
                                    <el-input v-model="formInline.user_BH"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="手机号码" :rules="validate.vdTel(true)" prop="user_Phone">
                                    <el-input v-model="formInline.user_Phone"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="座机号码" :rules="validate.vdRequired()" prop="user_Mobile">
                                    <el-input v-model="formInline.user_Mobile"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="用户级别" :rules="validate.vdRequired()" prop="userLevel">
                                    <el-radio-group v-model="formInline.userLevel">
                                        <el-radio label="1">平台级</el-radio>
                                        <el-radio label="2">租户级</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="formInline.userLevel==2">
                                <el-form-item label="所属租户" :rules="validate.vdRequired()" prop="deptName">
                                    <el-input v-model="formInline.deptName" @click.native="openZuhuDialog"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="是否有效" :rules="validate.vdRequired()" prop="isYouXiao">
                                    <el-radio-group v-model="formInline.isYouXiao">
                                        <el-radio :label="0">有效</el-radio>
                                        <el-radio :label="1">无效</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="创建时间" :rules="validate.vdRequired()" prop="create_Time">
                                    <el-date-picker v-model="formInline.create_Time" format="yyyy-MM-dd HH:mm"
                                                    type="datetime" value-format="timestamp"
                                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">分配角色</span>
                    <el-button type="primary" style="float: right;" @click="openRoleDialog" size="small">添加
                    </el-button>
                </div>
                <div class="global-card-content">
                    <self-table border stripe :data="roleTable" style="width: 100%">
                        <el-table-column type="index" label="排序" width="100"></el-table-column>
                        <el-table-column prop="roleName" label="角色名称" min-width="120"></el-table-column>
                        <el-table-column prop="roleNo" label="角色编号" min-width="120"></el-table-column>
                        <el-table-column prop="createTime" label="分配时间" min-width="120">
                            <template slot-scope="scope">{{ scope.row.createTime | timestampFormat("minute") }}
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="220" align="left">
                            <template slot-scope="scope">
                                <el-button-group class="operation-button-group">
                                    <el-button type="info" plain class="operation-button" size="mini"
                                               @click="delFunc(scope.row.guid)"><i class="iconfont icon-shanchu1"><span>删除</span></i>
                                    </el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>
                        <div slot="empty" class="custom-empty"></div>
                    </self-table>
                    <div class="com-table-pagination clearfix" ref="table_pagination">
                        <v-pagination :total="total" :page="page" :limit="rows"
                                      @size-change="handleSizeChange"
                                      @current-change="handleCurrentChange"></v-pagination>
                    </div>
                </div>
            </el-card>
        </div>
        <role-list-dialog ref="RoleListDialog" @sendRoles="getRoleList"></role-list-dialog>
        <zuhu-list-dialog ref="ZuhuListDialog" @sendZh="getZh"></zuhu-list-dialog>
    </div>
</template>
<script>
    import PageCrumb from "../../../components/PageCrumb";
    import RoleListDialog from "./RoleListDialog";
    import ZuhuListDialog from "./ZuhuListDialog";

    export default {
        components: {PageCrumb, RoleListDialog, ZuhuListDialog},
        data() {
            return {
                formInline: {
                    deptName: ''
                },
                roleTable: [],
                breadcrumbList: [
                    {label: '用户管理', link: '/userAndQxManage/userauth'},
                    {label: '用户管理', link: ''}
                ],
                pageStatus: '',
                saveId: '',
                saveLoading: false,
                forBidden: false,
                page: 1, rows: 10, total: 0
            };
        },
        inject: ['globalSetting'],
        computed: {
            forbid() {
                return this.$route.query.forbid
            },
            status() { //页面状态  1新增   2编辑
                return this.$route.query.status
            },
            userGuid() {
                return this.$route.query.userGuid
            },
        },
        async created() {
            console.log(this.userGuid || this.saveId)
            this.forBidden = this.forbid
            this.pageStatus = this.status
            if (this.pageStatus == 2) {
                this.getAllInfo()
                this.getRoleList()
            }
        },
        methods: {
            async getAllInfo() {
                const result = await this.portService.userInfoDetailQuery({user_Guid: this.userGuid || this.saveId})
                if (result && result.code == 1) {
                    this.formInline = result.data
                }
            },

            async getRoleList() {
                const result = await this.portService.rolesQueryByUser({
                    user_Guid: this.userGuid || this.saveId,
                    page: 1,
                    rows: 10
                })
                if (result && result.data) {
                    this.roleTable = result.data.sysRolelist
                }
            },
            openZuhuDialog() {
                this.$refs.ZuhuListDialog.openDialog()
            },
            //获取租户的一行数据
            getZh(row) {
                this.formInline.deptName = row.zuHuName
                this.formInline.deptGuid = row.guid
            },
            handleSizeChange() {
            },
            handleCurrentChange() {
            },
            async saveFunc() {
                console.log(this.userGuid ,this.saveId )
                this.saveLoading = true;
                if (this.pageStatus == 2 || this.userGuid || this.saveId) {//编辑
                    const result = await this.portService.userInfoUpdate(this.formInline)
                    if (result && result.code == 1) {
                        this.saveLoading = false;
                        this.$message.success(result.info)
                    }
                } else {//保存
                    const result = await this.portService.userInfoSave(this.formInline)
                    if (result && result.code == 1) {
                        this.saveLoading = false;
                        this.$message.success(result.info)
                        this.formInline.user_Guid = result.data.user_Guid
                        this.saveId = result.data.user_Guid
                    }
                }
            },
            async openRoleDialog() {
                if (!this.userGuid && !this.saveId) {
                    this.$message.warning("请先保存用户信息！")
                } else {
                    let guids='',arr=[]
                    if (this.roleTable.length > 0) {
                        this.roleTable.forEach(item => {
                            arr.push(item.guid)
                        })
                        guids=arr.join()
                    }
                    this.$refs.RoleListDialog.openDialog(this.userGuid || this.saveId,guids)
                }
            },
            async delFunc(id) {
                const result = await this.portService.roleDelByUser({
                    user_Guid: this.userGuid || this.saveId,
                    roleGuid: id
                })
                if (result && result.data) {
                    this.getRoleList()
                }
            }
        },

    };
</script>
<style lang="scss" scoped>
    .no-show-pas {
        ::v-deep.el-input__suffix {
            display: none;
        }
    }
</style>
