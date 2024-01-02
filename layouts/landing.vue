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
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: " ";
    width: 100%;
    height: 100%;
    background: url("/backdrop.png") no-repeat top center;
    background-size: auto 100%;
    z-index: -1;
    opacity: 0.8;

    @media (min-width: $medium) {
      background-size: 100% auto;
    }
  }
}
</style>
