import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user/user'
import Rights from '@/views/roles/rights'
import Roles from '@/views/roles/roles'
import { Message } from 'element-ui'
import Categories from '@/views/goods/categories'
import Goodslist from '@/views/goods/goodslist'
import GoodsAdd from '@/views/goods/goodsadd'
import Params from '@/views/goods/params'

Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: User
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Roles
    }, {
      name: 'categories',
      path: '/categories',
      component: Categories
    }, {
      name: 'goodslist',
      path: '/goods',
      component: Goodslist
    }, {
      name: 'goodsadd',
      path: '/goodsadd',
      component: GoodsAdd
    }, {
      name: 'params',
      path: '/params',
      component: Params
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})
// 路由的前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.name === 'login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push({ 'name': 'login' })
      Message.warning('请先登录')
      return
    }
    next()
  }
})
export default router
