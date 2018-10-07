import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Module from './views/Module.vue';
import Hull from './views/Hull.vue';
import Build from './views/Build.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/module',
      name: 'module',
      component: Module,
    },
    {
      path: '/hull',
      name: 'hull',
      component: Hull,
    },
    {
      path: '/build',
      name: 'build',
      component: Build,
    },
  ],
});
