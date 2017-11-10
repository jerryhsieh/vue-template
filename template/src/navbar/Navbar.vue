<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top nav-color">
    <router-link to="/" class="navbar-brand">{{$t("Money")}}</router-link>    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" active-class="active">{{$t("News")}} <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">{{$t("Team")}}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">{{$t("About")}}</router-link>          
        </li>
      </ul>
    </div>    
    <ul class="navbar-nav ml-auto">
      <span class="navbar-text">{{username}}</span>
        <li class="nav-item ml-auto">
          <router-link to="/login" class="nav-link">{{$t("Member")}}</router-link>
        </li>
      </ul>
  </nav>
</template>

<script>
 import { mapGetters } from 'vuex';
 export default {
   name: 'Navbar',
   computed: {
     ...mapGetters(['username', 'isLogin']),
     loginLabel() {
       return this.isLogin ? 'logout' : 'login';
     }
   }
 }
</script>

<style scoped lang="scss">
@import  '~styles/base';
 .brand {
   color: rgba(0,0,0,0.9);
   text-decoration: none;
 }

 .nav-color {
   background-color: $navbar-bg-color;
 }
</style>
