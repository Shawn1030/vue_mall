   import Vue from 'vue'
import Router from 'vue-router'
const Cart=()=>import('views/cart/Cart.vue')
const Home=()=>import('views/home/Home.vue')
const Category=()=>import('views/category/Category.vue')
const Profile=()=>import('views/profile/Profile.vue')
const Details =()=>import('views/details/Details.vue')

Vue.use(Router)
const routes=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/details/:iid',
    component:Details
  }
]
export default new Router({
  routes,
  mode:'history'
})