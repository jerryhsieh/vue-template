import axios from 'axios';
import api from './api';
import utils from '@/helpers/utils.js';



export default {
  getMasters() {
    return axios.get(api.state.apiUrl + '/masters', utils.jwt(utils.TOKEN));
  }
}
