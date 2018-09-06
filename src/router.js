import Vue from 'vue'
import Router from 'vue-router'
import Ship from './views/Ship.vue'
import Module from './views/Module.vue'
import Build from './views/Build.vue'
import Legion from './views/Legion.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
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
  ]
})
