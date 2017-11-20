<template>
  <div>
    <div class="container">
      <h2>{{news.title}}</h2>
      <div class="content"><p v-html="news.content"></p></div>
    </div>
  </div>
</template>

<script>
 import NewsService from '@/services/news-service.js';

 export default {
   name: 'News',
   data() {
     return {
       news: {}
     }
   },
   watch: {
     '$route': 'fetchData'
   },
   created() {
     this.fetchData();
   },
   methods: {
     async fetchData() {
       try {
         const res = await NewsService.getNewsById(this.$route.params.id)
         this.news = res[0];
       }
       catch (e) {
         console.log(e);
       }
     }
   }

 }
 
</script>

<style scoped>
 .container {
   margin-top: 20px;
 }
 
</style>

<style  lang="scss">
 .content {
   letter-spacing: 1px;
   line-height: 30px;
   font-family: 細明體, cwTexMing, serif;
 }

img.image {
   float: left;
   margin-right: 20px;
   margin-bottom: 20px;
   max-width:40%;
   border-radius: 5%;
 }
</style>
