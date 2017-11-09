<template>
  <div class="bg">
    <div class="container">
      <div class="row">
        <div class="login-box">
          <h3 class="title center-align">{{$t("Please_sign_in")}}</h3>
          <form>
            <div class="form-group" :class="{'has-warning': readySubmit && validateName}">
              <label for="inputUsername" class="left-align">{{$t("Username")}}</label>
              <input type="text" class="form-control form-control-warning" id="inputUsername" aria-describedby="username" v-model="username" placeholder="jamesbond">
              <div class="form-control-feedback" v-if="readySubmit && validateName" >{{$t("username_format")}}</div>
            </div>
            <div class="form-group" :class="{ 'has-warning': readySubmit && validatePassword}">
              <label for="inputPassword" class="left-align">{{$t("Password")}}</label>
              <input type="password" class="form-control form-control-warning" id="inputPassword" v-model="password" placeholder="password">
              <div class="form-control-feedback" v-if="readySubmit && validatePassword">{{$t('password_format')}}</div>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" checked>
                {{ $t("remember_me")}}
              </label>
            </div>
            <button type="submit" class="btn btn-outline-primary btn-block" @click="validateForm">{{ $t('login')}}</button>
          </form>
          <button type="button" class="btn btn-block btn-primary fb" >Facebook</button>
          <router-link to="/" class="fixed-bottom reg">{{$t("Register")}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
 import { mapActions } from 'vuex';
 export default {
   name: 'Login',
   methods: {
     ...mapActions(['login']),
     async validateForm(event) {
       this.readySubmit = true;
       if (this.validateName || this.validatePassword) event.preventDefault();
       const {username, password} = this;
       const result = await this.login({username, password});
       console.log(result);
       if (result.success) {
         const redirect = this.$route.query.redirect || '/hello';
         this.$router.replace(redirect);
       }
       else {
         alert('error in login');
       }

     }
   },
   data: function() {
     return {
       username: '',
       password: '',
       readySubmit: false
     }
   },
   computed: {
     validateName() {
       let re = /^[a-zA-Z0-9-_]{5,20}/;
       if (this.username === '') {
         return false;
       } else {
         return !re.test(this.username);
       }
     },
     validatePassword() {
       let re = /^[a-zA-Z0-9-_]{5,20}/;
       if (this.password === '') {
         return false;
       } else {
         return !re.test(this.password);
       }

     }
   },
   i18n: {
     messages: {
       'en-US': {
         remember_me: 'Remember Me!',
         login: 'login',
         Register: 'Not yet a member, please register',
         username_format: 'username at least five characters or numbers',
         password_format: 'password at least five characters or numbers'
       },
       'zh-TW': {
         remember_me: '記住我的帳號密碼！',
         login: '登入',
         Register: '還不是會員嗎? 請點我註冊',
         username_format: '使用者名稱至少五個英文或數字',
         password_format: '密碼至少五個英文或數字'
       }
     }
   }
 }
</script>

<style scoped>

 .bg {
   height: 650px;
   width: 100vw;
   background: url(https://images.pexels.com/photos/42314/quarterback-american-football-run-touchdown-42314.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260) 50%;
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

 .login-box {
   min-width: 350px;
   background: white;
   position: absolute;
   margin: 2rem;
   top: 10%;
   left: 50%;
   transform: translateX(-50%);
   padding: 2rem;
 }

 .login-box .title {
   color: #1390ff;
   padding: 1rem;
 }


 .center-align {
   text-align: center;

 }
 .left-align {
   text-align: left;
 }

 .fb {
   margin: 2rem 0;
 }
 .reg {
   text-align: center;
   background-color: #1e90ff;
   color: white;
   text-decoration: none;
   padding: 0.5rem;
 }

</style>
