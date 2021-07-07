<template>
  <div>
    <el-form ref="form" :model="ruleForm" label-width="120px" size="small" label-position="right">
      <el-form-item label="权限类型：" prop="authLeiXing" :rules="validate.vdRequired()">
        <el-radio-group v-model="ruleForm.authLeiXing" :disabled="isForbiddenType">
          <el-radio :label="1">模块</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="所属模块"
        class="el_form_item_pos"
        prop="parentGuid"
        :rules="validate.vdRequired()"
        v-if="ruleForm.authLeiXing == 2"
      >
        <!-- <Tree
          :lazy="false"
          :defaultProps="defaultProps"
          :nodes="ManageList"
          :showCheckbox="false"
          @click="handleShowSelector"
          :isShowSearch="false"
          v-model="ruleForm.parentGuid"
          :checkeds="userDepartment"
          @setNode="handleSetNode"
          showctr
          objed
          treeId="id"
          ref="id"
        ></Tree>-->
        <Tree
          :nodes="ManageList"
          :showCheckbox="false"
          :isShowSearch="false"
          v-model="ruleForm.parentGuid"
          :defaultProps="{ children: 'children', label: 'name' }"
          nodeKey="id"
          treeId="id"
        ></Tree>
      </el-form-item>
      <el-form-item label="权限名称：" prop="authName" :rules="validate.vdLength(255,true)">
        <el-input size="small" v-model="ruleForm.authName"></el-input>
      </el-form-item>
      <el-form-item label="权限描述：" prop="authDesc" :rules="validate.vdLength(255,true)">
        <el-input size="small" v-model="ruleForm.authDesc"></el-input>
      </el-form-item>
      <el-form-item label="权限url地址：" prop="authUrls" >
        <el-input size="small" v-model="ruleForm.authUrls"></el-input>
      </el-form-item>
      <el-form-item label="模块icon：" prop="authIcon" :rules="validate.vdLength(255,true)">
        <el-input size="small" v-model="ruleForm.authIcon"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import Tree from "@/components/tree/Tree";
import Tree from "@/components/tree/choise-tree";
const addObject = {
  guid: "",
  subSystemId: "",
  authLeiXing: 1,
  authName: "",
  authDesc: "",
  authIcon: "",
  authUrls: "",
  parentGuid: "",
  orderNum: ""
};
export default {
  data() {
    return {
      setText: "",
      dialogVisible: false,
      ManageList: [],
      ruleForm: Object.assign({}, addObject, this.value),
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    //权限类型禁用
    isForbiddenType: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userDepartment() {}
  },
  mounted() {
    console.log(this.ruleForm);
  },
  components: {
    Tree
  },
  methods: {
    handleShowSelector() {},
    handleSetNode(data) {
      console.log(data);
      this.ruleForm.parentGuid = data.id;
    },

    /**
     * 查看子系统所有权限
     */
    async getSubSystemIdAuthTreeMethods() {
      const res = await this.portService.getSubSystemIdAuthTree({
        subSystemId: this.$route.query.id
      });
      if (res.code == 200) {
        let arr = res.data.authTreeList;
        arr.forEach(element => {
          element.children = [];
        });
        this.ManageList = arr;
      }
    },
    /**
     * 查看权限信息详情
     */
    async showAuthDetailMethods(id) {
      const res = await this.portService.showAuthDetail({
        guid: id
      });
      if (res.code == 200) {
        this.ruleForm = res.data.sysAuth;
      }
    },
    validata(fn) {
      this.$refs.form.validate(v => {
        if (v && fn) fn(this.ruleForm);
      });
    }
  },
  created() {
    this.getSubSystemIdAuthTreeMethods();
  }
};
</script>