<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-neutral-gray-overlay z-[999]"
  >
    <img
      src="/images/loader.png"
      :width="width"
      :height="height"
      alt="Carregando..."
      class="animate-spin-reverse"
    />
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    width: {
      type: Number,
      default: 60,
    },
    height: {
      type: Number,
      default: 60,
    },
  },
};
</script>
<style lang="postcss" scoped>
@keyframes spin-reverse {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

.animate-spin-reverse {
  animation: spin-reverse 1s linear infinite;
}
</style>
