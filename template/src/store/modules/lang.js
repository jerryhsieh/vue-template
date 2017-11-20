const state = {

}

const getters = {

}

const mutations = {
  setLanguage(state, lang) {
    state.lang = lang;
    Vue.config.lang = state.lang;
  }
}

const actions = {
}

export default  {
  state,
  getters,
  mutations,
  actions
}
