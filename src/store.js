/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appVersion: '1.0.0',
    dataVersion: 1,
    data: {},
  },
  mutations: {
    init(state) {
      if (localStorage.getItem('database')) {
        state.data = JSON.parse(localStorage.getItem('database'));
      }
    },
    setData(state, data) {
      state.data = data;
      localStorage.setItem('database', JSON.stringify(state.data));
    },
    resetData(state) {
      state.data = {};
      localStorage.removeItem('database');
    },
  },
  actions: {

  },
});
