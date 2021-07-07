const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const superviseRsz = () => import ('../views/superviseManage/superviseRsz')
const superviseDwsz = () => import ('../views/superviseManage/superviseDwsz')

const routes = [
    {
        path: '/superviseManage',
        component: Layout,
        redirect: '/superviseManage/superviseRsz',
        children: [
            {
                path: '/superviseManage/superviseRsz',
                name: 'superviseRsz',
                component: superviseRsz,
                meta: {}
            },
            {
                path: '/superviseManage/superviseDwsz',
                name: 'superviseDwsz',
                component: superviseDwsz,
                meta: {}
            }
        ]
    }
]
export default routes