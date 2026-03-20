import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";
import { useAuthStore } from "./stores/auth";

interface SSRContext {
  title?: string;
  cacheControl?: string;
}

export async function render(url: string, cookie?: string) {
  const { app, router, pinia } = createApp();
  let redirect: string | undefined;

  if (cookie) {
    try {
      const authStore = useAuthStore(pinia);
      await authStore.init(cookie);
      if (authStore.user && !authStore.user.role && url !== "/select-role") {
        redirect = "/select-role";
      }
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
