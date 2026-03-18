<template>
  <div class="carousel-wrapper">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      navigation
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      class="my-swiper select-none"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img
          :src="'/images/uncompressed/' + slide.image"
          :alt="slide.alt"
          class="slide-image"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Navigation, Pagination];

const slides = [
  { image: "sakura.webp", alt: "Slide 1" },
  { image: "fall.webp", alt: "Slide 2" },
  { image: "ganja.webp", alt: "Slide 3" },
  { image: "dock.webp", alt: "Slide 4" },
  { image: "lakekayak.webp", alt: "Slide 5" },
  { image: "lakecolorful.webp", alt: "Slide 6" },
  { image: "cityhorizon.webp", alt: "Slide 7" },
  { image: "firework.webp", alt: "Slide 8" },
  { image: "horizon.webp", alt: "Slide 9" },
  { image: "winterstorm.webp", alt: "Slide 10" },
  { image: "hug.webp", alt: "Slide 11" },
  { image: "ice.webp", alt: "Slide 12" },
];
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
}

.my-swiper {
  width: 100%;
  height: 75vh;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
