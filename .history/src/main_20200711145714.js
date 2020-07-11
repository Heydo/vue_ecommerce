import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'
// 导入树形表格的插件
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入axios
import axios from 'axios'
// 为axios设置请求的根路径(按照接口文档提供的请求路径来写)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在挂载到原型对象上之前添加一个拦截对象
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)


// 创建一个全局的过滤器，解决时间显示不正常的问题
Vue.filter('dateFormat', function (originVal) {
  // 通过data对象格式化时间
  const dt = new Date(originVal)
  // 获取具体时间数组
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 把axios挂载到Vue的原型对象上。这样每一个vue的组件都可以通过this直接访问到$http,从而发起Ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册树形表格插件
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
