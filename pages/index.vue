<template>
  <LandingScene />
  <div class="landing-wrapper">
    <Hero />
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/Hero.vue";
</script>

<style scoped lang="scss">
.landing-wrapper {
  background: rgba($background, 0.8);
  max-width: 770px;
  margin: 256px auto 0;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12.3px);
  -webkit-backdrop-filter: blur(12.3px);
}
</style>