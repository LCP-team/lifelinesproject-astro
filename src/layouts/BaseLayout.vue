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

const title = props.title
  ? `${props.title} | LifeLines Canada`
  : "LifeLines Canada";

if (import.meta.env.SSR) {
  const ctx = useSSRContext<{ title?: string }>();
  if (ctx) ctx.title = title;
} else {
  onMounted(() => {
    document.title = title;
  });
}
</script>
