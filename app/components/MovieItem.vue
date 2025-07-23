<template>
  <div
    class="rounded-lg bg-aux-light-black p-4 flex gap-6 w-full mb-20 h-fit-content relative"
    :class="customClasses"
  >
    <NuxtImg
      v-if="props.poster"
      :src="currentPoster"
      :alt="title"
      custom-classes="140"
      height="162"
      class="absolute top-4 left-4 rounded-lg cover w-[120px] h-[142px]"
      @error="showPlaceholder"
    />
    <div class="flex gap-2 flex-col ml-[142px]">
      <div class="flex gap-3 flex-col">
        <h3 class="font-bold text-xl text-aux-white">{{ props.title }}</h3>
        <span class="text-aux-grey font-semibold block">{{ props.year }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  year: string;
  poster: string;
  customClasses: string;
}

const props = defineProps<Props>();

const currentPoster = ref(props.poster);

const showPlaceholder = () => {
  currentPoster.value = "/images/image-not-found.png";
};
</script>

<style></style>
