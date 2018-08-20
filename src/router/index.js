import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user/user'
import Rights from '@/views/roles/rights'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'user',
      path: '/user',
      component: User
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})
