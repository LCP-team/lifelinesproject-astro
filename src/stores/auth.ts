import { defineStore } from "pinia";
import { ref } from "vue";
import api, { API_BASE_URL } from "../lib/api";

export interface AuthUser {
  id: string;
  email: string;
  role: "CLIENT" | "LIFELINER" | null;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null);
  const loading = ref(false);
  const inited = ref(false);

  async function logout() {
    // send post request to /auth/logout
    const res = await api.post("/auth/logout");

    if (res.status === 200) {
      user.value = null;
    }
  }

  async function fetchMe() {
    loading.value = true;
    try {
      const res = await api.get<AuthUser>("/auth/me");
      user.value = res.data;
    } catch {
      await logout();
    } finally {
      loading.value = false;
    }
  }

  async function init() {
    if (inited.value || loading.value) return;
    await fetchMe();
    inited.value = true;
  }

  return { user, loading, inited, logout, fetchMe, init };
});

export { API_BASE_URL };
