import { useSSRContext } from 'vue'

interface SSRContextWithCache {
  cacheControl?: string
}

export function useCacheControl(value: string) {
  if (import.meta.env.SSR) {
    const ctx = useSSRContext<SSRContextWithCache>()
    if (ctx) {
      ctx.cacheControl = value
    }
  }
}
