import utils from '@/helpers/utils.js';
//import Master from '@/models/masters.js';
import Master from '@/services/master-service.js';

const state = {
  masters: []
}

const getters = {
  masters(state) {
    return state.masters;
  }
}

const mutations = {
  masters (state, masters) {
    state.masters = masters;
  }
  
}

const actions = {
  getMastersFromServer( {commit, state},) {
    //console.log('in get masters from server');
    if (utils.isTokenExist()) {
      return new Promise((resolve, reject) => {
        Master.getMasters()
             .then (res => {
               //console.log(res.data);
               commit('masters', res.data);
             })
             .catch(err => {
               reject(err)
             })
      })
    } else {
      return utils.emptyPromise();
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
