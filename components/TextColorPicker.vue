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

const active = ref<number>(1);

const colors = ref<any[]>([
  {id: 0, r:255, g:255, b:255},
  {id: 1, r:0, g:0, b:0},
]);

const updateColor = (selectedColor: any) => {
  if (active.value === selectedColor.id) return;
  active.value = selectedColor.id;
  const { $bus } = useNuxtApp();
  $bus.$emit('set-font-color', `rgb(${selectedColor.r},${selectedColor.g},${selectedColor.b})`);
  $bus.$emit('set-color', new Vector3(selectedColor.r,selectedColor.g,selectedColor.b));
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
