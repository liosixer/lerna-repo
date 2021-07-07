<template>
    <div class="userlist-content">
        <div class="content_title">
            <h3>
                {{ $store.state.roleAnddepartment.currentDepartment["departName"] }}
            </h3>
            <div class="content_title_con">
                <el-button type="text" size="small" @click="handleShowDialog('showModifyName', 1)">修改名称</el-button>
                <span>|</span>
                <el-button type="text" size="small" @click="handleShowDialog('showAddChildDepartment', 0)">添加子部门
                </el-button>
            </div>
        </div>
        <div>
            <div class="content-btns clearfix">
                <div class="fr">
                    <el-button type="primary" size="small" @click="handleAddOrEidtUser">添加成员</el-button>
                    <el-button type="primary" size="small" @click="handleDelUsers(multipleSelection)">删除</el-button>
                    <import-up style="margin: -2px 10px 0 10px" :upUrl="upUrl" :paramData="paramData"
                               @uploadSuccess="_getUserList"></import-up>
                    <el-button type="primary" size="small" @click="handleDownTemp()">下载模板</el-button>
                </div>

            </div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border
                      v-loading="loading" @selection-change="handleSelectionChange">
                <template slot="empty" v-if="$store.state.logoType == 1">
                    <div>当前部门暂无成员，请您点击<span style="color:blue">“添加成员”</span> 按钮进行添加</div>
                    <div>
                        添加成员后，即可使用成员账号登录采购子系统进行招标采购相关工作
                    </div>
                </template>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column prop="user_Name" label="姓名"></el-table-column>
                <el-table-column prop="deptName" label="部门"></el-table-column>
                <el-table-column prop="shenfen" label="身份">
                    <template slot-scope="scope">
                        {{ senfenArr[scope.row.shenfen - 1] }}
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="userSign" label="用户签名">
                    <template slot-scope="scope">
                        <p v-if="scope.row.userSign">是</p>
                        <p v-else>否</p>
                    </template>
                </el-table-column>
                <el-table-column prop="user_Phone" label="手机号码" width="120" align="right"></el-table-column>
                <el-table-column label="操作" min-width="220" align="left" fixed="right">
                    <template slot-scope="scope">
                        <el-button-group class="operation-button-group">
                            <el-button @click="handleAddOrEidtUser(scope.row)" type="primary" plain
                                       class="operation-button" size="mini"
                            ><i class="iconfont icon-bianji2"><span>编辑</span></i></el-button
                            >
                            <el-button type="primary" plain class="operation-button" size="mini"
                                       @click="handleAsign(scope.row)"
                            ><i class="iconfont icon-fenpeiquanxian-copy"><span>分配权限</span></i></el-button
                            >
                            <el-button type="info" plain class="operation-button"
                                       @click="handleDelUsers(scope.row.user_Guid,scope.row.isSupervisor)" size="mini"
                            ><i class="iconfont icon-shanchu1"><span>删除</span></i></el-button
                            >
                        </el-button-group>
                    </template>
                </el-table-column>
                <div slot="empty" class="custom-empty"></div>
            </el-table>
            <div class="com-table-pagination clearfix">
                <v-pagination :total="total" :page="page" :limit="limit" v-if="total > 0"
                              @size-change="handleSizeChange" @current-change="handleCurrentChange"></v-pagination>
            </div>
        </div>
        <!-- 导入模板弹窗 -->
        <el-dialog :title="tipTitle[index]" :visible.sync="dialogVisible" width="500px" :append-to-body="true"
                   :closeOnClickModal="false">
            <div>
                <p style="padding-bottom: 10px;">部门名称</p>
                <el-input v-if="showModifyName" type="text" size="small" placeholder="请输入"
                          v-model="currentDepartment.departName"></el-input>
                <el-input v-if="showAddChildDepartment" type="text" size="small" placeholder="请输入"
                          v-model="childName"></el-input>
                <p v-if="errTip.trim()">{{ errTip }}</p>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="handlePopCancel" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handlePopOK">确 定</el-button>
      </span>
        </el-dialog>
        <RoleList :show="showAssign" @showEvent="handleShowEvent" :guid="guid" :roleIds="roleIds" ref="roleList"/>

        <!-- 设置子部门 -->
    </div>
