import { vi } from "vitest";
import { config } from "@vue/test-utils";
import { ref, reactive, computed, watch } from "vue";

global.ref = ref;
global.reactive = reactive;
global.computed = computed;
global.watch = watch;

config.global.stubs = {
  NuxtLink: {
    template: "<a><slot /></a>",
    props: ["to", "href"],
  },
  NuxtImg: {
    template: '<img :src="src" :alt="alt" />',
    props: ["src", "alt", "width", "height"],
  },
  ClientOnly: {
    template: "<div><slot /></div>",
  },
};

global.useRuntimeConfig = vi.fn(() => ({
  public: { apiKey: "test-key" },
}));

global.navigateTo = vi.fn();
global.$fetch = vi.fn();
