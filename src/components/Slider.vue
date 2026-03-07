<script setup>
import { ref } from "vue";
import { slider, slideritem } from "vue-concise-slider";

const { images } = defineProps({
  datas: {
    type: Array,
    default: () => [],
  },
});

const options = ref({
  currentPage: 0,
  thresholdDistance: 500,
  thresholdTime: 100,
  autoplay: 1000,
  loop: true,
  direction: "vertical",
  loopedSlides: 1,
  slidesToScroll: 1,
  timingFunction: "ease",
  speed: 300,
});

const slider = ref(null);
</script>

<template>
  <slider ref="slider" :options="options">
    <!-- slideritem slot -->
    <slideritem v-for="(item, index) in images" :key="index">
      {{ item.html }}
    </slideritem>
  </slider>
</template>
