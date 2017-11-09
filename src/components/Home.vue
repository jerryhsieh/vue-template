<template>
  <div class="bg">
    <div class="bg-title">
      <h1>{{$t('wealthy')}}</h1>
      <h3>{{$t('work_hard')}}</h3>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
   i18n: {
     messages: {
       'en-US': {
         wealthy: 'Healthy and Wealthy Life',
         work_hard: 'No pain, no gain'
       },
       'zh-TW': {
         wealthy: '財富自由的人生',
         work_hard: '努力耕耘就會有收穫'
       }
     }
   }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .bg {
   height: 650px;
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

 h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
