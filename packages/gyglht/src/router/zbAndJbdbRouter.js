const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')
const zbrdbTable = () => import ('../views/zbrdb/zbrdbTable')
const zbrdbBj = () => import ('../views/zbrdb/zbrdbBj')
const zbrdbXq = () => import ('../views/zbrdb/zbrdbXq')
const zbrdbAdd = () => import ('../views/zbrdb/zbrdbAdd')
const jbrdbTable = () => import ('../views/zbrdb/jbrdbTable')
const jbrdbBj = () => import ('../views/zbrdb/jbrdbBj')
const jbrdbXq = () => import ('../views/zbrdb/jbrdbXq')
const jbrdbAdd = () => import ('../views/zbrdb/jbrdbAdd')
const sysManageList = () => import ('../views/sysmanage/SysManageList')
const sysManage = () => import ('../views/sysmanage/SysManage')
const SpecCkeckAuth = () => import ('../views/spManage/SpecCkeckAuth')
const SpecCkeckAuthPlan = () => import ('../views/spManage/SpecCkeckAuthPlan.vue')
const SpecCkeckAuthProject = () => import ('../views/spManage/SpecCkeckAuthProject.vue')
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
            },
            //采购制度管理
            {
                path: '/sys-managelist',
                name: 'sysManageList',
                component: sysManageList,
                meta: {}
            },
            {
                path: '/sys-manage/detail',
                name: 'sysManage',
                component: sysManage,
                meta: {}
            },
            //专业审核权限
            {
                path: '/spec-check-auth',
                name: 'SpecCkeckAuth',
                component: SpecCkeckAuth,
                meta: {}
            },
            //采购计划审核权限
            {
                path: '/spec-check-auth-plan',
                name: 'SpecCkeckAuthPlan',
                component: SpecCkeckAuthPlan,
                meta: {}
            },
            //采购立项审核权限
            {
                path: '/spec-check-auth-project',
                name: 'SpecCkeckAuthProject',
                component: SpecCkeckAuthProject,
                meta: {}
            },
        ]
    }
]
export default routes