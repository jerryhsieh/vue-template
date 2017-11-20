import utils from '@/helpers/utils'
import NewsService from '@/services/news-service.js';

const state = {
  news: [],
  titles: [],
  latestTitles: [],
  latestNews: []
}

const getters = {
  news(state) {
    return state.news;
  },
  titles(state) {
    return state.titles;
  },
  latestTitles(state) {
    return state.latestTitles;
  },
  latestNews(state) {
    return state.latestNews;
  }
}

const mutations = {
  news(state, news) {
    state.news = news;
  },
  titles(state, titles) {
    state.titles = titles;
  },
  latestTitles(state, latestTitles) {
    state.latestTitles = latestTitles;
  },
  latestNews(state, latestNews) {
    state.latestNews = latestNews;
  }
}

const actions = {
  setNewsTitles({commit}, newsTitles) {
    commit('titles', newsTitles);
  },
  setLatestNewsTitle({commit}, titles) {
    commit('latestTitles', titles);
  },
  getNewsFromServer( {commit, state}) {
    console.log('in get news from server');
    return new Promise((resolve, reject) => {
      // axios.get(api.state.apiUrl + '/masters', utils.jwt(utils.TOKEN))
      NewsService.getNewsFromServer()
           .then (res => {
             console.log(res.data);
             commit('news', res.data);
             resolve(res.data);
           })
           .catch(err => {
             reject(err)
           })
    });

  },
  getNewsTitlesFromServer( {commit, state}) {
    console.log('in get news titles from server');
    return new Promise((resolve, reject) => {
      NewsService.getNewsTitlesFromServer()
           .then (res => {
             console.log(res.data);
             commit('titles', res.data);
             resolve(res.data);
           })
           .catch(err => {
             reject(err)
           })
    });
  },
  getLatestNewsTitlesFromServer( {commit, state}, num = 5) {
    console.log('in get latest news titles from server');
    return new Promise((resolve, reject) => {
      NewsService.getLatestNewsFromServer(num)
           .then (res => {
             console.log(res.data);
             commit('latestTitles', res.data);
             resolve(res.data);
           })
           .catch(err => {
             reject(err)
           })
    });
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
