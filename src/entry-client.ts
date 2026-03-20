import { createApp } from './main'

const { app, router, pinia } = createApp()

const state = (window as Record<string, unknown>).__pinia_state__
if (state && typeof state === 'object') {
  pinia.state.value = state as Record<string, unknown>
}

router.isReady().then(() => {
  app.mount('#app')
})
