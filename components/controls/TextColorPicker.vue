<template>
  <div class="text-colors-wrapper">
    <div class="text-colors-wrapper__colors">
      <button
        v-for="color of colors"
        :key="color.id"
        :style="{
          background: `rgb(${color.r},${color.g},${color.b})`
        }"
        :class="{active: active === color.id}"
        @click="updateColor(color)"
      />
    </div>
    <button
      class="text-colors-wrapper__random"
      @click="selectRandom"
    >
      <Icon
        name="ion:dice-sharp"
        size="22"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import {Vector3} from "three";
import {useSceneStore} from "~/store/scene";

const active = ref<number>(1);

const colors = ref<any[]>([
  {id: 3, r:252, g:246, b:245},
  {id: 1, r:0, g:0, b:0},
  {id: 2, r:0, g:32, b:64},
  {id: 6, r:0, g:66, b:37},
  {id: 0, r:37, g:142, b:166},
  {id: 4, r:223, g:101, b:137},
]);

const selectRandom = () => {
  updateColor(colors.value[Math.floor(Math.random() * colors.value.length)]);
}


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
.text-colors-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;

  &__colors {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 12px;
    background: $white-30;


    button {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      border-radius: 50%;
      cursor: default;

      &.active {
        border: 2px solid $highlight;
      }
    }

  }
  &__random {
    @include button(4px, 4px, 8px);
  }
}
</style>
