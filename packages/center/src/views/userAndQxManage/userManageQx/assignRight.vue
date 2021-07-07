<template>
  <div id="mian" class="container fenpei">
    <div class="page-crumb clearfix">
      <i class="crumb-icon iconfont icon-shouye"></i>
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item :to="{ path: '/userAndQxManage/userManageTable' }">角色权限</el-breadcrumb-item>
        <el-breadcrumb-item>分配权限</el-breadcrumb-item>
      </el-breadcrumb>
      <div slot="btns">
        <el-button v-if="$route.query.type != 'look'" type="primary" @click="handleSaveRules" size="small" :loading="loading">保存</el-button>
        <el-button @click="$router.go(-1)" size="small">返回</el-button>
      </div>
    </div>

    <div class="global-content global-clear-bg">
      
      <div class="zbrdbAddContent">
        <div class="userInfoDiv">
          <h3>分配权限</h3>
          <div class="bottomLine"></div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="formData"
            class="zbrdbForm"
            size="small"
            label-width="130px"
            :disabled="$route.query.type == 'look'"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="角色名称:" prop="roleName">
                  <el-input disabled placeholder="请输入角色名称" v-model="formData.roleName" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有效" prop="roleZhuangTai">
                  <el-select v-model="formData.roleZhuangTai" placeholder="请选择">
                    <el-option
                      v-for="item in optionsZhuangtai"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-radio-group v-model="formData.roleZhuangTai">
                    <el-radio :label="1">有效</el-radio>
                    <el-radio :label="0">无效</el-radio>
                  </el-radio-group> -->
                </el-form-item>
                <!-- <el-form-item label="创建时间:" prop="createTime">
                  <el-input
                    placeholder="自动获取"
                    disabled
                    :value="formData.createTime | timestampChange"
                    readonly
                  ></el-input>
                </el-form-item> -->
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="分配权限:" prop="authGuid">
                  <Tree
                    ref="authTree"
                    @changeType="changeType"
                    :nodes="powerNodes"
                    v-model="formData.authGuid"
                    :checkeds="formData.authGuid | getArray"
                    :strictly="true"
                    refName="authGuidTree"
                    objed
                    :defaultProps="{ children: 'children', label: 'name' }"
                    placehoder="请选择树状权限菜单"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="项目查看范围:">
                  <el-radio-group v-model="formData.isHaveProject">
                    <el-radio label="1">具备</el-radio>
                    <el-radio label="2">不具备</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="查看部门项目:">
                  <el-radio-group v-model="formData.isHaveProject">
                    <el-radio label="1">具备</el-radio>
                    <el-radio label="2">不具备</el-radio>
                  </el-radio-group>
                </el-form-item> -->
              </el-col>
              <el-col :span="12" v-if="formData.isHaveProject == 1">
                <el-form-item label="查看权限:" prop="isHaveProjectDepart">
                  <el-checkbox-group v-model="formData.isHaveProjectDepart">
                    <el-checkbox label="1">所在单位</el-checkbox>
                    <el-checkbox label="2">其他单位</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- <el-form-item label="查看部门:" prop="isHaveProjectDepart">
                  <el-checkbox-group v-model="formData.isHaveProjectDepart">
                    <el-checkbox label="1">所在部门</el-checkbox>
                    <el-checkbox label="2">其他部门</el-checkbox>
                  </el-checkbox-group>
                </el-form-item> -->
              </el-col>
            </el-row>
