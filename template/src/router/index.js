import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import Subscribe from '@/components/Subscribe'
import store from '../store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        authorization: true
      }
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: Subscribe,
      meta: {
        authorization: true
      }
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  //log(`Router beforeEach to: ${to.path} from: ${from.path}`);
  if (to.matched.some(record => record.meta.authorization || false)) {
    const isLogin = store.getters.isLogin;
    if (isLogin) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullpath}});
     }
    
  } else {
    next();
  }
})

export default router;


