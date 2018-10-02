import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Module from './views/Module.vue'
import Hull from './views/Hull.vue'
import Build from './views/Build.vue'
import Legion from './views/Legion.vue'
import Plugins from './views/Plugins.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
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
      path: '/module',
      name: 'module',
      component: Module
    },
    {
      path: '/hull',
      name: 'hull',
      component: Hull
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
      path: '/plugins/:index',
      name: 'plugins',
      component: Plugins
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
