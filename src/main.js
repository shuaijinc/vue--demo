// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import bus from './assets/js/bus'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {message} from './assets/js/resetMessage'
import axios from 'axios'
axios.defaults.baseURL = HOST
window.axios = axios
window.HOST = HOST

Vue.use(ElementUI)
Vue.prototype.$bus = bus
Vue.config.productionTip = false
Vue.prototype.$message = message  // 将message挂到Vue.prototype中.(使用方法 this.$message() 参数与element一致)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
