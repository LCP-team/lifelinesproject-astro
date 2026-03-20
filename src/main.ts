import { createSSRApp } from "vue";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import { routes } from "./router/routes";
import { useAuthStore } from "./stores/auth";
import "./styles/global.css";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0 };
    },
  });

  app.use(pinia);
  app.use(router);
  return { app, router, pinia };
}
