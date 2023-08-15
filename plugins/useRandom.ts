function splitmix32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    var t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}
export default defineNuxtPlugin((nuxtApp) => {
  const rng = ref<() => number>(() => -1);
  nuxtApp.provide("random", {
    $setSeed: (providedSeed: number) => {
      rng.value = splitmix32(providedSeed);
    },
    $getRandom: () => rng.value(),
  });
});
