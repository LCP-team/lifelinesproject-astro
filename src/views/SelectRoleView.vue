<template>
  <BaseLayout title="Choose Your Role">
    <div class="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-2xl flex flex-col items-center gap-8">
        <div class="text-center">
          <h1 class="text-3xl font-semibold text-gray-900">
            How would you like to use LifeLines?
          </h1>
          <p class="text-gray-500 mt-3 text-base max-w-md mx-auto">
            Choose the role that best describes you. You'll use LifeLines Canada
            based on this choice.
          </p>
        </div>

        <div
          class="w-full bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex gap-3 items-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <div>
            <p class="text-sm font-semibold text-amber-800">
              This choice is permanent
            </p>
            <p class="text-sm text-amber-700 mt-0.5">
              Once you select a role, it cannot be changed. Please read each
              option carefully before continuing.
            </p>
          </div>
        </div>

        <div v-if="!auth.user" class="text-center">
          <p class="text-gray-500">You need to be signed in to continue.</p>
          <RouterLink
            to="/signin"
            class="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium"
          >
            Sign In
          </RouterLink>
        </div>

        <template v-else>
          <div
            v-if="apiError"
            class="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {{ apiError }}
          </div>

          <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- CLIENT -->
            <button
              @click="selected = 'CLIENT'"
              :disabled="submitting"
              class="flex flex-col gap-5 p-6 border-2 rounded-xl text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="
                selected === 'CLIENT'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5'
              "
            >
              <div
                class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold text-gray-900 text-base">
                  I'm looking for support
                </p>
                <p class="text-sm text-gray-500 leading-relaxed">
                  You're here to find emotional support, connect with a peer
                  supporter, or access crisis resources. Your privacy is
                  respected throughout.
                </p>
                <ul class="mt-1 flex flex-col gap-1">
                  <li class="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      class="w-4 h-4 text-blue-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Browse Lifeliner profiles
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      class="w-4 h-4 text-blue-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Access crisis hotlines by country
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      class="w-4 h-4 text-blue-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Get connected with the right person for you
                  </li>
                </ul>
              </div>
            </button>

            <!-- LIFELINER -->
            <button
              @click="selected = 'LIFELINER'"
              :disabled="submitting"
              class="flex flex-col gap-5 p-6 border-2 rounded-xl text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="
                selected === 'LIFELINER'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5'
              "
            >
              <div
                class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold text-gray-900 text-base">
                  I want to volunteer as a Lifeliner
                </p>
                <p class="text-sm text-gray-500 leading-relaxed">
                  You're a trained or experienced peer supporter who wants to
                  offer their time to help Canadians abroad who are struggling.
                </p>
                <ul class="mt-1 flex flex-col gap-1">
                  <li class="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      class="w-4 h-4 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Create a public Lifeliner profile
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      class="w-4 h-4 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Be listed in the community directory
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      class="w-4 h-4 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Support Canadians when they need it most
                  </li>
                </ul>
              </div>
            </button>
          </div>

          <button
            @click="confirm"
            :disabled="!selected || submitting"
            class="w-full py-3 rounded-xl bg-primary text-white font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ submitting ? "Saving…" : "Continue with this role" }}
          </button>

          <p class="text-xs text-gray-400 text-center">
            Not sure which to choose? If you're going through a difficult time,
            select
            <span class="font-medium text-gray-500"
              >I'm looking for support</span
            >.
          </p>
        </template>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";
import { useAuthStore } from "../stores/auth";
import api from "../lib/api";

const auth = useAuthStore();
const router = useRouter();

const submitting = ref(false);
const apiError = ref("");
const selected = ref<"CLIENT" | "LIFELINER" | null>(null);

async function confirm() {
  if (!selected.value || submitting.value) return;
  submitting.value = true;
  apiError.value = "";

  try {
    const res = await api.patch(
      "/auth/role",
      { role: selected.value },
      { validateStatus: () => true },
    );
    if (res.status === 200 || res.status === 201) {
      await auth.fetchMe();
      if (selected.value === "LIFELINER") {
        router.push("/profile/complete");
        return;
      }
      router.push("/");
    } else {
      const msg = Array.isArray(res.data?.message)
        ? res.data.message.join(", ")
        : res.data?.message;
      apiError.value = msg || "Something went wrong. Please try again.";
      selected.value = null;
    }
  } catch {
    apiError.value =
      "Network error. Please check your connection and try again.";
    selected.value = null;
  } finally {
    submitting.value = false;
  }
}
</script>
