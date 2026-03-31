<template>
  <BaseLayout title="Find a Lifeliner">
    <!-- Hero -->
    <div
      class="bg-gradient-to-br from-[#3d5a8a] to-[#5372a5] text-white px-8 py-16"
    >
      <div class="container mx-auto max-w-[1100px]">
        <p
          class="text-sm font-semibold uppercase tracking-widest text-white/60 mb-3"
        >
          Volunteers
        </p>
        <h1 class="text-4xl font-semibold mb-3">Find a Lifeliner</h1>
        <p class="text-white/75 text-lg max-w-xl mb-8">
          Browse listeners and find someone who's right for you.
        </p>
        <!-- Search -->
        <div class="relative max-w-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
            />
          </svg>
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search by name…"
            class="w-full pl-12 pr-10 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
          />
          <button
            v-if="searchInput"
            @click="searchInput = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-8 py-10 max-w-[1100px]">
      <!-- Filter bar -->
      <div
        class="flex flex-wrap gap-6 items-start mb-8 pb-8 border-b border-gray-100"
      >
        <!-- Age group chips -->
        <div class="flex flex-col gap-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-gray-400"
            >Age Group</span
          >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="group in ageGroupOptions"
              :key="group.value"
              @click="toggleAgeGroup(group.value)"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                activeAgeGroups.includes(group.value)
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:text-primary',
              ]"
            >
              {{ group.label }}
            </button>
          </div>
        </div>

        <!-- Age range -->
        <div class="flex flex-col gap-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-gray-400"
            >Age Range</span
          >
          <div class="flex items-center gap-2">
            <input
              v-model.number="ageMin"
              type="number"
              min="18"
              max="120"
              placeholder="Min"
              class="w-20 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <span class="text-gray-300">—</span>
            <input
              v-model.number="ageMax"
              type="number"
              min="18"
              max="120"
              placeholder="Max"
              class="w-20 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <!-- Clear all -->
        <div class="flex flex-col gap-2">
          <span class="text-xs select-none text-transparent text-xs">.</span>
          <button
            v-if="hasActiveFilters"
            @click="clearAll"
            class="px-3 py-1.5 text-sm text-gray-400 border border-gray-200 rounded-lg hover:text-gray-600 hover:border-gray-300 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Active filter pills -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-6">
        <span
          v-if="searchQuery"
          class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
        >
          "{{ searchQuery }}"
          <button @click="searchInput = ''" class="hover:text-primary/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
        <span
          v-for="group in activeAgeGroups"
          :key="group"
          class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
        >
          {{ ageGroupLabel(group) }}
          <button @click="toggleAgeGroup(group)" class="hover:text-primary/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
        <span
          v-if="ageMin || ageMax"
          class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
        >
          Age {{ ageMin || 18 }}–{{ ageMax || 120 }}
          <button
            @click="
              ageMin = null;
              ageMax = null;
            "
            class="hover:text-primary/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      </div>

      <!-- Loading skeleton -->
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col gap-4"
        >
          <!-- Avatar + name row -->
          <div class="flex items-center gap-4">
            <div class="relative flex-shrink-0">
              <div class="w-14 h-14 rounded-full bg-gray-100 animate-pulse" />
              <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-100 animate-pulse border-2 border-white" />
            </div>
            <div class="flex flex-col gap-2 flex-1 min-w-0">
              <div class="h-4 bg-gray-100 rounded-full animate-pulse w-2/3" />
              <div class="h-3 bg-gray-100 rounded-full animate-pulse w-1/4" />
            </div>
          </div>
          <!-- Divider -->
          <div class="h-px bg-gray-100" />
          <!-- About lines -->
          <div class="flex flex-col gap-2 flex-1">
            <div class="h-3 bg-gray-100 rounded-full animate-pulse w-full" />
            <div class="h-3 bg-gray-100 rounded-full animate-pulse w-5/6" />
            <div class="h-3 bg-gray-100 rounded-full animate-pulse w-4/6" />
          </div>
          <!-- Badge row -->
          <div class="flex gap-2">
            <div class="h-5 w-24 bg-gray-100 rounded-full animate-pulse" />
            <div class="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center py-20">
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
          Something went wrong
        </p>
        <p class="text-gray-400 text-sm mb-6 max-w-xs text-center">
          {{ error }}
        </p>
        <button
          @click="fetch"
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

      <!-- Empty -->
      <div v-else-if="lifeliners.length === 0" class="text-center py-20">
        <div
          class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p class="text-gray-400 font-medium">No Lifeliners found</p>
        <p class="text-gray-400 text-sm mt-1">
          Try adjusting your search or filters.
        </p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink
          v-for="lifeliner in lifeliners"
          :key="lifeliner.id"
          :to="`/lifeliners/${lifeliner.id}`"
          class="group rounded-2xl border border-gray-100 bg-white p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline!"
        >
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                v-if="lifeliner.profile_picture"
                :src="`${API_BASE_URL}${lifeliner.profile_picture}`"
                :alt="lifeliner.display_name"
                class="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow"
              />
              <div
                v-else
                class="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-white shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 text-primary/50"
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
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"
              ></span>
            </div>
            <div class="min-w-0">
              <p
                class="font-semibold text-gray-900 truncate"
                v-html="highlight(lifeliner.display_name)"
              />
              <p class="text-xs text-gray-400">Age {{ lifeliner.age }}</p>
            </div>
          </div>

          <hr class="border-gray-100" />

          <p class="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {{ lifeliner.about_me }}
          </p>

          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="group in lifeliner.age_groups"
              :key="group"
              class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/15"
            >
              {{ ageGroupLabel(group) }}
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- Pagination -->
      <div
        v-if="!loading && !error && total > 0"
        class="mt-10 flex flex-col items-center gap-4"
      >
        <!-- Info -->
        <p class="text-sm text-gray-400">
          {{ (page - 1) * LIMIT + 1 }}–{{ Math.min(page * LIMIT, total) }} of
          {{ total }} Lifeliner{{ total === 1 ? "" : "s" }}
        </p>
        <!-- Page buttons -->
        <div v-if="totalPages > 1" class="flex items-center gap-1.5">
          <!-- Prev -->
          <button
            @click="goToPage(page - 1)"
            :disabled="page === 1"
            class="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
          </button>

          <!-- Page numbers -->
          <template v-for="p in pageButtons" :key="p">
            <span
              v-if="p === '...'"
              class="px-2 py-2 text-sm text-gray-400 select-none"
              >…</span
            >
            <button
              v-else
              @click="goToPage(p as number)"
              :class="[
                'min-w-[2.25rem] px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                p === page
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
              ]"
            >
              {{ p }}
            </button>
          </template>

          <!-- Next -->
          <button
            @click="goToPage(page + 1)"
            :disabled="page === totalPages"
            class="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
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

