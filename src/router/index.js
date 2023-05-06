import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
// import HomeView from '../views/HomeView.vue'

import HomeWrapper from '../components/HomeWrapper.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeWrapper,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/beer/:id',
      name: 'beer-view',
      component: () => import('../views/BeerView.vue'),
      meta:{
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const haveUser = auth.currentUser ? true : false

  if((to.path === '/login' || to.path === '/register') && haveUser){
    next('/')
    return
  }

  if(to.matched.some(record => record.meta.requiresAuth) && !haveUser){
    next('/login')
    return
  }

  next()
})

export default router
