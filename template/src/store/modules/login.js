import utils from '@/helpers/utils.js';
import User from '@/services/user-service.js';

const state = {
  showLoading: false,
  isLogin: false,
  username: '',
  avatar: ''
}

const getters = {
  showLoading: state => state.showLoading,
  isLogin: state => state.isLogin,
  username: state => state.username,
  avatar: state=> state.avatar,
}

const mutations = {
  showLoading (state, value) {
    state.showLoading = value;
  },
  isLogin (state, value) {
    state.isLogin = value;
  },
  username (state, value) {
    state.username = value;
  },
  avatar (state, value) {
    state.avatar = value;
  }
}

const actions = {
  showLoading ( { commit }, value) {
    commit('showLoading', value);
  },
  refresh({ dispatch, commit, state }) {
    if (dispatch('isLogin')) {
      return new Promise((resolve, reject) => {
        let token = utils.getToken();
        User.getCurrentUser(token)
             .then(res => {
               commit('isLogin', true);
               commit('username', res.data.username);
               commit('avatar', res.data.avatar);
               resolve(res.data);
             })
             .catch(err => {
               reject(err);
             })
      })
    } else {
      return utils.emptyPromise();
    }
  },
  logout({ commit, state})  {
    utils.removeToken();
    commit('isLogin', false);
    commit('username', '');
  },
  isLogin({dispatch, commit, state}) {
    const idToken = utils.getToken();
    if (!idToken || utils.isTokenExpired(idToken)) {
      console.log('no token or token expired');
      dispatch('logout');
      return false;
    } else {
      return true;
    }
  },
  login ( { commit,state }, { username, password }) {
    return new Promise( (resolve, reject) => {
      commit('showLoading', true);
      User.userAuth(username, password)
           .then(res => {
             if (res.data.success) {
               commit('username', username);
               commit('isLogin', true);
               utils.writeToken(true, 'token', res.data.token);
               resolve(res.data);
             } else {
               console.log(res);
             }
             commit('showLoading', false);
           })
           .catch(err => {
             console.error('catch error with %s', err);
             reject(err);
           })

    });
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
