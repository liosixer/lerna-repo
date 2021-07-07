<template>
  <div class="siderbar-box" :class="{ collapsider: isCollapse }">
    <el-menu
      :class="menuClass"
      :default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
      router
    >
      <template v-for="item of menuList">
        <el-submenu :index="item.index" v-if="!item.path">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <MenuTree :menuList="item.children"></MenuTree>
        </el-submenu>
        <el-menu-item v-else :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import MenuTree from "./MenuTree";
import menuData from './menuData'
export default {
  name: "Siderbar",
  components: { MenuTree },
  data() {
    return {
      menuList: []
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.frame.collapsed;
    },
    activePath() {
      return this.$route.path;
    },
    menuClass() {
      return this.$store.state.frame.colors;
    }
  },
  created() {
    this.getUserAuth();
    // this.getMenuList()
  },
  methods: {
    // getUserAuth
    async getUserAuth() {
      let data = await this.portService.getUserAuth()
      if (data.code) {
        this.menuList = this.addIndex(data.data);
      }
    },
    getMenuList() {
      this.menuList = this.addIndex(menuData);
    },
    linkTo(name) {
      this.$router.push({ name: name });
    },
    handleOpen() {},
    handleClose() {},
    addIndex(data, fatherIndex = 0) {
      if (fatherIndex) {
        return data.map((v, i) => {
          v.index = fatherIndex + (i + 1).toString();
          if (v.children) {
            this.addIndex(v.children, v.index);
          }
          return v;
        });
      } else {
        return data.map((v, i) => {
          v.index = (i + 1).toString();
          if (v.children) {
            this.addIndex(v.children, v.index);
          }
          return v;
        });
      }
    }
  },
  watch: {
    "$store.state.roleAnddepartment.enterPriseInfo": {
      handler(data) {
        if (data) {
          // this.getMenuList();
          this.getUserAuth()
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .dark {
    background-color: #23374a;
    .el-menu-item {
      span {
        color: #6a747e;
      }
    }
    .el-menu {
      background-color: #23374a;
    }
    .el-submenu__title {
      span {
        color: #6a747e;
      }
    }
    .el-menu-item.is-active {
      background-color: #0a83f4;
      color: #fff;
      span {
        color: #fff;
      }
      i {
        color: #fff;
      }
    }
    .el-menu-item:hover {
      background-color: #177edf !important;
      color: #fff;
      span {
        color: #fff;
      }
      i {
        color: #fff;
      }
    }
    .el-submenu__title:hover {
      background-color: #177edf !important;
      color: #fff;
      i {
        color: #fff;
      }
      span {
        color: #fff;
      }
    }
    .el-submenu.is-opened {
      background: #1d2f40;
      .el-menu--inline {
        background: #1d2f40;
      }
    }
  }
  .wight {
    background: url("../../assets/images/frame/menuBj.png") left bottom no-repeat;
    /* background-size: 200px 210px; */
    background-color: #fff;
    .el-menu-item,
    .el-submenu__title {
      span {
        font-size: 14px; /*no*/
        color: #26263a;
      }
    }
    .el-menu-item.is-active {
      border-right: none;
      background-color: #fff;
      font-weight: 700;
      position: relative;
      span {
        padding: 2px 7px; /*no*/
        border-radius: 4px; /*no*/
        color: #d6001d;
        margin-left: -7px; /*no*/
      }
    }
    .el-menu-item.is-active i {
      color: #d6001d;
    }
    .el-menu-item.is-active::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px; /*no*/
      height: 16px; /*no*/
      background: #d6001d;
      border-radius: 2px 0px 0px 2px; /*no*/
    }
    .el-menu-item:hover,
    .el-submenu__title:hover,
    .el-menu-item.is-active:hover {
      background-color: #fff !important;
      color: #d6001d;
      position: relative;
      i,
      span {
        color: #d6001d;
      }
    }
    .el-submenu__title:hover {
      background-color: #fff;
      color: #d6001d;
      position: relative;
      i,
      span {
        color: #d6001d;
      }
    }
    .el-menu-item:hover::after,
    .el-submenu__title:hover::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px; /*no*/
      height: 16px; /*no*/
      background: #d6001d;
      border-radius: 2px 0px 0px 2px; /*no*/
    }
  }
  // .el-menu-item {
  //   width: 183PX !important;/*no*/
  //   min-width: 183PX;/*no*/
  // }
  .el-submenu__title {
    width: 208px; /*no*/
  }
  .el-submenu .el-menu-item {
    width: 207px !important; /*no*/
    min-width: 207px;
    height: 50px !important; /*no*/
    line-height: 50px !important; /*no*/
    padding-left: 51px !important; /*no*/
  }
  .el-submenu [class^="el-icon-"],
  .el-menu-item [class^="el-icon-"] {
    font-size: 16px /*no*/;
  }
  .siderbar-box ::v-deep.el-submenu__icon-arrow {
    font-size: 16px; /*no*/
  }
  .siderbar-box {
    ::v-deep.el-submenu__title,
    ::v-deep.el-menu-item {
      height: 50px; /*no*/
      line-height: 50px; /*no*/
    }
  }
  .el-menu--vertical {
    .el-menu-item {
      height: 50px; /*no*/
      line-height: 50px; /*no*/
      font-size: 16px; /*no*/
    }
  }
  .siderbar-box[data-v-7665dbf3] .el-submenu__title,
  .siderbar-box[data-v-7665dbf3] .el-menu-item {
    height: 50px; /*no*/
    line-height: 50px; /*no*/
  }

  .dark {
    .el-menu-item,
    .el-submenu__title {
      span {
        font-size: 14px; /*no*/
        color: #ccc;
      }
      .iconfont {
        color: #ccc;
      }
    }
    .el-menu-item.is-active {
      span {
        color: #fff;
      }
    }

    .el-menu-item:hover,
    .el-submenu__title:hover,
    .el-menu-item.is-active:hover,
    .el-menu-item:focus {
      background-color: #177edf !important;
      color: #fff;
      i,
      span {
        color: #fff;
      }
    }
    .el-submenu__title:hover {
      background-color: #177edf;
      color: #fff;
      i,
      span {
        color: #fff;
      }
    }
  }

  .wight {
    .el-menu-item,
    .el-submenu__title {
      span {
        font-size: 14px; /*no*/
        color: #26263a;
      }
    }
    .el-menu-item.is-active {
      span {
        color: #d6001d;
      }
    }

    .el-menu-item:hover,
    .el-submenu__title:hover,
    .el-menu-item.is-active:hover,
    .el-menu-item:focus {
      background-color: #fff !important;
      color: #d6001d;
      i,
      span {
        color: #d6001d;
      }
    }
    .el-submenu__title:hover {
      background-color: #fff;
      color: #d6001d;
      i,
      span {
        color: #d6001d;
      }
    }
  }

  @media screen and (max-width: 1366px) {
    /*缩小导航显示出来的菜单 */
    .el-menu--vertical {
      .el-menu--popup {
        min-width: 130px; /*no*/
      }
      .el-menu-item {
        width: 183px !important; /*no*/
        height: 50px; /*no*/
        line-height: 50px; /*no*/
        font-size: 12px; /*no*/
      }
    }
    .el-submenu .el-menu-item {
      width: 183px !important; /*no*/
      min-width: 183px;
    }
  }
</style>
<style lang=scss scoped>
  .siderbar-box {
    height: 100%;
    width: 208px; /*no*/
    overflow: hidden;
    transition: transform 0.28s;
    border-right: 1px solid #ebeef5;
    .el-menu {
      width: 226px; /*no*/
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-menu-vertical-demo {
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 15px;
    }
    ::v-deep.el-menu {
      .el-menu--collapse {
        width: 64px; /*no*/
      }

      /*收起导航宽度设置*/
      &.el-menu-vertical-demo.el-menu--collapse {
        width: 64px !important; /*no*/
        .el-menu-item {
          width: 60px !important; /*no*/
          min-width: 60px !important; /*no*/
          font-size: 14px; /*no*/
        }

        .el-submenu__title {
          width: 60px !important; /*no*/
          span {
            font-size: 12px;
          }
        }
        .el-submenu .el-menu-item {
          width: 60px !important; /*no*/
          min-width: 60px !important; /*no*/
          font-size: 14px;
        }
        .el-menu--vertical .el-menu-item {
          font-size: 14px !important;
        }
      }
    }
  }
  /*::v-deep.el-menu-item:focus, ::v-deep.el-menu-item:hover{*/
  /*    background-color: #fff !important;*/
  /*  }*/
  .siderbar-box.collapsider {
    ::v-deep.el-menu-item {
      .el-tooltip {
        padding-left: 15px !important;
      }
    }
    ::v-deep.el-submenu > .el-submenu__title {
      padding-left: 15px !important;
    }
  }
  .collapsider {
    width: 55px; /*no*/
    transition: all 0.28s ease-in;
  }
  /*
  适配小屏幕 1366px
  */
  @media screen and (max-width: 1366px) {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 150px !important; /*no*/
      min-height: 300px !important; /*no*/
    }
    .siderbar-box {
      width: 183px !important; /*no*/
      ::v-deep.el-submenu__title,
      ::v-deep.el-menu-item {
        height: 50px; /*no*/
        line-height: 50px; /*no*/
      }
      &.collapsider {
        width: 60px !important; /*no*/
      }
      ::v-deep.el-menu {
        width: 192px !important; /*no*/
        /*收起导航宽度设置*/
        &.el-menu-vertical-demo.el-menu--collapse {
          width: 60px !important; /*no*/
          .el-menu-item {
            width: 60px !important; /*no*/
            min-width: 60px !important; /*no*/
          }
          .el-submenu__title {
            width: 60px !important; /*no*/
          }
          .el-submenu .el-menu-item {
            width: 60px !important; /*no*/
            min-width: 60px !important; /*no*/
          }
        }
        .el-submenu__title {
          width: 183px !important; /*no*/
        }
        .el-submenu .el-menu-item {
          width: 183px !important; /*no*/
          min-width: 183px !important; /*no*/
        }
        .el-menu-item {
          width: 183px !important; /*no*/
        }
        .el-menu-item,
        .el-submenu__title {
          span {
            font-size: 12px; /*no */
          }
        }
        .el-submenu [class^="el-icon-"],
        .el-menu-item [class^="el-icon-"] {
          /* font-size: 14PXno; */
        }
      }
      /*菜单样式*/
      ::v-deep.el-submenu {
        .el-menu-item {
          height: 50px; /*no*/
          line-height: 50px; /*no*/
        }
      }
      ::v-deep.el-submenu__icon-arrow {
        /* font-size:14PX;no */
      }
    }

    .siderbar-box.collapsider {
      ::v-deep.el-menu-item {
        .el-tooltip {
          padding-left: 17px !important;
        }
      }
      ::v-deep.el-submenu > .el-submenu__title {
        padding-left: 23px !important;
      }
    }
  }
  .iconfont {
    font-size: 14px; /*no*/
    margin: 0 10px 0 5px; /*no*/
    color: #26263a;
  }
  .icon-caigoujihua,
  .icon-xiangmuguanli,
  .icon-chengxinguanli,
  .icon-baozhengjinliushui,
  .icon-feiyongguanli1 {
    font-size: 16px; /*no*/
  }
  .icon-caigoujihua,
  .icon-weituo {
    font-size: 17px; /*no*/
    margin: 0 8px 0 5px; /*NO*/
  }
  .icon-feiyongguanli {
    font-size: 20px; /*no*/
    margin: 0 8px 0 4px; /*no*/
  }
  .icon-gongzuotai {
    font-size: 20px; /*no*/
    margin: 0 7px 0 2px; /*no*/
  }
  .icon-baozhengjinliushui {
    font-size: 18px; /*no*/
    margin: 0 10px 0 4px; /*no*/
  }
  .icon-feiyongguanli1,
  .icon-xinxi {
    font-size: 15px; /*no*/
    margin: 0 12px 0 5px; /*no*/
  }
  .icon-yuyue {
    font-size: 18px; /*no*/
    margin: 0 8px 0 5px; /*no*/
  }
  .icon-shangbiaoyiyidabian {
    margin: 0 8px 0 7px; /*no*/
  }
</style>
