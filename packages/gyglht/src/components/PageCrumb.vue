<template>
  <div class="page-crumb clearfix">
    <i class="crumb-icon iconfont icon-shouye"></i>
    <el-breadcrumb class=" breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, key) in d.breadcrumbList" :key="key" :to="{ path: item.link }">
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <slot name="btns"></slot>
  </div>
</template>

<script>
export default {
  name: "page-header",
  data() {
    return {};
  },
  props: ["d"],
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-crumb {
  width: 100%;
  padding: 15px 20px 15px 0;
  height: 60px;
  line-height: 60px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /*border-bottom: 1px solid #d8dde8;*/
  /*box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);*/
  .crumb-icon {
    position: relative;
    top: 0px;
    /*top: 50%;
            transform: translate(0%, -50%);*/
    left: 17px;
    font-size: 14px; /*no*/
    font-weight: 700;
  }
  .breadcrumb {
    flex: 1;
    padding-left: 25px;
    line-height: 40px;
  }
  ::v-deep.el-button--small,
  .el-button--small.is-round {
    padding: 9px 15px; /*no*/
  }
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: 400;
}
@media screen and(max-width: 1366px) {
  .page-crumb {
    height: 45px; /*no*/
    padding-top: 10px; /*no*/
    .crumb-icon {
      font-size: 14px; /*no*/
      margin-right: 2px; /*no*/
    }

    ::v-deep.el-button--small,
    .el-button--small.is-round {
      padding: 6px 10px; /*no*/
    }
  }
}
</style>
<style lang="scss">
.page-crumb {
  .el-breadcrumb__item {
    .el-breadcrumb__separator,
    .el-breadcrumb__inner {
      font-size: 14px;
    }
  }
}
</style>
