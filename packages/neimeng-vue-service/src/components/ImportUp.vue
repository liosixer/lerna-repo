<template>
  <div class="fl" style="margin:0 10px;">
    <el-upload
      :headers="token"
      accept=".xls"
      :action="upUrl"
      multiple
      :show-file-list="false"
      :on-success="uploadSuccess"
    >
      <el-button size="small" type="text">
        <i class="iconfont icon-jinru"></i> 导入
      </el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "import",
  props: {
    upUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      token: {
        Authorization: "Bearer " + this.$store.state.loginCookie.access_token,
      },
    };
  },
  methods: {
    // 导入成功
    uploadSuccess(res) {
      console.log(res);
      if (res.code == 1) {
        this.$emit("uploadSuccess","")
      }
    },
  },
};
</script>