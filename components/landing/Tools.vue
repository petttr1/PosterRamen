<template>
  <div class="tools">
    <nuxt-link to="/poster">
      <Tool
        name="Poster"
        description="Generate a design, add your text, go crazy in post-process."
        link="poster"
      />
    </nuxt-link>
    <Tool
      name="Text"
      description="Upload your design and explore typography with unique controls."
    />
    <Tool
      name="Gradient"
      description="Create beautiful gradients with intuitive controls."
    />
    <Tool
      name="Symbol"
      description="Quickly generate combinations of unicode symbols."
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
