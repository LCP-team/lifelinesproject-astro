<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  topCountries: Country[];
  grouped: Record<string, Country[]>;
}>();

const grouped = ref(props.grouped);
const resultLength = computed(() => {
  return Object.entries(grouped.value).reduce(
    (acc, [, countries]) => acc + countries.length,
    0,
  );
});
const search = ref("");

let timeout: number;
const filter = () => {
  clearTimeout(timeout);
  const keyword = search.value.trim().toLowerCase();

  if (keyword.length === 0) {
    grouped.value = props.grouped;
    return;
  }

  timeout = setTimeout(() => {
    let filtered: Record<string, Country[]> = {};

    const groups = Object.entries(grouped.value);
    for (const [letter, countries] of groups) {
      const results = countries.filter((c) => {
        return (
          c.name.toLowerCase().includes(keyword) ||
          c.code.toLowerCase().includes(keyword)
        );
      });

      if (results.length > 0) {
        filtered[letter] = results;
      }
    }

    grouped.value = filtered;
  }, 300);
};
</script>

<template>
  <div class="mt-8 mb-4 max-w-4xl mx-auto">
    <input
      v-model.trim="search"
      @keyup="filter"
      type="search"
      placeholder="Search for a country"
      class="w-full px-6 py-4 border border-gray-300 rounded-4xl shadow-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-md"
      autofocus
    />
  </div>

  <div class="my-4 text-left" v-if="search.trim().length > 0">
    <p class="text-sm text-gray-500 text-xl">
      {{ resultLength }} results for "{{ search }}"
    </p>
  </div>
  <template v-else>
    <span class="px-5 mt-4 w-full">
      <span class="border-t w-full block border-gray-200"></span>
    </span>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
    >
      <a
        v-for="c in topCountries"
        :href="`/countries/${c.code.toLowerCase()}`"
        class="p-3 !no-underline bg-white rounded shadow flex items-center gap-3 hover:bg-gray-50 transition"
      >
        <img
          :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${c.code}.svg`"
          :alt="`Flag of ${c.name}`"
          class="w-8 h-auto shadow"
        />
        <div class="flex flex-row gap-3 text-left">
          <p class="font-bold flex-wrap text-left">
            {{ c.name }}
            <span class="text-sm text-gray-500 ms-3">{{ c.code }}</span>
          </p>
        </div>
      </a>
    </div>
  </template>

  <span class="px-5 mt-4 w-full">
    <span class="border-t w-full block border-gray-200"></span>
  </span>

  <section v-for="(g, letter) in grouped" class="mb-10 flex flex-col">
    <span
      class="text-xl font-semibold mb-4 border-2 border-blue-500 inline-block px-10 rounded-full me-auto"
    >
      {{ letter }}
    </span>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
    >
      <a
        v-for="country in g"
        :href="`/countries/${country.code.toLowerCase()}`"
        class="p-3 !no-underline bg-white rounded shadow flex items-center gap-3 hover:bg-gray-50 transition"
      >
        <img
          :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`"
          :alt="`Flag of ${country.name}`"
          class="w-8 h-auto shadow"
        />
        <p class="font-bold flex-wrap text-left">
          {{ country.name }}
          <span class="text-sm text-gray-500 ms-3">
            {{ country.code }}
          </span>
        </p>
      </a>
    </div>
  </section>
</template>
