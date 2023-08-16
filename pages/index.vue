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
  background: rgba($background, 0.6);
  width: 100%;
  padding: 24px;
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
}
</style>