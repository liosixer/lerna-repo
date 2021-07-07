<template>
  <div>
    <el-form ref="form" :model="addForm" label-width="120px" size="small" label-position="right">
      <el-form-item label="组织类型：" prop="qiyeBumen" :rules="validate.vdRequired()">
        <el-radio-group v-model="addForm.qiyeBumen" v-if="!addForm.onlyQy">
          <el-radio :label="1" :disabled="addForm.qiyeBumenDisabled">企业</el-radio>
          <el-radio :label="2">部门</el-radio>
        </el-radio-group>
        <el-radio-group v-model="addForm.qiyeBumen" v-else>
          <el-radio :label="1">企业</el-radio>
        </el-radio-group>
      </el-form-item>

      <template v-if="addForm.qiyeBumen == 1">
        <el-form-item label="企业名称：" prop="deptName" :rules="validate.vdRequired()">
          <el-input v-model="addForm.deptName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业代码：" prop="qiyeDaima" :rules="validate.vdRequired()">
          <el-input v-model="addForm.qiyeDaima" placeholder="请输入"></el-input>
        </el-form-item>
      </template>

      <template v-if="addForm.qiyeBumen == 2">
        <el-form-item label="部门名称：" prop="deptName" :rules="validate.vdRequired()">
          <el-input v-model="addForm.deptName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="部门类型：" prop="deptType" :rules="validate.vdRequired()">
          <el-radio-group v-model="addForm.deptType">
            <el-radio :label="1">普通部门</el-radio>
            <el-radio :label="2">平台运营部门</el-radio>
            <el-radio :label="3">职能部门</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="所属组织"
          class="el_form_item_pos"
          prop="parentGuid"
          :rules="validate.vdRequired()"
        >
          <Tree
            :nodes="ManageList"
            :showCheckbox="false"
            :defaultProps="nodeName"
            :lazy="true"
            @change="chooseParent"
            :loadNode="loadNode"
            :isShowSearch="false"
            v-model="addForm.deptGuid"
            nodeKey="departGuid"
            treeId="departGuid"
            ref="tree"
          ></Tree>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
const addObject = {
  qiyeBumen: 1, // 组织类型
  deptName: "", // 企业名称 / 部门名称
  qiyeDaima: "", // 企业代码
  deptType: 1, // 企业代码
  deptGuid: ''
};
import Tree from "@/components/tree/choise-tree";
export default {
  name: "add-organization",
  components: {
    Tree
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      addForm: Object.assign({}, addObject, this.value),
      ManageList: this.$store.state.roleAnddepartment.copyDepartment,
      nodeName:{
        children: "children",
        label: "departName"
      }
    };
  },
  methods: {
    /**
     * 查询-加载子节点
     */
    loadNode(node, resolve) {
      
      if (node.level == 0 && node.data.constructor == Array) {
        resolve(node.data)
        this.$nextTick(() => {
          this.$refs.tree.initData(this.value.deptGuid)
        })
      }
      else if (node.data && node.data.children && node.data.children.length> 0) {
        resolve(node.data.children)
      }
      else if (node.data.departGuid) {
        this.portService.userManageList({pid: node.data.departGuid}).then((res) => {
          let data = res.data.data;
          data = data.filter(t => t.state === 'closed')
          if (res.code) resolve(data)
          this.$nextTick(() => {
            // this.$refs.tree.initData(this.value.deptGuid)
            // 这个应该传父节点id吧
            this.$refs.tree.initData(this.value.parentGuid)
          })
          
        })
      } else {
        resolve([])
      }
    },
    validata(fn) {
      this.$refs.form.validate(v => {
        if (v && fn) fn(this.addForm);
      });
    },
    /**
     * 选择父节点
     */
    chooseParent(node){
        this.addForm.parentGuid = node;
    }
  }
};
</script>