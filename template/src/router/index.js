import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Navbar from '@/navbar/Navbar.vue';
import Userbar from '@/navbar/Userbar.vue';

import Home from '@/components/Home'
import Login from '@/components/Login'
import News from '@/components/News'

import Hello from '@/components/Hello'
import Subscribe from '@/components/Subscribe'

import Admin from '@/components/Admin'
import AdminDashboard from '@/components/Admin/Admin-Dashboard'
import AdminUser from '@/components/Admin/Admin-User'
import AdminMasters from '@/components/Admin/Admin-Masters'
import AdminProposals from '@/components/Admin/Admin-Proposals'
import AdminReports from '@/components/Admin/Admin-Reports'
import AdminNews from '@/components/Admin/Admin-News'


Vue.use(Router)

// admin child
const adminChild = [
  {
    path: 'dashboard',
    components: {
      sideview: AdminDashboard
    }
  },
  {
    path: 'users',
    components: {
      sideview: AdminUser
    }
  },
  {
    path: 'masters',
    components: {
      sideview: AdminMasters
    }
  },
  {
    path: 'proposals',
    components: {
      sideview: AdminProposals
    }
  },
  {
    path: 'reports',
    components: {
      sideview: AdminReports
    }
  },
  {
    path: 'news',
    components: {
      sideview: AdminNews
    },
    meta: {
      authorization: true
    },
  },
  {
    path: '*',
    redirect: '/'
  }

]

// main router
const router =  new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        topbar: Navbar
      },
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: Login,
        topbar: Navbar
      }
    },
    {
      path: '/news/:id',
      name: 'News',
      components: {
        default: News,
        topbar: Navbar
      }
    },
    {
      path: '/hello',
      name: 'Hello',
      components: {
        default: Hello,
        topbar: Userbar
      },
      meta: {
        authorization: true
      }
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      components: {
        default: Subscribe,
        topbar: Userbar
      },
      meta: {
        authorization: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      components: {
        topbar: Userbar,
        default: Admin
      } ,
      meta: {
        authorization: true
      },
      children: adminChild
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})



router.beforeEach((to, from, next) => {
  //log(`Router beforeEach to: ${to.path} from: ${from.path}`);
  if (to.matched.some(record => record.meta.authorization)) {
    //console.log('need auth');
    const isLogin = store.dispatch('isLogin');
    if (isLogin) {
      next();
    } else {
      console.log('need login');
      next({ path: '/login', query: { redirect: to.fullpath}});
    }

  } else {
    next();
  }
})

export default router;
