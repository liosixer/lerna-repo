const Layout = () => import(/* webpackPrefetch: true */'../views/layout/Index.vue')

const routes = [{
  path: '/template',
  component: Layout,
  redirect: '/template/template',
  children: [{
      path: '/template/template',
      name: 'template',
      component: () => import('@/views/template/Template.vue'),
      meta: {}
    },
    {
      path: '/template/templateDetail',
      name: 'templateDetail',
      component: () => import('@/views/template/TemplateDetail.vue'),
      meta: {}
    }
  ]

}]
export default routes