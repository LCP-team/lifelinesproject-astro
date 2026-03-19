<template>
  <BaseLayout title="Complete Your Profile">
    <div class="container mx-auto px-8 max-w-[700px] py-12">
      <h1 class="text-3xl font-medium mb-2">Complete Your Lifeliner Profile</h1>
      <p class="text-gray-500 mb-8">
        Fill in your details to appear in the Lifeliners directory.
      </p>

      <div v-if="!auth.user" class="text-center py-16">
        <p class="text-gray-500">You must be signed in as a Lifeliner to access this page.</p>
        <a
          :href="loginUrl"
          class="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium"
        >
          Sign in with Google
        </a>
      </div>

      <div v-else-if="auth.user.role !== 'LIFELINER'" class="text-center py-16">
        <p class="text-gray-500">This page is only available to Lifeline volunteers.</p>
      </div>

      <form v-else @submit.prevent="submitProfile" class="flex flex-col gap-5">
        <div v-if="apiError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ apiError }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          Profile saved successfully!
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm">Full Name <span class="text-red-500">*</span></label>
          <input
            v-model="form.full_name"
            type="text"
            required
            placeholder="Alexandra Martinez"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm">Display Name <span class="text-red-500">*</span></label>
          <p class="text-xs text-gray-500">This is what other users will see.</p>
          <input
            v-model="form.display_name"
            type="text"
            required
            placeholder="Alex M."
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm">Age <span class="text-red-500">*</span></label>
          <input
            v-model.number="form.age"
            type="number"
            required
            min="18"
            max="120"
            placeholder="29"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm">Profile Picture URL <span class="text-red-500">*</span></label>
          <p class="text-xs text-gray-500">Public photo shown in the directory.</p>
          <input
            v-model="form.profile_picture"
            type="url"
            required
            placeholder="https://example.com/photo.jpg"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm">Verification Photo URL <span class="text-red-500">*</span></label>
          <p class="text-xs text-gray-500">Private — used for verification only, never shown publicly.</p>
          <input
            v-model="form.private_picture"
            type="url"
            required
            placeholder="https://example.com/id-photo.jpg"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm">About Me <span class="text-red-500">*</span></label>
          <textarea
            v-model="form.about_me"
            required
            rows="4"
            placeholder="I'm a trained listener who loves supporting young adults through anxiety."
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">Age Groups You Support <span class="text-red-500">*</span></label>
          <p class="text-xs text-gray-500">Select at least one.</p>
          <div class="flex flex-col gap-2">
            <label v-for="group in ageGroupOptions" :key="group.value" class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                :value="group.value"
                v-model="form.age_groups"
                class="w-4 h-4 accent-primary"
              />
              <span>{{ group.label }}</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          :disabled="submitting || form.age_groups.length === 0"
          class="mt-2 px-6 py-3 bg-primary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ submitting ? 'Saving…' : 'Save Profile' }}
        </button>
      </form>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '../layouts/BaseLayout.vue'
import { useAuthStore, API_BASE_URL } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const loginUrl = `${API_BASE_URL}/auth/google`

const ageGroupOptions = [
  { value: 'TEENS', label: 'Teens (13–17)' },
  { value: 'YOUNG_ADULTS', label: 'Young Adults (18–25)' },
  { value: 'ADULTS', label: 'Adults (26–64)' },
  { value: 'SENIORS', label: 'Seniors (65+)' },
]

const form = reactive({
  full_name: '',
  display_name: '',
  age: null as number | null,
  profile_picture: '',
  private_picture: '',
  about_me: '',
  age_groups: [] as string[],
})

const submitting = ref(false)
const apiError = ref('')
const success = ref(false)

onMounted(async () => {
  await auth.init()
})

async function submitProfile() {
  if (!auth.token) return
  submitting.value = true
  apiError.value = ''
  success.value = false

  try {
    const res = await fetch(`${API_BASE_URL}/lifeliners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(form),
    })

    if (res.status === 201) {
      success.value = true
      setTimeout(() => router.push('/'), 1500)
    } else if (res.status === 409) {
      apiError.value = 'You already have a Lifeliner profile.'
    } else {
      const data = await res.json()
      const messages = Array.isArray(data.message) ? data.message.join(', ') : data.message
      apiError.value = messages || 'Something went wrong. Please try again.'
    }
  } catch {
    apiError.value = 'Network error. Please check your connection and try again.'
  } finally {
    submitting.value = false
  }
}
</script>
