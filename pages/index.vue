<template>
  <div class="index">
    <Hero />
    <section id="tools">
      <Tools />
    </section>
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/landing/Hero.vue";
import Tools from "~/components/landing/Tools.vue";
</script>
<style lang="scss" scoped>
.index {
  min-height: 100vh;
}
</style>
