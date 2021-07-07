const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')

const routes = [
  {
    path: '/logManagement',
		component: Layout,
		redirect: '/logManagement/operationLog',
		meta: {
			routeName: '日志管理',
    },
    children: [
      {
				path: '/logManagement/operationLog',
				name: 'operationLogList',
				component: () => import('../views/logManagement/operationLog/index.vue'),
				meta: {
					routeName: "操作日志"
				},
			},
			{
				path: '/logManagement/operationLog/detail',
				name: 'operationLogDetail',
				component: () => import("../views/logManagement/operationLog/detail.vue"),
				meta: {
					routeName: "操作日志详情"
				},
      },
      {
				path: '/logManagement/fileLog',
				name: 'fileLogList',
				component: () => import('../views/logManagement/fileLog/index.vue'),
				meta: {
					routeName: "文件日志"
				},
			},
    ]
  }
]

export default routes