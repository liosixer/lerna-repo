<template>
  <div class="container table-flex" :style="styless">
    <!-- <contentHeader></contentHeader> -->
    <page-crumb :d="{breadcrumbList:breadcrumbList}">
    </page-crumb>
    <div class="global-content global-clear-bg">
      <div class="content_wrapper">
        <div class="content_tree">
          <Tree
            :nodes="deparment"
            @setNode="handleSetNode"
            :drop="false"
            :flex="true"
            :loadNode="loadNode"
            :show-input="false"
            :show-checkbox="false"
            showctr
            :checkeds="[checkedsId]"
            @modifyNode="handleModifyNode"
            @deleteNode="handleDeleteNode"
            @setCurrentNode="handleSetCurrentNode"
            @addSubNode="handleAddSubNode"
            nodeKey="departGuid"
            treeId="departGuid"
            ref="tree"
          >
            <div class="content_tree_search_btn">
              <i class="el-icon-plus add_one" @click="handleAddLevelOne"></i>
            </div>
          </Tree>
        </div>
        <div class="content_box">
          <!-- <router-view></router-view> -->
          <zzjgAdd :guid="toChildGuid" :parentGuid="parentGuid"></zzjgAdd>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <el-dialog
      title="导入组织"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="800px"
      :closeOnClickModal="false">
        <el-upload
        accept=".xls,.xlsx"
        :headers="token"
        :action="upUrl"
        :data="uploadData"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="text">
          <!-- <i class="iconfont icon-jinru"></i> -->
          导入模板
        </el-button>
      </el-upload>
      <p @click="downExacl" style="cursor: pointer;">导出模板</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePopCancel" size="small">取 消</el-button>
        <!-- <el-button type="primary" size="small" @click="handlePopOK">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tree from "@/components/tree/TreeNav";
import ContentHeader from "@/components/contentHeader/ContentHeader";
import addOrganization from "./UserList/addOrganization";
import PageCrumb from "@/components/PageCrumb";
import request from '@/api/index';
import config from '@/config/config';
import zzjgAdd from './zzjgAdd'


