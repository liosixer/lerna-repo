<template>
  <div class="err_page">
        <h1>嗯？此路不通</h1>
        <img src="../assets/images/404/404_wenzi_03.png" alt="">
        <h2>您可以选择返回上一页或者返回首页</h2>
        <div class="btn_option">
          <el-button type="info" @click="$router.go(-1)">返回上一页</el-button>
          <el-button type="info" @click="$router.push('/template/template')">返回首页</el-button>
        </div>
  </div>
</template>

<script>

export default {
  name: "Err",
  data() {
    return {

    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.err_page {
  background: url('../assets/images/404/404bg.png') no-repeat;
  height: 100%;
  width: 100%;
  -moz-background-size: cover;
  background-position: center center;
  background-size: cover;
  text-align: center;
  overflow: hidden;
  h1 {
    font-size: 40px;
    margin: 60px 0 40px 0;
  }
  h2 {
    font-size: 35px;
    margin: 20px;
  }
  img {
    max-width: 100%;
    max-height: 100%
  }
}

.btn_option {
  .el-button {
      color: #FFF;
      background-color: #272d33;
      border-color: #272d33;
  }
}
</style>
