<template>
    <div id="mian" class=" page-detail">
        <div class="global-title">
            <PageCrumb :d="{ breadcrumbList: breadcrumbList }">
                <div slot="btns">
                    <el-button v-if="!isRead" type="primary" @click="handleSaveRules" size="small">保存</el-button>
                    <el-button @click="$router.go(-1)" size="small">返回</el-button>
                </div>
            </PageCrumb>
            <!-- <div class="page-crumb clearfix">
              <i class="crumb-icon iconfont icon-shouye"></i>
              <el-breadcrumb class=" breadcrumb" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/userAndQxManage/userManageTable' }">用户及权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理-分配权限</el-breadcrumb-item>
              </el-breadcrumb>
            </div> -->
            <!-- <div class="global-title-box">
              <span class="global-title-name">供应商专业信息</span>
              <div class="global-title-btns fr">
                  <el-button type="primary" @click="handleSaveRules" size="small">保存</el-button>
                  <el-button @click="$router.go(-1)" size="small">返回</el-button>
              </div>
            </div> -->
        </div>
        <div class="global-content">
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">分配权限</span>
                </div>
                <div class="global-card-content">
                    <el-form :model="formData" :rules="rules" ref="formData" size="small" label-width="120px"
                             label-position="right">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="角色名称:" prop="roleName">
                                    <el-input placeholder="请输入角色名称" v-model="formData.roleName" readonly
                                              :disabled="isRead"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否有效:" required prop="isYouXiao">
                                    <el-radio-group v-model="formData.isYouXiao" :disabled="isRead">
                                        <el-radio label="1">有效</el-radio>
                                        <el-radio label="0">无效</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="分配权限:" prop="authGuid">
                                    <Tree
                                            :nodes="rulesNodes"
                                            v-model="formData.authGuid"
                                            :checkeds="formData.authGuid ? formData.authGuid.split(',') : []"
                                            :defaultProps="{ children: 'children', label: 'name' }"
                                            treeId="id"
                                            v-if="loaded"
                                            placehoder="请选择树状权限菜单"
                                            :height="'450px'"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="查看部门项目:">
                                    <el-radio-group v-model="formData.viewBuMenXM" :disabled="isRead">
                                        <el-radio label="1">具备</el-radio>
                                        <el-radio label="0">不具备</el-radio>
                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                            <div slot="content">若设置具备查看部门项目，则该角色可以查看对应部门下的其他项目</div>
                                            <span style="display:inline-block;margin-right:10px"><img
                                                    src="@/assets/help.png" alt=""/></span>
                                        </el-tooltip>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12"
                            >
                                <el-form-item label="查看部门:" prop="suoZaiBuMen"
                                              v-if="formData.viewBuMenXM == 1 || $store.state.logoType == 2">
                                    <el-checkbox-group v-model="formData.suoZaiBuMen" :disabled="isRead">
                                        <el-checkbox label="A">所在部门</el-checkbox>
                                        <el-checkbox label="B">其他部门</el-checkbox>
                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                            <div slot="content">勾选所在部门，则查看所在部门的对应项目，勾选其他部门，需要选择该角色可查看的部门</div>
                                            <span style="display:inline-block;margin-right:10px"><img
                                                    src="@/assets/help.png" alt=""/></span>
                                        </el-tooltip>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="选择查看部门:" prop="deptGuids" required
                                              v-if="formData.suoZaiBuMen.includes('B')">
                                    <!-- <Tree
                                  :nodes="nodes"
                                  v-model="formData.deptGuids"
                                  :checkeds="formData.deptGuids ? formData.deptGuids.split(','):[]"
                                  :defaultProps="{ children: 'children', label: 'departName' }"
                                  treeId="departGuid"
                                  v-if="treeed && loaded"
                                  placehoder="请选择"
                                /> -->
                                    <Tree
                                            :nodes="nodes"
                                            :showCheckbox="true"
                                            :checkeds="typeof formData.deptGuids === 'string' ? formData.deptGuids.split(',') : formData.deptGuids"
                                            v-model="formData.deptGuids"
                                            treeId="departGuid"
                                            nodeKey="departGuid"
                                            refName="departName"
                                            v-if="treeed && loaded"
                                            :defaultProps="{ children: 'children', label: 'departName' }"
                                    />
                                    <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                        <div slot="content">
                                            此处数据，需要由被监督企业在其<span style="color:yellow">企<br/>业控制台--"监督管理"--"监督单位设<br/>置"</span>
                                            中，将您的公司添加为上级监督单<br/>位后才可选择
                                        </div>
                                        <span style="display:inline-block;position:absolute;right:-30px;top:0"><img
                                                src="@/assets/help.png" alt=""/></span>
                                    </el-tooltip>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item prop="viewQiTaQiYe" label="其他企业项目:" required>
                                    <el-radio-group v-model="formData.viewQiTaQiYe" :disabled="isRead">
                                        <el-radio label="1">具备</el-radio>
                                        <el-radio label="0">不具备</el-radio>
                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">
                                            <div slot="content">若设置具备监督其他企业项目，<br/>则该角色可在<span
                                                    style="color:yellow">监督平台</span> 查看下方<br/>所选择的可监督企业的对应项目
                                            </div>
                                            <span style="display:inline-block;margin-right:10px"><img
                                                    src="@/assets/help.png" alt=""/></span>
                                        </el-tooltip>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="项目类型:" prop="xmLeiXing" v-if="formData.viewQiTaQiYe == 1">
                                    <el-checkbox-group v-model="formData.xmLeiXing" :disabled="isRead">
                                        <el-checkbox label="0">工程</el-checkbox>
                                        <el-checkbox label="1">物资</el-checkbox>
                                        <el-checkbox label="2">服务</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" v-if="formData.viewQiTaQiYe == 1">
                            <el-col :span="24">
                                <el-form-item label="选择查看企业:" prop="qiYeGuids" style="position: relative;">
                                    <span style="color: #F56C6C; position: absolute;left:-110px; top: 3px">*</span>
                                    <el-input style="display:none" v-model="formData.qiYeGuids" type="style"></el-input>
                                    <el-input v-model="formData.qiYeNames" readonly placeholder="请选择企业"
                                              @focus="handleShowEnterPreiseSelector"></el-input>
                                </el-form-item
                                >
                            </el-col>
                        </el-row>
                        <!--                        <el-row :gutter="20">-->
                        <!--                            <el-col>-->
                        <!--                                <el-form-item label="评标复核权限:">-->
                        <!--                                    <el-radio-group v-model="formData.isHasPBFuHeQuanXian" :disabled="isRead">-->
                        <!--                                        <el-radio label="1">具备</el-radio>-->
                        <!--                                        <el-radio label="0">不具备</el-radio>-->
                        <!--                                        <el-tooltip placement="top" v-if="$store.state.logoType == 1">-->
                        <!--                                            <div slot="content">勾选所在部门，则查看所在部门的对应项目，勾选其他部门，需要选择该角色可查看的部门</div>-->
                        <!--                                            <span style="display:inline-block;"><img src="@/assets/help.png"-->
                        <!--                                                                                     alt=""/></span>-->
                        <!--                                        </el-tooltip>-->
                        <!--                                    </el-radio-group>-->
                        <!--                                </el-form-item>-->
                        <!--                            </el-col>-->
                        <!--                        </el-row>-->
                        <el-row :gutter="20">
                            <el-col>
                                <el-form-item label="归档查看范围:">
                                    <el-radio-group v-model="formData.guiDangViewFanWei" :disabled="isRead">
                                        <el-radio :label="3">所在公司</el-radio>
                                        <el-radio :label="2">所在部门</el-radio>
                                        <el-radio :label="1">个人</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <!-- 用户列表 -->

            <el-card v-if="!isRead">
                <div slot="header" class="clearfix">
                    <span class="global-card-header-name">分配用户</span>
                    <el-tooltip placement="top">
                        <div slot="content">此处可直接将角色关联至组织架构的用户上</div>
                        <span style="display:inline-block;margin-left:20px"><img src="@/assets/help.png" alt=""/></span>
                    </el-tooltip>
                    <el-button type="primary" style="float: right;" size="small" @click="handleAddUserShow">添加
                    </el-button>
                </div>
                <div class="global-card-content">
                    <self-table border :data="formData.jyUserList" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="user_Name" label="姓名" width="120"></el-table-column>
                        <el-table-column prop="user_BH" label="身份证号码" min-width="120" align="left"></el-table-column>
                        <el-table-column prop="deptName" label="所属部门"></el-table-column>
                        <el-table-column prop="roleName" label="所属角色"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="left">
                            <template slot-scope="scope">
                                <el-button-group class="operation-button-group">
                                    <el-button @click="handleDelUser(scope.row.user_Guid)" type="info" plain
                                               class="operation-button" size="small"
                                    ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button
                                    >
                                </el-button-group>
                            </template>
                        </el-table-column>
                        <div slot="empty" class="custom-empty"></div>
                    </self-table>
                </div>
            </el-card>
        </div>
        <!--选择企业弹出 -->
        <el-dialog title="选择查看企业" :append-to-body="true" :visible.sync="selectEnterpriseVisible" width="950"
                   :before-close="handleClose">
            <div>
                <div class="table_header">
                    <el-form label-position="right" label-width="70px" :model="enterPriseForm" ref="enterPriseForm"
                             size="small">
                        <el-row :gutter="20">
                            <el-col :span="10"
                            >
                                <el-form-item width="50px" label="企业名称">
                                    <el-input class="form_w" v-model="enterPriseForm.zbrName"
                                              placeholder="请输入"></el-input>
                                </el-form-item
                                >
                            </el-col>
                            <el-col :span="10"
                            >
                                <el-form-item width="50px" label="企业代码">
                                    <el-input class="form_w" v-model="enterPriseForm.zbrBh"
                                              placeholder="请输入"></el-input>
                                </el-form-item
                                >
                            </el-col>
                            <el-col :span="4">
                                <el-button type="primary" @click="handleSearchEnterPrise" size="small">搜索</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-table ref="enterPriseTable" :data="tableData" border tooltip-effect="dark" height="350px"
                          @selection-change="handleSelectionChange">
                    <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
                    <el-table-column prop="qiYe_Name" label="企业名称" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qiYe_BH" label="企业代码" min-width="120"></el-table-column>
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <div slot="empty" class="custom-empty"></div>
                </el-table>
                <div>
                    <v-pagination
                            :total="enterPriseForm.total"
                            :page="enterPriseForm.page"
                            :limit="enterPriseForm.rows"
                            v-if="enterPriseForm.total > 0"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                    ></v-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleCommitEnterprise" size="small">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 选择用户弹出 -->
        <el-dialog title="选择分配用户" :append-to-body="true" :visible.sync="selectUserVisible" width="950px"
                   :before-close="handleUserClose">
            <div class="selectbox">
                <div class="selectbox_search">
                    <el-form size="small" label-width="80px" :model="userFrom" ref="userFrom" label-position="right">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="姓名">
                                    <el-input type="text" v-model="userFrom.userName" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="所属部门">
                                    <Tree :nodes="nodes" v-model="userFrom.deptGuid" :showCheckbox="false" objed
                                          refName="deptTree" treeId="departGuid"></Tree>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-button size="small" @click="handleSeachUser" type="primary">搜索</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <self-table :data="userList" style="width: 100%" height="350" border ref="userTable"
                            @selection-change="handleUserSelectionChange" @select="handleSelect">
                    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="user_Name" label="姓名"></el-table-column>
                    <el-table-column prop="user_BH" label="身份证号码" min-width="120" align="left"></el-table-column>
                    <el-table-column prop="deptName" label="所属部门"></el-table-column>
                    <el-table-column type="selection" label="" width="50" align="center"></el-table-column>
                    <div slot="empty" class="custom-empty"></div>
                </self-table>
                <VPagination
                        :total="userFrom.total"
                        :page="userFrom.page"
                        :limit="userFrom.rows"
                        v-if="userFrom.total > 0"
                        @size-change="handleUserSizeChange"
                        @current-change="handleUserCurrentChange"
                ></VPagination>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="handleUserClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAddUser" size="small">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import Tree from "@/components/tree/Tree";
    import {
        saveRules,
        getRules,
        getUserList,
        getAthDetail,
        getEnterpriseListsFn,
        getDepartment,
        getAllQiYe,
        getAuthTreeByRole
    } from "@/service/roleAndDepartment";
    // import { getEnterPriseList } from '@/service/enterpriseInfo'
    // import SelectEnterprise from './dailog/selectEnterprise'
    import VPagination from "@/components/VPagination";
    import PageCrumb from "@/components/PageCrumb";

    export default {
        data() {
            const validateDepGuids = (rule, value, callback) => {
                if (this.formData.suoZaiBuMen.includes("B")) {
                    if (!value) {
                        return callback(new Error("请选择查看部门"));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                loaded: false,
                treeed: false,
                selectEnterpriseVisible: false,
                selectUserVisible: false,
                formData: {
                    jyUserList: [],
                    authsId: "",
                    roleGuid: "",
                    roleName: "",
                    authGuid: "",
                    viewBuMenXM: "1",
                    suoZaiBuMen: ["A"],
                    viewQiTaQiYe: "0",
                    qiYeGuids: "",
                    isYouXiao: "1",
                    deptGuids: "",
                    xmLeiXing: ["0", "1", "2"],
                    // isHasPBFuHeQuanXian: "0",
                    guiDangViewFanWei: "",
                    userList: [], //已经选择人员列表
                },
                qiYeNames: "",
                tableData: [],
                // 选择人员列表
                userList: [],
                rulesNodes: [],
                nodes: [],
                userFrom: {
                    page: 1,
                    rows: 10,
                    total: 0,
                    userName: "",
                    deptGuid: "",
                },
                usersSelection: [],
                copyUsersSelection: [],
                enterPriseSelection: [],
                copyEnterPriseSelection: [],
                enterPriseForm: {
                    zbrName: "",
                    zbrBh: "",
                    page: 1,
                    rows: 10,
                    total: 0,
                },
                rules: {
                    authGuid: [{required: true, message: "请选择权限", trigger: "change"}],
                    deptGuids: [{validator: validateDepGuids, trigger: "change"}],
                    viewQiTaQiYe: [],
                    isYouXiao: [],
                    xmLeiXing: [{required: true, message: "请选择项目类型", trigger: "change"}],
                    // qiYeGuids: [
                    //   { required: true, message: '请选择查看企业', trigger: 'change' }
                    // ],
                    userList: [],
                },
                breadcrumbList: [
                    {label: "角色管理", link: "/userAndQxManage/userManageTable"},
                    {label: "分配权限", link: ""},
                ],
                treeIdsArr: []//全树的id集合（用来排查返回的ids不在树里面）
            };
        },
        created() {
            if (this.isRead) {//查看进来和分配权限进来 调不同接口
                getAuthTreeByRole({roleGuid: this.$route.query.id})
                    .then((res) => {
                        this.rulesNodes = this.addDis(res)//设置disabled
                        this.getDetail()
                    }).catch((e) => {
                    console.error(e);
                });
            } else {
                getRules().then((res) => {
                    this.rulesNodes = res
                    this.getDetail()
                }).catch((e) => {
                    console.error(e);
                });
            }

            getDepartment().then((res) => {
                this.nodes = res;
                this.treeed = true;
            });
        },
        computed: {
            // selnodes () {
            //   return this.$store.state.roleAnddepartment.department
            // }
            isRead() {//点击查看进来的
                return this.$route.query.readOnly == 'readOnly'
            }
        },
        components: {
            Tree,
            VPagination,
            PageCrumb,
        },
        methods: {
            addDis(orign) {//给每一项加disabled
                orign.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        item.disabled = true
                        this.addDis(item.children)
                    } else {
                        item.disabled = true
                    }
                })
                return orign
            },
            getDetail() {
                getAthDetail({guid: this.$route.query.id})
                    .then((res) => {
                        if (res.code === 1) {
                            const datas = JSON.parse(JSON.stringify(res.data));
                            datas.suoZaiBuMen = !datas.suoZaiBuMen ? ["A"] : datas.suoZaiBuMen.split(",");
                            datas.xmLeiXing = !datas.xmLeiXing ? ["0", "1", "2"] : datas.xmLeiXing.split(",");
                            datas.viewBuMenXM = datas.viewBuMenXM ? datas.viewBuMenXM : "1";
                            datas.viewQiTaQiYe = datas.viewQiTaQiYe ? datas.viewQiTaQiYe : "0";
                            datas.isYouXiao = datas.isYouXiao ? datas.isYouXiao : "1";
                            // datas.isHasPBFuHeQuanXian = datas.isHasPBFuHeQuanXian ? datas.isHasPBFuHeQuanXian : "0";
                            datas.authGuid = datas.authGuid.join(",");
                            datas.userList = datas.userList ? datas.userList : [];

                            this.formData = Object.assign(this.formData, datas);
                            this.usersSelection = JSON.parse(JSON.stringify(datas.jyUserList));

                            this.loaded = true;
                        }
                        this.loaded = true;
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            },
            handleSelect(e, r) {
                if (e.length < this.usersSelection.length) {
                    this.handleDelUser(r.user_Guid);
                }
            },
            handleDelUser(guid) {
                const list = this.formData.jyUserList;
                const uidList = this.formData.userList;
                this.formData.jyUserList = list.filter((i) => {
                    if (i.user_Guid !== guid) {
                        return i;
                    }
                });
                this.formData.userList = uidList.filter((i) => {
                    if (i !== guid) {
                        return i;
                    }
                });
            },
            handleAddUser() {
                const uListIds = this.formData.userList;
                const jyUserListIds = this.formData.jyUserList.map((i) => i.user_Guid);
                this.copyUsersSelection = [...this.copyUsersSelection, ...this.usersSelection];
                const usersSelectionId = this.copyUsersSelection.map((i) => i.user_Guid);
                this.formData.userList = Array.from(new Set([...uListIds, ...usersSelectionId]));
                this.usersSelection.forEach((i) => {
                    if (!jyUserListIds.includes(i.user_Guid)) {
                        this.formData.jyUserList.push(i);
                    }
                });
                this.handleUserClose();
            },
            handleSaveRules() {
                let data = JSON.parse(JSON.stringify(this.formData));
                if (data.qiYeGuids && data.viewQiTaQiYe === 1) {
                    this.$message.warning("请添加企业");
                    return;
                }
                // if (data.userList.length === 0) {
                //   this.$message.warning('请添加用户')
                //   return
                // }
                this.treeIdsArr = []
                this.getIds(this.rulesNodes)
                let authGuidArr = data.authGuid.split(",")
                let newGuid = authGuidArr.filter(v => this.treeIdsArr.indexOf(v) != -1)//去掉树中没有的guid
                data.suoZaiBuMen = data.suoZaiBuMen.join(",");
                data.xmLeiXing = data.xmLeiXing.join(",");
                // data.authGuid = data.authGuid.split(",");
                data.authGuid = newGuid;
                data.roleGuid = this.$route.query.id;
                data.userList = data.jyUserList.map((i) => i.user_Guid);
                saveRules(data)
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success(res.info);
                            this.$router.push({path: "/userAndQxManage/userManageTable"});
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            },
            // 获得企业列表
            getEnterpriseList() {
                this.copyEnterPriseSelection = [...this.enterPriseSelection];
                getEnterpriseListsFn(this.enterPriseForm)
                    .then((res) => {
                        if (res.code === 1) {
                            this.tableData = res.data.rows;
                            this.enterPriseForm.total = res.data.total;
                            const arr = this.formData.qiYeGuids.split(",");
                            if (arr.length) {
                                setTimeout(() => {
                                    this.tableData.forEach((e) => {
                                        if (arr.includes(e.userQiYe_Guid)) {
                                            this.$refs.enterPriseTable.toggleRowSelection(e, true);
                                        }
                                        // this.$refs.userTable.toggleRowSelection(user, true)
                                    });
                                });
                            }
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            },
            // 搜索企业
            handleSearchEnterPrise() {
                this.getEnterpriseList();
            },
            // 关闭选择企业弹出
            handleClose(done) {
                this.selectEnterpriseVisible = false;
            },
            handleCommitEnterprise() {
                this.handleClose();
                this.formData.qiYeGuids = this.enterPriseSelection.map((i) => i.userQiYe_Guid).join(",");
                this.formData.qiYeNames = this.enterPriseSelection.map((i) => i.qiYe_Name).join(",");
            },
            handleShowEnterPreiseSelector() {
                this.userFrom.total = 0;
                this.userFrom.page = 1;
                this.userFrom.rows = 10;
                this.handleSearchEnterPrise();
                this.selectEnterpriseVisible = true;
            },
            // 选择企业
            handleSelectionChange(val) {
                this.enterPriseSelection = val;
            },
            // 关闭选择用户弹窗
            handleUserClose() {
                this.selectUserVisible = false;
                this.$refs.userTable && this.$refs.userTable.$ref.selfTable.clearSelection();
                this.usersSelection = [];
            },
            // 显示添加用户弹出
            handleAddUserShow() {
                this.selectUserVisible = true;
                this.userFrom.total = 0;
                this.userFrom.page = 1;
                this.userFrom.rows = 10;
                this.handleSeachUser();
            },
            // 搜索用户
            handleSeachUser() {
                this.getUsers();
            },

            // 选择用户的收集器
            handleUserSelectionChange(data) {
                this.usersSelection = data;
                console.log("便哈哈哈");
            },
            // 用户选择器分页
            handleUserSizeChange(data) {
                this.userFrom.rows = data;
                this.getUsers();
            },
            handleUserCurrentChange(data) {
                this.userFrom.page = data;
                this.getUsers();
            },
            // 获取用户选择器的用户列表数据
            getUsers() {
                this.copyUsersSelection = [...this.usersSelection];
                getUserList(this.userFrom).then((res) => {
                    this.userList = res.rows;
                    const t = this.formData.userList;
                    const arr = typeof t === "string" ? t.split(",") : t;
                    if (arr.length) {
                        setTimeout(() => {
                            this.userList.forEach((user) => {
                                if (arr.includes(user.user_Guid)) {
                                    this.$refs.userTable.toggleRowSelection(user, true);
                                } else {
                                    console.log(1);
                                }
                                // this.$refs.userTable.toggleRowSelection(user, true)
                            });
                        });
                    }
                    this.userFrom.total = res.total;
                });
            },
            handleSizeChange(data) {
                this.enterPriseForm.rows = data;
                this.getEnterpriseList();
            },
            handleCurrentChange(data) {
                this.enterPriseForm.page = data;
                this.getEnterpriseList();
            },
            //递归取树的id集合
            getIds(data) {
                data.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        this.treeIdsArr.push(item.id)
                        this.getIds(item.children)
                    } else {
                        this.treeIdsArr.push(item.id)
                    }
                })
            }
        },
    };
</script>

<style lang="scss" scoped>
    // .el-tooltip {
    //   position: absolute;
    //   right: -23px;
    //   top: 0;
    // }
    .el-card {
        overflow: visible;
    }

    .table_header {
        height: 80px;
        border-top: 1px solid #eee;
        padding-top: 20px;
    }

    .zbrdbAddContent {
        margin: 5px 4px;

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

        h3 {
            width: calc(100% - 40px);
            height: 54px;
            margin: 0 auto;
            color: #333;
            font-size: 16px;
            line-height: 55px;
        }

        .userInfoDiv {
            padding-bottom: 0;

            .bottomLine {
                margin-bottom: 20px;
            }

            .zbrdbForm {
                width: calc(100% - 40px);
                margin: 0 auto;

                ::v-deep.el-form-item {
                    // width: 50%;
                    height: 32px;
                    margin-bottom: 30px;
                    margin-right: 0;

                    .el-form-item__content {
                        width: calc(100% - 120px);

                        .el-input {
                            width: 100%;

                            .el-input__inner {
                                width: 100%;
                            }
                        }

                        .el-select {
                            width: 100%;
                        }
                    }
                }

                ::v-deep.el-form-item:nth-child(3),
                ::v-deep.el-form-item:nth-child(6),
                ::v-deep.el-form-item:nth-child(9) {
                    width: 100%;
                }
            }
        }

        .topDiv {
            width: calc(100% - 40px);
            height: 54px;
            margin: 0 auto;

            ul {
                overflow: hidden;
                width: 100%;
                height: 54px;

                li {
                    float: left;
                    width: 50%;
                    height: 54px;
                    line-height: 54px;

                    h3 {
                        width: 100%;
                        color: #333;
                        font-size: 16px;
                    }
                }

                li:last-child {
                    text-align: right;

                    ::v-deep.el-button {
                        height: 32px !important;
                        line-height: 4px;
                    }
                }
            }
        }

        ::v-deep.el-table {
            margin-bottom: 20px !important;

            .cell {
                padding: 0;
                font-size: 14px;
            }

            .el-button {
                color: #f00;
            }
        }
    }

    .selectbox {
        overflow: hidden;

        .selectbox_search {
            height: 80px;
            padding: 20px 0px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
    }

    #mian .zbrdbAddContent .userInfoDiv .zbrdbForm .el-form-item .el-form-item__label {
        width: 120px !important;
    }

    .page-crumb {
        height: 52px;
        line-height: 51px;
        position: relative;
        /*border-bottom: 1px solid #d8dde8;*/
        /*box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);*/
        .crumb-icon {
            position: absolute;
            top: 50%;
            transform: translate(0%, -50%);
            left: 15px;
            font-size: 16px;
        }

        .breadcrumb {
            padding-left: 40px;
            line-height: 50px;
        }
    }
</style>
