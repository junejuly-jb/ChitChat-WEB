import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/Home/index.vue')
const LoginView = () => import('@/views/Login/index.vue')

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
