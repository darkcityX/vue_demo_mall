import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: '首页',
      component: ShoppingMall
    },
    {
        path: '/register',
        name: '注册页',
        component: Register
    },    
  ]
})
