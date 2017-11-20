<template>
  <div class="editor">
    <Editor @editorValue="gotEditorValue"></Editor>
  </div>
  
</template>


<script>
 import Editor from '@/components/Utils/Editor.vue';
 import NewsService from '@/services/news-service';
 
 export default {
   name: 'Admin-News',
   components: {
     Editor
   },
   methods: {
     async gotEditorValue(value) {
       let news = {};
       news.title = value.title;
       news.content = value.content;
       const result = await NewsService.uploadNews(news);
       console.log(result);
       if (result.success) {
         console.log('upload news success');
         
       } else {
         console.error('error in upload');
       }
     }
   }

 }
 
</script>

<style scoped>

 .editor {
   margin-top: 20px;
 }
</style>
