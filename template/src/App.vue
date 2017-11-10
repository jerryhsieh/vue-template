<template>
  <div id="app">
    <Navbar v-if="!isLogin"></Navbar>
    <Userbar v-else></Userbar>
    <router-view/>
   </div>
</template>

<script>
 import Navbar from './navbar/Navbar.vue';
 import Userbar from './navbar/Userbar.vue';
 import { mapActions, mapGetters } from 'vuex';

 export default {
   name: 'app',
   computed: {
     ...mapGetters(['username', 'isLogin'])
   },
   methods: {
     ...mapActions(['refresh']),
   },
   components: { Navbar, Userbar },
   created: function() {
     this.refresh()
         .then(res => {
           console.log(res);
           this.$router.replace('/hello');  // welcome member
         })
         .catch(err => {
           this.$router.replace('/');     // default to home dir
         })
   }
 }
</script>

<style lang="scss">
@import './assets/scss/app.scss';

 #app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;

 }
</style>
