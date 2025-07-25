import { vi } from "vitest";
import { config } from "@vue/test-utils";
import { ref, reactive, computed, watch, onMounted } from "vue";

import "./mocks/movieApi.msw";

global.ref = ref;
global.reactive = reactive;
global.computed = computed;
global.watch = watch;
global.onMounted = onMounted;
global.$fetch = vi.fn();

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
  public: { apiKey: config },
}));

global.navigateTo = vi.fn();
global.$fetch = vi.fn();
