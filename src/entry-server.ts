import { renderToString } from "vue/server-renderer";
import axios from "axios";
import { createApp } from "./main";
import { useAuthStore } from "./stores/auth";
import { API_BASE_URL } from "./lib/api";

interface SSRContext {
  title?: string;
  cacheControl?: string;
}

export async function render(url: string, cookies?: string) {
  const { app, router, pinia } = createApp();

  if (cookies) {
    try {
      const authStore = useAuthStore(pinia);
      await authStore.init();
    } catch {
      // not authenticated — leave store at defaults
    }
  }

  await router.push(url);
  await router.isReady();

  const ssrContext: SSRContext = {};
  const html = await renderToString(app, ssrContext);
  const piniaState = JSON.stringify(pinia.state.value);

  return {
    html,
    title: ssrContext.title,
    cacheControl: ssrContext.cacheControl,
    piniaState,
  };
}
