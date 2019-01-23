import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		name: '根首页',
		component: ShoppingMall
	},
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
    {
        path: '/login',
        name: '登陆页',
        component: Login
    },  
    {
        path: '/goods',
        name: '商品详情页',
        component: Goods
	},  
    {
        path: '/list',
        name: '商品列表页',
        component: CategoryList
	},	 
  ]
})
