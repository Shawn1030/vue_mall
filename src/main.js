import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
import toast from './components/common/toast'
import placeholder from './assets/img/common/placeholder.png'

Vue.config.productionTip = false  

//安装插件
Vue.use(toast)
Vue.use(VueLazyLoad,{
  loading:placeholder
})
//解决移动端300s延迟
FastClick.attach(document.body)

Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


