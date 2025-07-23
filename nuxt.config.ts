// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxt/test-utils/module",
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY as string,
    },
  },
});