<!-- 
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="选择查看部门:"
                  prop="qiYeId"
                  required
                  v-if="formData.isHaveProjectDepart.includes('2') && formData.isHaveProject.includes('2') "
                >
                  <Tree
                    :nodes="branchNodes"
                    v-model="formData.qiYeId"
                    :strictly="true"
                    objed
                    ref="qiYeTree"
                    refName="qiYeTree"
                    :checkeds="formData.qiYeId | getArray"
                    :defaultProps="{ children: 'children', label: 'name'  }"
                  ></Tree>
                </el-form-item>
              </el-col>
            </el-row> -->

            <!-- <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="专业审核权限:">
                  <el-radio-group
                    v-model="formData.isHaveMajor"
                    @change="powerChange"
                    :disabled="isJinyongShqx"
                  >
                    <el-radio label="2">具备</el-radio>
                    <el-radio label="1">不具备</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="下属单位审核权限:">
                  <el-radio-group
                    v-model="formData.isHaveSubQiye"
                    :disabled="formData.isHaveMajor === '1'"
                  >
                    <el-radio label="2">具备</el-radio>
                    <el-radio label="1">不具备</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row> -->
             <el-row :gutter="20">
              <el-col :span="24" v-if="formData.isHaveProject == 1">
                <el-form-item label="选择查看单位:" prop="deptList">
                  <TreeAll
                    ref="subQiyeTree"
                    :nodes="organizeNodes"
                    v-model="formData.deptList"
                    :strictly="true"
                    :checkeds="formData.deptList | getArray"
                    :defaultProps="{ children: 'children', label: 'name' }"
                    refName="subQiyeTree"
                    objed
                    placehoder="请选择树状权限菜单"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20" v-if="formData.isHaveSubQiye === '2'">
              <el-col :span="24">
                <el-form-item label="下属组织单位:" prop="subQiyeId">
                  <Tree
                    ref="subQiyeTree"
                    :nodes="organizeNodes"
                    v-model="formData.subQiyeId"
                    :strictly="true"
                    :checkeds="formData.subQiyeId | getArray"
                    :defaultProps="{ children: 'children', label: 'name' }"
                    refName="subQiyeTree"
                    objed
                    placehoder="请选择树状权限菜单"
                  />
                </el-form-item>
              </el-col>
            </el-row> -->
          </el-form>
        </div>
        <!-- 用户列表 -->
        <div class="userInfoDiv">
          <h3>
            分配用户
            <el-button
              type="primary"
              style="float: right; margin-top: 10px"
              size="small"
              @click="handleAddUserShow"
              v-if="$route.query.type != 'look'"
            >添加</el-button>
          </h3>
          <div class="bottomLine"></div>
          <div style="padding:0 20px 20px 20px;">
            <el-table border :data="formData.userGuids" stripe style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
              <el-table-column prop="accountName" label="姓名" min-width="120" show-overflow-tooltip>
                <template slot-scope="{row}">{{row.user_Name || row.userName }}</template>
              </el-table-column>
              <el-table-column prop="user_BH" label="身份证号码" show-overflow-tooltip>
                <template slot-scope="{row}">{{row.user_BH || row.userBh }}</template>
              </el-table-column>
               <el-table-column prop="userLevel" label="用户级别" show-overflow-tooltip>
                <template slot-scope="{row}" v-if="row.userLevel == 1">平台级</template>
                <template slot-scope="{row}" v-else-if="row.userLevel == 2">租户级</template>
              </el-table-column>
               <el-table-column prop="role_Name" label="已分配角色" show-overflow-tooltip>
                <template slot-scope="{row}">{{row.role_Name || row.roleName }}</template>
              </el-table-column>
              <!-- <el-table-column prop="deptName" label="所属部门" show-overflow-tooltip>
                <template slot-scope="{row}">{{row.deptName || row.departName }}</template>
              </el-table-column>
              <el-table-column prop="role_Name" label="所属角色" show-overflow-tooltip>
                <template slot-scope="{row}">{{row.role_Name || row.roleName }}</template>
              </el-table-column> -->
              <el-table-column fixed="right" label="操作" min-width="100" align="left">
                <template slot-scope="scope">
                  <el-button-group class="operation-button-group">
                    <el-button
                      @click="handleDelUser(scope.row)"
                      type="info"
                      plain
                      class="operation-button"
                      size="small"
                      v-if="$route.query.type != 'look'"
                    >
                      <i class="iconfont icon-shanchu1">
                        <span>删除</span>
                      </i>
                    </el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!--选择企业弹出 -->
    <el-dialog
      title="选择查看企业"
      :append-to-body="true"
      :visible.sync="selectEnterpriseVisible"
      width="950"
      :before-close="handleClose"
    >
      <div>
        <div class="table_header">
          <el-form
            label-position="right"
            label-width="70px"
            :model="enterPriseForm"
            ref="enterPriseForm"
            size="small"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item width="50px" label="企业名称">
                  <el-input class="form_w" v-model="enterPriseForm.zbrName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item width="50px" label="企业代码">
                  <el-input class="form_w" v-model="enterPriseForm.zbrBh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="handleSearchEnterPrise" size="small">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table
          ref="enterPriseTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          height="350px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column prop="qiYe_Name" label="企业名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qiYe_BH" label="企业代码" show-overflow-tooltip></el-table-column>
          <el-table-column type="selection" width="50"></el-table-column>
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
    <el-dialog
      title="选择分配用户"
      :append-to-body="true"
      :visible.sync="selectUserVisible"
      width="950px"
      :before-close="handleUserClose"
    >
      <div class="selectbox">
        <div class="selectbox_search">
          <el-form size="small" label-width="80px" :model="userFrom" ref="userFrom">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item label="姓名">
                  <el-input type="text" v-model="userFrom.accountName" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="10">
                <el-form-item label="身份证号">
                  <el-input type="text" v-model="userFrom.user_BH" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="10">
                <el-form-item label="所属部门">
                  <Tree
                    :nodes="branchNodes"
                    v-model="userFrom.deptGuid"
                    objed
                    :defaultProps="{ children: 'children', label: 'name' }"
                    :showCheckbox="false"
                  ></Tree>
                </el-form-item>
              </el-col> -->
              <el-col :span="4">
                <el-button size="small" @click="handleSeachUser" type="primary">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table
          :data="userList"
          style="width: 100%"
          height="350"
          border
          ref="userTable"
          @selection-change="handleUserSelectionChange"
          @select="handleSelect"
        >
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="accountName" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="user_BH" label="身份证号码" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userLevel" label="用户级别">
            <template slot-scope="{row}" v-if="row.userLevel == 1">平台级</template>
            <template slot-scope="{row}" v-else-if="row.userLevel == 2">租户级</template>
          </el-table-column>
          <el-table-column type="selection" label width="50"></el-table-column>
        </el-table>
        <div style="width:100%;height:20px;"></div>
        <VPagination
          :total="userFrom.total"
          :page="userFrom.page"
          :limit="userFrom.rows"
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
import TreeAll from "@/components/tree/TreeAllCheck";
import {
  saveRules,
  getRules,
  getUserList,
  getAthDetail,
  getEnterpriseListsFn,
  getDepartment,
  getAllQiYe,
} from "@/service/roleAndDepartment";
// import { getEnterPriseList } from '@/service/enterpriseInfo'
// import SelectEnterprise from './dailog/selectEnterprise'
import VPagination from "@/components/VPagination";
export default {
  data() {
    const validateDepGuids = (rule, value, callback) => {
      if (this.formData.isHaveProjectDepart.includes("2")) {
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
      loading: false,
      formData: {
        userGuids: [],
        authsId: "",
        roleGuid: "",
        roleName: "",
        authGuid: "",
        isHaveProject: "2",
        isHaveProjectDepart: ["1"],
        qiYeId: "",
        isHaveMajor: "1",
        isHaveSubQiye: "1",
        subQiyeId: [],
        roleZhuangTai: 1,
        deptList: '', // 选择查看单位
        // viewQiTaQiYe: '0',
        // qiYeGuids: '',
        // isYouXiao: '1',
        // xmLeiXing: ['1', '2', '3'],
        userList: [], //已经选择人员列表
      },
      qiYeNames: "",
      tableData: [],
      // 选择人员列表
      userList: [],
      branchNodes: [],
      organizeNodes: [],
      powerNodes: [],
      userFrom: {
        page: 1,
        rows: 10,
        total: 0,
        accountName: "",
        user_BH: "",
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
        authGuid: [
          { required: true, message: "请选择权限", trigger: "change" },
        ],
        qiYeId: [{ validator: validateDepGuids, trigger: "change" }],
        userList: [],
      },
      // 是否禁用专业审核权限
      isJinyongShqx: true,
      optionsZhuangtai:[{
        label:'有效',
        value: 1,
      },{
        label:'无效',
        value: 0,
      }]
    };
  },
  created() {
    // getRules().then(res => {
    //   this.rulesNodes = res
    // }).catch(e => {
    //   console.error(e)
    // })
    // getDepartment().then(res => {
    //   this.nodes = res
    //   this.treeed = true
    // })
    // getAthDetail({ guid: this.$route.query.id }).then(res => {
    //   if (res.code === 1) {
    //     const datas = JSON.parse(JSON.stringify(res.data))
    //     datas.isHaveProjectDepart = !datas.isHaveProjectDepart ? ['A'] : datas.isHaveProjectDepart.split('')
    //     datas.xmLeiXing = !datas.xmLeiXing ? ['1', '2', '3'] : datas.xmLeiXing.split(',')
    //     datas.isHaveProject = datas.isHaveProject ? datas.isHaveProject : '1'
    //     datas.viewQiTaQiYe = datas.viewQiTaQiYe ? datas.viewQiTaQiYe : '0'
    //     datas.isYouXiao = datas.isYouXiao ? datas.isYouXiao : '1'
    //     datas.authGuid = datas.authGuid.join(',')
    //     datas.userList = datas.userList ? datas.userList : []
    //     this.formData = Object.assign(this.formData, datas)
    //     this.usersSelection = JSON.parse(JSON.stringify(datas.jyUserList))
    //     this.loaded = true
    //   }
    //   this.loaded = true
    // }).catch(e => {
    //   console.error(e)
    // })
    this.roleQuery();
    this.roleNodeTree();
    this.roleOrganizeTree();
    this.roleDistributionRoleList();
  },
  // computed: {
  //   selnodes () {
  //     return this.$store.state.roleAnddepartment.department
  //   }
  // },
  components: {
    Tree,
    VPagination,
    TreeAll,
  },
  watch: {
    "formData.isHaveMajor": function (val) {
      this.powerChange(val);
    },
  },
  methods: {
    powerChange(lable) {
      if (lable == "1") {
        this.formData.isHaveSubQiye = "1";
      }
    },
    changeType(data) {
      // f4959f29-1195-4c3a-b78f-68d1ecb1b79c专业供应商审核的id
      if (data.indexOf("f4959f29-1195-4c3a-b78f-68d1ecb1b79c") != -1) {
        this.isJinyongShqx = false;
        this.formData.isHaveMajor = "2";
        this.formData.isHaveSubQiye = "2";
      } else {
        this.isJinyongShqx = true;
        this.formData.isHaveMajor = "1";
        this.formData.isHaveSubQiye = "1";
      }
    },
    /**
     * 查询权限树
     */
    // async rolePowerTree() {
    //   const data = await this.portService.roleAuthTree(this.searchForm);

    //   if (data) {
    //     this.powerNodes = data;
    //   }
    // },
    /**
     * 角色管理-查询
     */
    async roleQuery() {
      const data = await this.portService.roleQuery({
        guid: this.$route.query.id,
      });
      if (data) {
        this.formData = Object.assign({}, this.formData, {
          isHaveProjectDepart: !data.isHaveProjectDepart
            ? ["1"]
            : data.isHaveProjectDepart.split(","),
          qiYeId: data.departList ? data.departList.join(",") : "",
          authGuid: data.departList ? data.authGuids.join(",") : "",
          subQiyeId: data.departList ? data.subQiYeList.join(",") : [],
          createTime: data.createTime,
          authsId: data.authsId,
          roleGuid: data.roleGuid,
          roleName: data.roleName,
          isHaveProject: data.isHaveProject ? data.isHaveProject : "2",
          isHaveMajor: data.isHaveMajor ? data.isHaveMajor : "1",
          isHaveSubQiye: data.isHaveSubQiye ? data.isHaveSubQiye : "1",
          roleZhuangTai: data.roleZhuangTai ? data.roleZhuangTai : '1',
          deptList: data.departList ? data.departList.join(",") : '', //选择查看单位
        });
        // this.$nextTick(()=> {
        //   this.$refs.authTree.checkedNodes = data.authGuids || []
        //   this.$refs.qiYeTree.checkedNodes = data.departList || []
        //   this.$refs.subQiyeTree.checkedNodes = data.subQiyeId || []

        //   console.log()
        // })
        // this.powerNodes = data;
      }
    },
    /**
     * 查询权限树
     */
    async roleDistributionRoleList() {
      const data = await this.portService.roleDistributionRoleList({
        roleGuid: this.$route.query.id,
      });

      if (data) {
        this.formData.userGuids = data;
        this.formData.userList = data.map((i) => i.userGuid);
        // this.powerNodes = data;
      }
    },
    /**
     * 查询部门树
     * 查询权限树
     */
    async roleNodeTree() {
      const data = await this.portService.roleAuthTree();

      if (data) {
        this.powerNodes = data;
      }
    },
    /**
     * 查询组织树
     */
    async roleDeleteUser(roleId) {
      const { code, data } = await this.portService.roleDeleteUser({
        userId: this.$route.query.id,
        roleId: roleId,
      });
      if (code) {
        this.$message({ type: "success", message: data.message });
      } else {
        this.$message({ type: "error", message: data.message });
      }
    },
    /**
     * 查询组织树
     */
    async roleOrganizeTree() {
      const data = await this.portService.roleOrganizationTree();
      if (data) {
        this.branchNodes = data || [];
        this.organizeNodes = data || [];
      }
    },
    /**
     * 保存
     */
    async handleSaveRules() {
      let userGuids = this.formData.userGuids.map(
        (i) => i.user_Guid || i.userGuid
      );
      let data = Object.assign(
        {},
        {
          roleGuid: this.$route.query.id,
          authGuid: !!this.formData.authGuid
            ? this.formData.authGuid.split(",")
            : [],
          isHaveProject: this.formData.isHaveProject,
          isHaveProjectDepart: this.formData.isHaveProjectDepart,
          // qiYeId: !!this.formData.qiYeId ? this.formData.qiYeId.split(",") : [],
          isHaveMajor: this.formData.isHaveMajor,
          isHaveSubQiye: this.formData.isHaveSubQiye,
          deptList: !!this.formData.deptList
            ? this.formData.deptList.split(",")
            : [],
          userGuids: userGuids,
        }
      );
      if (!data.authGuid.length) {
        this.$message.warning("请选择的分配权限");
        return;
      }
      this.loading = true;
      const { code, message } = await this.portService
        .roleSaveFPAuth(data)
        .catch(() => {
          this.loading = false;
          this.$message.error("提交失败");
        });

      this.loading = false;
      if (code) {
        this.$message({ type: "success", message: message });
      } else {
        this.$message({ type: "error", message: message });
      }
      // data.isHaveProjectDepart = data.isHaveProjectDepart.join(',')
      // data.xmLeiXing = data.xmLeiXing.join(',')
      // data.authGuid = data.authGuid.split(',')
      // data.roleGuid = this.$route.query.id
      // saveRules(data).then(res => {
      //   if (res.code === 1) {
      //     this.$message.success(res.info)
      //     this.$router.push({path:'/userAndQxManage/userManageTable'})
      //   }
      // }).catch(e => {
      //   console.error(e)
      // })
    },
    handleSelect(e, r) {
      // if (e.length < this.usersSelection.length) {
      //   this.handleDelUser(r.userGuid)
      // }
    },
    handleDelUser(row) {
      this.formData.userGuids = this.formData.userGuids.filter(
        (t) => t.user_Guid !== row.user_Guid || t.userGuid !== row.userGuid
      );
      this.formData.userList = this.formData.userList.filter(
        (t) => t !== row.user_Guid && t !== row.userGuid
      );
      // this.roleOrganizeTree(row.guid)
      // const list = this.formData.userGuids
      // const uidList = this.formData.userList
      // this.formData.userGuids = list.filter(i => {
      //   if (i.userGuid !== guid) {
      //     return i
      //   }
      // })
      // this.formData.userList = uidList.filter(i => {
      //   if (i !== guid) {
      //     return i
      //   }
      // })
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
      this.formData.qiYeGuids = this.copyEnterPriseSelection
        .map((i) => i.userQiYe_Guid)
        .join(",");
      this.formData.qiYeNames = this.copyEnterPriseSelection
        .map((i) => i.qiYe_Name)
        .join(",");
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
      this.$refs.userTable.clearSelection();
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
    handleAddUser() {
      const uListIds = this.formData.userList;
      const userGuids = this.formData.userGuids.map(
        (i) => i.user_Guid || i.userGuid
      );
      this.copyUsersSelection = [
        ...this.copyUsersSelection,
        ...this.usersSelection,
      ];
      const usersSelectionId = this.copyUsersSelection.map(
        (i) => i.user_Guid || i.userGuid
      );
      this.formData.userList = Array.from(
        new Set([...uListIds, ...usersSelectionId])
      );
      this.copyUsersSelection.forEach((i) => {
        if (!userGuids.includes(i.user_Guid)) {
          this.formData.userGuids.push(i);
        }
      });
      this.handleUserClose();
    },
    // 选择用户的收集器
    handleUserSelectionChange(data) {
      this.usersSelection = data;
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

      this.portService.userQueryAllUserList(this.userFrom).then((res) => {
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
  },
  filters: {
    /**
     * tree checkeds 数组变换
     */
    getArray: function (val) {
      // console.log(val,'val');
      return val ? val.split(",") : [];
    },
  },
};
</script>
<style lang="scss" scoped>

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
          // width: calc(100% - 120px);
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
    padding: 20px 0;
    // border-top: 1px solid #eee;
    // border-bottom: 1px solid #eee;
  }
}
#mian
  .zbrdbAddContent
  .userInfoDiv
  .zbrdbForm
  .el-form-item
  .el-form-item__label {
  width: 120px !important;
}
</style>
<style lang="scss" scoped>
.page-crumb {
  width: 100%;
  padding: 15px 20px 15px 0;
  height: 60px;
  line-height: 60px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  /*border-bottom: 1px solid #d8dde8;*/
  /*box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);*/
  .crumb-icon {
    position: absolute;
    /*top: 50%;
            transform: translate(0%, -50%);*/
    left: 17px;
    font-size: 14px; /*no*/
    font-weight: 700;
  }
  .breadcrumb {
    flex: 1;
    padding-left: 50px;
    line-height: 40px;
  }
  ::v-deep.el-button--small,
  .el-button--small.is-round {
    padding: 9px 15px; /*no*/
  }
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: 400;
}
@media screen and(max-width: 1366px) {
  .page-crumb {
    height: 45px; /*no*/
    padding-top: 10px; /*no*/
    .crumb-icon {
      font-size: 14px; /*no*/
      margin-right: 2px; /*no*/
    }

    ::v-deep.el-button--small,
    .el-button--small.is-round {
      padding: 6px 10px; /*no*/
    }
  }
}
</style>
<style lang="scss">
.page-crumb {
  .el-breadcrumb__item {
    .el-breadcrumb__separator,
    .el-breadcrumb__inner {
      font-size: 14px;
    }
  }
}
</style>
