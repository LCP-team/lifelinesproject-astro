<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-lg text-gray-500" v-if="error">{{ error }}</p>
    <p class="text-lg text-gray-500" v-else>Signing you in…</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const error = ref('')

onMounted(async () => {
  const token = route.query.token as string | undefined

  if (!token) {
    error.value = 'No token received. Please try signing in again.'
    return
  }

  auth.saveToken(token)
  await auth.fetchMe()

  if (!auth.user) {
    error.value = 'Authentication failed. Please try again.'
    return
  }

  if (auth.user.role === 'LIFELINER') {
    router.replace('/profile/complete')
  } else {
    router.replace('/')
  }
})
</script>
