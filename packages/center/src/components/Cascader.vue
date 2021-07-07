<template>
  <div class="cascader clearfix">
    <el-select v-model="baseDataForm.industryType" placeholder="请选择" style="margin-right: 18px;" @change="changFather" :disabled="disabledIndustry">
      <el-option v-for="item in industryTypeoptions" :key="item.cid" :label="item.name" :value="item.cid"></el-option>
    </el-select>
    <el-select v-model="baseDataForm.industryType2" placeholder="请选择" style="margin-right: 18px;" @change="changFather2" :disabled="disabledIndustry">
      <el-option v-for="item in industryTypeoptions2" :key="item.cid" :label="item.name" :value="item.cid"></el-option>
    </el-select>
    <el-select v-model="baseDataForm.industryType3" placeholder="请选择" style="margin-right: 18px;" @change="changFather3" :disabled="disabledIndustry">
      <el-option v-for="item in industryTypeoptions3" :key="item.cid" :label="item.name" :value="item.cid"></el-option>
    </el-select>
  </div>
</template>
<script>
import hyfl from "@/assets/js/hyfl.js";

export default {
  name: "Cascader",
  props: {
    cascaderData: {
      type: Array,
      default: () => ([])
    },
    disabledIndustry: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseDataForm: {
        industryType: "",
        industryType2: "",
        industryType3: "",
      },
      industryTypeoptions: [],
      industryTypeoptions2: [],
      industryTypeoptions3: [],
      options: hyfl,
    };
  },
  created() {
    this.options.map((v) => {
      this.industryTypeoptions.push({ cid: v.cid, name: v.name });
    });
  },
  mounted() {
    this.getData()
  },
  methods: {
    changFather() {
      this.industryTypeoptions2 = "";
      this.industryTypeoptions3 = "";
      this.baseDataForm.industryType2 = "";
      this.baseDataForm.industryType3 = "";
      var data = this.options.filter((v) => v.cid == this.baseDataForm.industryType)[0];
      this.$emit("changData", data.cid, "1")
      this.industryTypeoptions2 = data.children;
      this.baseDataForm.industryType2 = this.industryTypeoptions2[0].cid;
      if (this.industryTypeoptions2[0].children) {
        this.industryTypeoptions3 = this.industryTypeoptions2[0].children;
        this.baseDataForm.industryType3 = this.industryTypeoptions2[0].children[0].cid;
        this.$emit("changData", this.baseDataForm.industryType2, "2")
        this.$emit("changData", this.baseDataForm.industryType3, "3")
        this.updateData(this.baseDataForm.industryType3);
      } else {
        this.$emit("changData", this.baseDataForm.industryType2, "2")
        this.$emit("changData", "", "3")
        this.updateData(this.baseDataForm.industryType2);
      }
    },
    changFather2() {
      this.industryTypeoptions3 = "";
      this.baseDataForm.industryType3 = "";
      var data = this.industryTypeoptions2.filter((v) => v.cid == this.baseDataForm.industryType2)[0];
      this.$emit("changData", data.cid, "2")
      if (data.children) {
        this.industryTypeoptions3 = data.children;
        this.baseDataForm.industryType3 = data.children[0].cid;
        this.$emit("changData", this.baseDataForm.industryType3, "3")
        this.updateData(this.baseDataForm.industryType3);
      } else {
        this.$emit("changData", "", "3")
      }
    },
    changFather3() {
      if (this.baseDataForm.industryType3) {
        this.$emit("changData", this.baseDataForm.industryType3, "3")
        this.updateData(this.baseDataForm.industryType3);
      }
    },
    updateData(data) {
      this.$emit("updateData", data);
    },
    getData() {
      if (this.cascaderData.length) {
        let yiIndex = this.options.findIndex(f => f.cid == this.cascaderData[0])
        this.baseDataForm.industryType = this.options[yiIndex].cid
        this.industryTypeoptions2 = this.options[yiIndex].children || []

        let erIndex = this.industryTypeoptions2.findIndex(f => f.cid == this.cascaderData[1])
        this.baseDataForm.industryType2 = this.industryTypeoptions2[erIndex].cid
        this.industryTypeoptions3 = this.industryTypeoptions2[erIndex].children || []

        if (this.cascaderData[2]) {
          let sanIndex = this.industryTypeoptions3.findIndex(f => f.cid == this.cascaderData[2])
          this.baseDataForm.industryType3 = this.industryTypeoptions3[sanIndex].cid
        } else {
          this.baseDataForm.industryTypeoptions3 = ""
        }
      }
    },
  },
  watch: {
    cascaderData: function(val, old){
      this.getData()
    },
  },
};
</script>

<style lang="scss" scoped>
.cascader {
  .el-select {
    width: 30%;
    float: left;
    margin-right: 3%;
  }
}
</style>
