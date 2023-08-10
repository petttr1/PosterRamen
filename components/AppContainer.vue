<template>
  <div class="app-container">
    <div class="app-container__scene-wrapper">
      <scene />
    </div>
    <div class="app-container__controls" v-if="showControls">
      <Controls @highQualityRender="() => {}" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Scene from "~/components/scene.vue";

import { ref } from "vue";
const showControls = ref(true);
</script>

<style lang="scss">
.app-container {
  padding: 64px;
  width: 100%;
  height: 100%;

  display: flex;
  overflow: hidden;
  &__scene-wrapper {
    position: relative;
  }

  &__controls {
  }
}
</style>
