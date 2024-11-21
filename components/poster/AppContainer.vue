<template>
  <div class="app-container">
    <div
      ref="wrapperComponent"
      class="app-container__scene-wrapper"
    >
      <Scene ref="sceneComponent" />
    </div>
    <div class="app-container__controls">
      <Controls />
    </div>
  </div>
</template>

<script setup lang="ts">
import Scene from "~/components/poster/scene/Scene.vue";
import Controls from "~/components/poster/controls/Controls.vue";
</script>

<style lang="scss">
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  @media (min-width: $medium) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  }

  &__scene-wrapper {
    height: 100%;
    width: 100%;
    padding: 16px 16px 0;

    @media (min-width: $medium) {
      padding: 16px 0 0 16px;
    }
  }
}
</style>
