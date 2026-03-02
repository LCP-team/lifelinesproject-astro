<script lang="ts" setup>
type Country = {
  name: string;
  code: string;
};

defineProps<{
    data: Record<string, Country[]>;
}>();

</script>

<template>
    <p>ADDDSSSDDASD {{ data }}</p>
</template>