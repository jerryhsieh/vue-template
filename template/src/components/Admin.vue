<template>
  <div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-2 col-md-1">
          <nav class="nav flex-column sidenav">
            <router-link to="/admin/dashboard" class="nav-link"><i class="fa fa-thermometer-half" aria-hidden="true"></i><p>{{$t("dashboard")}}</p></router-link>            
            <router-link to="/admin/users" class="nav-link"><i class="fa fa-users" aria-hidden="true"></i><p>{{$t("users")}}</p></router-link>
            <router-link to="/admin/masters" class="nav-link"><i class="fa fa-mortar-board" aria-hidden="true"></i><p>{{$t("masters")}}</p></router-link>
            <router-link to="/admin/proposals" class="nav-link"><i class="fa fa-bar-chart-o" aria-hidden="true"></i><p>{{$t("proposals")}}</p></router-link>
            <router-link to="/admin/reports" class="nav-link"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>{{$t("reports")}}</p></router-link>                                    
            <router-link to="/admin/news" class="nav-link"><i class="fa fa-newspaper-o" aria-hidden="true"></i><p>{{$t("news")}}</p></router-link>
          </nav>
        </div>
        <div class="col-10 col-md-10">
          <router-view name="sideview"></router-view>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
 export default {
   name: 'Admin',
   i18n: {
     messages: {
       'en-US': {
         dashboard: 'Dashboard',
         users: 'Users',
         masters: 'Masters',
         proposals: 'Proposals',
         reports: 'Reports',
         news: 'News'
       },
       'zh-TW': {
         dashboard: '儀表板',
         users: '使用者',
         masters:'投顧老師',
         proposals: '顧問建議',
         reports: '投顧報告',
         news: '最新消息'
       }
     }
   }
 }
</script>


<style scoped lang="scss">

@import '../assets/scss/app.scss'; 
 .sidenav {
   margin-left: 0;
   text-align: center;
 }


 .sidenav a {
   line-height: 10px;
   /* margin: 5%;*/
   width: 100%;
   color: #333;
   padding: 0;
 }

 .sidenav i {
   padding: 16px 0;
   font-size: 20px;
 }

 .sidenav a:hover {
   background-color: silver;
 }

 .sidenav a  p {
   display: block;
   transform: translateX(-200px);
   transition: .2s;
   font-size: 0.8rem;
 }

 .sidenav:hover a  p, .sidenav a:focus p {
   transform: translateX(0);
 }

 .sidenav .router-link-active {
   /*background-color: #FFB300;*/
   background-color: #DCE775;

 }

 .sidenav .router-link-active p {
   transform: translateX(0);
 }



 @include media-breakpoint-between(xs, md) {
   .sidenav a p {
     display: none;
   }

}


</style>
