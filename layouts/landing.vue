<template>
  <div class="default-wrapper">
    <AppHeader />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>
<style lang="scss" scoped>
.default-wrapper {
  background: url("/backdrop.png") no-repeat top center;
  background-size: 100% auto;

  @media (max-width: 420px) {
    background-size: auto 100%;
  }
}
</style>
