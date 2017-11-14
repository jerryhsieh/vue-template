import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import login from './modules/login';
import api from './modules/api';
import lang from './modules/lang';
import masters from './modules/masters';

import utils from '../helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    api,
    lang,
    masters
  }
})

const myPlugin = (store) => {
  store.subscribe((mutation) => {
    console.log(mutation);
  })
}
