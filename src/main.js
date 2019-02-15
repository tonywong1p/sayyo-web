import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import router from '@/router.js'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import {VueMasonryPlugin} from 'vue-masonry'
Vue.use(VueMasonryPlugin)

import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)

require('dotenv').config()

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
