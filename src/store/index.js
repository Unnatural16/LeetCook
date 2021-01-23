import Vue from 'vue'
import Vuex from 'vuex'
import Common from '../Common.js'
// import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)
Vue.use(Common)
export default new Vuex.Store({
  // plugins:[createPersistedState()],
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
    MutateUserMessage: function (state, message) {
      state.userMessage = message
    },
    MutateProblems:function (state, problems) {
      state.problems = problems
    }
  },
  modules: {
  }
})
