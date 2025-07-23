<template>
  <aside class="relative">
    <button
      type="button"
      class="flex items-center gap-4 text-aux-white font-medium text-md"
      @click="showYear = !showYear"
    >
      <FilterIcon /> Filtrar por ano
    </button>
    <ul v-if="showYear" class="absolute">
      <li class="text-aux-white">2020</li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import FilterIcon from "../icons/FilterIcon.vue";

const showYear = ref(false);
</script>

<style></style>
