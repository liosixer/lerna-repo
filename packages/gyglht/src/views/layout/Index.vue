<template>
  <el-container>
    <el-header height="70px" class="first-header" :class="bgClass">
      <headers></headers>
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
  </el-container>
</template>

<script>
import Siderbar from "./Siderbar.vue";
import Headers from "./Headers.vue";
import * as globalSetting from "@/setting";

export default {
  name: "layout",
  data() {
    return {};
  },
  provide: { globalSetting },
  computed: {
    isCollapse() {
      return this.$store.state.frame.collapsed;
    },
    bgClass() {
      return this.$store.state.frame.colors;
    },
  },
  components: { Siderbar, Headers },
  created() {
    this.$store.dispatch("updateCurrentTime")
  },
  methods: {},
};
</script>
<style>
.anchor_wraper {
  z-index: 999;
}
</style>

<style lang="scss" scoped>
.first-header {
  position: relative;
  -webkit-box-shadow: 0 1px 11px 1px #eee;
  -moz-box-shadow: 0 1px 11px 1px #eee;
  box-shadow: 0 1px 11px 1px #eee;
  z-index: 2000;
  background: #fff;
  display: flex;
  align-items: center;
}
.el-container {
  height: 100%;

  .el-header {
    padding: 0;
  }

  .inner-cont {
    height: calc(100% - 70px); /*no*/
  }

  .el-aside {
    height: 100%;
    width: 208px !important; /*no*/
    position: relative;
    transition: all 0.28s ease-in;
    box-shadow: 1px 0px 14px 0px rgba(77, 88, 115, 0.2); /*no*/
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
  }

  .dark {
    height: 100%;
    background: url("../../assets/images/frame/bj.png") no-repeat;
  }

  .wight {
    height: 100%;
    background: url("../../assets/images/frame/bj1.png") no-repeat;
  }
}
.el-aside.dark {
  z-index: 99999;
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
