import Vue from 'vue'
import Vuex from 'vuex'
import Common from '../Common.js'


Vue.use(Vuex)
Vue.use(Common)
export default new Vuex.Store({
  state: {
    username: '',
    showDialog: false,
    userMessage: {},
    problems:{}
  },
  mutations: {
    Login: function (state, username) {
      state.username = username
    },
    ShowLoginDialog: function (state, boolean) {
      state.showDialog = boolean
    },
    GetUserMessage: function (state, message) {
      state.userMessage = message
    },
    GetProblems:function (state, problems) {
      state.problems = problems
    }
  },
  actions: {
    GetUserMessageAsync: async function ({ commit }) {
      commit('GetUserMessage', await Vue.prototype.$GetUserMessage())
    },
    GetProblemsAsync: async function ({ commit }) {
      commit('GetProblems', await Vue.prototype.$GetProblems())
    }
  },
  modules: {
  }
})
