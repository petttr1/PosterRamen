const fonts = {
  families: {
    Inter: [400, 700],
    Manrope: [200, 300, 400, 500],
    "Bricolage Grotesque": [300, 400, 500],
  },
};
export default defineNuxtConfig({
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
  ],
  plugins: [],
  runtimeConfig: {
    public: {
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseUrl:
        process.env.SUPABASE_URl || "https://scrjqgrudjmcxryrzgok.supabase.co",
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  supabase: {
    url: process.env.SUPABASE_URl || "https://scrjqgrudjmcxryrzgok.supabase.co",
    key: process.env.SUPABASE_KEY || "",
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/about", "/pricing", "/app", "/app/download"],
    },
  },
});
