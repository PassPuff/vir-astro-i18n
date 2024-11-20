// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "http://127.0.0.1:4321",
  adapter: node({ mode: "standalone" }),
  // trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "it"],
    routing: {
      prefixDefaultLocale: false,
      // redirectToDefaultLocale: false,
    },
    fallback: {
      fr: "en",
      it: "en",
    },
  },
});
