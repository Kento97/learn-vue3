import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import { getToken } from '@/utils'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/Article/index.vue')
      },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/Publish/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !getToken()) next({ name: 'login' })
  else next()
})
export default router
