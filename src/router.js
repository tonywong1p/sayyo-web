import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Main from '@/pages/Main.vue';

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: Main,
  }],
  mode: 'hash',
});