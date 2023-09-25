import { createRouter, createWebHistory } from 'vue-router'
import AnimationKeyframes from '@/views/AnimationKeyframes/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'animationKeyframes',
      component: AnimationKeyframes
    },

  ]
})

export default router
