<template>
  <BaseLayout :title="title">
    <div class="container mx-auto px-3 lg:px-32 pb-8">
      <RouterLink
        to="/crisishotline"
        class="text-primary underline font-medium inline-block mt-10"
      >
        <span class="mr-2">←</span>
        Back to Lifelines country list
      </RouterLink>

      <h3 class="text-2xl font-medium mt-10">Suicide and Crisis Hotlines</h3>

      <div class="flex flex-row items-center mt-4 gap-3">
        <img
          :src="flagUrl"
          :alt="`${countryData.countryName} flag`"
          class="w-16 h-auto shadow-md rounded"
        />
        <h1 class="text-4xl font-bold">{{ countryData.countryName }}</h1>
        <span class="text-sm text-gray-500">{{ countryData.countryCode }}</span>
      </div>

      <ul
        v-if="hasValidContent"
        class="list-disc text-lg space-y-4 ms-5 md:ms-0 external-link"
      >
        <div class="border-t w-full my-6 border-gray-400"></div>
        <li v-for="(group, i) in normalizedContent" :key="i">
          <p v-for="(line, j) in group" :key="j" v-html="line"></p>
        </li>
        <div class="mb-20"></div>
      </ul>

      <div class="border-t w-full my-4 border-gray-400"></div>

      <div class="[&>p]:mb-4">
        <h3 class="text-xl font-bold mb-6">Status</h3>

        <p>
          LifeLines Canada is in the process of gathering and organizing
          publicly available crisis and suicide support resources for this
          country.
        </p>
        <p>
          We are committed to ensuring that all information shared on this
          platform is accurate and responsibly presented. This page will be
          updated as listings become available.
        </p>
        <p>
          If you require immediate assistance, please contact local emergency
          services in your area.
        </p>
        <p>
          If you represent a verified organization providing crisis or suicide
          support and would like your service included, please contact us at:
          <a
            href="mailto:connect@lifelinesproject.com"
            class="underline font-medium text-primary"
            >connect@lifelinesproject.com</a
          >.
        </p>

        <p class="text-md">
          Our crisis and suicide hotline directory is always growing and
          improving. If you notice something missing or incorrect, or know a
          resource we should include, we would truly appreciate you letting us
          know at
          <a
            href="mailto:connect@lifelinesproject.com"
            class="underline font-medium text-primary"
          >
            connect@lifelinesproject.com </a
          >. Together, we can help make support easier to find.
        </p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getName } from "country-list";
import BaseLayout from "../layouts/BaseLayout.vue";
import countriesData from "../data/countries.json";
import { useCacheControl } from "../composables/useCacheControl";

useCacheControl("public, s-maxage=3600, stale-while-revalidate=86400");

type CountryData = {
  countryName: string;
  countryCode: string;
  content: (string | string[])[];
};

const route = useRoute();
const code = computed(() => (route.params.code as string).toLowerCase().trim());

const dataByCode = (countriesData as CountryData[]).reduce(
  (acc, country) => {
    const c = country.countryCode.toLowerCase().trim();
    if (!acc[c]) acc[c] = country;
    return acc;
  },
  {} as Record<string, CountryData>,
);

const countryData = computed<CountryData>(() => {
  const c = code.value;
  return {
    countryCode: c.toUpperCase(),
    countryName: getName(c) ?? c.toUpperCase(),
    content: dataByCode[c]?.content ?? [],
  };
});

const flagUrl = computed(
  () =>
    `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryData.value.countryCode.toUpperCase()}.svg`,
);

const title = computed(
  () => `${countryData.value.countryName} - Crisis Hotlines`,
);

const hasValidContent = computed(() => {
  const content = countryData.value.content;
  return (
    content &&
    content.length > 0 &&
    !(content.length === 1 && content[0] === "")
  );
});

const normalizedContent = computed<string[][]>(() => {
  if (!hasValidContent.value) return [];
  return countryData.value.content.map((item) =>
    Array.isArray(item) ? item : [item],
  );
});
</script>

<style scoped>
.external-link :deep(a) {
  text-decoration: underline;
  color: #5372a5;
}
</style>
