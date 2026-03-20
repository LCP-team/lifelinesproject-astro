import { createApp } from "./main";

const { app, router, pinia } = createApp();

const state = window.document.getElementById("pinia-state")?.textContent;
if (state && typeof state === "string") {
  pinia.state.value = JSON.parse(state);
}

router.isReady().then(() => {
  app.mount("#app");
});
