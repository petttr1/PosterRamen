<template>
  <div class="app-container">
    <div
      ref="wrapperComponent"
      class="app-container__scene-wrapper"
    >
      <Scene
        ref="sceneComponent"
        :show-border="true"
      />
    </div>
    <div
      v-if="showControls"
      class="app-container__controls"
    >
      <Controls />
    </div>
  </div>
</template>

<script setup lang="ts">
import Scene from "~/components/Scene.vue";
import {onBeforeUnmount, onMounted, ref, VueElement} from "vue";
import Controls from "~/components/controls/Controls.vue";
const showControls = ref(true);

const sceneComponent = ref<VueElement | null>(null);
const wrapperComponent = ref<HTMLElement | null>(null);

onMounted(() => {
  window.addEventListener("resize", applyScaling);
  applyScaling();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", applyScaling);
})

const applyScaling = () => {
  sceneComponent.value!.$el.style.transform = 'scale(1, 1)';
  let { width: cw, height: ch } = sceneComponent.value!.$el.getBoundingClientRect();
  let { width: ww, height: wh } = wrapperComponent.value!.getBoundingClientRect();
  let scaleAmtX = Math.min(ww / cw, wh / ch);
  sceneComponent.value!.$el.style.transform = `scale(${scaleAmtX}, ${scaleAmtX})`;
};

</script>

<style lang="scss">
.app-container {
  width: 100%;
  height: calc(100% - 16px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  padding: 56px 16px 16px;

  &__scene-wrapper {
    width: 50%;
    height: 100%;
  }

  &__controls {
    max-width: 350px;
  }
}
</style>
