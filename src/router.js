import Vue from 'vue'
import Router from 'vue-router'
import Ship from './views/Ship.vue'
import Module from './views/Module.vue'
import Build from './views/Build.vue'
import Legion from './views/Legion.vue'
import Misc from './views/Misc.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/misc'
    },
    {
      path: '/ship',
      name: 'ship',
      component: Ship
    },
    {
      path: '/module',
      name: 'module',
      component: Module
    },
    {
      path: '/build',
      name: 'build',
      component: Build
    },
    {
      path: '/legion',
      name: 'legion',
      component: Legion
    },
    {
      path: '/misc',
      name: 'misc',
      component: Misc
    },
  ]
})
