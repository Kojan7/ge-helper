import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appVersion: '0.7.0',
    dataVersion: 1,
    isDrawerShown: null,
    data: {}
  },
  mutations: {
    setIsDrawerShown(state, value) {
      state.isDrawerShown = value
    },
    toggleIsDrawerShown(state) {
      state.isDrawerShown = !state.isDrawerShown
    },
    initData(state) {
      if (localStorage.getItem('database')) {
        state.data = JSON.parse(localStorage.getItem('database'))
      }
    },
    setData(state, data) {
      state.data = data
      localStorage.setItem('database', JSON.stringify(state.data));
    },
    resetData(state) {
      state.data = {}
      localStorage.removeItem('database');
    }

  },
  actions: {

  }
})