</template>

<script>
    import {getUserList, delUser, addSubDepartment, updateDepartment} from "@/service/roleAndDepartment";
    import VPagination from "@/components/VPagination";
    import RoleList from "./RoleList";
    import ImportUp from "../../../components/ImportUp";
    import config from "../../../config/config";
    import util from "../../../utils/util";

    export default {
        data() {
            return {
                errTip: "",
                multipleSelection: [], // 选中的用户信息
                dialogVisible: false,
                showInport: false,
                showModifyName: false,
                showAddChildDepartment: false,
                showAssign: false,
                tipTitle: ["添加子部门", "修改名称"],
                senfenArr: ["普通成员", "部门负责人"],
                index: 0,
                tableData: [],
                guid: "",
                loading: true,
                childName: "", // 子部门名称，添加
                currentDepartment: {},
                total: 0,
                page: 1,
                limit: 10,
                roleIds: [],
                paramData: ''
            };
        },
        created() {
            // this.$store.commit('setCurrentDepartment', {})
            this._getUserList();
        },
        components: {
            RoleList, ImportUp
        },
        computed: {
            department() {
                return this.$store.state.roleAnddepartment.currentDepartment;
            },
            upUrl() {
                return "/qykzt/user/improtUserExcel"
            }
        },
        methods: {
            handleSizeChange(data) {
                this.limit = data;
                this._getUserList();
            },
            handleCurrentChange(data) {
                this.page = data;
                this._getUserList();
            },
            handlePopCancel() {
                this.dialogVisible = false;
                this.childName = "";
            },
            handlePopOK() {
                if (this.showModifyName) {
                    this._modifyDepartment();
                } else {
                    this._addSubDepartment();
                }
            },
            _modifyDepartment() {
                let data = {
                    deptBh: "",
                    deptName: this.currentDepartment.departName,
                    parentGuid: "",
                    lianXiRen: "",
                    guid: this.department.departGuid,
                    beiZhu: "",
                };
                if (data.deptName) {
                    updateDepartment(data)
                        .then((res) => {
                            if (res.code === 1) {
                                this.$store.dispatch("getDepartmentData");
                                this.$message.success("修改部门成功");
                            } else {
                                this.$message.error("修改部门失败");
                            }
                            this.dialogVisible = false;
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                } else {
                    this.$message.warning("请输入部门名称");
                }
            },
            _addSubDepartment() {
                let data = {
                    deptName: this.childName,
                    parentGuid: this.department.departGuid || 0,
                };
                if (data.deptName) {
                    addSubDepartment(data)
                        .then((res) => {
                            if (res.message === "添加成功") {
                                this.$store.dispatch("getDepartmentData");
                                this.$message.success("添加部门成功");
                            } else {
                                this.$message.error("添加部门失败");
                            }
                            this.dialogVisible = false;
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                } else {
                    this.$message.warning("请输入部门名称");
                }
            },
            _getUserList() {
                this.loading = true;
                const deptGuid = this.department.departGuid || "";
                getUserList({page: this.page, rows: this.limit, deptGuid}).then((res) => {
                    this.tableData = res.rows;
                    this.total = res.total;
                    this.loading = false;
                });
            },
            // 控制角色分配弹出传参
            handleAsign(data) {
                this.guid = data.user_Guid;
                this.roleIds = data.roleGuid ? data.roleGuid.split(",") : [];
                this.$refs.roleList.copyUserRoleIds = data.roleGuid ? data.roleGuid.split(",") : [];
                this.showAssign = !this.showAssign;
            },
            // 角色坦诚回调
            handleShowEvent(data, bol) {
                this.showAssign = data;
                if (bol) {
                    this._getUserList();
                }
            },
            // 表格选择
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 添加用户
            handleAddOrEidtUser(data) {
                if (data) {
                    return this.$router.push({
                        name: "zzjgAdd",
                        query: {id: data.user_Guid, did: data.deptGuid},
                    });
                }
                this.$router.push({name: "zzjgAdd"});
            },
            handleDelUsers(guid, isSup) {//第二个参数为了判断是否在监督人列表
                let ids = typeof guid === "string" ? guid : guid.map((item) => item.user_Guid).join(",");
                if (typeof guid === "string") {
                    if (isSup) {
                        this.$confirm("当前人员在监督人员列表中也存在，是否删除？", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        }).then(() => {
                            this._delUserHandle(ids);
                        });
                    } else {
                        this._delUserHandle(ids);
                    }
                } else {
                    if (!this.selectionsConform(ids)) {
                        this.$message({
                            type: "warning",
                            message: "请至少选择一条记录！",
                        });
                        return;
                    }
                    if (guid.every(v => v.isSupervisor == false)) {
                        this._delUserHandle(ids);
                    } else {
                        this.$confirm("当前人员在监督人员列表中也存在，是否删除？", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        }).then(() => {
                            this._delUserHandle(ids);
                        });
                    }
                }
            },
            _delUser(guids) {
                delUser({userGuids: guids})
                    .then((res) => {
                        if(res&&res.code==1){
                            this._getUserList();
                        }
                    })
                    // .then(() => {
                    //     this.$message({
                    //         type: "success",
                    //         message: "删除成功!",
                    //     });
                    // });
            },
            _delUserHandle(ids) {
                // this.$confirm("删除后将不能恢复数据, 是否继续?", "提示", {
                //     confirmButtonText: "确定",
                //     cancelButtonText: "取消",
                //     type: "warning",
                // }).then(() => {
                this._delUser(ids);
                // });
            },
            // 导入用户
            handleShowDialog(name, index) {
                this.showModifyName = false;
                this.showInport = false;
                this.showAddChildDepartment = false;
                this[name] = true;
                this.index = index;
                this.dialogVisible = true;
            },
            // 上传文件发生变化
            handelFileChange(e) {
                let data = new FormData();
                let file = this.$refs.file.files[0];
                data.append("file", file);
            },
            // 删除
            handleDel(data) {
                if (this.selectionsConform(data)) {
                    alert(this.selectionsConform(data));
                }
            },
            // 判断是否有选择
            selectionsConform(data) {
                return data.length > 0;
            },
            // 批量导出
            handleExport(data) {
                if (this.selectionsConform(data)) {
                    alert(this.selectionsConform(data));
                }
            },
            //批量导入
            handleBatchEnter() {

            },
            //下载模板
            handleDownTemp() {
                window.location.href = `${config.fileDownUrl}/qykzt/user/exportUserExcel`
            },
        },
        watch: {
            department: {
                immediate: true,
                handler(data) {
                    this.currentDepartment = JSON.parse(JSON.stringify(data));
                    this.paramData = {deptGuid: this.currentDepartment.departGuid}
                }
            },
            "$store.state.roleAnddepartment.currentDepartment": {
                handler(data) {
                    if (this.$route.path === "/userAndQxManage/zzjg/list") {
                        this._getUserList();
                    }
                },
                deep: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .userlist-content {
        background: #fff;
    }

    .content_title {
        height: 50px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        width: 100%;

        h3 {
            font-size: 16px;
            font-weight: normal;
        }

        span {
            padding: 0px 5px;
            color: #666;
            opacity: 0.3;
        }
    }

    .content-btns {
        padding: 10px;
        background: #dfeffa;
        border: 1px solid #f4f5f9;
    }
</style>
