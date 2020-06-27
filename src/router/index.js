import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登陆组件
import Login from '../components/Login.vue'
// 导入Home后台管理组件
import Home from '../components/Home.vue'
// 导入Welcom欢迎组件
import Welcome from '../components/Welcome.vue'
// 导入用户列表组件
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to:要访问的页面路径；from:从哪个页面跳转而来；next()/next('/login'):放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
