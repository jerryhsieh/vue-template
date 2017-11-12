<template>
  <nav class="navbar navbar-expand-lg navbar-light nav-color">
    <router-link to="/" class="navbar-brand">{{$t("Money")}}</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/subscribe" class="nav-link" active-class="active">{{$t("Subscribe")}} <span class="sr-only">(current)</span></router-link>
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
          <a class="dropdown-item" href="#"><i class="fa fa-cog fa-fw" aria-hidden="true"></i> {{$t("admin")}}</a>
          <a class="dropdown-item" href="#"><i class="fa fa-user fa-fw" aria-hidden="true"></i> {{$t("account")}}</a>
          <a class="dropdown-item" role="button" @click="click"><i class="fa fa-sign-out fa-fw"></i> {{loginLabel}}</a>
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
   },
   i18n: {
     messages: {
       'en-US': {
         Subscribe: 'Subscribe Master System/Strategy',
         admin: 'Admin',
         account: 'Account'
       },
       'zh-TW': {
         Subscribe: '訂閱投顧系統/策略',
         admin: '管理',
         account: '帳號'
       }
     }
   }
 }
</script>

<style scoped lang="scss">

 @import '~styles/base';
 
 .nav-color {
   background-color: $userbar-bg-color;
 }
 
 .brand {
   color: rgba(0,0,0,0.9);
   text-decoration: none;
 }
</style>
