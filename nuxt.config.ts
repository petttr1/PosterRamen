const fonts = {
  families: {
    Arimo: [400, 500, 600, 700],
    "Noto Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Libre Baskerville": [400, 700],
  },
  subsets: ["latin"],
  display: "swap",
  prefetch: false,
  preconnect: false,
  preload: false,
  download: true,
  base64: false,
};
export default defineNuxtConfig({
  extends: ["nuxt-seo-kit"],
  nitro: {
    preset: "vercel-edge",
  },
  css: ["@/assets/css/reset.css", "@/assets/scss/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";',
        },
      },
    },
  },
  modules: [
    ["@nuxtjs/google-fonts", fonts],
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "@nuxtjs/plausible",
    "nuxt-icon",
  ],
  plugins: [],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "localhost:3000",
      siteName: "Poster Ramen",
      siteDescription:
        "Poster Ramen is a set of single-purpose tools helping you quickly prototype and explore designs & typography.",
      language: "en",
    },
  },
  linkChecker: {
    failOn404: true,
  },
  plausible: {
    domain: "posterramen.com",
  },
  sitemap: {
    hostname: "https://posterramen.com",
    gzip: true,
    exclude: ["/poster/download"],
  },
  robots: {
    UserAgent: "*",
    Disallow: ["/poster/download"],
  },
});
