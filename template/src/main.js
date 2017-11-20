// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import { mapGetters } from 'vuex'
import store from './store'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use( VueI18n )

// i18n
const messages = {
  'en-US': require('./i18n/en.json'),
  'zh-TW': require('./i18n/tw.json')
};

Vue.config.productionTip = false

//console.log('lang is %s', store.state.lang);
const i18n = new VueI18n({
  locale: 'zh-TW',
  silentTranslationWarn: true,
  messages
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})

