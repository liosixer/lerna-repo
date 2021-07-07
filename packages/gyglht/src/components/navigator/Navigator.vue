<template>
  <!-- <div class="page-crumb clearfix">
    <i class="crumb-icon iconfont icon-shouye"></i> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <i class="crumb-icon iconfont icon-shouye"></i>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item of linkNav"
        :key="item.name"
        :to="{ path: item.path }"
        >{{ item.meta.routeName }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'Navigator',
  data () {
    return {
      routes: this.$route.matched,
    }
  },
  computed: {
    linkNav () {
      return this.routes.slice(0, this.routes.length - 1)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.routes = to.matched.map(item => {
          if (item.meta && item.meta.routeName) {
            return item
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-crumb {
    height: 52px;
    display: flex;
    .breadcrumb {
        flex:1;
        height:50px;
        line-height: 60px;
        .el-breadcrumb__item {
            .el-breadcrumb__separator, .el-breadcrumb__inner {
                font-size: 14px;
            }
        }
    }
    .crumb-icon{
        line-height: 60px;
        font-size: 14px;
        flex-shrink: 0;
        padding:0 5px 0 20px;
    }
}
</style>
