const fonts = {
  families: {
    Inter: [400, 700],
    Manrope: [200, 300, 400, 500],
  },
};
export default {
  nitro: {
    preset: "vercel-edge",
  },
  css: ["@/assets/scss/global.scss"],
  modules: [["@nuxtjs/google-fonts", fonts], "@nuxtjs/eslint-module"],
};
