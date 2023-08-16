<template>
  <div class="hero">
    <h1 class="hero__title">
      Make Posters Instantly
    </h1>
    <h2 class="hero__subtitle">
      Use <b>Poster Ramen</b> to create posters, cover art, and more within seconds
    </h2>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">
.hero {
  margin: 0 auto;

  &__title {
    margin: 256px auto 32px;
    font-size: 4rem;
    color: $yellow;
    text-align: center;
    font-weight: 600;
  }

  &__subtitle {
    margin: 0 auto;
    font-size: 2rem;
    color: $yellow;
    font-weight: 400;
    max-width: 560px;
    text-align: center;

    @media(max-width: 768px) {
      padding: 0 32px;
    }

    @media(max-width: 480px) {
      padding: 0 64px;
    }
  }
}
</style>