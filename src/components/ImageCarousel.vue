<template>
  <div class="carousel-wrapper">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      navigation
      :pagination="{ clickable: true }"
      class="my-swiper select-none"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img :src="'/images/uncompressed/' + slide.image" :alt="slide.alt" class="slide-image" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Navigation, Pagination]

const slides = [
  { image: 'sakura.jpg', alt: 'Slide 1' },
  { image: 'fall.jpg', alt: 'Slide 2' },
  { image: 'ganja.jpg', alt: 'Slide 3' },
  { image: 'dock.jpg', alt: 'Slide 4' },
  { image: 'lakekayak.jpg', alt: 'Slide 5' },
  { image: 'lakecolorful.jpg', alt: 'Slide 6' },
  { image: 'cityhorizon.jpg', alt: 'Slide 7' },
  { image: 'firework.jpg', alt: 'Slide 8' },
  { image: 'horizon.jpg', alt: 'Slide 9' },
  { image: 'winterstorm.jpg', alt: 'Slide 10' },
  { image: 'hug.jpg', alt: 'Slide 11' },
  { image: 'ice.jpg', alt: 'Slide 12' },
]
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