const LIMIT = 20;

const ageGroupOptions = [
  { value: "TEENS", label: "Teens (13–17)" },
  { value: "YOUNG_ADULTS", label: "Young Adults (18–25)" },
  { value: "ADULTS", label: "Adults (26–64)" },
  { value: "SENIORS", label: "Seniors (65+)" },
];

function ageGroupLabel(value: string) {
  return ageGroupOptions.find((o) => o.value === value)?.label ?? value;
}

// Raw search input (debounced into searchQuery)
const searchInput = ref("");
const searchQuery = ref("");

// Filters
const activeAgeGroups = ref<string[]>([]);
const ageMin = ref<number | null>(null);
const ageMax = ref<number | null>(null);

// Pagination
const page = ref(1);
const total = ref(0);
const totalPages = ref(0);

// Data
const lifeliners = ref<PublicLifeliner[]>([]);
const loading = ref(false);
const error = ref("");

// Build compact page button list: [1, '...', 4, 5, 6, '...', 12]
const pageButtons = computed<(number | "...")[]>(() => {
  const tp = totalPages.value;
  if (tp <= 7) return Array.from({ length: tp }, (_, i) => i + 1);
  const p = page.value;
  const pages: (number | "...")[] = [1];
  if (p > 3) pages.push("...");
  for (let i = Math.max(2, p - 1); i <= Math.min(tp - 1, p + 1); i++)
    pages.push(i);
  if (p < tp - 2) pages.push("...");
  pages.push(tp);
  return pages;
});

const hasActiveFilters = computed(
  () =>
    searchQuery.value !== "" ||
    activeAgeGroups.value.length > 0 ||
    ageMin.value !== null ||
    ageMax.value !== null,
);

function toggleAgeGroup(value: string) {
  const idx = activeAgeGroups.value.indexOf(value);
  if (idx === -1) activeAgeGroups.value.push(value);
  else activeAgeGroups.value.splice(idx, 1);
}

function clearAll() {
  searchInput.value = "";
  searchQuery.value = "";
  activeAgeGroups.value = [];
  ageMin.value = null;
  ageMax.value = null;
  page.value = 1;
}

function goToPage(n: number) {
  page.value = n;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function fetch() {
  loading.value = true;
  error.value = "";
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) params.set("search", searchQuery.value);
    if (Number.isFinite(ageMin.value))
      params.set("min_age", String(ageMin.value));
    if (Number.isFinite(ageMax.value))
      params.set("max_age", String(ageMax.value));
    activeAgeGroups.value.forEach((g) => params.append("age_groups", g));
    if (page.value > 1) params.set("page", String(page.value));

    const qs = params.toString();
    const res = await api.get<{
      data: PublicLifeliner[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(qs ? `/lifeliners?${qs}` : "/lifeliners", {
      validateStatus: () => true,
    });

    if (res.status === 200) {
      lifeliners.value = res.data.data;
      total.value = res.data.total;
      totalPages.value = res.data.totalPages;
    } else {
      error.value = "Failed to load Lifeliners. Please try again.";
    }
  } catch {
    error.value = "Network error. Please check your connection.";
  } finally {
    loading.value = false;
  }
}

// Debounce search input
let searchDebounce: ReturnType<typeof setTimeout>;
watch(searchInput, (val) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery.value = val;
    page.value = 1;
  }, 350);
});

// Reset to page 1 on filter change
watch(
  [activeAgeGroups, ageMin, ageMax],
  () => {
    page.value = 1;
  },
  { deep: true },
);
watch([searchQuery, activeAgeGroups, ageMin, ageMax, page], fetch, {
  deep: true,
});

// Highlight matched search term in display_name
function highlight(text: string): string {
  const q = searchQuery.value.trim();
  if (!q) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const safe = escapeHtml(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped.replace(
    new RegExp(safe, "gi"),
    (m) =>
      `<mark class="bg-yellow-100 text-yellow-900 rounded px-0.5">${m}</mark>`,
  );
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

onMounted(fetch);
</script>
