import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index/Home.vue'
import index from '@/views/index/index.vue'
import routerData from '@/utils/routerData.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'indexPage',
    component: index,
    redirect: '/index/template',
    children: [
      // {
      //   path: '/index/template', // 子页面路径
      //   name: 'template',
      //   component:() => import('@/views/template/index.vue'),
      //   langKey: 'templateManager'
      // },
      // {
      //   path: '/index/regular', // 子页面路径
      //   name: 'regular',
      //   component:() => import('@/views/regular/index.vue'),
      //   langKey: 'regularManager'
      // },
      // {
      //   path: '/index/field', // 子页面路径
      //   name: 'field',
      //   component:() => import('@/views/field/index.vue'),
      //   langKey: 'fieldManager'
      // },
      // {
      //   path: '/index/commonAPI', // 子页面路径
      //   name: 'commonAPI',
      //   component:() => import('@/views/commonAPI/index.vue'),
      //   langKey: 'commonAPIManager'
      // },
    ].concat(routerData)
  },
  {
    // path: '/',
    path: '/home',
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
    redirect: '/index'
    // redirect:'/systemInfo/productInfo',//默认页面
  }
]

const router = new VueRouter({
  routes
})

export default router
