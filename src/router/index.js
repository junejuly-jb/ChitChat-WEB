import { createRouter, createWebHistory } from 'vue-router'

// const HomeView = () => import('../views/HomeView.vue')
// const LoginView = () => import('../views/LoginView.vue')

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        needsAuth: true
      }
    },
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        needsAuth: false
      }
    }
  ]
})

export default router
