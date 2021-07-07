const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const Qyjbxx = () => import('../views/qyxxgl/Qyjbxx/')
const Gyszyxx = () => import('../views/qyxxgl/Gyszyxx/')
const Gyszybq = () => import('../views/qyxxgl/Gyszybq/index.vue')
// const Cjlyqk = () => import('../views/qyxxgl/Cjlyqk/index.vue')
const Zsqyxx = () => import('../views/qyxxgl/Zsqyxx/')

const routes = [
	{
		path: '/qyxxgl',
		component: Layout,
		redirect: '/qyxxgl/qyjbxx',
		meta: {
			routeName: '企业管理',
		},
		children: [
			{
				path: '/qyxxgl/qyjbxx',
				name: 'Qyjbxx',
				component: Qyjbxx,
				meta: {
					routeName: '企业完整信息',
				},
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
				path: '/qyxxgl/evaluate',
				name: 'evaluateList',
				component: () => import('../views/qyxxgl/Cjlyqk/evaluateList.vue'),
				meta: {
					routeName: "供应商评价结果"
				},
			},
			{
				path: '/qyxxgl/evaluate/detail',
				name: 'evaluateDetail',
				component: () => import('../views/qyxxgl/Cjlyqk/detailEvaluate.vue'),
				meta: {
					routeName: "供应商评价结果详情"
				},
			},
			{
				path: '/qyxxgl/misconduct',
				name: 'misconductList',
				component: () => import('../views/qyxxgl/Cjlyqk/misconductList.vue'),
				meta: {
					routeName: "供应商不良行为"
				},
			},
			{
				path: '/qyxxgl/misconduct/detail',
				name: 'misconductDetail',
				component: () => import('../views/qyxxgl/Cjlyqk/detailMisconduct.vue'),
				meta: {
					routeName: "供应商不良行为详情"
				},
			},
			{
				path: '/qyxxgl/zsqyxx',
				name: 'Zsqyxx',
				component: Zsqyxx,
				meta: {
					routeName: '企业完整信息',
				},
			},
		],
	},
]
export default routes
