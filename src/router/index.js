import Vue from 'vue'
import VueRouter from 'vue-router'
// import ProblemSet from './ProblemSet'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'ProblemSet', params: { type: 'all' } },
  },
  {
    path: '/home',
    name: 'Home',
    meta: { name: '主页' },
    component: () => import('../views/Home')
  },
  {
    path: '/problemset/:type',
    name: 'ProblemSet',
    meta: { name: '问题列表' },
    component: () => import('../views/ProblemSetView.vue'),
  },
  {
    path: '/leetbook',
    name: 'LeetBook',
    meta: { name: '电子书' },
    component: () => import('../views/LeetBook.vue'),
  },
  {
    path: '/circle',
    name: 'Circle',
    meta: { name: '讨论' },
    component: () => import('../views/Circle.vue'),
  },
  {
    path: '/contest',
    name: 'Contest',
    meta: { name: '竞赛' },
    component: () => import('../views/Contest.vue'),
  },
  {
    path: '/interview',
    name: 'Interview',
    meta: { name: '企业' },
    component: () => import('../views/Interview.vue')
  },
  {
    path: '/app',
    name: 'App',
    meta: { name: '应用' },
  },
  {
    path: '/premium',
    name: 'Premium',
    meta: { name: '会员' },
  },
  {
    path: '/404',
    name: '404',
    meta: { name: '404' },
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
