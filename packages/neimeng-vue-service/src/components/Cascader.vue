<template>
  <div class="cascader clearfix">
    <el-select v-model="baseDataForm.industryType" placeholder="" @change="changFather" :disabled="isDisabled">
      <el-option v-for="item in industryTypeoptions" :key="item.cid" :label="item.name" :value="item.cid"></el-option>
    </el-select>
    <el-select v-model="baseDataForm.industryType2" placeholder="" @change="changFather2" :disabled="isDisabled">
      <el-option v-for="item in industryTypeoptions2" :key="item.cid" :label="item.name" :value="item.cid"></el-option>
    </el-select>
    <el-select v-model="baseDataForm.industryType3" placeholder="" @change="changFather3" :disabled="isDisabled">
      <el-option v-for="item in industryTypeoptions3" :key="item.cid" :label="item.name" :value="item.cid"></el-option>
    </el-select>
  </div>
</template>
<script>
import hyfl from "@/assets/js/hyfl.js";

export default {
  name: "Cascader",
  props: {
    cascaderData: "",
    isDisabled: {
      type: Boolean,
      default: false,
    },
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
  methods: {
    changFather() {
      this.industryTypeoptions2 = "";
      this.industryTypeoptions3 = "";
      this.baseDataForm.industryType2 = "";
      this.baseDataForm.industryType3 = "";
      var data = this.options.filter((v) => v.cid == this.baseDataForm.industryType)[0];
      this.industryTypeoptions2 = data.children;
      this.baseDataForm.industryType2 = this.industryTypeoptions2[0].cid;
      if (this.industryTypeoptions2[0].children) {
        this.industryTypeoptions3 = this.industryTypeoptions2[0].children;
        this.baseDataForm.industryType3 = this.industryTypeoptions2[0].children[0].cid;
        this.updateData(this.baseDataForm.industryType3);
      } else {
        this.updateData(this.baseDataForm.industryType2);
      }
    },
    changFather2() {
      this.industryTypeoptions3 = "";
      this.baseDataForm.industryType3 = "";
      var data = this.industryTypeoptions2.filter((v) => v.cid == this.baseDataForm.industryType2)[0];
      if (data.children) {
        this.industryTypeoptions3 = data.children;
        this.baseDataForm.industryType3 = data.children[0].cid;
        this.updateData(this.baseDataForm.industryType3);
      } else {
        this.updateData(this.baseDataForm.industryType2);
      }
    },
    changFather3() {
      if (this.baseDataForm.industryType3) {
        this.updateData(this.baseDataForm.industryType3);
      }
    },
    updateData(data) {
      this.$emit("updateData", data);
      this.$emit("secondData", this.baseDataForm.industryType2);
    },
  },
  watch: {
    cascaderData: {
      handler(n, o) {
        if (this.cascaderData) {
          this.options.map((v) => {
            v.children.map((v2) => {
              if (v2.children) {
                if(v2.cid == this.cascaderData){
                  this.baseDataForm.industryType = v.cid;
                  this.baseDataForm.industryType2 = v2.cid;
                  this.industryTypeoptions2 = v.children;
                  this.industryTypeoptions3 = v2.children;
                }
                v2.children.map((v3) => {
                  if (v3.cid == this.cascaderData) {
                    this.baseDataForm.industryType = v.cid;
                    this.baseDataForm.industryType2 = v2.cid;
                    this.industryTypeoptions2 = v.children;
                    this.baseDataForm.industryType3 = v3.cid;
                    this.industryTypeoptions3 = v2.children;
                  }
                });
              } else {
                if (v2.cid == this.cascaderData) {
                  this.baseDataForm.industryType = v.cid;
                  this.baseDataForm.industryType2 = v2.cid;
                  this.industryTypeoptions2 = v.children;
                }
              }
            });
          });
        }
        this.$emit("secondData", this.baseDataForm.industryType2);
      },
    },
  },
};
</script>

<style lang="scss">
.cascader {
  .el-select {
    width: 30%;
    float: left;
    margin-right: 3%;
  }
}
</style>
