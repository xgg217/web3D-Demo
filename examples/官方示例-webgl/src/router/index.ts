import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/webgl',
      name: 'Home',
      component: () => import('@/views/webgl/index.vue')
    },
    {
      path: '/custom',
      name: 'Home',
      component: () => import('@/views/custom/index.vue')
    },

  ]
})

export default router
