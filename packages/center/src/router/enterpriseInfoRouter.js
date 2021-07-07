const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const Gyszyxx = () => import('../views/qyxxgl/Gyszyxx/')
const Gyszybq = () => import('../views/qyxxgl/Gyszybq/index.vue')
const personalUser = () => import('../views/qyxxgl/personalUser/index.vue')
const defaultRole = () => import('../views/qyxxgl/defaultRole/index.vue')

const routes = [
	{
		path: '/baseInfo',
		component: Layout,
		redirect: '/baseInfo/registerList',
		meta: {
			routeName: '交易用户管理',
		},
		children: [
			{
				path: '/baseInfo/registerList',
				name: 'registerList',
				component: () => import('../views/qyxxgl/Qyjbxx/registerEnterprise'),
				meta: {
					routeName: '注册信息查询',
				},
			},
			{
				path: '/baseInfo/baseInfoCheck',
				name: 'baseInfoCheck',
				component: () => import('../views/qyxxgl/Qyjbxx/enterprise/baseInfoCheck/list'),
				meta: {
					routeName: '基础信息审核',
				},
			},
			{
				path: '/supplier/checked',
				name: 'supplierChecked',
				component: () => import('../views/qyxxgl/Gyszyxx/supplier/checked/'),
				meta: {
					routeName: '专业供应商审核',
				},
			},
			{
				path: '/supplier/checked/supplierDetail',
				name: 'supplierDetail',
				component: () => import('../views/qyxxgl/Gyszyxx/supplier/checked/detail'),
				meta: {
					routeName: '专业供应商审核',
				},
			},
			{
				path: '/supplier/management',
				name: 'supplierManegement',
				component: () => import('../views/qyxxgl/Gyszyxx/supplier/manegement/'),
				meta: {
					routeName: '专业供应商管理',
				},
			},
			{
				path: '/supplier/management/detail',
				name: 'supplierManegementDetail',
				component: () => import('../views/qyxxgl/Gyszyxx/supplier/manegement/detail'),
				meta: {
					routeName: '专业供应商管理',
				},
			},
			{
				path: '/baseInfo/accoutAppeal',
				name: 'accoutAppeal',
				component:() => import('../views/qyxxgl/Qyjbxx/enterprise/accoutAppeal'),
				meta: {
					routeName: '账户申诉审核',
				},
			},
			{
				path: '/baseInfo/detail',
				name: 'enterpriseBaseInfo',
				component: () => import('../views/qyxxgl/Qyjbxx/enterprise/baseInfoCheck/index'),
				meta: {
					routeName: '正式企业信息',
				},
			},
			{
				path: '/baseInfo/accoutAppealDetail',
				name: 'accoutAppealDetail',
				component: () => import('@/views/qyxxgl/Qyjbxx/enterprise/accoutAppeal/accountAppealDetail'),
				meta: {}
			},
			{
				path: '/qyxxgl/gyszyxx',
				name: 'Gyszyxx',
				component: Gyszyxx,
				meta: {},
			},
			{
				path: '/qyxxgl/gyszybq',
				name: 'Gyszybq',
				component: Gyszybq,
				meta: {
					routeName: "供应商专业标签"
				},
			},
			{
				path: '/qyxxgl/gyszybq/detail',
				name: 'GyszybqDetail',
				component: () => import("../views/qyxxgl/Gyszybq/detail.vue"),
				meta: {
					routeName: "供应商专业标签详情"
				},
			},
			{
				path: '/qyxxgl/personalUser',
				name: 'personalUserList',
				component: personalUser,
				meta: {
					routeName: "个人用户查询"
				},
			},
			{
				path: '/qyxxgl/personalUser/detail',
				name: 'personalUserDetail',
				component: () => import("../views/qyxxgl/personalUser/detail.vue"),
				meta: {
					routeName: "个人用户查询详情"
				},
			},
			{
				path: '/qyxxgl/defaultRole',
				name: 'defaultRoleList',
				component: defaultRole,
				meta: {
					routeName: "默认角色管理"
				},
			},
			{
				path: '/qyxxgl/defaultRole/detail',
				name: 'defaultRoleDetail',
				component: () => import("../views/qyxxgl/defaultRole/detail.vue"),
				meta: {
					routeName: "默认角色管理详情"
				},
			},
			{
				path: '/xietongSupplier/management',
				name: 'xietongSupplierManegement',
				component: () => import('../views/qyxxgl/Gyszyxx/xietongSupplier/index'),
				meta: {
					routeName: '协同供应商管理',
				},
			},
			{
				path: '/xietongSupplier/management/detail',
				name: 'xietongSupplierManegementDetail',
				component: () => import('../views/qyxxgl/Gyszyxx/xietongSupplier/detail'),
				meta: {
					routeName: '协同供应商管理详情',
				},
			},
		],
	},
]
export default routes
