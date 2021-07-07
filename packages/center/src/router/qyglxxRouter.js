const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const Zsqyxx = () => import('../views/qyxxgl/Zsqyxx/')
const ZsqyxxDetail = () => import('../views/qyxxgl/Zsqyxx/zsqyxxDetail')

const routes = [
	{
		path: '/qyxxgl',
		component: Layout,
		redirect: '/baseInfo/registerList',
		meta: {
			routeName: '企业管理',
		},
		children: [
			{
				path: '/qyxxgl/zsqyxx',
				name: 'Zsqyxx',
				component: Zsqyxx,
				meta: {
					routeName: '正式企业信息',
				},
			},
			{
				path: '/qyxxgl/zsqyxxDetail',
				name: 'ZsqyxxDetail',
				component: ZsqyxxDetail,
				meta: {
					routeName: '正式企业信息',
				},
			},
		],
	},
]
export default routes
