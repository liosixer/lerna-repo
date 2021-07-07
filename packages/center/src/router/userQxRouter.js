const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const zzjg = () => import('../views/userAndQxManage/zzjg')
const zzjgAdd = () => import('../views/userAndQxManage/zzjgAdd')
const zzjgList = () => import('../views/userAndQxManage/UserList/')
const userManageTable = () => import('../views/userAndQxManage/userManageTable')
const userManageAdd = () => import('../views/userAndQxManage/userManageQx/userManageAdd')
const authorityManagement = () => import('../views/userAndQxManage/authorityManagement/AuthorityManagement.vue')
const jurisdictionDetail = () => import('../views/userAndQxManage/authorityManagement/JurisdictionDetail.vue')
const tenantManagement = () => import('../views/userAndQxManage/tenantManagement/index') // 租户管理list
const tenantManagementDet = () => import('../views/userAndQxManage/tenantManagement/detail') // 租户详细信息
const permissionsDetails = () => import('../views/userAndQxManage/tenantManagement/permissionsDetails') // 租户权限设置
const userManagement = () => import('../views/userAndQxManage/userManagement/index') // 用户管理list
const userManagementDet = () => import('../views/userAndQxManage/userManagement/detail') // 用户管理详情

const assignRight = () =>
	import('../views/userAndQxManage/userManageQx/assignRight')
const UserAuth = () => import('../views/userAndQxManage/userauth/UserAuth')
const UserAuthDetail = () => import('../views/userAndQxManage/userauth/UserAuthDetail')


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
					routeName: '',
				},
				redirect: { name: 'zzjgList' },
				children: [
					{
						path: '/userAndQxManage/zzjg/list',
						name: 'zzjgList',
						component: zzjgList,
						meta: {
							routeName: '组织架构',
						},
					},
					{
						path: '/userAndQxManage/zzjg/zzjgAdd',
						name: 'zzjgAdd',
						component: zzjgAdd,
						meta: {
							routeName: '组织架构-新增',
						},
					},
				],
			},
			{
				path: '/userAndQxManage/roleManagement',
				name: 'userManageTable',
				component: userManageTable,
				meta: {
					routeName: '角色管理',
				},
			},
			{
				path: '/userAndQxManage/userManageTable',
				name: 'userManageTable',
				component: userManageTable,
				meta: {
					routeName: '角色管理',
				},
			},
			{
				path: '/userAndQxManage/userManageQx',
				name: 'userManageQx',
				component: assignRight,
				meta: {
					routeName: '用户及权限管理 ',
				},
			},
			{
				path: '/userAndQxManage/userManageAdd',
				name: 'userManageAdd',
				component: userManageAdd,
				meta: {
					routeName: '用户及权限管理 ',
				},
			},
			{
				path: '/userAndQxManage/authorityManagement',
				name: 'authorityManagement',
				component: authorityManagement,
				meta: {
					routeName: '权限管理',
				},
			},
			{
				path: '/userAndQxManage/jurisdictionDetail',
				name: 'jurisdictionDetail',
				component: jurisdictionDetail,
				meta: {
					routeName: '权限管理详情',
				},
			},
			{
				path: '/userAndQxManage/tenantManagement',
				name: 'tenantManagement',
				component: tenantManagement,
				meta: {
					routeName: '租户管理',
				},
			},
			{
				path: '/userAndQxManage/tenantManagementDet',
				name: 'tenantManagementDet',
				component: tenantManagementDet,
				meta: {
					routeName: '租户详细信息',
				},
			},
			{
				path: '/userAndQxManage/permissionsDetails',
				name: 'permissionsDetails',
				component: permissionsDetails,
				meta: {
					routeName: '租户权限设置',
				},
			},
			{
				path: '/userAndQxManage/userManagement',
				name: 'userManagement',
				component: userManagement,
				meta: {
					routeName: '用户管理',
				},
			},
			{
				path: '/userAndQxManage/userManagementDet',
				name: 'userManagementDet',
				component: userManagementDet,
				meta: {
					routeName: '用户详细信息',
				},
			},
			{
				path: '/userAndQxManage/userauth',
				name: 'UserAuth',
				component: UserAuth,
				meta: {},
			},
			{
				path: '/userAndQxManage/userauthdetail',
				name: 'UserAuthDetail',
				component: UserAuthDetail,
				meta: {},
			},
		],
	},
]
export default routes
