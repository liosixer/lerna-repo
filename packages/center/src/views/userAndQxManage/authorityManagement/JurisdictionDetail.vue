<template>
  <div class="container table-flex" :style="styless">
    <page-crumb :d="{breadcrumbList:breadcrumbList}">
      <template slot="btns">
        <el-button size="small" type="primary" @click="add">新增权限</el-button>
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </template>
    </page-crumb>
    <div class="global-content global-clear-bg">
      <div class="content_wrapper">
        <div class="content_tree">
          <Tree
            :smallMenuText="'权限'"
            :nodes="menuList"
            @setNode="handleSetNode"
            :isLazy="false"
            :isShow="false"
            :drop="false"
            :flex="true"
            :show-input="false"
            :show-checkbox="false"
            showctr
            :checkeds="defaultMenu"
            :defaultProps="defaultProps"
            @modifyNode="handleModifyNode"
            @deleteNode="handleDeleteNode"
            @setCurrentNode="handleSetCurrentNode"
            @addSubNode="handleAddSubNode"
            nodeKey="id"
            treeId="id"
            ref="tree"
          ></Tree>
        </div>
        <div class="content_box">
          <el-form
            label-width="150px"
            style="width: 450px"
            :model="ruleForm"
            :disabled="true"
            ref="ruleForm"
          >
            <div class="from_wrapper">
              <div class="form_left">
                <el-form-item label="子系统ID：">
                  <el-input v-model="ruleForm.subSystemId" size="small"></el-input>
                </el-form-item>
                <el-form-item label="权限类型：">
                  <el-radio-group v-model="ruleForm.authLeiXing">
                    <el-radio :label="1">模块</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="权限名称：">
                  <el-input size="small" v-model="ruleForm.authName"></el-input>
                </el-form-item>
                <el-form-item label="权限描述：">
                  <el-input size="small" v-model="ruleForm.authDesc"></el-input>
                </el-form-item>
                <el-form-item label="权限url地址池：">
                  <el-input size="small" v-model="ruleForm.authUrls"></el-input>
                </el-form-item>
                <el-form-item label="父节点guid：">
                  <el-input size="small" v-model="ruleForm.parentGuid"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <el-date-picker
                    v-model="ruleForm.createTime"
                    type="datetime"
                    size="small"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="创建人：">
                  <el-input size="small" v-model="ruleForm.creator"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog :title="setText" :append-to-body="true" :visible.sync="dialogVisible" width="800px">
      <add-dialog
        ref="addDialog"
        :value="sendTcData"
        v-if="dialogVisible"
        :isForbiddenType="isForbiddenType"
      ></add-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePopCancel" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handlePopOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ContentHeader from "@/components/contentHeader/ContentHeader";
