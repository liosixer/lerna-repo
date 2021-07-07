<template>
  <div>
    <div class="global-title" ref="table_title">
      <PageCrumb :d="{ breadcrumbList: breadcrumbList }"> </PageCrumb>
    </div>
    <!-- <contentHeader title="组织架构"></contentHeader> -->
    <div class="global-content">
      <div class="content_wrapper">
        <div class="content_tree">
          <Tree
            :nodes="deparment"
            @setNode="handleSetNode"
            :drop="false"
            :show-input="false"
            :show-checkbox="false"
            showctr
            :checkeds="[$store.state.roleAnddepartment.currentDepartment]"
            @modifyNode="handleModifyNode"
            @deleteNode="handleDeleteNode"
            @setCurrentNode="handleSetCurrentNode"
            @addSubNode="handleAddSubNode"
            nodeKey="departGuid"
            treeId="departGuid"
            ><div class="content_tree_search_btn">
<!--           <i class="el-icon-plus add_one" @click="handleAddLevelOne"></i>-->
            <el-button class="add_one" style="display: inline-block;padding: 4px" size="mini" type="primary" icon="el-icon-plus" @click="handleAddLevelOne"></el-button>
          </div></Tree>
        </div>
        <div class="content_box clearfix">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <el-dialog :title="mState == 1 ? '添加子部门' : '修改部门'" :append-to-body="true" :visible.sync="dialogVisible" width="500px" :closeOnClickModal="false">
      <div>
        <p style="padding-bottom: 10px;">部门名称</p>
        <el-input type="text" size="small" v-model="childName" placeholder="请输入"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePopCancel" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handlePopOK">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加一级部门" :append-to-body="true" :visible.sync="dialogVisible2" width="500px" :closeOnClickModal="false" @before-close="handlePopCancel1">
      <div>
        <el-form :model="formDate" :rules="rules" ref="formDate" size="small" label-position="right">
          <el-form-item prop="deptName" label="部门名称">
            <el-input type="text" size="small" v-model="formDate.deptName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePopCancel1" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handlePopOK1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tree from "@/components/tree/TreeNav";
// import ContentHeader from '@/components/contentHeader/ContentHeader'
import PageCrumb from "@/components/PageCrumb";
import { saveDepartment, addSubDepartment, delDepartment, updateDepartment } from "../../service/roleAndDepartment";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      childName: "",
      node: null,
      mState: 1,
      firstNode: "",
      isrepeat: false,
      formDate: {
        deptBh: "",
        deptName: "",
        lianXiRen: "",
        beiZhu: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      breadcrumbList: [
        { label: "首页", link: "/qyxxgl" },
        { label: "组织架构", link: "" },
      ],
    };
  },
  computed: {
    deparment() {
      return this.$store.state.roleAnddepartment.department;
    },
  },
  components: {
    // ContentHeader,
    Tree,
    PageCrumb,
  },
  created() {
    this.$store.dispatch("getDepartmentData");
    console.log(this.deparment);
  },
  mounted() {
    // this.computeTableHeight()
  },
  methods: {
    handlePopOK1() {
      const isNotSame = this.deparment.every((e) => e.departName != this.formDate.deptName);
      if (!isNotSame) {
        this.$message.warning("部门名称不能重复");
        return;
      }
      if (this.formDate.deptName) {
        saveDepartment(this.formDate).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.info);
            this.$store.dispatch("getDepartmentData");
          }
          this.dialogVisible2 = false;
        });
      } else {
        this.$message.warning("人请输入部门名称");
      }
    },
    handlePopCancel1() {
      this.dialogVisible2 = false;
    },
    checkoutName(name) {
      console.log(this.store.state.currentDepartment);
    },
    handleAddLevelOne() {
      this.formDate = {
        deptBh: "",
        deptName: "",
        lianXiRen: "",
        beiZhu: "",
      };
      this.dialogVisible2 = true;
    },
    handleDeleteNode() {
      this.$confirm("此操作将永久该部门, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDepartment({ guid: this.node.departGuid })
            .then((res) => {
              if (res.code === 1) {
                this.$message.success(res.info);
                this.$store.dispatch("getDepartmentData");
              }
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击树节点
    handleSetNode(data) {
      this.$store.commit("setCurrentDepartment", data);
    },
    handlePopCancel() {
      this.dialogVisible = false;
      this.childName = "";
    },
    handlePopOK(data) {
      if (this.mState === 1) {
        this._addSubDepartment();
      } else {
        this._modifyDepartment();
      }
    },

    _modifyDepartment() {
      let data = {
        deptBh: "",
        deptName: this.childName,
        parentGuid: "",
        lianXiRen: "",
        guid: this.node.departGuid,
        beiZhu: "",
      };
      var ischangeFrist = false;
      this.deparment.forEach((i) => {
        if (!ischangeFrist) {
          if (i.departGuid == this.node.departGuid) {
            ischangeFrist = true;
          } else {
            this.findFirst(i, this.node.departGuid, i);
          }
        }
      });
      if (ischangeFrist) {
        const isNotSame = this.deparment.every((e) => e.departName != this.childName);
        if (!isNotSame) {
          this.$message.warning("部门名称不能重复");
          return;
        }
      } else {
        this.isrepeat = false;
        this.checkrepeat(this.firstNode, this.childName);
        if (this.isrepeat) {
          this.$message.warning("部门名称不能重复");
          return;
        }
      }

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
    },
    findFirst(target, guid, curr) {
      if (target.departGuid == guid) {
        this.firstNode = curr;
      } else {
        if (target.children) {
          target.children.forEach((i) => {
            this.findFirst(i, guid, curr);
          });
        }
      }
    },
    checkrepeat(node, name) {
      if (this.isrepeat) return true;
      if (node.departName == name) {
        this.isrepeat = true;
        return true;
      } else {
        if (node.children) {
          node.children.forEach((i) => {
            this.checkrepeat(i, name);
          });
        }
      }
    },
    _addSubDepartment() {
      const data = {
        deptName: this.childName,
        parentGuid: this.node.departGuid,
      };
      this.deparment.filter((i) => {
        return this.findFirst(i, this.node.departGuid, i);
      });
      this.isrepeat = false;
      this.checkrepeat(this.firstNode, this.childName);
      if (this.isrepeat) {
        this.$message.warning("部门名称不能重复");
        return;
      }
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
    },
    handleAddSubNode(node) {
      this.childName = "";
      this.mState = 1;
      this.dialogVisible = true;
    },
    handleModifyNode() {
      this.mState = 0;
      this.childName = this.node.departName;
      this.dialogVisible = true;
    },
    handleSetCurrentNode(node) {
      this.node = node.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.content_wrapper {
  // margin: 5px 4px;
  display: flex;
  justify-content: space-between;
  .content_tree {
    width: 310px;
    background: #fff;
    border-right: 10px solid #f4f5f9;
    flex-shrink: 0;
  }
  .content_box {
    flex: 1;
    width: 80%;
    height: 100%;
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
  position: absolute;
  bottom: 8px;
  right: -4px;
  cursor: pointer;
}
/*.add_one:hover {*/
/*  color: #409eff;*/
/*}*/
</style>
