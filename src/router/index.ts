import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import { getToken } from '@/utils'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout
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
