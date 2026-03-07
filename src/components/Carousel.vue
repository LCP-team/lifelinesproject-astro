<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true
}

const images = [
  "/images/uncompressed/castle.jpg",
  "/images/uncompressed/chicken.jpg",
  "/images/uncompressed/cityhorizon.jpg",
  "/images/uncompressed/cityhorizonfar.jpg",
  "/images/uncompressed/cup.jpg",
  "/images/uncompressed/duckies.jpg",
  "/images/uncompressed/fall.jpg",
  "/images/uncompressed/flag.jpg",
  "/images/uncompressed/ganja.jpg",
  "/images/uncompressed/ganjasore.jpg",
  "/images/uncompressed/hoodie.jpg",
  "/images/uncompressed/horizon.jpg",
  "/images/uncompressed/ice.jpg",
  "/images/uncompressed/lake.jpg",
  "/images/uncompressed/lakecolorful.jpg",
  "/images/uncompressed/lakegreen.jpg",
  "/images/uncompressed/manlake.jpg",
  "/images/uncompressed/march.jpg",
  "/images/uncompressed/sakura.jpg",
  "/images/uncompressed/simcity.jpg",
  "/images/uncompressed/sunflower.jpg",
  "/images/uncompressed/tower.jpg",
  "/images/uncompressed/versus.jpg",
  "/images/uncompressed/waterfall.jpg",
  "/images/uncompressed/waterfallmedium.jpg",
  "/images/uncompressed/winter.jpg",
  "/images/uncompressed/winterfun.jpg",
  "/images/uncompressed/wintergirl.jpg",
  "/images/uncompressed/winterstorm.jpg",
  "/images/uncompressed/woman.jpg",
];

</script>

<template>

<Carousel v-bind="carouselConfig">
    <Slide v-for="image in images" :key="image">
      <div class="carousel__item">
        <img :src="image" alt="image" class="object-cover w-full h-full">
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>