<template>
  <div class="login">
    <div class="login-box">
      <el-button @click="showDailog" type="primary">点击(带query)</el-button>
      <el-button @click="showDailog2" type="primary">点击(带多选)</el-button>
    </div>
    <div class="approvalDemo">
      <about-approval>
        <el-button type="primary" slot="midBtn">保存</el-button>
      </about-approval>
    </div>
    <cascader @updateData="updateData" :cascaderData="cascaderData"></cascader>
    <dailog ref="demoDailog" query="1" :interface="interfaces" @getDetail="getDetail" :configuration="configuration"></dailog>
    <dailog ref="demoDailog2" interface="projectGetAllUser" @getDetail="getDetail2" :configuration="configuration2" select="true" persistentData="projectUserGuid"></dailog>
  </div>
</template>

<script>
import Dailog from "@/components/dailog/Dailog";
import AboutApproval from "@/components/dailog/AboutApproval";
import Cascader from "@/components/Cascader";

export default {
  name: "Demo",
  components: { Dailog, AboutApproval, Cascader },
  data() {
    return {
      configuration: {
        title: "这是标题",
        searchItem: { code: "标段编号", name: "标段名称" },
        tableItem: { bdName: "标段名称", bDBH: "标段编号" },
      },
      cascaderData: "",
      configuration2: {
        title: "这是标题2",
        searchItem: { name: "人员姓名2", department: "部门2" },
        tableItem: { projectUserName: "人员姓名2", deptName: "所属部门2" },
      },
      interfaces: "sendMbdList",
    };
  },
  methods: {
    showDailog() {
      this.$refs.demoDailog.dialogFormVisible = true;
      this.$refs.demoDailog.getList();
    },
    showDailog2() {
      this.$refs.demoDailog2.dialogFormVisible = true;
      this.$refs.demoDailog2.getList();
    },
    getDetail() {},
    getDetail2() {},
    updateData(data) {
      console.log(data);
    },
  },
  created() {
    this.cascaderData = "6B5D3EFB-6A9E-40E1-94A3-580BA9C52C1F";
  },
};
</script>
<style lang="scss" scoped></style>
