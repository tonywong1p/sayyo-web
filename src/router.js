import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/pages/Login.vue';
import Main from '@/pages/Main.vue';


export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
  },{
    path: '/main',
    name: 'Main',
    component: Main,
}],
  mode: 'hash',
});