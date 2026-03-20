import { defineStore } from "pinia";
import { ref } from "vue";

const API_BASE = "https://api.lifelinesproject.com";

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
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      user.value = null;
    }
  }

  async function fetchMe() {
    loading.value = true;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        user.value = await res.json();
      } else {
        await logout();
      }
    } catch {
      // network error — keep token, don't log out
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

export const API_BASE_URL = API_BASE;
