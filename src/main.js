import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { VueHammer } from '../node_modules/vue2-hammer/index.min.js'

Vue.config.productionTip = false

Vue.use(VueHammer)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
