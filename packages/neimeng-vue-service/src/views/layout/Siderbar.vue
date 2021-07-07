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
        <el-submenu
          :index="item.index"
          v-if="!item.path"
          :key="item.index"
          class="has-children"
        >
          <template slot="title">
            <i class="sideIcon" :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
            <span
              v-if="item.todoTip || item.todoTip === 0"
              style="color: #d6001d;"
              >（{{ item.todoTip }}）</span
            >
          </template>
          <MenuTree :menuList="item.children"></MenuTree>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.path">
          <i class="sideIcon" :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
          <span
            v-if="item.todoTip || item.todoTip === 0"
            style="color: #d6001d;"
            >（{{ item.todoTip }}）</span
          >
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import MenuTree from './MenuTree';
import { getUserInfo } from '@/service/index';

export default {
  name: 'Siderbar',
  components: { MenuTree },
  data() {
    return {
      menuList: [],
      isCgr: true,
      headerOpen: false,
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
    },
  },
  created() {
    this.currentUser().then((res) => {
      // this.getAuthMenuList();
      this.getMenuList();
    });
  },
  methods: {
    //查询有权限的菜单信息
    async getMenuListData() {
      const res = await this.portService.siderbarAuth();
      console.log(res);
      if (res.data) {
      }
    },
    async currentUser() {
      // const result = await getUserInfo();
      // if (result.data) {
      //   this.isCgr = result.data.type.indexOf('B') != -1;
      // }
    },
    getMenuList() {
      this.menuList = [
        {
          name: '首页',
          path: '',
          icon: 'zl-icon1-gongzuotai',
          children: [{ name: '首页', path: '/dashboard' }],
        },
        {
          name: '我的待办',
          path: '',
          icon: 'zl-icon2-daibanshixiang',
          children: [{ name: '我的待办', path: '/todos' }],
        },
        {
          name: '工程建设受理',
          path: '',
          icon: 'zl-icon3-caigoujihua',
          children: [
            {
              name: '项目注册受理',
              path: '/construction/register',
            },
            {
              name: '招标项目受理',
              path: '/construction/purchase',
            },
          ],
        },
        {
          name: '政府采购受理',
          path: '',
          icon: 'zl-icon5-xiangmuguanli',
          children: [
            {
              name: '计划分办',
              path: '/government/plan',
            },
            {
              name: '计划指派',
              path: '/government/demand',
            },
          ],
        },
        {
          name: '自然资源受理',
          path: '',
          icon: 'zl-icon6-feiyongguanli',
          children: [
            {
              name: '补充及节余指标受理',
              path: '',
              children: [
                {
                  name: '补充耕地指标公告受理',
                  path: '/nature/index/notice/arable',
                },
                {
                  name: '节余指标公告受理',
                  path: '/nature/index/notice/balance',
                },
                {
                  name: '补充公告受理',
                  path: '/nature/index/notice/supply',
                },
                {
                  name: '补充耕地指标资源受理',
                  path: '/nature/index/resource/arable',
                },
                {
                  name: '节余指标资源受理',
                  path: '/nature/index/resource/balance',
                },
              ],
            },
            {
              name: '矿业权及地勘受理',
              path: '',
              children: [
                {
                  name: '矿业权及地勘公告受理',
                  path: '/nature/mineral/notice/mineral',
                },
                {
                  name: '出让资源受理',
                  path: '/nature/mineral/resource/out',
                },
                {
                  name: '转让资源受理',
                  path: '/nature/mineral/resource/transfer',
                },
                {
                  name: '招标资源受理',
                  path: '/nature/mineral/resource/purchase',
                },
              ],
            },
          ],
        },
        // {
        //   name: '资源录入受理',
        //   path: '',
        //   icon: 'zl-icon7-xiangmubaozhengjin',
        //   children: [
        //     { name: '出让资源录入受理', path: '/resource/outin' },
        //     { name: '转让资源录入受理', path: '/resource/transfer' },
        //     { name: '招标资源录入受理', path: '/resource/purchase' },
        //   ],
        // },
        {
          name: '项目工作台',
          path: '',
          icon: 'zl-icon8-baozhengjinguanliicon',
          children: [{ name: '项目工作台', path: '/project/mine' }],
        },
        {
          name: '场地管理',
          path: '',
          icon: 'zl-icon9-yiyiguanli',
          children: [
            { name: '场地管理', path: '/steps/dissent-list?type=all' },
          ],
        },
        {
          name: '专家管理',
          path: '',
          icon: 'zl-icon8-baozhengjinguanliicon',
          children: [{ name: '统一专家抽取', path: '/expert/extract' }],
        },
        {
          name: '交易总览',
          path: '',
          icon: 'zl-icon10-changyongziliao',
          children: [
            {
              name: '交易总览',
              path: '/analysis/trade',
            },
          ],
        },
        {
          name: '系统配置',
          path: '',
          icon: 'zl-icon10-changyongziliao',
          children: [
            {
              name: '组织架构',
              path: '/settings/organization',
            },
            {
              name: '角色管理',
              path: '/settings/role',
            },
            {
              name: '权限管理',
              path: '/settings/permission',
            },
          ],
        },
        // {
        //   name: '个人信息管理',
        //   path: '',
        //   icon: 'zl-icon10-changyongziliao',
        //   children: [
        //     {
        //       name: '个人信息管理',
        //       path: '/user/userinfo',
        //     },
        //   ],
        // },
      ];
      if (this.$store.state.logoType == 1 && !this.isCgr) {
        this.menuList.forEach((i) => {
          if (i.name == '履约情况') {
            i.children.shift();
          }
        });
        // this.menuList = this.menuList.filter(function(item) {
        //   return item.name != "中标合同备案";
        // });
      }
      this.menuList = this.addIndex(this.menuList);
    },

    //获取待办事项数量
    async getTodoNums() {
      const resArr = await Promise.all([
        // 待办事项待办数量
        this.portService.queryDaiBanShiXiangNum(),
        // 采购计划待办数量
        this.portService.queryCaiGouJiHuaNum(),
        // 采购委托数量
        this.portService.queryCaiGouWeiTuoNum(),
        // 费用管理数量
        this.portService.queryCostManagementNum(),
        // 保证金管理数量
        this.portService.queryBzjManagementNum(),
        // 异议管理数量
        this.portService.getYiYiCount(),
        // 澄清管理数量
        this.portService.getChengqingCount(),
      ]);
      let todoNumsList = [[], [], [], [], [], []];
      // 采购立项审核
      if (resArr[0].code === 1) {
        todoNumsList[0][0] = resArr[0].data.dbsxNum;
        todoNumsList[0][1] = resArr[0].data.cglxshNum;
      }
      // 采购计划分派
      if (resArr[1].code === 1) {
        todoNumsList[1][0] = resArr[1].data.cgjhfpNum;
      }
      // 指派委托 接收委托单
      if (resArr[2].code === 1) {
        todoNumsList[2][0] = resArr[2].data.zpwtdNum;
        todoNumsList[2][1] = resArr[2].data.jswtdNum;
      }
      // 费用管理
      if (resArr[3].code === 1) {
        todoNumsList[3][0] = resArr[3].data.biaoshufeiCount;
        todoNumsList[3][1] = resArr[3].data.dailifuwufeiCount;
      }
      // 保证金管理
      if (resArr[4].code === 1) {
        todoNumsList[4][0] = resArr[4].data.tuihuanCount;
        todoNumsList[4][1] = resArr[4].data.querenCount;
      }
      //异议管理
      if (resArr[5].code === 1) {
        todoNumsList[5][0] = resArr[5].data.xmyy;
      }
      //澄清管理
      if (resArr[6].code === 1) {
        todoNumsList[5][1] = resArr[6].data.chengqingCount;
      }

      let toDoTipTree = [
        {
          name: '待办事项',
          todoTip: todoNumsList[0][0] + todoNumsList[0][1],
          children: [
            { name: '待审核事项', todoTip: todoNumsList[0][0] },
            { name: '采购立项审核', todoTip: todoNumsList[0][1] },
          ],
        },
        {
          name: '采购计划',
          todoTip: todoNumsList[1][0],
          children: [{ name: '采购计划分派', todoTip: todoNumsList[1][0] }],
        },
        {
          name: '采购委托',
          todoTip: todoNumsList[2][0] + todoNumsList[2][1],
          children: [
            { name: '指派委托单', todoTip: todoNumsList[2][0] },
            { name: '接收委托单', todoTip: todoNumsList[2][1] },
          ],
        },
        {
          name: '费用管理',
          todoTip: todoNumsList[3][0] + todoNumsList[3][1],
          children: [
            { name: '标书费线下确认', todoTip: todoNumsList[3][0] },
            { name: '线下代理服务费审核', todoTip: todoNumsList[3][1] },
          ],
        },
        {
          name: '保证金管理',
          todoTip: todoNumsList[4][0] + todoNumsList[4][1],
          children: [
            { name: '投标保证金退还', todoTip: todoNumsList[4][0] },
            { name: '线下保证金确认', todoTip: todoNumsList[4][1] },
          ],
        },
        {
          name: '澄清及异议',
          todoTip: todoNumsList[5][0] + todoNumsList[5][1],
          children: [
            { name: '项目异议', todoTip: todoNumsList[5][0] },
            { name: '澄清管理', todoTip: todoNumsList[5][1] },
          ],
        },
      ];

      toDoTipTree.forEach((tipOption) => {
        let targetMenu = this.menuList.find(
          (menu) => menu.name === tipOption.name
        );
        if (targetMenu) {
          targetMenu.todoTip = 0;
          if (tipOption.children && tipOption.children.length) {
            tipOption.children.forEach((subOption) => {
              let targetChild =
                (targetMenu.children &&
                  targetMenu.children.find(
                    (menu) => menu.name === subOption.name
                  )) ||
                {};
              targetChild.todoTip = subOption.todoTip || '';
              if (targetChild.name) {
                targetMenu.todoTip += subOption.todoTip;
              }
            });
          }
        }
        this.menuList = [...this.menuList];
        this.menuList = JSON.parse(JSON.stringify(this.menuList));
      });
    },

    async getAuthMenuList() {
      let res = await this.portService.siderbarAuth();
      this.menuList = res.data;
      if (res && res.code == 1) {
        // if (this.$store.state.logoType == 1 && !this.isCgr) {
        //   this.menuList.forEach((i) => {
        //     if (i.name == "履约情况") {
        //       i.children.shift();
        //     }
        //   });
        // }

        this.menuList = this.addIndex(this.menuList);
        let list = this.addIndex(this.menuList);
        let item = {
          name: '发票管理',
          path: '',
          icon: 'zl-icon2-caigoujiaoyixinxi',
          children: [
            {
              name: '发票管理',
              path: '/invoiceManage/invoiceManage',
            },
            {
              name: '发票统计查询',
              path: '/invoiceManage/invoiceStatistics',
            },
          ],
        };
        list.push(item);
        this.menuList = list;
        this.getTodoNums();
      }
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
    },
  },
  mounted() {
    // this.getMenuListData();
  },
};
</script>
<style lang="scss">
// 合并展开图片样式
.common-header-fold {
  display: inline-block;
  width: 20px; /*no*/
  height: 20px; /*no*/
  margin-left: 10px; /*no*/
  cursor: pointer;
  position: absolute;
  bottom: 40px; /*no*/
  img {
    width: 100%;
    vertical-align: middle;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo .sideIcon {
  margin-right: 1rem !important;
}
.dark {
  .el-menu-item {
    span {
      color: #6a747e;
    }
  }

  .el-menu {
    background-color: transparent;
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

  .el-menu-item:not(.is-active):hover {
    background-color: #177edf !important;
    color: #fff;

    span {
      color: #fff;
    }

    i {
      color: #fff;
    }
  }

  .el-submenu__title:not(.is-active):hover {
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
    background: transparent;

    .el-menu--inline {
      background: transparent;
    }
  }
}

.wight {
  /*background: url("../../assets/images/frame/menuBj.png") left bottom no-repeat;*/
  /* background-size: 200px 210px; */
  background-color: #fff;

  .el-menu-item,
  .el-submenu__title {
    span {
      font-size: 14px; /*no*/
      // color: rgba(0, 0, 0, 0.85);
      color: #ffffff;
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
    /*content: "";*/
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px; /*no*/
    height: 16px; /*no*/
    background: #d6001d;
    border-radius: 2px 0px 0px 2px; /*no*/
  }

  .el-menu-item:not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover {
    background-color: transparent !important;
    color: #fd5303;
    position: relative;

    i,
    span {
      color: #fd5303;
    }
  }

  .el-submenu__title:not(.is-active):hover {
    background-color: transparent;
    color: #fd5303;
    position: relative;

    i,
    span {
      color: #fd5303;
    }
  }

  .el-menu-item:not(.is-active):hover::after,
  .el-submenu__title:not(.is-active):hover::after {
    /*content: "";*/
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
  width: 176px; /*no*/
  padding-left: 18px !important ;
  .sideIcon {
    width: 25px;
    height: 25px;
    padding: 12px;
    border-radius: 25px;
  }
}

.el-submenu .el-menu-item {
  width: 207px !important; /*no*/
  min-width: 207px;
  height: 40px !important; /*no*/
  line-height: 40px !important; /*no*/
  padding-left: 49px !important; /*no*/
}
.el-submenu [class^='el-icon-'],
.el-menu-item [class^='el-icon-'] {
  font-size: 14px /*no*/;
}

.siderbar-box ::v-deep.el-submenu__icon-arrow {
  font-size: 14px; /*no*/
}

.siderbar-box {
  ::v-deep.el-submenu__title,
  ::v-deep.el-menu-item {
    height: 48px; /*no*/
    line-height: 48px; /*no*/
  }
}

.el-menu--vertical {
  .el-menu-item {
    height: 48px; /*no*/
    line-height: 48px; /*no*/
    font-size: 14px; /*no*/
  }
}

.dark {
  .el-menu {
    .el-menu-item i.zlIconSiber {
      margin-right: 14px;
    }
    .el-menu--inline {
      .el-menu-item i {
        margin-left: -15px;
      }
    }
  }
  .el-menu-item,
  .el-submenu__title {
    margin-left: 12px;
    border-radius: 25px 0 0 25px; /*no*/

    i {
      color: #c9cfdd;
      margin-left: -12px;
    }
    span {
      font-size: 14px; /*no*/
      color: #c9cfdd;
      /*font-weight: bold;*/
    }

    .iconfont {
      color: #c9cfdd;
    }
  }
  .el-submenu__title i.zlIconSiber {
    margin-right: 14px;
  }

  .el-menu-item.is-active {
    background: #fd671f;
    color: #fff;
    font-weight: 700;
    background: linear-gradient(90deg, #e2b26f, #edcb9f);
    box-shadow: 0px 5px 18px 2px rgba(253, 103, 31, 0.28);
    span {
      color: #fff;
    }
    i {
      color: #fff;
    }
    span {
      color: #fff;
    }
  }

  .el-menu-item:not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover,
  .el-menu-item:not(.is-active):focus {
    background-color: transparent !important;
    color: #e1b371;

    i,
    span {
      color: #e1b371;
    }
  }
}
.dark-red {
  .el-menu {
    background: #2a3142 !important;
    .el-menu-item i.zlIconSiber {
      margin-right: 14px;
    }
    .el-menu--inline {
      .el-menu-item i {
        margin-left: -15px;
      }
    }
  }
  .el-menu-item,
  .el-submenu__title {
    margin-left: 12px;
    border-radius: 25px; /*no*/

    i {
      color: #c9cfdd;
      margin-left: -12px;
    }
    span {
      font-size: 14px; /*no*/
      color: #c9cfdd;
      /*font-weight: bold;*/
    }

    .iconfont {
      color: #c9cfdd;
    }
  }
  .el-submenu__title i.zlIconSiber {
    margin-right: 14px;
  }

  .el-menu-item.is-active {
    color: #144fba;
    // font-weight: 700;
    background: #2a3142;
    box-shadow: 0px;
    span {
      color: #144fba;
    }
    i {
      color: #144fba;
    }
    // color: #fff;
    // font-weight: 700;
    // background: linear-gradient(90deg, #FF2F62, #FF5A3D);
    // box-shadow: 0px 5px 19px 2px rgba(255, 68, 80, 0.28);
    // span {
    //   color: #fff !important;
    // }
    // i {
    //   color: #fff !important;
    // }
    // span {
    //   color: #fff !important;
    // }
  }

  .el-menu-item:not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover,
  .el-menu-item:not(.is-active):focus {
    background-color: transparent !important;
    // color: #144fba !important;
    // color: #144fba !important;
    color: white !important;

    i,
    span {
      color: white !important;
      // color: #144fba !important;
    }
  }
}
.dark-blue {
  .el-menu {
    background: #2d3743 !important;
    .el-menu-item i.zlIconSiber {
      margin-right: 14px;
    }
    .el-menu--inline {
      .el-menu-item i {
        margin-left: -15px;
      }
    }
  }
  .el-menu-item,
  .el-submenu__title {
    margin-left: 12px;
    border-radius: 25px 0 0 25px; /*no*/

    i {
      color: #c9cfdd;
      margin-left: -12px;
    }
    span {
      font-size: 14px; /*no*/
      color: #c9cfdd !important;
      /*font-weight: bold;*/
    }

    .iconfont {
      color: #c9cfdd !important;
    }
  }
  .el-submenu__title i.zlIconSiber {
    margin-right: 14px;
  }

  .el-menu-item.is-active {
    color: #fff;
    font-weight: 700;
    background: linear-gradient(90deg, #2485e8, #24c1e8, #3acb7b);
    box-shadow: 0px 5px 19px 2px rgba(36, 133, 232, 0.1);
    span {
      color: #fff !important;
    }
    i {
      color: #fff !important;
    }
    span {
      color: #fff !important;
    }
  }

  .el-menu-item:not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover,
  .el-menu-item:not(.is-active):focus {
    background-color: transparent !important;
    color: #0084ff !important;

    i,
    span {
      color: #0084ff !important;
    }
  }
}
.wight-red {
  .el-menu {
    .el-menu-item i.zlIconSiber {
      margin-right: 14px;
    }
    .el-menu--inline {
      .el-menu-item i {
        margin-left: -18px;
      }
    }
  }
  .el-menu-item,
  .el-submenu__title {
    margin-left: 12px;
    border-radius: 25px; /*no*/

    i {
      margin-left: -12px;
      margin-right: 3px;
      color: #ebeef5;
    }
    span {
      font-size: 14px; /*no*/
      color: #ffffff;
      /*font-weight: bold;*/
    }
  }
  .el-submenu__title i.zlIconSiber {
    margin-right: 14px;
  }
  .el-menu-item.is-active {
    color: #144fba;
    // font-weight: 700;
    background: #09264b;
    box-shadow: 0px;
    span {
      color: #144fba;
    }
    i {
      color: #144fba;
    }
  }

  .el-menu-item:not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover,
  .el-menu-item:not(.is-active):focus {
    background-color: transparent !important;
    color: #144fba;

    i,
    span {
      color: #144fba;
    }
  }

  .el-submenu__title:not(.is-active):hover {
    background-color: transparent;
    color: #144fba;

    i,
    span {
      color: #ffffff;
    }
  }
  .el-submenu.is-active.is-opened {
    .el-submenu__title:not(.is-active):hover {
      background-color: transparent;
      color: #ffffff;

      i,
      span {
        color: #ffffff;
      }
    }
  }
}
.wight {
  .el-menu {
    .el-menu-item i.zlIconSiber {
      margin-right: 14px;
    }
    .el-menu--inline {
      .el-menu-item i {
        margin-left: -18px;
      }
    }
  }
  .el-menu-item,
  .el-submenu__title {
    margin-left: 12px;
    border-radius: 25px 0 0 25px; /*no*/

    i {
      margin-left: -12px;
      margin-right: 3px;
    }
    span {
      font-size: 14px; /*no*/
      color: #ffffff;
      /*font-weight: bold;*/
    }
  }
  .el-submenu__title i.zlIconSiber {
    margin-right: 14px;
  }
  .el-menu-item.is-active {
    background: #fd671f;
    color: #fff;
    box-shadow: 0px 5px 18px 2px rgba(253, 103, 31, 0.28);
    span {
      color: #fff;
    }
    i {
      color: #fff;
    }
  }

  .el-menu-item:not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover,
  .el-menu-item:not(.is-active):focus {
    background-color: transparent !important;
    color: #fd5303;

    i,
    span {
      color: #fd5303;
    }
  }

  .el-submenu__title:not(.is-active):hover {
    background-color: transparent;
    color: #fd5303;

    i,
    span {
      color: #fd5303;
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
      height: 48px; /*no*/
      line-height: 48px; /*no*/
      font-size: 12px; /*no*/
    }
  }
}
</style>
<style lang="scss" scoped>
.el-menu ::v-deep .el-menu-item {
  height: 40px !important; /*no*/
  line-height: 40px !important; /*no*/
}
.el-menu ::v-deep .el-submenu__title {
  height: 48px !important; /*no*/
  line-height: 48px !important; /*no*/
}
.siderbar-box {
  height: 100%;
  width: 200px; /*no*/
  overflow: hidden;
  transition: transform 0.28s;
  border-right: 1px solid #ebeef5;
  ::v-deep .el-menu.el-menu--inline {
    background-color: #09264b;
    .el-menu-item {
      span {
        color: rgba(255, 255, 255, 0.45);
      }
      &.is-active {
        span {
          color: #144fba;
        }
      }
    }
  }
  .el-menu {
    width: 226px; /*no*/
    padding-top: 32px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu-vertical-demo {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 15px;
    background-color: transparent !important;
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

      ::v-deep .el-submenu__title {
        span {
          color: #fff !important;
        }
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
  width: 64px; /*no*/
  transition: all 0.28s ease-in;
}
/*
    适配小屏幕 1366px
    */
@media screen and (max-width: 1366px) {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 148px !important; /*no*/
    min-height: 300px !important; /*no*/
  }
  .siderbar-box {
    width: 183px !important; /*no*/
    ::v-deep.el-submenu__title,
    ::v-deep.el-menu-item {
      height: 48px; /*no*/
      line-height: 48px; /*no*/
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
    }
    /*菜单样式*/
    ::v-deep.el-submenu {
      .el-menu-item {
        height: 48px; /*no*/
        line-height: 48px; /*no*/
      }
    }
  }

  .siderbar-box.collapsider {
    ::v-deep.el-menu-item {
      .el-tooltip {
        padding-left: 17px !important;
      }
    }
  }
}

.is-opened .zlIconSiber,
.is-opened span,
.is-opened ::v-deep.el-submenu__title i {
  color: #fd671f !important;
  // color: white !important;
}
.dark {
  .is-opened .zlIconSiber,
  .is-opened span,
  .is-opened ::v-deep.el-submenu__title i {
    color: white !important;
  }
}
.wight-red,
.dark-red {
  .is-opened .zlIconSiber,
  .is-opened span,
  .is-opened ::v-deep.el-submenu__title {
    // color: #144fba !important;
    color: #fff !important;
    font-weight: 700;
    background: linear-gradient(231deg, #1156d4 0%, #244abb 100%);
    i {
      color: #fff !important;
    }
    i.sideIcon {
      color: #144fba !important;
      background: #fff;
    }
  }
}
.wight-red,
.dark-red {
  .is-opened .zlIconSiber,
  .is-opened span,
  .is-opened ::v-deep.el-menu {
    &.el-menu--inline {
      .el-submenu__title {
        background: transparent;
      }
    }
  }
}
.dark-blue {
  .is-opened .zlIconSiber,
  .is-opened span,
  .is-opened ::v-deep.el-submenu__title i {
    color: #0085fe !important;
  }
}
.has-children {
  .is-active .zlIconSiber,
  .is-active span,
  .is-active ::v-deep.el-submenu__title i {
    color: #fd671f !important;
  }
  .dark {
    .is-active .zlIconSiber,
    .is-active span,
    .is-active ::v-deep.el-submenu__title i {
      color: #e2b26f !important;
    }
  }
  .wight-red,
  .dark-red {
    .is-opened .zlIconSiber,
    .is-opened span,
    .is-opened ::v-deep.el-submenu__title i {
      color: #144fba !important;
    }

    .icon-baozhengjinliushui {
      font-size: 18px; /*no*/
      margin: 0 10px 0 4px; /*no*/
    }

    .dark-blue {
      .is-opened .zlIconSiber,
      .is-opened span,
      .is-opened ::v-deep.el-submenu__title i {
        color: #0085fe !important;
      }
    }
  }
  ::v-deep.el-submenu > .el-submenu__title {
    padding-left: 32px !important; /*no*/
  }
}
</style>
