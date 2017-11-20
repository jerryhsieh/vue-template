<template>
  <div id="app">
    <router-view name="topbar"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
   </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex';

 export default {
   name: 'app',
   methods: {
     ...mapActions(['refresh']),
   },
   //components: { Navbar, Userbar },
   created() {
     this.refresh()
         .then(res => {
           //console.log('in App',res);
           this.$router.replace('/hello');  // welcome member
         })
         .catch(err => {
           //console.error(err);
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
