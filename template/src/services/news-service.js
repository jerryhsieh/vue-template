import axios from 'axios';
import api from './api';
import utils from '@/helpers/utils.js';


export default {
  getNewsFromServer() {
    return axios.get(api.state.apiUrl + '/news');
  },
  getNewsTitlesFromServer() {
    return axios.get(api.state.apiUrl + '/news/titles');
  },
  getLatestNewsTitlesFromServer(num = 5) {
    return new Promise((resolve, reject) => {
      axios.get(api.state.apiUrl + '/news/titles/' + num)
           .then (res => {
             resolve(res.data);
           })
           .catch(err => {
             reject(err)
           })
    });
    
  },
  getLatestNewsFromServer(num) {
    return axios.get(api.state.apiUrl + '/news/latest/' +  num);
  },
  getNewsById(id) {
    //console.log('in get news by id from server', id);
    return new Promise((resolve, reject) => {
      axios.get(api.state.apiUrl + '/news/' +  id)
               .then (res => {
                 //console.log(res.data);
                 resolve(res.data);
               })
               .catch(err => {
                 reject(err)
               })
    });
  },
  // this upload will only by admin
  uploadNews(news) {
    console.log('in upload news');
    return new Promise((resolve, rejct) => {
      axios.post(api.state.apiUrl + '/news/', { 'news': news}, utils.jwt(utils.TOKEN))
    })
  }

}
