<template>
  <div class="navbar" :style="{ padding: padding ? '0 20px' : '' }">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in navs" :key="item.path">
        <span v-if="index == navs.length - 1">{{ item.meta.title }}</span>
        <router-link :to="item.path" v-else>{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="nav-right">
      <el-button
        v-if="showBack"
        type="primary"
        class="nav-back-button"
        @click="$router.back(-1)"
        ><i class="iconfont icon-fanhui"></i>返回</el-button
      >
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'NavBar',
  props: {
    showBack: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    padding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navs: [],
    };
  },
  mounted() {
    if (this.breadcrumbs.length > 0) {
      this.navs = this.breadcrumbs;
    } else {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      const { breadcrumbs } = this.$route.meta;
      let matched = [];
      if (breadcrumbs && breadcrumbs.length > 0) {
        matched = breadcrumbs;
      } else {
        matched = _.uniqBy(this.$route.matched, 'path');
      }
      matched = _.filter(matched, (item) => {
        return item.meta.title;
      });
      const first = matched[0];
      if (
        first &&
        first.path &&
        first.path.trim().toLowerCase !== '/dashboard'
      ) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(
          matched
        );
      }
      this.navs = matched;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 40px;
  // padding: 0 20PX;
  ::v-deep .el-breadcrumb__item {
    .el-breadcrumb__inner {
      & > * {
        font-size: 14px;
      }
    }
  }
  .nav-right {
    margin-left: auto;
  }
  .nav-back-button {
    width: 70px;
    height: 26px;
    border-radius: 16px;
    padding: 0;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.65);
    align-items: center;
    border-color: rgba(0, 0, 0, 0.1);
    i {
      margin-right: 5px;
    }
  }
}
</style>
