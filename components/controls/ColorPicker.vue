<template>
  <div class="colors">
    <button
      v-for="color of colors"
      :key="color.id"
      :style="{
        background: `rgb(${color.r},${color.g},${color.b})`
      }"
      @click="updateColor(color)"
    />
  </div>
</template>

<script setup lang="ts">
import {useSceneStore} from "~/store/scene";
import {Vector3} from "three";

const colors = ref<any[]>([
  {id: 0, r:255, g:255, b:255},
  {id: 1, r:0, g:0, b:0},
  {id: 2, r:251, g:54, b:23},
  {id: 3, r:4, g:32, b:84},
  {id: 4, r:45, g:142, b:135},
  {id: 5, r:254, g:188, b:56},
  {id: 6, r:173, g:239, b:209},
  {id: 7, r:137, g:171, b:227},
  {id: 8, r:60, g:16, b:83},
  ]);

const updateColor = (color: any) => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  sceneStore.storeScene({id: scene.id, background: new Vector3(color.r / 255,color.g / 255,color.b / 255)});
}
</script>

<style lang="scss" scoped>
.colors {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;

  button {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 50%;
    cursor: default;
  }
}
</style>
