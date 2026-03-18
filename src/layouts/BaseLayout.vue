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
import { onMounted, useSSRContext } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const props = defineProps<{
  title?: string;
}>();

if (import.meta.env.SSR) {
  const ctx = useSSRContext<{ title?: string }>();
  if (ctx && props.title) ctx.title = `${props.title} | LifeLines Canada`;
} else {
  onMounted(() => {
    if (props.title) document.title = props.title;
  });
}
</script>
