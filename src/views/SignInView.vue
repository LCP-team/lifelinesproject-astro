<template>
  <BaseLayout title="Sign In">
    <div class="min-h-[80vh] flex items-center justify-center px-6">
      <div class="w-full max-w-sm flex flex-col items-center gap-6">
        <img src="/images/logo.webp" class="h-20 w-auto" />

        <div class="text-center">
          <h1 class="text-2xl font-semibold">Sign in to LifeLines</h1>
          <p class="text-gray-500 mt-1 text-sm">
            Connect with your Google account to continue.
          </p>
        </div>

        <div v-if="auth.user" class="w-full text-center">
          <p class="text-gray-600 mb-4">
            You're already signed in as
            <span class="font-medium">{{ auth.user.email }}</span
            >.
          </p>
          <RouterLink
            to="/"
            class="block w-full py-3 rounded-lg bg-primary text-white font-medium text-center"
          >
            Go to Home
          </RouterLink>
        </div>

        <button
          v-else
          @click="signIn"
          class="w-full flex items-center gap-3 border border-gray-300 rounded-lg py-3 px-4 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            class="shrink-0"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.1C12.4 13 17.7 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.2-10.1 7.2-17z"
            />
            <path
              fill="#FBBC05"
              d="M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8-6z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.3 0-11.6-4.2-13.5-10l-8 6.1C6.6 42.6 14.6 48 24 48z"
            />
          </svg>
          <span class="font-medium text-gray-700">Continue with Google</span>
        </button>

        <p class="text-xs text-gray-400 text-center">
          By signing in you agree to our
          <RouterLink to="/terms" class="underline">Terms of Use</RouterLink>
          and
          <RouterLink to="/privacy" class="underline">Privacy Policy</RouterLink
          >.
        </p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import { useAuthStore, API_BASE_URL } from "../stores/auth";

const auth = useAuthStore();

function signIn() {
  window.location.href = `${API_BASE_URL}/auth/google`;
}
</script>
