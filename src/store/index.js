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
    problems: {}
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
    MutateProblems: function (state, problems) {
      state.problems = problems
    },
    LikeProblem: function (state, payload) {
      let liked = state.userMessage.liked
      if (payload.isLike) {
        if (!liked.includes(payload.index)) {
          liked.push(payload.index)
        }
      } else {
        let likedIndex = liked.indexOf(payload.index)
        if (likedIndex != -1) {
          liked.splice(likedIndex, 1)
        }
      }
    },
    FavoriteProblem:function (state, payload) {
      let favorite = state.userMessage.favorite
      if (payload.isFavorite) {
        if (!favorite.includes(payload.index)) {
          favorite.push(payload.index)
        }
      } else {
        let favoriteIndex = favorite.indexOf(payload.index)
        if (favoriteIndex != -1) {
          favorite.splice(favoriteIndex, 1)
        }
      }
    }
  },
  modules: {
  }
})
