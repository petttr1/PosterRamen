const fonts = {
  families: {
    Inter: [400, 700],
  }
}
export default {
  nitro: {
    preset: 'vercel-edge',
  },
  css: ["@/assets/scss/global.scss"],
  modules: [
      ['@nuxtjs/google-fonts', fonts],
    ],
};
