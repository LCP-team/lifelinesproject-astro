<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const props = defineProps<{
  title?: string
}>()

watchEffect(() => {
  if (props.title) document.title = props.title
})
</script>
