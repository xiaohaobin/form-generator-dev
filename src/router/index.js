import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index/Home.vue'
import index from '@/views/index/index.vue'
import routerData from '@/utils/routerData.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/formDesignerIndex',
    name: 'indexPage',
    component: index,
    redirect: '/formDesignerIndex/template',
    children: [
    ].concat(routerData)
  },
  {
    // path: '/',
    path: '/formDesignerHome',
    name: 'home',
    component: Home
  },
  {
    path: '/parser',
    name: 'parser',
    component: () => import(/* webpackChunkName: "parser-example" */'@/components/parser/example/Index.vue')
  },
  {
    path: '/parser2',
    name: 'parser2',
    component: () => import('@/components/parser/example/Index2.vue')
  },
  {
    path: '/tinymce',
    name: 'tinymce',
    component: () => import(/* webpackChunkName: "tinymce-example" */'@/components/tinymce/example/Index.vue')
  },
  {
    path: '*', // 重定向页面地址
    redirect: '/formDesignerIndex'
    // redirect:'/systemInfo/productInfo',//默认页面
  }
]

const router = new VueRouter({
  routes
})

export default router
