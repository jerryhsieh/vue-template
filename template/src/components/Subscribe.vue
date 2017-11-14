
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3" v-for="master in masters">
        <div class="card border-secondary m-2">
          <div class="card-header d-flex align-items-center">
            <img class="card-avatar" alt="" :src="publicUrl + master.avatar"/>
            <div class="ml-auto">
              <h6>{{master.title}}</h6>
              <p>{{master.subtitle}}</p>
            </div>
          </div>
          <div class="card-body">
            <p>{{$t('performance')}} {{ master.currentperformance *100 + '%' }}</p>
            <p>{{$t('subscribe')}} {{ '$' + master.rate}}</p>
            <a role="button" class="a-btn mr-3" @click="onClick(master.id)"><i class="fa fa-eye fa-lg" aria-hidden="true"></i></a>
            <a role="button" class="a-btn" @click="onClick(master.id)"><i class="fa fa-plus fa-lg" aria-hidden="true"></i></a>            
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
 import {mapGetters, mapActions} from 'vuex';
 export default {
   name: 'Subscribe',
   computed: {
     ...mapGetters(['masters', 'publicUrl'])
   },
   methods: {
     ...mapActions(['getMastersFromServer']),
     onClick(masterId) {
       console.log(masterId);
       let thisMaster = this.masters.filter(m=> m.id === masterId)[0];
       console.log(thisMaster.title);
     },
     async getMaster() {
       const masters = await this.getMastersFromServer();
       //console.log('got master from server');       
     }
     
   },
   created() {
     if (this.masters.length === 0) {
       this.getMaster();
     }
   },
   i18n: {
     messages: {
       'en-US': {
         performance: 'Performance',
         subscribe: 'Subscribe Fee/month'
       },
       'zh-TW': {
         performance: '本月模擬績效',
         subscribe: '訂閱費用 每天'
       }
     }
   }


 }

</script>

<style scoped>


 .card-avatar {
   height: 40px;
   width: 40px;
   border-radius: 50%;
 }

 .a-btn {
   cursor: pointer;
 }
 
</style>
