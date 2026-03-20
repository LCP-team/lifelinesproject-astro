import { defineStore } from "pinia";
import api from "../lib/api";

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
    async fetchMe() {
      this.loading = true;
      try {
        const res = await api.get<AuthUser>("/auth/me");
        this.user = res.data;
      } catch {
        await this.logout();
      } finally {
        this.loading = false;
      }
    },
    async init() {
      await this.fetchMe();
      this.inited = true;
    },
  },
});
