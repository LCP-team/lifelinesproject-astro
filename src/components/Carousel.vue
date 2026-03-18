<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
};

const images = [
  "/images/uncompressed/castle.webp",
  "/images/uncompressed/chicken.webp",
  "/images/uncompressed/cityhorizon.webp",
  "/images/uncompressed/cityhorizonfar.webp",
  "/images/uncompressed/cup.webp",
  "/images/uncompressed/duckies.webp",
  "/images/uncompressed/fall.webp",
  "/images/uncompressed/flag.webp",
  "/images/uncompressed/ganja.webp",
  "/images/uncompressed/ganjasore.webp",
  "/images/uncompressed/hoodie.webp",
  "/images/uncompressed/horizon.webp",
  "/images/uncompressed/ice.webp",
  "/images/uncompressed/lake.webp",
  "/images/uncompressed/lakecolorful.webp",
  "/images/uncompressed/lakegreen.webp",
  "/images/uncompressed/manlake.webp",
  "/images/uncompressed/march.webp",
  "/images/uncompressed/sakura.webp",
  "/images/uncompressed/simcity.webp",
  "/images/uncompressed/sunflower.webp",
  "/images/uncompressed/tower.webp",
  "/images/uncompressed/versus.webp",
  "/images/uncompressed/waterfall.webp",
  "/images/uncompressed/waterfallmedium.webp",
  "/images/uncompressed/winter.webp",
  "/images/uncompressed/winterfun.webp",
  "/images/uncompressed/wintergirl.webp",
  "/images/uncompressed/winterstorm.webp",
  "/images/uncompressed/woman.webp",
];
</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="image in images" :key="image">
      <div class="carousel__item">
        <img :src="image" alt="image" class="object-cover w-full h-full" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
