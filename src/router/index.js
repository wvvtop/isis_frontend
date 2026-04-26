import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/home/HomePage.vue'
import LoginComponent from '@/login/LoginComponent.vue'
import RegistrationComponent from '@/registration/RegistrationComponent.vue'
import UserProfile from '@/profile/UserProfile.vue'
import { useAuthStore } from '@/stores/auth'
import CreateGoal from '@/goal/CreateGoal.vue'
import GoalDetail from '@/goal_details/GoalDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    meta: { requiresGuest: true },
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationComponent,
    meta: { requiresGuest: true },
  },
  {
    path: '/profile',
    name: 'User profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-goal',
    name: 'Create goal',
    component: CreateGoal,
    meta: { requiresAuth: true },
  },
  {
    path: '/goal/:id',
    name: 'Goal',
    component: GoalDetail,
    props: true,
    meta: { requiredAuth: true },
  },
  // {
  //   path: '/:slug',
  //   name: 'post edit',
  //   component: PostEdit,
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/login')
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated()) {
    next('/') // или '/dashboard'
    return
  }

  next()
})

export default router
