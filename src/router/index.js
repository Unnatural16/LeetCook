import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    component: () => import('../views/App.vue')
  },
  {
    path: '/problem/:index',
    name: 'Problem',
    meta: { name: '题目' },
    component: () => import('../views/Problem.vue')
  },
  {
    path: '/newProblem',
    name: 'NewProblem',
    meta: { name: '提交问题' },
    component: () => import('../views/NewProblem.vue'),
    beforeEnter: function (to, from, next) {
      if (store.state.userMessage.auth) {
        next();
      } else {
        next('/problemset/all');
      }
    }
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
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name!='App'&&navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    next('/app');
  } else {
    next()
  }
})
export default router
