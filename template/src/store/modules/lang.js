const state = {
  lang: 'zh-TW'
}

const getters = {
  lang: state => state.lang
}

const mutations = {
  setLanguage(state, lang) {
    state.lang = lang;
    Vue.config.lang = state.lang;
  }
}

const actions = {
    setLanguage( { commit }, lang) {
      commit('setLanguage', lang);
    }  
}

export default  {
  state,
  getters,
  mutations,
  actions
}
