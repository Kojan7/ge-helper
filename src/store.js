import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDrawerShown: null
  },
  mutations: {
    updateIsDrawerShown(state, value) {
      state.isDrawerShown = value
    },
    toggleIsDrawerShown(state) {
      state.isDrawerShown = !state.isDrawerShown
    }
  },
  actions: {

  }
})
