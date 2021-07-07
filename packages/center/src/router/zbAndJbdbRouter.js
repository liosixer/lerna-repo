const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const zbrdbTable = () => import ('../views/zbrdb/zbrdbTable')
const zbrdbBj = () => import ('../views/zbrdb/zbrdbBj')
const zbrdbXq = () => import ('../views/zbrdb/zbrdbXq')
const zbrdbAdd = () => import ('../views/zbrdb/zbrdbAdd')
const jbrdbTable = () => import ('../views/zbrdb/jbrdbTable')
const jbrdbBj = () => import ('../views/zbrdb/jbrdbBj')
const jbrdbXq = () => import ('../views/zbrdb/jbrdbXq')
const jbrdbAdd = () => import ('../views/zbrdb/jbrdbAdd')

const routes = [
    {
        path: '/zbrdb',
        component: Layout,
        redirect: '/zbrdb/zbrdbTable',
        children: [
            {
                path: '/zbrdb/zbrdbTable',
                name: 'zbrdbTable',
                component: zbrdbTable,
                meta: {}
            },
            {
                path: '/zbrdb/zbrdbAdd',
                name: 'zbrdbAdd',
                component: zbrdbAdd,
                meta: {}
            },
            {
                path: '/zbrdb/zbrdbBj/:bjid',
                name: 'zbrdbBj',
                component: zbrdbBj,
                meta: {}
            },
            {
                path: '/zbrdb/zbrdbXq/:xqid',
                name: 'zbrdbXq',
                component: zbrdbXq,
                meta: {}
            },
            {
                path: '/zbrdb/jbrdbTable',
                name: 'jbrdbTable',
                component: jbrdbTable,
                meta: {}
            },
            {
                path: '/zbrdb/jbrdbAdd',
                name: 'jbrdbAdd',
                component: jbrdbAdd,
                meta: {}
            },
            {
                path: '/zbrdb/jbrdbBj/:bjid',
                name: 'jbrdbBj',
                component: jbrdbBj,
                meta: {}
            },
            {
                path: '/zbrdb/jbrdbXq/:xqid',
                name: 'jbrdbXq',
                component: jbrdbXq,
                meta: {}
            }
        ]
    }
]
export default routes