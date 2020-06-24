import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

// 导入axios
import axios from 'axios'
// 为axios设置请求的根路径(按照接口文档提供的请求路径来写)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 把axios挂载到Vue的原型对象上。这样每一个vue的组件都可以通过this直接访问到$http,从而发起Ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
