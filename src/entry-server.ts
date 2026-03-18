import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

interface SSRContext {
  title?: string
  cacheControl?: string
}

export async function render(url: string) {
  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  const ssrContext: SSRContext = {}
  const html = await renderToString(app, ssrContext)

  return { html, title: ssrContext.title, cacheControl: ssrContext.cacheControl }
}
