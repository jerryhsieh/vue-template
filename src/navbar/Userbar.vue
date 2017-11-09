<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" style="background-color: #FCC327;">
    <router-link to="/" class="navbar-brand">{{$t("Money")}}</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav ml-auto">
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
    <ul class="navbar-nav ml-auto mr-3">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{username}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" role="button" @click="click">{{loginLabel}}</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex';
 export default {
   name: 'Userbar',
   computed: {
     ...mapGetters(['username', 'isLogin']),
     loginLabel() {
       return this.isLogin ? 'logout' : 'login';
     }
   },
   methods: {
     ...mapActions(['logout']),
     async click(event) {
       const result = await this.logout();
       this.$router.replace('/');
     }
   }
 }
</script>

<style scoped>

 .brand {
   color: rgba(0,0,0,0.9);
   text-decoration: none;
 }
</style>
