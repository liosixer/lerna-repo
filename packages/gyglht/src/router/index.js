import Vue from 'vue'
import VueRouter from 'vue-router'
import qyglxxRouter from './qyglxxRouter'
import userQxRouter from './userQxRouter'
import spMangerRouter from './spMangerRouter'
import superviseManageRouter from './superviseManageRouter'
import zbAndJbdbRouter from './zbAndJbdbRouter'

const Login = () => import (/* webpackPrefetch: true */'../views/login/Login.vue')
const Register = () => import (/* webpackPrefetch: true */'../views/login/Register.vue')
const findPassword = () => import (/* webpackPrefetch: true */'../views/login/findPassword.vue')
const zhAccount = () => import (/* webpackPrefetch: true */'../views/login/zhAccount.vue')
const accountJd = () => import (/* webpackPrefetch: true */'../views/login/accountJd.vue')
const Layout = () => import (/* webpackPrefetch: true */'../views/layout/Index.vue')
const page404 = () => import(/* webpackPrefetch: true */'../views/ErrPage.vue')

Vue.use(VueRouter)
//解决面包屑导航，重复添加路由报错问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
    {
        path: '/',
        //redirect: '/qyxxgl/qyjbxx'
        redirect: '/login',
    },
    {
        path: '/demo',
        component: () => import ('../views/demo/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/findPassword',
        name: 'findPassword',
        component: findPassword
    },
    {
        path: '/zhAccount',
        name: 'zhAccount',
        component: zhAccount
    },
    {
        path: '/accountJd',
        name: 'accountJd',
        component: accountJd
    },
    ...userQxRouter,
    ...qyglxxRouter,
    ...spMangerRouter,
    ...zbAndJbdbRouter,
    ...superviseManageRouter,
    {
        path:'*',
        name: 'page404',
        component: page404
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
