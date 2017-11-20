import axios from 'axios';
import api from './api';
import utils from '@/helpers/utils.js';

export default {
  uploadImage(image) {
    return axios.post(api.state.apiUrl + '/upload/images/', { 'image': image }, utils.jwt());
  },
  uploadAvatar(id, image) {
    return axios.post(api.state.apiUrl + '/upload/avatar/' + id, { 'image': image}, utils.jwt());
  }
}
