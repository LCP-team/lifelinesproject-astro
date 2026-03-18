import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/about', component: () => import('../views/AboutView.vue') },
    { path: '/community', component: () => import('../views/CommunityView.vue') },
    { path: '/contact', component: () => import('../views/ContactView.vue') },
    { path: '/crisishotline', component: () => import('../views/CrisisHotlineView.vue') },
    { path: '/veterans', component: () => import('../views/VeteransView.vue') },
    { path: '/countries/ca-veteran', component: () => import('../views/CaVeteranView.vue') },
    { path: '/countries/us-veteran', component: () => import('../views/UsVeteranView.vue') },
    { path: '/countries/:code', component: () => import('../views/CountryView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
