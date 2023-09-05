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
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxtjs/plausible",
  ],
  plugins: [],
  runtimeConfig: {
    public: {
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseUrl:
        process.env.SUPABASE_URl || "https://scrjqgrudjmcxryrzgok.supabase.co",
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
  supabase: {
    url: process.env.SUPABASE_URl || "https://scrjqgrudjmcxryrzgok.supabase.co",
    key: process.env.SUPABASE_KEY || "",
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [
        "/",
        "/about",
        "/pricing",
        "/app",
        "/app/download",
        "/sitemap.xml",
        "/robots.txt",
        "/use-cases",
      ],
    },
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
