<template>
  <div class="tools">
    <Tool
      name="Poster"
      description="Generate a design, add your text, go crazy in post-process."
      link="poster"
    />
    <Tool
      name="Blur"
      description="Generate Progressive Blur effect for your images."
      link="progressive-blur"
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
