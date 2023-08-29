<template>
  <div class="text-colors">
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
import {Vector3} from "three";
import {useSceneStore} from "~/store/scene";

const active = ref<number>(1);

const colors = ref<any[]>([
  {id: 1, r:0, g:0, b:0},
  {id: 2, r:0, g:32, b:64},
  {id: 3, r:252, g:246, b:245},
  {id: 4, r:223, g:101, b:137},
]);

const updateColor = (selectedColor: any) => {
  if (active.value === selectedColor.id) return;
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  active.value = selectedColor.id;

  sceneStore.storeScene({id: scene.id, fontColor: `rgb(${selectedColor.r},${selectedColor.g},${selectedColor.b})`});
  sceneStore.storeScene({id: scene.id, color: new Vector3(selectedColor.r / 255,selectedColor.g / 255,selectedColor.b / 255)});
}
</script>

<style lang="scss" scoped>
.text-colors {
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
