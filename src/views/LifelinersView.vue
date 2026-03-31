<template>
  <BaseLayout title="Find a Lifeliner">
    <div class="container mx-auto px-8 py-12 max-w-[1100px]">
      <h1 class="text-3xl font-medium mb-2">Find a Lifeliner</h1>
      <p class="text-gray-500 mb-8">
        Browse our trained volunteer listeners and find someone who's right for
        you.
      </p>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3 mb-8">
        <button
          v-for="group in ageGroupOptions"
          :key="group.value"
          @click="toggleFilter(group.value)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
            activeFilters.includes(group.value)
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-300 hover:border-primary',
          ]"
        >
          {{ group.label }}
        </button>
        <button
          v-if="activeFilters.length > 0"
          @click="activeFilters = []"
          class="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          Clear filters
        </button>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-2xl border bg-gray-50 animate-pulse h-56"
        />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16 text-red-500">
        {{ error }}
      </div>

      <!-- Empty -->
      <div
        v-else-if="lifeliners.length === 0"
        class="text-center py-16 text-gray-400"
      >
        No Lifeliners found for the selected filters.
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="lifeliner in lifeliners"
          :key="lifeliner.id"
          class="rounded-2xl border bg-white p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-4">
            <img
              v-if="lifeliner.profile_picture"
              :src="`${API_BASE_URL}${lifeliner.profile_picture}`"
              :alt="lifeliner.display_name"
              class="w-14 h-14 rounded-full object-cover flex-shrink-0"
            />
            <div
              v-else
              class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-gray-400"
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
            <div>
              <p class="font-semibold text-gray-900">
                {{ lifeliner.display_name }}
              </p>
              <p class="text-sm text-gray-400">Age {{ lifeliner.age }}</p>
            </div>
          </div>

          <p class="text-sm text-gray-600 line-clamp-3">
            {{ lifeliner.about_me }}
          </p>

          <div class="flex flex-wrap gap-2 mt-auto">
            <span
              v-for="group in lifeliner.age_groups"
              :key="group"
              class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
            >
              {{ ageGroupLabel(group) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
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

const lifeliners = ref<PublicLifeliner[]>([]);
const loading = ref(false);
const error = ref("");
const activeFilters = ref<string[]>([]);

function toggleFilter(value: string) {
  const idx = activeFilters.value.indexOf(value);
  if (idx === -1) activeFilters.value.push(value);
  else activeFilters.value.splice(idx, 1);
}

async function fetchLifeliners() {
  loading.value = true;
  error.value = "";
  try {
    const params = new URLSearchParams();
    activeFilters.value.forEach((g) => params.append("age_groups", g));
    const res = await api.get<PublicLifeliner[]>(
      `/lifeliners?${params.toString()}`,
      {
        validateStatus: () => true,
      },
    );
    if (res.status === 200) {
      lifeliners.value = res.data;
    } else {
      error.value = "Failed to load Lifeliners. Please try again.";
    }
  } catch {
    error.value = "Network error. Please check your connection.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchLifeliners);
watch(activeFilters, fetchLifeliners, { deep: true });
</script>
