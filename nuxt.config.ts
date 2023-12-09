const fonts = {
  families: {
    "Bricolage Grotesque": [300, 400, 500, 600],
    Goldman: [400],
    Inter: [400, 700],
    "Press Start 2P": [400],
    Righteous: [400],
    "Space Grotesk": [300, 400, 500],
    "Bellota Text": [400, 500, 600],
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
  ssr: false,
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
      siteDescription: "Make Posters, Cover Art, and More - Instantly",
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
    exclude: ["/login", "/logout", "/confirm"],
  },
  robots: {
    UserAgent: "*",
    Disallow: ["/login", "/logout", "/app/download", "/confirm"],
  },
});
