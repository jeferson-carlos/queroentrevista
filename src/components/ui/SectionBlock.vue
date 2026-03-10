<template>
  <section :id="id" class="px-4 py-12 sm:px-6 sm:py-14 lg:py-16" :class="customClass">
    <div class="mx-auto w-full max-w-6xl">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  customClass?: string;
}>();
</script>
