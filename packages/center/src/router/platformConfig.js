const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')

const routes = [
  {
    path: '/platformConfig',
		component: Layout,
		redirect: '/platformConfig/chargeRules',
		meta: {
			routeName: '平台配置',
    },
    children: [
      {
				path: '/platformConfig/chargeRules',
				name: 'chargeRulesList',
				component: () => import('../views/platformConfig/chargeRules/index.vue'),
				meta: {
					routeName: "收费规则设置"
				},
			},
			{
				path: '/platformConfig/chargeRules/add',
				name: 'chargeRulesAdd',
				component: () => import('../views/platformConfig/chargeRules/add.vue'),
				meta: {
					routeName: "收费规则设置新增"
				},
			},
			{
				path: '/platformConfig/chargeRules/detail',
				name: 'chargeRulesDetail',
				component: () => import("../views/platformConfig/chargeRules/detail.vue"),
				meta: {
					routeName: "收费规则设置详情"
				},
      },
      {
				path: '/platformConfig/chargeRules/whiteList',
				name: 'whiteList',
				component: () => import("../views/platformConfig/chargeRules/whiteList.vue"),
				meta: {
					routeName: "平台使用费白名单"
				},
      },
      {
				path: '/platformConfig/purchaseUserManagement',
				name: 'purchaseUserManagementList',
				component: () => import('../views/platformConfig/purchaseUserManagement/index.vue'),
				meta: {
					routeName: "采购用户管理"
				},
      },
      {
				path: '/platformConfig/purchaseUserManagement/detail',
				name: 'purchaseUserManagementDetail',
				component: () => import('../views/platformConfig/purchaseUserManagement/detail.vue'),
				meta: {
					routeName: "采购用户管理详情"
				},
			},
    ]
  }
]

export default routes