import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Module from './views/Module.vue';

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
  ],
});
