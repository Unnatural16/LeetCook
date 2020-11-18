import Vue from 'vue'
import VueRouter from 'vue-router'
// import ProblemSet from './ProblemSet'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' },
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
  },
  {
    path: '/contest',
    name: 'Contest',
    meta: { name: '竞赛' },
  },
  {
    path: '/interview',
    name: 'Interview',
    meta: { name: '企业' },
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
