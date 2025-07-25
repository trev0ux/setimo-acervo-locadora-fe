<template>
  <fieldset class="flex items-center relative">
    <input
      v-model="term"
      type="search"
      class="border border-aux-border rounded-full text-aux-white py-4 pl-6 w-full bg-aux-light-black placeholder:text-xl placeholder:font-light focus:border-aux-primary focus-visible:border-aux-primary"
      placeholder="Pesquisar por nome"
      @keyup.enter="searchTerm"
    />
    <button aria-label="Pesquisar" class="right-3 absolute">
      <SearchIcon :width="32" :height="32" />
    </button>
  </fieldset>
</template>

<script setup lang="ts">
import SearchIcon from "../icons/SearchIcon.vue";

const term = ref("");

const emit = defineEmits<{
  searchTerm: [term: string];
}>();

const searchTerm = () => {
  console.log(term.value);
  emit("searchTerm", term.value);
};
</script>

<style></style>
