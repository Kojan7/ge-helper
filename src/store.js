import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appVersion: '0.7.0',
    dataVersion: 1,
    isDrawerShown: null,
    plugins: [
      {name: 'Building', icon: 'account_balance', src:'https://ge-helper.gitlab.io/plugins/en/building.html'},
      {name: '基建', icon: 'account_balance', src:'https://ge-helper.gitlab.io/plugins/cn/building.html'}
    ],
    data: {}
  },
  mutations: {
    setIsDrawerShown(state, value) {
      state.isDrawerShown = value
    },
    toggleIsDrawerShown(state) {
      state.isDrawerShown = !state.isDrawerShown
    },
    init(state) {
      if (localStorage.getItem('database')) {
        state.data = JSON.parse(localStorage.getItem('database'))
      }
      if (localStorage.getItem('plugins')) {
        state.plugins = JSON.parse(localStorage.getItem('plugins'))
      }
    },
    setData(state, data) {
      state.data = data
      localStorage.setItem('database', JSON.stringify(state.data));
    },
    resetData(state) {
      state.data = {}
      localStorage.removeItem('database');
    },
    removePlugin(state, index) {
      state.plugins.splice(index, 1);
      localStorage.setItem('plugins', JSON.stringify(state.plugins));
    },
    addPlugin(state, plugin) {
      state.plugins.push({
        name: plugin.name,
        icon: plugin.icon,
        src: plugin.src
      });
      localStorage.setItem('plugins', JSON.stringify(state.plugins));
    }
  },
  actions: {

  }
})
