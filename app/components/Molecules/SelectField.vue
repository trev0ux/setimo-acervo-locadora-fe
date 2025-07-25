<template>
  <div class="flex flex-col gap-2">
    <label class="text-aux-border font-semibold">{{ label }}</label>
    <select
      v-model="model"
      v-bind="$attrs"
      class="bg-aux-light-black border-b border-b-aux-border p-4 text-aux-white rounded-tl-lg rounded-tr-lg disabled:bg-aux-border"
      @change="onValueSelected"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :valeu="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string | number;
}

interface Props {
  label?: string;
  options?: Option;
  placeholder?: string;
}

defineProps<Props>();

const emit = defineEmits(["selected-value"]);

const onValueSelected = () => {
  emit("selected-value", model.value);
};

const model = defineModel();
</script>

<style></style>
