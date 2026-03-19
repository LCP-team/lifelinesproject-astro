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
  { path: '/privacy', component: () => import('../views/PrivacyView.vue') },
  { path: '/terms', component: () => import('../views/TermsView.vue') },
  { path: '/auth/callback', component: () => import('../views/AuthCallbackView.vue') },
  { path: '/signin', component: () => import('../views/SignInView.vue') },
  { path: '/signout', component: () => import('../views/SignOutView.vue') },
  { path: '/profile/complete', component: () => import('../views/CompleteProfileView.vue') },
]
