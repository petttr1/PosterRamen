<template>
  <div class="tools">
    <Tool
      name="Glass"
      description="Generate Fractal Glass effect for your images."
      link="glass"
    />
    <Tool
      name="Blur"
      description="Generate Progressive Blur effect for your images."
      link="progressive-blur"
    />
    <Tool
      name="Poster"
      description="Generate a design, add your text, go crazy in post-process."
      link="poster"
    />
  </div>
</template>
<script setup lang="ts">
import Tool from "~/components/landing/Tool.vue";
</script>
<style lang="scss" scoped>
.tools {
  a {
    text-decoration: none;
    color: $text;
  }
}
</style>
