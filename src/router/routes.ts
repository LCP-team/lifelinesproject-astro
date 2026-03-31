import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("../views/HomeView.vue") },
  { path: "/about", component: () => import("../views/AboutView.vue") },
  { path: "/community", component: () => import("../views/CommunityView.vue") },
  { path: "/contact", component: () => import("../views/ContactView.vue") },
  {
    path: "/crisishotline",
    component: () => import("../views/CrisisHotlineView.vue"),
  },
  { path: "/veterans", component: () => import("../views/VeteransView.vue") },
  {
    path: "/countries/ca-veteran",
    component: () => import("../views/CaVeteranView.vue"),
  },
  {
    path: "/countries/us-veteran",
    component: () => import("../views/UsVeteranView.vue"),
  },
  {
    path: "/countries/:code",
    component: () => import("../views/CountryView.vue"),
  },
  { path: "/privacy", component: () => import("../views/PrivacyView.vue") },
  { path: "/terms", component: () => import("../views/TermsView.vue") },
  { path: "/signin", component: () => import("../views/SignInView.vue") },
  {
    path: "/select-role",
    component: () => import("../views/SelectRoleView.vue"),
  },
  {
    path: "/profile/complete",
    component: () => import("../views/CompleteProfileView.vue"),
  },
  {
    path: "/lifeliners",
    component: () => import("../views/LifelinersView.vue"),
  },
  {
    path: "/lifeliners/:id",
    component: () => import("../views/LifelinerProfileView.vue"),
  },
];
