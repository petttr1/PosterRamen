<template>
  <AppHeader />
  <slot />
  <Footer />
</template>
<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>
