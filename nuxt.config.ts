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
        { rel: "icon", type: "image/x-icon", href: "/icon.png" },
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
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  build: {
    transpile: ["vuetify"],
  },
  ssr: false,
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
      lmsBackendUrl:
        "https://47ekwsnw5d.execute-api.ap-southeast-1.amazonaws.com/dev/", // https://47ekwsnw5d.execute-api.ap-southeast-1.amazonaws.com/dev/
      pollenPassUrl:
        "http://sandbox.web.pollen-pass.s3-website-ap-southeast-1.amazonaws.com",
      appName: "Pollen LMS",
      appVersion: "2.0.0",
    },
  },
});
