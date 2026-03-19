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
            You're already signed in as <span class="font-medium">{{ auth.user.email }}</span>.
          </p>
          <RouterLink
            to="/"
            class="block w-full py-3 rounded-lg bg-primary text-white font-medium text-center"
          >
            Go to Home
          </RouterLink>
        </div>

        <template v-else>
          <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
          <div ref="googleBtnRef" class="flex justify-center"></div>
        </template>

        <p class="text-xs text-gray-400 text-center">
          By signing in you agree to our community guidelines and privacy policy.
        </p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '../layouts/BaseLayout.vue'
import { useAuthStore, API_BASE_URL } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const googleBtnRef = ref<HTMLElement | null>(null)
const error = ref('')

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

async function handleCredential(response: { credential: string }) {
  error.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    })

    if (!res.ok) {
      error.value = 'Sign-in failed. Please try again.'
      return
    }

    const { access_token } = await res.json()
    auth.saveToken(access_token)
    await auth.fetchMe()

    if (auth.user?.role === 'LIFELINER') {
      router.push('/profile/complete')
    } else {
      router.push('/')
    }
  } catch {
    error.value = 'Network error. Please try again.'
  }
}

onMounted(async () => {
  await auth.init()
  if (auth.user) return

  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredential,
    })
    if (googleBtnRef.value) {
      window.google.accounts.id.renderButton(googleBtnRef.value, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: 320,
      })
    }
  }
  document.head.appendChild(script)
})
</script>
