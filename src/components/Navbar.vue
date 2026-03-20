<template>
  <nav class="navbar">
    <RouterLink class="brand flex flex-row items-center no-underline!" to="/">
      <img src="/images/logo.webp" class="h-14 w-auto" />
      <div class="flex flex-col">
        <p class="f-amaranth text-xl font-medium text-primary">
          Lifelines Canada
        </p>
        <p class="text-sm opacity-50">Help should be easy to find</p>
      </div>
    </RouterLink>

    <button
      class="burger"
      :class="{ active: menuOpen }"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-links" :class="{ active: menuOpen }" ref="navLinks">
      <RouterLink to="/community" @click="closeMenu">Community</RouterLink>
      <RouterLink to="/about" @click="closeMenu">About</RouterLink>
      <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>

      <template v-if="auth.user">
        <RouterLink
          v-if="auth.user.role === 'LIFELINER'"
          to="/profile/complete"
          @click="closeMenu"
        >
          My Profile
        </RouterLink>
        <a href="javascript:void(0)" @click="signOut"> Sign Out </a>
      </template>
      <RouterLink v-else to="/signin" @click="closeMenu"> Sign In </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const signOut = async () => {
  await auth.logout();
  router.push("/");
};

onMounted(() => {
  auth.fetchMe();
});
</script>
