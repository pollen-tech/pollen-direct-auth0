// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  app: {
    head: {
      title: "Pollen Direct",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [{ name: "robots", content: "noindex" }],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/pollen.svg",
        },

        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error: Adding Vuetify plugin to Vite config despite TypeScript type issues
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  build: {
    transpile: ["vuetify"],
  },
  css: ["@/assets/scss/style.scss"],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  runtimeConfig: {
    public: {
      // pollenPassUrl:
      //   "http://web.pollen-pass.s3-website-ap-southeast-1.amazonaws.com", // "http://sandbox.web.pollen-pass.s3-website-ap-southeast-1.amazonaws.com",
      pollenPassUrl: process.env.NUXT_POLLEN_PASS_URL,
      pollenLMSUrl: process.env.NUXT_POLLEN_LMS_URL, //"http://sandbox.web.lms.s3-website-ap-southeast-1.amazonaws.com",
      lmsBackendUrl: "https://helix-sb.pollentech.cloud/liquidate/api/v1/", // https://47ekwsnw5d.execute-api.ap-southeast-1.amazonaws.com/dev/
      directBackendUrl: process.env.NUXT_DIRECT_API,
      userOnboardBackendUrl: process.env.NUXT_LMS_API,
      appName: "Pollen LMS",
      appVersion: "2.0.0",
    },
  },
});
