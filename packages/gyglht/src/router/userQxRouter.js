const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const zzjg = () => import('../views/userAndQxManage/zzjg')
const zzjgAdd = () => import('../views/userAndQxManage/zzjgAdd')
const zzjgList = () => import('../views/userAndQxManage/UserList/')
const userManageTable = () => import('../views/userAndQxManage/userManageTable')
const assignRight = () =>
	import('../views/userAndQxManage/userManageQx/assignRight')

const routes = [
	{
		path: '/userAndQxManage',
		component: Layout,
		redirect: '/userAndQxManage/zzjg',
		meta: {
			routeName: '用户及权限管理 ',
		},
		children: [
			{
				path: '/userAndQxManage/zzjg',
				name: 'zzjg',
				component: zzjg,
				meta: {
					routeName: '组织架构 ',
				},
				redirect: { name: 'zzjgList' },
				children: [
					{
						path: '/userAndQxManage/zzjg/list',
						name: 'zzjgList',
						component: zzjgList,
					},
					{
						path: '/userAndQxManage/zzjg/zzjgAdd',
						name: 'zzjgAdd',
						component: zzjgAdd,
					},
				],
			},
			{
				path: '/userAndQxManage/userManageTable',
				name: 'userManageTable',
				component: userManageTable,
				meta: {},
			},
			{
				path: '/userAndQxManage/userManageQx',
				name: 'userManageQx',
				component: assignRight,
				meta: {},
			},
		],
	},
]
export default routes
