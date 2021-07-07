const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')

const agentCost = () => import('../views/costManage/agentCost')
const agentDetails = () => import('../views/costManage/agentCost/agentDetails')

const platformCost = () => import('../views/costManage/platformCost')
const platformDetails = () => import('../views/costManage/platformCost/platformDetails')
const costAdd = () => import('../views/costManage/templates/cost-add')

const routes = [
	{
		path: '/costManage',
		component: Layout,
		redirect: '/costManage/agentCost',
		meta: {
			routeName: '代理服务费设置',
		},
		children: [
            // =========服务代理==========
			{
				path: '/costManage/agentCost',
				name: 'agentCost',
				component: agentCost,
				meta: {
					routeName: '代理服务费设置',
				}
			},
			{
				path: '/costManage/agentDetails',
				name: 'agentDetails',
				component: agentDetails,
				meta: {
					routeName: '代理服务费编辑',
				}
            },
			{
				path: '/costManage/agentAdd',
				name: 'agentAdd',
				component: costAdd,
				meta: {
					routeName: '新增',
				}
			},
            // =========平台使用费==========
			{
				path: '/costManage/platformCost',
				name: 'platformCost',
				component: platformCost,
				meta: {
					routeName: '平台使用费设置',
				}
			},
			{
				path: '/costManage/platformDetails',
				name: 'platformDetails',
				component: platformDetails,
				meta: {
					routeName: '平台使用费编辑',
				}
			},
			{
				path: '/costManage/platformAdd',
				name: 'platformAdd',
				component: costAdd,
				meta: {
					routeName: '新增',
				}
			},
		],
	},
]
export default routes
