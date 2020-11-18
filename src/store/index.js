import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    showDialog: false
  },
  mutations: {
    Login: function (state, username) {
      state.username = username
    },
    ShowLoginDialog: function (state, boolean) {
      state.showDialog = boolean
    }
  },
  actions: {
  },
  modules: {
  }
})
