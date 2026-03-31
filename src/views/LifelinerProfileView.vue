<template>
  <BaseLayout :title="lifeliner ? lifeliner.display_name : 'Lifeliner Profile'">
    <!-- Loading -->
    <div
      v-if="loading"
      class="container mx-auto px-8 py-20 max-w-[700px] flex flex-col items-center gap-6"
    >
      <div class="w-28 h-28 rounded-full bg-gray-100 animate-pulse" />
      <div class="w-40 h-5 bg-gray-100 rounded-full animate-pulse" />
      <div class="w-full h-32 bg-gray-100 rounded-2xl animate-pulse" />
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="container mx-auto px-8 py-20 max-w-[700px] flex flex-col items-center"
    >
      <div
        class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>
      <p class="text-gray-800 font-semibold text-lg mb-1">
        {{
          error === "not_found" ? "Lifeliner not found" : "Something went wrong"
        }}
      </p>
      <p class="text-gray-400 text-sm mb-6 text-center max-w-xs">
        {{
          error === "not_found"
            ? "This profile doesn't exist or may have been removed."
            : "We couldn't load this profile. Please try again."
        }}
      </p>
      <div class="flex gap-3">
        <RouterLink
          to="/lifeliners"
          class="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors no-underline!"
        >
          ← Back to directory
        </RouterLink>
        <button
          v-if="error !== 'not_found'"
          @click="fetchProfile"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try again
        </button>
      </div>
    </div>

    <!-- Profile -->
    <div v-else-if="lifeliner">
      <!-- Hero banner -->
      <div
        class="bg-gradient-to-br from-[#3d5a8a] to-[#5372a5] px-8 pt-14 pb-24"
      >
        <div class="container mx-auto max-w-[700px]">
          <RouterLink
            to="/lifeliners"
            class="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors mb-8 no-underline!"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to directory
          </RouterLink>
          <p
            class="text-sm font-semibold uppercase tracking-widest text-white/60 mb-2"
          >
            Lifeliner Profile
          </p>
          <h1 class="text-3xl font-semibold text-white">
            {{ lifeliner.display_name }}
          </h1>
        </div>
      </div>

      <!-- Card pulled up over hero -->
      <div class="container mx-auto px-8 max-w-[700px] -mt-14 pb-20">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100">
          <!-- Avatar + name header -->
          <div
            class="flex items-end gap-6 px-8 pt-8 pb-6 border-b border-gray-100"
          >
            <div class="relative -mt-16 flex-shrink-0">
              <img
                v-if="lifeliner.profile_picture"
                :src="`${API_BASE_URL}${lifeliner.profile_picture}`"
                :alt="lifeliner.display_name"
                class="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
              />
              <div
                v-else
                class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-4 ring-white shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-12 h-12 text-primary/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow"
              ></span>
            </div>
            <div class="pb-1 min-w-0">
              <p class="text-xl font-semibold text-gray-900 truncate">
                {{ lifeliner.display_name }}
              </p>
              <p class="text-sm text-gray-400 mt-0.5">
                Age {{ lifeliner.age }}
              </p>
            </div>
          </div>

          <!-- Stats row -->
          <div
            class="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100"
          >
            <div class="px-8 py-5">
              <p
                class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1"
              >
                Age
              </p>
              <p class="text-2xl font-bold text-gray-900">
                {{ lifeliner.age }}
              </p>
            </div>
            <div class="px-8 py-5">
              <p
                class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1"
              >
                Supports
              </p>
              <p class="text-2xl font-bold text-gray-900">
                {{ lifeliner.age_groups.length }} group{{
                  lifeliner.age_groups.length === 1 ? "" : "s"
                }}
              </p>
            </div>
          </div>

          <!-- About -->
          <div class="px-8 py-7 border-b border-gray-100">
            <p
              class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3"
            >
              About
            </p>
            <p class="text-gray-700 leading-relaxed">
              {{ lifeliner.about_me }}
            </p>
          </div>

          <!-- Age groups -->
          <div class="px-8 py-7">
            <p
              class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3"
            >
              Age Groups
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="group in lifeliner.age_groups"
                :key="group"
                class="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/15"
              >
                {{ ageGroupLabel(group) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Member since -->
        <p class="text-center text-xs text-gray-400 mt-6">
          Member since {{ joinedDate }}
        </p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";
import api, { API_BASE_URL } from "../lib/api";

interface PublicLifeliner {
  id: string;
  display_name: string;
  age: number;
  profile_picture: string | null;
  about_me: string;
  age_groups: string[];
  created_at: string;
}

const ageGroupOptions = [
  { value: "TEENS", label: "Teens (13–17)" },
  { value: "YOUNG_ADULTS", label: "Young Adults (18–25)" },
  { value: "ADULTS", label: "Adults (26–64)" },
  { value: "SENIORS", label: "Seniors (65+)" },
];

function ageGroupLabel(value: string) {
  return ageGroupOptions.find((o) => o.value === value)?.label ?? value;
}

const route = useRoute();
const lifeliner = ref<PublicLifeliner | null>(null);
const loading = ref(false);
const error = ref("");

const joinedDate = computed(() => {
  if (!lifeliner.value) return "";
  return new Date(lifeliner.value.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
});

async function fetchProfile() {
  loading.value = true;
  error.value = "";
  try {
    const res = await api.get<PublicLifeliner>(
      `/lifeliners/${route.params.id}`,
      {
        validateStatus: () => true,
      },
    );
    if (res.status === 200) {
      lifeliner.value = res.data;
    } else if (res.status === 404) {
      error.value = "not_found";
    } else {
      error.value = "server_error";
    }
  } catch {
    error.value = "network_error";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProfile);
</script>
