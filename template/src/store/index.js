import Vue from 'vue';
import Vuex from 'vuex';
import utils from '@/helpers';

import login from './modules/login';
import masters from './modules/masters';
import news from './modules/news';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'zh-TW'
  },
  getters: {
    lang: state => state.lang
  },
  mutations: {
    setLanguage(state, lang) {
      state.lang = lang;
      Vue.config.lang = state.lang;
    }
  },
  actions: {
    setLanguage( { commit }, lang) {
      commit('setLanguage', lang);
    }  
  },
  modules: {
    login,
    masters,
    news
  }
})

const myPlugin = (store) => {
  store.subscribe((mutation) => {
    console.log(mutation);
  })
}
