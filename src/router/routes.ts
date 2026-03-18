import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/about', component: () => import('../views/AboutView.vue') },
  { path: '/community', component: () => import('../views/CommunityView.vue') },
  { path: '/contact', component: () => import('../views/ContactView.vue') },
  { path: '/crisishotline', component: () => import('../views/CrisisHotlineView.vue') },
  { path: '/veterans', component: () => import('../views/VeteransView.vue') },
  { path: '/countries/ca-veteran', component: () => import('../views/CaVeteranView.vue') },
  { path: '/countries/us-veteran', component: () => import('../views/UsVeteranView.vue') },
  { path: '/countries/:code', component: () => import('../views/CountryView.vue') },
]
