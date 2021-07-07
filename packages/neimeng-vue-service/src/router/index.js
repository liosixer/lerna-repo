import Vue from 'vue';
import VueRouter from 'vue-router';
import guard from './guards';

const Login = () =>
  import(/* webpackPrefetch: true */ '../views/login/Login.vue');
// import Login from '../views/login/Login.vue'
const Register = () =>
  import(/* webpackPrefetch: true */ '../views/login/Register.vue');
const findPassword = () =>
  import(/* webpackPrefetch: true */ '../views/login/findPassword.vue');
const Dashboard = () =>
  import(/* webpackPrefetch: true */ '../views/Dashboard.vue');
const Layout = () =>
  import(/* webpackPrefetch: true */ '../views/layout/Index.vue');
const page404 = () =>
  import(/* webpackPrefetch: true */ '../views/ErrPage.vue');
const AuthPre = () =>
  import(/* webpackPrefetch: true */ '../views/login/AuthPre');
const Empty = () =>
  import(/* webpackPrefetch: true */ '../views/layout/Empty.vue');

const External = () =>
  import(/* webpackPrefetch: true */ '../views/external/External.vue');

Vue.use(VueRouter);
//解决面包屑导航，重复添加路由报错问题
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/authPre',
    name: 'AuthPre',
    component: AuthPre,
  },
  {
    path: '/findPassword',
    name: 'findPassword',
    component: findPassword,
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      mode: 'empty',
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          mode: 'home',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userinfo',
    meta: {
      mode: 'empty',
    },
    children: [
      {
        path: 'userinfo',
        name: 'userinfo',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/user/userinfo/userinfo.vue'
          ),
        meta: {
          title: '个人信息',
          mode: 'list',
        },
      },
    ],
  },
  {
    path: '/todos',
    component: Layout,
    meta: {
      title: '我的待办',
      mode: 'empty',
    },
    redirect: '/todos',
    children: [
      {
        path: '/todos',
        name: 'todos',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/todos/Todos.vue'),
        meta: {
          title: '我的待办',
          mode: 'list',
        },
      },
      {
        path: 'detail',
        name: 'todosDetail',
        component: External,
        meta: {
          title: '详情',
          mode: 'external',
        },
      },
    ],
  },
  {
    path: '/construction',
    component: Layout,
    meta: {
      title: '工程建设受理',
      mode: 'empty',
    },
    redirect: '/construction/register',
    children: [
      //#region 工程项目建设-项目注册
      {
        path: 'register',
        name: 'constructionRegister',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/construction/register/ConstructionRegister.vue'
          ),
        meta: {
          title: '项目注册受理',
          mode: 'list',
        },
      },
      {
        path: 'register/new',
        name: 'constructionRegisterNew',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/construction/register', meta: { title: '项目注册受理' } },
            { path: '/construction/register/new', meta: { title: '新建项目' } },
          ],
          title: '新建项目',
          mode: 'external',
        },
      },
      {
        path: 'register/manage',
        name: 'constructionRegisterManage',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/construction/register', meta: { title: '项目注册受理' } },
            { path: '/construction/register/manage', meta: { title: '管理' } },
          ],
          title: '管理',
          mode: 'external',
        },
      },
      //#endregion

      //#region 工程项目建设-招标项目
      {
        path: 'purchase',
        name: 'constructionPurchase',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/construction/purchase/ConstructionPurchase.vue'
          ),
        meta: {
          title: '招标项目受理',
          mode: 'list',
        },
      },
      {
        path: 'purchase/new',
        name: 'constructionPurchaseNew',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/construction/purchase', meta: { title: '招标项目受理' } },
            { path: '/construction/purchase/new', meta: { title: '新建项目' } },
          ],
          title: '新建项目',
          mode: 'external',
        },
      },
      {
        path: 'purchase/manage',
        name: 'constructionPurchaseManage',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/construction/purchase', meta: { title: '招标项目受理' } },
            { path: '/construction/purchase/manage', meta: { title: '管理' } },
          ],
          title: '管理',
          mode: 'external',
        },
      },
      //#endregion
    ],
  },
  {
    path: '/government',
    component: Layout,
    meta: {
      title: '政府采购管理',
      mode: 'empty',
    },
    redirect: '/government/plan',
    children: [
      //#region 政府采购管理-计划查询
      {
        path: 'plan',
        name: 'governmentPlan',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/government/plan/GovernmentPlan.vue'
          ),
        meta: {
          title: '计划分办',
          mode: 'list',
        },
      },
      {
        path: 'plan/new',
        name: 'constructionPlanNew',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/construction/plan', meta: { title: '计划分办' } },
            { path: '/construction/plan/new', meta: { title: '新建计划' } },
          ],
          title: '新建项目',
          mode: 'external',
        },
      },
      {
        path: 'plan/manage',
        name: 'governmentPlanManage',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/construction/plan', meta: { title: '计划分办' } },
            { path: '/government/plan/manage', meta: { title: '管理' } },
          ],
          title: '管理',
          mode: 'external',
        },
      },
      //#endregion

      //#region 政府采购管理-我的需求
      {
        path: 'demand',
        name: 'governmentDemand',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/government/demand/GovernmentDemand.vue'
          ),
        meta: {
          title: '计划指派',
          mode: 'list',
        },
      },
      {
        path: 'demand/manage',
        name: 'governmentDemandManage',
        component: External,
        meta: {
          breadcrumbs: [
            { path: '/government/demand', meta: { title: '计划指派' } },
            { path: '/government/demand/manage', meta: { title: '管理' } },
          ],
          title: '管理',
          mode: 'external',
        },
      },
      //#endregion
    ],
  },
  {
    path: '/nature',
    component: Layout,
    meta: {
      title: '自然资源受理',
      mode: 'empty',
    },
    redirect: '/nature/index',
    children: [
      //#region 自然资源受理-补充及节余指标受理
      {
        path: 'index',
        component: Empty,
        meta: {
          title: '补充及节余指标受理',
          mode: 'empty',
        },
        redirect: '/nature/index/notice',
        children: [
          {
            path: 'notice',
            component: Empty,
            redirect: '/nature/index/notice/arable',
            children: [
              //#region 自然资源受理-补充及节余指标受理-补充耕地指标公告受理
              {
                path: 'arable',
                name: 'natureIndexNoticeArable',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/index/arableNotice/NatureIndexArableNotice.vue'
                  ),
                meta: {
                  title: '补充耕地指标公告受理',
                  mode: 'list',
                },
              },
              {
                path: 'arable/manage',
                name: 'natureIndexNoticeArableManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion

              //#region 自然资源受理-补充及节余指标受理-节余指标公告受理
              {
                path: 'balance',
                name: 'natureIndexNoticeBalance',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/index/balanceNotice/NatureIndexBalanceNotice.vue'
                  ),
                meta: {
                  title: '节余指标公告受理',
                  mode: 'list',
                },
              },
              {
                path: 'balance/manage',
                name: 'natureIndexNoticeBalanceManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion

              //#region 自然资源受理-补充及节余指标受理-补充公告受理
              {
                path: 'supply',
                name: 'natureIndexNoticeSupply',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/index/supplyNotice/NatureIndexSupplyNotice.vue'
                  ),
                meta: {
                  title: '补充公告受理',
                  mode: 'list',
                },
              },
              {
                path: 'supply/manage',
                name: 'natureIndexNoticeSupplyManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion
            ],
          },
          {
            path: 'resource',
            component: Empty,
            redirect: '/nature/index/resource/arable',
            children: [
              //#region 自然资源受理-补充及节余指标受理-补充耕地指标资源受理
              {
                path: 'arable',
                name: 'natureIndexRerourceArable',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/index/arableResource/NatureIndexArableResource.vue'
                  ),
                meta: {
                  title: '补充耕地指标资源受理',
                  mode: 'list',
                },
              },
              {
                path: 'arable/manage',
                name: 'natureIndexRerourceArableManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion

              //#region 自然资源受理-补充及节余指标受理-节余指标资源受理
              {
                path: 'balance',
                name: 'natureIndexRerourceBalance',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/index/balanceResource/NatureIndexBalanceResource.vue'
                  ),
                meta: {
                  title: '节余指标资源受理',
                  mode: 'list',
                },
              },
              {
                path: 'balance/manage',
                name: 'natureIndexRerourceBalanceManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion
            ],
          },
        ],
      },
      //#endregion

      //#region 自然资源受理-矿业权及地勘受理
      {
        path: 'mineral',
        component: Empty,
        meta: {
          title: '矿业权及地勘受理',
          mode: 'empty',
        },
        redirect: '/nature/mineral/notice',
        children: [
          {
            path: 'notice',
            component: Empty,
            redirect: '/nature/mineral/notice/mineral',
            children: [
              //#region 自然资源受理-矿业权及地勘受理-矿业权及地勘公告受理
              {
                path: 'mineral',
                name: 'natureMineralNoticeMineral',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/mineral/mineralNotice/NatureMineralMineralNotice.vue'
                  ),
                meta: {
                  title: '矿业权及地勘公告受理',
                  mode: 'list',
                },
              },
              {
                path: 'mineral/manage',
                name: 'natureMineralNoticeMineralManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion
            ]
          },
          {
            path: 'resource',
            component: Empty,
            redirect: '/nature/mineral/resource/out',
            children: [
              //#region 自然资源受理-矿业权及地勘受理-出让资源受理
              {
                path: 'out',
                name: 'natureMineralRerourceOut',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/mineral/outResource/NatureMineralOutResource.vue'
                  ),
                meta: {
                  title: '出让资源受理',
                  mode: 'list',
                },
              },
              {
                path: 'out/manage',
                name: 'natureMineralRerourceOutManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion

              //#region 自然资源受理-矿业权及地勘受理-转让资源受理
              {
                path: 'transfer',
                name: 'natureMineralRerourceTransfer',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/mineral/transferResource/NatureMineralTransferResource.vue'
                  ),
                meta: {
                  title: '转让资源受理',
                  mode: 'list',
                },
              },
              {
                path: 'transfer/manage',
                name: 'natureMineralRerourceTransferManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion

              //#region 自然资源受理-矿业权及地勘受理-招标资源受理
              {
                path: 'purchase',
                name: 'natureMineralRerourcePurchase',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ '../views/nature/mineral/purchaseResource/NatureMineralPurchaseResource.vue'
                  ),
                meta: {
                  title: '招标资源受理',
                  mode: 'list',
                },
              },
              {
                path: 'purchase/manage',
                name: 'natureMineralRerourcePurchaseManage',
                component: External,
                meta: {
                  title: '管理',
                  mode: 'external',
                },
              },
              //#endregion
            ]
          }
        ]
      }
      //#endregion
    ],
  },
  {
    path: '/project',
    component: Layout,
    meta: {
      title: '项目工作台',
      mode: 'empty',
    },
    redirect: '/project/mine',
    children: [
      {
        path: 'mine',
        name: 'projectMine',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/project/mine/ProjectMine.vue'
          ),
        meta: {
          breadcrumbs: [
            { path: '/project/mine', meta: { title: '项目工作台' } },
          ],
          title: '项目工作台',
          mode: 'list',
        },
      },
      {
        path: 'mine/detail',
        name: 'projectMineDetail',
        component: External,
        meta: {
          title: '详情',
          mode: 'external',
        },
      },
    ],
  },
  {
    path: '/expert',
    component: Layout,
    meta: {
      title: '专家管理',
      mode: 'empty',
    },
    redirect: '/expert/extract',
    children: [
      {
        path: 'extract',
        name: 'expertExtract',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/expert/extract/ExpertExtract.vue'
          ),
        meta: {
          breadcrumbs: [
            { path: '/expert/extract', meta: { title: '统一专家抽取' } },
          ],
          title: '统一专家抽取',
          mode: 'list',
        },
      },
      {
        path: 'extract/manage',
        name: 'expertExtractManage',
        component: External,
        meta: {
          title: '管理',
          mode: 'external',
        },
      },
    ],
  },
  {
    path: '/analysis',
    component: Layout,
    meta: {
      title: '交易总览',
      mode: 'empty',
    },
    redirect: '/analysis/trade',
    children: [
      {
        path: 'trade',
        name: 'analysisTrade',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/analysis/trade/AnalysisTrade.vue'
          ),
        meta: {
          breadcrumbs: [
            { path: '/analysis/trade', meta: { title: '交易总览' } },
          ],
          title: '交易总览',
          mode: 'analysis',
        },
      },
    ],
  },
  {
    path: '/settings',
    component: Layout,
    meta: {
      title: '系统配置',
      mode: 'empty',
    },
    redirect: '/settings/organization',
    children: [
      {
        path: 'organization',
        name: 'settingsOrganization',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/settings/organization/SettingsOrganization.vue'
          ),
        meta: {
          breadcrumbs: [
            { path: '/settings/organization', meta: { title: '组织架构' } },
          ],
          title: '组织架构',
          mode: 'settings',
        },
      },
      {
        path: 'role',
        name: 'settingsRole',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/settings/role/SettingsRole.vue'
          ),
        meta: {
          breadcrumbs: [
            { path: '/settings/role', meta: { title: '角色管理' } },
          ],
          title: '角色管理',
          mode: 'settings',
        },
      },
      {
        path: 'permission',
        name: 'settingsPermission',
        component: () =>
          import(
            /* webpackPrefetch: true */ '../views/settings/permission/SettingsPermission.vue'
          ),
        meta: {
          breadcrumbs: [
            { path: '/settings/permission', meta: { title: '权限管理' } },
          ],
          title: '权限管理',
          mode: 'list',
        },
      },
    ],
  },
  {
    path: '*',
    name: 'page404',
    component: page404,
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

//添加路由守卫
guard(router);

export default router;
