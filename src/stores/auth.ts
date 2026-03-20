import { defineStore } from "pinia";
import api from "../lib/api";
import { RawAxiosRequestHeaders } from "axios";

export interface AuthUser {
  id: string;
  email: string;
  role: "CLIENT" | "LIFELINER" | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthUser | null,
    loading: false,
    inited: false,
  }),
  actions: {
    async logout() {
      // send post request to /auth/logout
      const res = await api.post("/auth/logout");

      if (res.status === 200) {
        this.user = null;
      }
    },
    async fetchMe(cookie?: string) {
      this.loading = true;
      const headers: RawAxiosRequestHeaders = {};
      if (cookie) {
        headers.Cookie = cookie;
      }

      try {
        const res = await api.get<AuthUser>("/auth/me", {
          headers: headers,
        });
        this.user = res.data;
      } catch {
        await this.logout();
      } finally {
        this.loading = false;
      }
    },
    async init(cookie?: string) {
      await this.fetchMe(cookie);
      this.inited = true;
    },
  },
});