import {
  saveDepartment,
  addSubDepartment,
  delDepartment,
  updateDepartment,
} from "../../service/roleAndDepartment";
export default {
  data() {
    return {
      dialogVisible: false,
      childName: "",
      node: null,
      fileList: [],
      uploadData: {
        zuHuGuid: ''
      },
      upUrl: '',
      token: {
        Authorization: "Bearer " + this.$store.state.loginCookie.access_token,
      },
      checkedsId: this.$route.query.id ? this.$route.query.id : this.$store.state.roleAnddepartment.currentDepartment.departGuid,
      parentGuid: this.$store.state.roleAnddepartment.currentDepartment.parentGuid,
      toChildGuid: this.$store.state.roleAnddepartment.currentDepartment.departGuid,
      formDate: {
        type: 0,
        parentGuid: 0, // 父类id
        qiyeBumen: 1, // 组织类型
        deptName: "", // 企业名称 / 部门名称
        qiyeDaima: "", // 企业代码
        deptType: 1, // 企业代码
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      breadcrumbList: [
        { label: "组织架构", link: "" },
      ],
    };
  },
  computed: {
    deparment() {
      let arr = this.$store.state.roleAnddepartment.department;
      let indexAddType = 0
      arr.forEach((item, index) => {
        if (item.zuHuType == 0) {
          indexAddType += 1;
        }
      });
      indexAddType > 0 ? arr[indexAddType - 1].showLine = 1 : '';
      return arr;
    },
    styless() {
      return {
        paddingTop: 0,
      };
    },
    setText() {
      return this.formDate.type ? "修改组织架构" : "新建组织架构";
    },
  },
  components: {
    addOrganization,
    ContentHeader,
    Tree,
    zzjgAdd,
    PageCrumb
  },
  created() {
    // console.log(this.$store.state.roleAnddepartment.currentDepartment);
    this.$store.dispatch("getDepartmentData");
    if(this.$route.query.id) {
      this.toChildGuid = this.checkedsId = this.$route.query.id;
    }
  },
  // mounted() {
  //   this.stylessHeight();
  // },
  methods: {
    // stylessHeight() {
    //   console.log(this.$refs.tree);
    // },
    uploadSuccess(val,id) {
      this.dialogVisible = false;
      this.$store.dispatch("getDepartmentData");
      this.$message.info(val.info)
    },
    /**
     * 用户管理-新增/修改组织
     */
    async suerSaveOrganization(data) {
      const res = await this.portService.suerSaveOrganization(data);
      if (res.code == "成功") {
        this.$store.dispatch("getDepartmentData");
        this.$store.commit("setCurrentDepartmentName", data.deptName);
        this.$message({ type: "success", message: res.message });
        this.dialogVisible = false;
      } else {
        this.$message({ type: "error", message: res.message });
      }
    },
    /**
     * 用户管理-删除
     */
    async userDelOrganization(data) {
      const res = await this.portService.userDelOrganization(data);

      if (res.status) {
        this.$store.dispatch("getDepartmentData");
        this.$message({ type: "success", message: res.message });
      } else {
        this.$message({ type: "error", message: res.message });
      }
    },
    /**
     * 查询 - 组织
     */
    async suerQueryOrganization(data) {
      const res = await this.portService.suerQueryOrganization(data);

      return Promise.resolve(res);
    },
    /**
     * 查询-加载子节点
     */
    loadNode(node, resolve) {
      // console.log(node);
      this.$nextTick().then(() => {
          if (node.level == 0 && node.data.constructor == Array) {
            resolve(node.data);
          } else if (node.data.departGuid) {
            this.portService
              .userManageList({ pid: node.data.departGuid })
              .then((res) => {
                let data = res.data.data;
                data = data.filter((t) => t.state === "closed");
                if (res.code) resolve(data);

                this.$store.commit("setCopyDepartment", this.$refs.tree.flatten());
              });
          } else {
            resolve([]);
          }
      });
      
    },
    /**
     * 树节点 --- 添加一级组织
     */
    handleAddLevelOne() {
      this.formDate = {
        type: 0,
        parentGuid: 0, // 父类id
        qiyeBumen: 1, // 组织类型
        deptName: "", // 企业名称 / 部门名称
        qiyeDaima: "", // 企业代码
        deptType: 1, // 企业代码
        onlyQy: true,
      };
      this.upUrl = `${config.fileDownUrl}/center-web-api/admin/organizationManage/improtExcel?token=${this.$store.state.loginCookie.access_token}`
      this.uploadData.zuHuGuid = this.$store.state.roleAnddepartment.currentDepartment.departGuid;
      this.dialogVisible = true;
    },
    // 下载模板
    downExacl() {
      window.open(`${config.fileDownUrl}/center-web-api/admin/organizationManage/exportExcel`);
    },
    handleDeleteNode(node) {
      this.$confirm("此操作将永久该部门, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.userDelOrganization({ departGuid: node.data.departGuid });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    // 点击树节点
    handleSetNode(data) {
      this.toChildGuid = data.departGuid;
      this.checkedsId = data.departGuid;
      this.$store.commit("setCurrentDepartment", data);
      this.$store.commit("setCurrentDepartmentName", data.departName);
    },
    handlePopCancel() {
      this.dialogVisible = false;
      this.childName = "";
    },
    /**
     * 弹框确按钮被点击
     */
    handlePopOK() {
      this.$refs.organization.validata((data) => {
        if (data) {
          this.suerSaveOrganization(data);
        }
      });
    },
    /**
     * 树节点 --- 添加子组织
     */
    handleAddSubNode(node) {
      this.suerQueryOrganization({ guid: node.data.departGuid }).then((res) => {
        if (res) {
          this.formDate = {
            type: 0,
            qiyeBumenDisabled: Number(res.qiyeBumen) === 2, //是否禁用企业，是部门就禁用企业单选按钮
            parentGuid: node.data.departGuid, // 父类id
            qiyeBumen: Number(res.qiyeBumen) === 2 ? 2 : 1, // 组织类型
            deptName: "", // 企业名称 / 部门名称
            qiyeDaima: "", // 企业代码
            deptType: 1, // 企业代码
            deptGuid: node.data.departGuid, // 当前节点id
          };
          this.upUrl = `${config.fileDownUrl}/center-web-api/admin/organizationManage/improtExcel?token=${this.$store.state.loginCookie.access_token}`
          this.uploadData.zuHuGuid = node.data.departGuid;
          this.dialogVisible = true;
        }
      });
    },
    /**
     * 修改部门
     */
    handleModifyNode(node) {
      this.suerQueryOrganization({ guid: node.data.departGuid }).then((res) => {
        if (res) {
          let parentGuid = node.level === 1 ? 0 : node.parent.data.departGuid;
          this.formDate = {
            type: 2,
            parentGuid: parentGuid, // 父类id
            qiyeBumenDisabled: Number(res.qiyeBumen) === 2, //是否禁用企业，是部门就禁用企业单选按钮
            qiyeBumen: res.qiyeBumen, // 组织类型
            deptName: res.deptName, // 企业名称 / 部门名称
            qiyeDaima: res.qiyeDaima, // 企业代码
            deptType: Number(res.deptType), // 企业代码
            guid: node.data.departGuid,
            deptGuid: node.data.departGuid, // 当前节点id
          };
          this.upUrl = `${config.fileDownUrl}/center-web-api/admin/organizationManage/improtExcel?token=${this.$store.state.loginCookie.access_token}`
          this.uploadData.zuHuGuid = node.data.departGuid;
          this.dialogVisible = true;
        }
      });
    },
    handleSetCurrentNode(node) {
      this.node = node.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.content_wrapper {
  margin: 5px 4px;
  display: flex;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  .content_tree {
    width: 410px;
    background: #fff;
    border-right: 10px solid #f4f5f9;
    flex-shrink: 0;
  }
  .content_box {
    flex-grow: 1;
    flex-shrink: 1;
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
  }
}
.content_tree_search {
  padding: 20px;
  border-bottom: 1px solid #948989;
}
.content_tree_btns {
  display: flex;
  justify-content: space-between;
}
.content_tree_search_btn {
  /*background: #cdc7c7;*/
  /*line-height: 30px;*/
  text-align: center;
  margin-bottom: 10px;
  margin-top: 5px;
  position: relative;
  &::after {
    content: "";
    height: 1px;
    position: absolute;
    left: -15px;
    right: -15px;
    bottom: -10px;
    background: #e9e9e9;
  }
}
.add_one {
  font-size: 18px;
  bottom: 15px;
  right: 0px;
  cursor: pointer;
  position: absolute;
}
.add_one:hover {
  color: #409eff;
}
</style>
