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
    <p>Hold right mouse button to move the camera.</p>
    <p>Mouse wheel zooms the camera.</p>
    <p>Click the text to edit.</p>
  </div>
</template>

<script setup lang="ts">
const { $bus } = useNuxtApp();
const refreshScene = () => {
  $bus.$emit('refreshScene');
}

const downloadSnapshot = () => {
  $bus.$emit('download');
}
</script>

<style lang="scss" scoped>
.controls {
  display: block;
  padding: 8px 8px 0;
  border-left: 2px solid $blue;
  height: 100%;
  width: 100%;


  button {
    @include button(9px, 9px, 8px);
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 8px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  p {

    color: $yellow;
    text-wrap: nowrap;

    &:first-of-type {
      margin-top: 16px;
    }
  }
}
</style>