import PageCrumb from "@/components/PageCrumb";
import Tree from "@/components/tree/TreeNav";
import addDialog from "./AddJurisdiction";
export default {
  data() {
    return {
      breadcrumbList: [
        // { label: "用户及权限管理", link: "" },
        { label: "权限管理", link: "/userAndQxManage/authorityManagement" },
        { label: "查看", link: "" }
      ],
      ManageList: [],
      userDepartment: [],
      menuList: [],
      //   默认选择第一个菜单
      defaultMenu: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      ruleForm: {},
      //   当前菜单的id
      currentId: "",
      setText: "",
      dialogVisible: false,
      // 传给弹窗的详情数据
      sendTcData: {},
      // 选中详情的id
      choosedId: "",
      isForbiddenType: false
    };
  },
  computed: {
    styless() {
      return {
        paddingTop: 0
      };
    }
    // choosedId(){
    //     return this.menuList[0].id
    // }
  },
  components: {
    ContentHeader,
    PageCrumb,
    Tree,
    addDialog
  },
  created() {
    this.getSubSystemIdAuthTreeMethods().then(res => {
      if (this.menuList.length > 0) {
        this.showAuthDetailMethods(this.menuList[0].id);
      }
    });
  },
  methods: {
    /**
     * 修改部门
     */
    handleModifyNode(node) {
      this.showAuthDetailMethods(node.data.id, "tc").then(res => {
        this.sendTcData.guid = node.data.id;
        this.sendTcData.subSystemId = this.$route.query.id;
        this.sendTcData.authLeiXing = res.authLeiXing;
        this.sendTcData.authName = res.authName;
        this.sendTcData.authDesc = res.authDesc;
        this.sendTcData.authIcon = res.authIcon;
        this.sendTcData.authUrls = res.authUrls;
        this.sendTcData.parentGuid = res.parentGuid;
        this.dialogVisible = true;
        this.setText = "修改权限";
        this.isForbiddenType = true;
      });
    },
    /**
     * 查询-加载子节点
     */
    loadNode(node, resolve) {},
    // 点击树节点
    handleSetNode(data) {
      console.log(data);
      this.choosedId = data.id;
      this.showAuthDetailMethods(this.choosedId);
    },
    /**
     * 树节点 --- 添加子组织
     */
    handleAddSubNode(node) {
      console.log(node);
      this.dialogVisible = true;
      this.setText = "新增权限";
      this.sendTcData.subSystemId = this.$route.query.id;
      this.sendTcData.authLeiXing = 2;
      this.sendTcData.authName = "";
      this.sendTcData.authDesc = "";
      this.sendTcData.authIcon = "";
      this.sendTcData.authUrls = "";
      this.sendTcData.parentGuid = node.data.id;
      this.isForbiddenType = true;
    },
    handleDeleteNode(node) {
      this.$confirm("此操作将永久该权限删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.portService.delAuth({ guid: node.data.id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                center: true,
                duration: 2000,
                message: res.data.massage
              });
              this.getSubSystemIdAuthTreeMethods();
              if (this.choosedId) {
                this.showAuthDetailMethods(this.choosedId);
              }
            } else {
              this.$message({
                type: "warning",
                center: true,
                duration: 2000,
                message: res.data.massage
              });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    handleSetCurrentNode(node) {
      this.node = node.data;
    },
    /**
     * 查看子系统所有权限
     */
    async getSubSystemIdAuthTreeMethods() {
      const res = await this.portService.getSubSystemIdAuthTree({
        subSystemId: this.$route.query.id
      });
      if (res.code == 200) {
        this.menuList = res.data.authTreeList;
        this.defaultMenu.push(this.menuList[0]);
      }
    },
    /**
     * 获取权限详细信息
     */
    async showAuthDetailMethods(id, type) {
      const res = await this.portService.showAuthDetail({
        guid: id
      });
      if (res.code == 200) {
        if (type == "tc") {
          return Promise.resolve(res.data.sysAuth);
        } else {
          this.ruleForm = res.data.sysAuth;
        }
      }
    },
    /**
     * 新增权限
     */
    add() {
      this.dialogVisible = true;
      this.setText = "新增权限";
      this.sendTcData.subSystemId = this.$route.query.id;
      this.sendTcData.authLeiXing = 1;
      this.sendTcData.authName = "";
      this.sendTcData.authDesc = "";
      this.sendTcData.authIcon = "";
      this.sendTcData.authUrls = "";
      this.sendTcData.parentGuid = "";
      this.isForbiddenType = false;
    },
    handlePopCancel() {
      this.dialogVisible = false;
    },
    //修改和保存方法
    editeAndSaveInner(query, fun) {
      fun(query).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            center: true,
            duration: 2000,
            message: res.data.message
          });
          this.getSubSystemIdAuthTreeMethods();
          if (this.choosedId) {
            this.showAuthDetailMethods(this.choosedId);
          }
          this.dialogVisible = false;
        } else {
          this.$message({
            type: "warning",
            center: true,
            duration: 2000,
            message: res.data.message
          });
        }
      });
    },
    /**
     * 弹框确按钮被点击
     */
    handlePopOK() {
      this.$refs.addDialog.validata(data => {
        if (data) {
          if (this.setText == "新增权限") {
            this.editeAndSaveInner(data, this.portService.saveAuthMessage);
          } else {
            this.editeAndSaveInner(data, this.portService.updateAuthDetail);
          }
        }
      });
    }
  }
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
    width: 310px;
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