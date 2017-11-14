import axios from 'axios';
import api from './api';
import utils from '@/helpers/utils.js';
//import Master from '@/models/masters.js';

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
    state.masters = masters
  }
  
}

const actions = {
  getMastersFromServer( {commit, state},) {
    //console.log('in get masters from server');
    if (utils.isTokenExist(utils.TOKEN)) {
      return new Promise((resolve, reject) => {
        axios.get(api.state.apiUrl + '/masters', utils.jwt(utils.TOKEN))
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
