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
// 导入权限列表组件
import Rights from '../components/power/Rights.vue'
// 导入角色列表组件
import Roles from '../components/power/Roles.vue'
// 导入商品分类组件
import Cate from '../components/goods/Cate.vue'
// 导入分类参数组件
import Params from '../components/goods/Params.vue'
// 导入商品列表组件
import GoodsList from '../components/goods/List.vue'
// 导入添加商品组件
import AddGoods from '../components/goods/Add.vue'
// 导入订单列表组件
import Order from '../components/order/Order.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      }, {
        path: '/params',
        component: Params
      }, {
        path: '/goods',
        component: GoodsList
      }, {
        path: '/goods/add',
        component: AddGoods
      }, {
        path: '/orders',
        component: Order
      }
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
