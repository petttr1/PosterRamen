<template>
  <div class="pattern-controls">
    <button
      class="refreshButton"
      @click="refreshScene"
    >
      <Icon name="ion:dice-sharp" />
      Random
    </button>
    <button
      class="refreshButton"
      @click="resetCamera"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
const { $bus } = useNuxtApp();
const refreshScene = () => {
  $bus.$emit('refreshScene');
}

const resetCamera = () => {
  $bus.$emit('resetCamera');
}
</script>

<style lang="scss" scoped>
.pattern-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;

  button {
    @include button(9px, 9px, 8px);
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
}
</style>
