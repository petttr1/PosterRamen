<template>
  <LandingScene />
  <div class="landing-overlay">
    <div class="landing-wrapper">
      <Hero />
      <CallToAction />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/Hero.vue";
</script>

<style scoped lang="scss">
.landing-overlay {
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  background: rgba($background, 0.6);
  overflow: hidden;
}
.landing-wrapper {
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow-y: scroll;
}
</style>