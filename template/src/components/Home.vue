<template>
  <div>
    <div class="bg">
      <div class="bg-title">
        <h1>{{$t('wealthy')}}</h1>
        <h3>{{$t('work_hard')}}</h3>
      </div>
    </div>
    <div class="container content">
      <div class="row">
        <div class="col-md-6 news" >
          <div class="content-title">{{$t("news")}}</div>
          <dl v-for="news in latestTitles">
            <dt>{{news.created.slice(0, 10)}}</dt>
            <dd><router-link :to="`/news/${news.id}`"  class="link">{{news.title}}</router-link></dd>
          </dl>
        </div>

        <div class="col-md-6">
          <div class="content-title">{{$t("activities")}}</div>
          <dl v-for="news in latestTitles">
            <dt>{{news.created.slice(0,10)}}</dt>
            <dd><router-link :to="`/news/${news.id}`"  class="link">{{news.title}}</router-link></dd>            
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import {mapGetters, mapActions} from 'vuex';
 import NewsService from '@/services/news-service.js';
 export default {
   name: 'Home',
   computed: {
     ...mapGetters(['latestTitles'])
   },
   data () {
     return {
       msg: 'Welcome to Your Vue.js App'
     }
   },
   methods: {
     ...mapActions(['setLatestNewsTitle']),
     async getNews() {
       try {
         const news = await NewsService.getLatestNewsTitlesFromServer();
         //console.log(news);
         this.setLatestNewsTitle(news);
       } catch (e) {
         console.error(e);
       }
     }
   },
   created() {
     if (this.latestTitles.length === 0) {
       this.getNews();
     }
   },
   i18n: {
     messages: {
       'en-US': {
         wealthy: 'Healthy and Wealthy Life',
         work_hard: 'No pain, no gain',
         news: 'News',
         activities: 'Activities'
       },
       'zh-TW': {
         wealthy: '財富自由的人生',
         work_hard: '努力耕耘就會有收穫',
         news: '最新消息',
         activities: '最新活動'
       }
     }
   }

 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .bg {
   height: 400px;
   width: 100vw;
   background: url(https://images.pexels.com/photos/163032/office-pen-calculator-computation-163032.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260) 50%;
   background-size: cover;
   position: relative;
   overflow: hidden;
 }

 .bg:before {
   content: "";
   display: block;
   width: 100%;
   background-color: rgba(0,0,0,0.5);
   height: 100vh;
 }

 .bg-title {
   color: white;
   text-align: center;
   position: absolute;
   width: 100%;
   top: 50%;
   transform: translateY(-50%);
 }

 .content{
   margin: -100px auto 0 auto;
   height: calc(100vh - 50px);
   width: 70%;
   border-radius: 10px;
   position: relative;
   z-index: 5;

 }
.content-title {
    margin: 10px auto;
    padding: 5px;;
    background: white;
    font-size: 20px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.16),
    0 0 0 1px rgba(0,0,0,.08);
    
}

 
 .news {
   height: 100%;
   border-radius: 10px;
 }


dl {
    margin: 20px 0;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.16),
    0 0 0 1px rgba(0,0,0,.08);
}

dl:hover {
    background: #eee;
}

dt {
    color: coral;
}

dd {
    line-height: 1.7em;    
 }

.link {
  color: inherit; 
  text-decoration:inherit;
  display: block;
  margin-left: 20px;
};

.link:hover {
    cursor: pointer;
    border-bottom: 1px solid green;
}

 
 dl {
    animation-duration: 2s;
    animation-name: grow;
}

 
@keyframes grow {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

 
</style>
