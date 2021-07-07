const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const spLevelSz = () => import ('../views/spManage/spLevelSz')
const spPersonSz = () => import ('../views/spManage/spPersonSz')

const routes = [
    {
        path: '/spManage',
        component: Layout,
        redirect: '/spManage/spLevelSz',
        children: [
            {
                path: '/spManage/spLevelSz',
                name: 'spLevelSz',
                component: spLevelSz,
                meta: {}
            },
            {
                path: '/spManage/spPersonSz/:id',
                name: 'spPersonSz',
                component: spPersonSz,
                meta: {}
            }
        ]
    }
]
export default routes