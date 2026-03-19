<template>
  <BaseLayout title="Sign Out">
    <div class="min-h-[80vh] flex items-center justify-center px-6">
      <div class="w-full max-w-sm flex flex-col items-center gap-6 text-center">
        <img src="/images/logo.webp" class="h-20 w-auto" />

        <div v-if="done">
          <h1 class="text-2xl font-semibold">You've been signed out</h1>
          <p class="text-gray-500 mt-1 text-sm">See you next time.</p>
          <RouterLink
            to="/"
            class="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium"
          >
            Back to Home
          </RouterLink>
        </div>

        <div v-else>
          <h1 class="text-2xl font-semibold">Sign out of LifeLines?</h1>
          <p class="text-gray-500 mt-1 text-sm">You can sign back in at any time.</p>

          <div class="flex gap-3 mt-6 justify-center">
            <button
              @click="confirmSignOut"
              class="px-6 py-3 bg-primary text-white rounded-lg font-medium"
            >
              Sign Out
            </button>
            <RouterLink
              to="/"
              class="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const done = ref(false)

onMounted(() => {
  auth.init()
})

function confirmSignOut() {
  auth.logout()
  done.value = true
}
</script>
