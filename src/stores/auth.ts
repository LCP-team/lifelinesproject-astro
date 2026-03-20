import { defineStore } from "pinia";
import { ref } from "vue";
import { getCookie, setCookie, deleteCookie } from "../utils/cookie";

const API_BASE = "https://api.lifelinesproject.com";
const TOKEN_COOKIE = "lifelines_token";

export interface AuthUser {
  id: string;
  email: string;
  role: "CLIENT" | "LIFELINER";
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<AuthUser | null>(null);
  const loading = ref(false);

  function saveToken(t: string) {
    token.value = t;
    setCookie(TOKEN_COOKIE, t, 30);
  }

  function logout() {
    token.value = null;
    user.value = null;
    deleteCookie(TOKEN_COOKIE);
  }

  async function fetchMe() {
    if (!token.value) return;
    loading.value = true;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      if (res.ok) {
        user.value = await res.json();
      } else {
        logout();
      }
    } catch {
      // network error — keep token, don't log out
    } finally {
      loading.value = false;
    }
  }

  async function init() {
    if (typeof document === "undefined") return;
    token.value = getCookie(TOKEN_COOKIE);
    if (token.value) await fetchMe();
  }

  return { token, user, loading, saveToken, logout, fetchMe, init };
});

export const API_BASE_URL = API_BASE;
