/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';
import GeDatabase from '@/GeDatabase.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appVersion: '1.4.0',
    dataVersion: 3,
    defaultData: GeDatabase,
    data: {},
  },
  mutations: {
    init(state) {
      if (localStorage.getItem('database')) {
        state.data = JSON.parse(localStorage.getItem('database'));
      } else {
        state.data = state.defaultData;
      }
    },
    setData(state, data) {
      state.data = data;
      localStorage.setItem('database', JSON.stringify(state.data));
    },
    useDefaultData(state) {
      localStorage.removeItem('database');
      state.data = state.defaultData;
    },
    resetData(state) {
      localStorage.removeItem('database');
      state.data = {};
    },
  },
  actions: {

  },
});
