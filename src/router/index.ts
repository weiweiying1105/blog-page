import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('@/views/Blog.vue')
    },
    // {
    //   path: '/categories',
    //   name: 'Categories',
    //   component: () => import('@/views/Categories.vue')
    // },
    // {
    //   path: '/blog/:id',
    //   name: 'BlogDetail',
    //   component: () => import('@/views/BlogDetail.vue')
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import('@/views/About.vue')
    // }
  ]
})

export default router 