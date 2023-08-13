<template>
  <div class="controls">
    <button
      class="refreshButton"
      @click="refreshScene"
    >
      New Scene
    </button>
    <button
      class="downloadButton"
      @click="downloadSnapshot"
    >
      Download as PDF
    </button>
  </div>
</template>

<script setup lang="ts">
const refreshScene = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('refreshScene');
}

const downloadSnapshot = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('download');
}
</script>

<style lang="scss" scoped>
.controls {
  display: block;
  padding: 8px 8px 0;
  border-left: 2px solid $blue;
  height: 100%;

  button {
    @include button;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 9px;
    margin-bottom: 8px;
  }
}
</style>
