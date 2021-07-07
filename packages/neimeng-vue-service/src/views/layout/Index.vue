<template>
  <el-container>
    <el-header height="70px" class="first-header" :class="bgClass">
      <headers v-if="isShow"></headers>
    </el-header>
    <el-container class="inner-cont">
      <el-aside :class="[isCollapse ? 'asidecoll' : '', bgClass]">
        <siderbar ref="siderBar"></siderbar>
      </el-aside>
      <el-main :class="bgClass">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
    <i class="common-header-fold" @click="collapseClk">
      <template v-if="theme">
        <img
          v-if="headerOpen"
          src="@/assets/images/frame/header-close1.png"
          alt
        />
        <img v-else src="@/assets/images/frame/header-open1.png" alt />
      </template>
      <template v-else>
        <img
          v-if="headerOpen"
          src="@/assets/images/frame/header-close.png"
          alt
        />
        <img v-else src="@/assets/images/frame/header-open.png" alt />
      </template>
    </i>
  </el-container>
</template>

<script>
import Siderbar from './Siderbar.vue';
import Headers from './Headers.vue';
import * as globalSetting from '@/setting';
import { getUserInfo } from '@/service/index';
export default {
  name: 'layout',
  data() {
    return {
      isShow: false,
      headerOpen: true,
    };
  },
  provide: { globalSetting },
  computed: {
    isCollapse() {
      return this.$store.state.frame.collapsed;
    },
    bgClass() {
      return this.$store.state.frame.colors;
    },
    theme() {
      if (
        this.$store.state.frame.colors === 'dark' ||
        this.$store.state.frame.colors === 'dark-red' ||
        this.$store.state.frame.colors === 'dark-blue'
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  components: { Siderbar, Headers },
  created() {
    // getUserInfo().then((result) => {
    //   if (result.code === 1) {
    //     // A：招标代理   B：招标人   T：投标人
    //     let isAngency;
    //     if (result.data.type.indexOf('A') != -1) {
    //       isAngency = true;
    //     } else {
    //       isAngency = false;
    //     }
    //     result.data.isAngency = isAngency;
    //     this.$store.commit('changeUserType', result.data);
    //     this.isShow = true;
    //   }
    // });
    this.isShow = true;
  },
  methods: {
    collapseClk() {
      this.headerOpen = !this.headerOpen;
      this.$store.commit('toggleSideBar');
    },
  },
};
</script>
<style lang="scss" scoped>
.common-header-fold {
  display: inline-block;
  width: 20px; /*no*/
  height: 20px; /*no*/
  margin-left: 15px; /*no*/
  cursor: pointer;
  position: absolute;
  bottom: 40px; /*no*/
  z-index: 99999;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
.first-header {
  position: relative;
  -webkit-box-shadow: 0px 5px 16px 0px rgba(14, 26, 37, 0.06);
  -moz-box-shadow: 0px 5px 16px 0px rgba(14, 26, 37, 0.06);
  box-shadow: 0px 5px 16px 0px rgba(14, 26, 37, 0.06);
  z-index: 1887;
  background: #fff;
  display: flex;
  align-items: center;
}
.el-container {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  .el-header {
    padding: 0;
  }

  .inner-cont {
    height: calc(100% - 70px); /*no*/
  }

  .el-aside {
    height: 100%;
    width: 200px !important; /*no*/
    position: relative;
    transition: all 0.28s ease-in;
    box-shadow: 1px 0px 14px 0px rgba(77, 88, 115, 0.2); /*no*/
    background: url('../../assets/images/frame/sider_bg_dark.png') no-repeat;
    background-size: 100% auto;
    background-position: center bottom;
    background-color: #0e2b53;

    &.dark {
      background: url('../../assets/images/frame/sider_bg_dark.png') no-repeat;
      background-size: 100% auto;
      background-position: center bottom;
      background-color: #1d2127;
    }
    &.dark-red {
      background: url('../../assets/images/frame/sider_bg_dark.png') no-repeat;
      background-size: 100% auto;
      background-position: center bottom;
      background-color: #1d2127;
    }
    &.dark-blue {
      background: url('../../assets/images/frame/sider_bg_dark.png') no-repeat;
      background-size: 100% auto;
      background-position: center bottom;
      background-color: #2d3743 !important;
    }
  }

  .asidecoll {
    width: 55px !important;
    transition: all 0.28s ease-in;
  }

  .el-main {
    background-size: cover;
    box-sizing: border-box;
    padding: 0;
    height: 100%;
    overflow-x: hidden;
    background: #f5f6f8;
    & > * {
      height: 100%;
    }
  }

  .dark {
    height: 100%;
    /*background: url("../../assets/images/frame/bj.png") no-repeat;*/
  }

  .wight {
    height: 100%;
    /*background: url("../../assets/images/frame/bj1.png") no-repeat;*/
  }
}
.el-aside.dark {
  z-index: 1888;
}
.el-aside.wight {
  z-index: 99;
}
@media screen and (max-width: 1366px) {
  .el-container .el-aside {
    width: 183px !important; /*no*/
    &.asidecoll {
      width: 51px !important; /*no*/
    }
  }
}
</style>
