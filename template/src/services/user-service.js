import axios from 'axios';
import api from './api';
import utils from '@/helpers/utils.js';



export default {
  getCurrentUser(token) {
    return axios.post(api.state.apiUrl + '/users/currentUser', { 'token': token }, utils.jwt() );
  },
  userAuth(username, password) {
    return axios.post(api.state.apiUrl + '/users/authenticate', {username: username, password: password});
  }
  
}
