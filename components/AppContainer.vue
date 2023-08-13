<template>
  <div class="app-container">
    <div
      ref="wrapperComponent"
      class="app-container__scene-wrapper"
    >
      <Scene
        ref="sceneComponent"
        :show-border="true"
        :title-override="title"
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
import Controls from "~/components/Controls.vue";
import AppHeader from "~/components/AppHeader.vue";
const showControls = ref(true);

const sceneComponent = ref<VueElement | null>(null);
const wrapperComponent = ref<HTMLElement | null>(null);
const title = ref<string | null>(null);

const route = useRoute()
onMounted(() => {
  title.value = route.query.title
})

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
  console.log('resizing', scaleAmtX)
};

</script>

<style lang="scss">
.app-container {
  width: 100%;
  height: calc(100% - 110px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;

  &__scene-wrapper {
    width: 50%;
    height: 100%;
  }

  &__controls {
    max-width: 250px;
  }
}
</style>
