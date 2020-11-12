import Vue from 'vue'
import VueRouter from 'vue-router'
// import ProblemSet from './ProblemSet'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'ProblemSet',params: {type: 'all'} },
  },
  {
    path: '/home',
    name: 'Home',
  },
  {
    path: '/problemset/:type',
    name: 'ProblemSet',
    component: () => import('../views/ProblemSetView.vue'),
  },
  {
    path: '/leetbook',
    name: 'LeetBook',
  },
  {
    path: '/404',
    name: '404',
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
