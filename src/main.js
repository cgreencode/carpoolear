import Vue from 'vue'
import App from './App'

import VueResource from 'vue-resource'
import router from './router'
import store from './store'

import cordova from './cordova'

import font_awesome_css from './styles/font-awesome/css/font-awesome.min.css'

import bootstrap_css from './styles/bootstrap/css/bootstrap.min.css'

import css from './styles/main.css'

Vue.use(VueResource)


/* eslint-disable no-unused-vars */
var app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

/* Just for debuggin */
window.Vue = Vue
window.store = store
