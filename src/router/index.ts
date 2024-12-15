import { createRouter, createWebHistory } from 'vue-router'
import { routeMeta } from './route-meta'

// 自动导入路由
const modules = import.meta.glob('../views/**/*.vue')

// 生成路由配置
const routes = Object.keys(modules).map(key => {
  const name = key.match(/\.\.\/views\/(.*)\.vue$/)[1].toLowerCase()
  const path = '/' + (name === 'home' ? '' : name)
  const meta = routeMeta[name] || {}
  
  return {
    path,
    name,
    component: modules[key],
    meta
  }
})

// 添加404路由
routes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('../views/NotFound.vue')
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 这里可以添加路由守卫逻辑
  // 例如：检查管理员页面的权限等
  if (to.path.startsWith('/admin')) {
    // 检查是否登录
    const isLoggedIn = localStorage.getItem('token')
    if (!isLoggedIn && to.path !== '/admin/login') {
      next('/admin/login')
      return
    }
  }
  next()
})

export default router 