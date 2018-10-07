import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import i18n from './i18n';
import './touch';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    this.$store.commit('init');
    if (localStorage.getItem('locale')) {
      this.$i18n.locale = JSON.parse(localStorage.getItem('locale'));
    }
  },
  render: h => h(App),
}).$mount('#app');
