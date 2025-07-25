<template>
  <div class="flex flex-col gap-1">
    <label :for="label" class="font font-semibold text-md text-aux-border">{{
      label
    }}</label>
    <input
      :id="label"
      v-model="model"
      :type="type"
      v-bind="$attrs"
      :placeholder="placeholder"
      class="bg-aux-light-black border-b border-b-aux-border p-4 text-aux-white rounded-tl-lg rounded-tr-lg disabled:bg-aux-border"
      v-on="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  type?: string;
  placeholder?: string;
}

defineProps<Props>();

const model = defineModel();

defineOptions({
  inheritAttrs: false,
});
</script>

<style></style>
