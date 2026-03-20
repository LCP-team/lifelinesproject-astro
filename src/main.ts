import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router/routes'
import { useAuthStore } from './stores/auth'
import './styles/global.css'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0 }
    },
  })

  if (!import.meta.env.SSR) {
    router.beforeEach((to) => {
      if (to.path === '/select-role') return true
      const auth = useAuthStore(pinia)
      if (auth.inited && auth.user && !auth.user.role) {
        return '/select-role'
      }
    })
  }

  app.use(pinia)
  app.use(router)
  return { app, router, pinia }
}
