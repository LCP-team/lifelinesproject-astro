<template>
  <BaseLayout title="Veterans">
    <div class="z-10 relative text-left">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl mt-10 mb-5 font-medium">Resources for Veterans</h1>
        <p class="text-lg">
          To ensure safe and reliable support, the LifeLines Veteran crisis
          hotlines and resource information are currently limited to veterans
          located in <b>Canada</b> and <b>the United States</b>.
          <br />
          Expansion to other countries is planned as we develop verified crisis
          resources in each region.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <RouterLink
            v-for="c in topCountries"
            :key="c.code"
            :to="`/countries/${c.code.toLowerCase()}-veteran`"
            class="p-3 bg-white rounded shadow flex items-center gap-3 hover:bg-gray-50 transition no-underline!"
          >
            <img
              :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${c.code}.svg`"
              :alt="c.name"
              class="w-8 h-auto shadow"
            />
            <div class="flex flex-row gap-3 text-left">
              <p class="font-bold flex-wrap text-left">
                {{ c.name }}
                <span class="text-sm text-gray-500 ms-3">{{ c.code }}</span>
              </p>
            </div>
          </RouterLink>
        </div>
      </div>

      <NonProfit />
      <div class="h-screen mt-5">
        <div class="h-1/2 relative overflow-hidden">
          <img
            src="/images/tentara.webp"
            alt=""
            class="absolute w-full h-auto -top:1/3 lg:-top-2/3"
          />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { getCountries } from "libphonenumber-js";
import { getName } from "country-list";
import BaseLayout from "../layouts/BaseLayout.vue";
import NonProfit from "../components/NonProfit.vue";
import { useCacheControl } from "../composables/useCacheControl";

useCacheControl("public, s-maxage=3600, stale-while-revalidate=86400");

type Country = { name: string; code: string };

const allCountryCodes = getCountries();
const countries: Country[] = allCountryCodes.flatMap((code) => {
  const name = getName(code);
  return name ? [{ name, code }] : [];
});

const topCountriesCodes = ["CA", "US"];
const topCountries = countries.filter((c) =>
  topCountriesCodes.includes(c.code),
);
</script>
