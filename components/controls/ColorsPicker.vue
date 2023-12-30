<template>
  <div class="colors-picker">
    <ColorPicker
      type="background"
      @pick="onColorPicked('background', $event)"
      @random="onRandomColor('background')"
    />
    <ColorPicker
      type="color"
      @pick="onColorPicked('color', $event)"
      @random="onRandomColor('color')"
    />
    <ColorPicker
      type="fontColor"
      @pick="onColorPicked('fontColor', $event)"
      @random="onRandomColor('fontColor')"
    />
  </div>
</template>

<script setup lang="ts">
import { useSceneStore } from "~/store/scene";
import { Vector3, Vector4 } from "three";
import ColorPicker from "~/components/controls/ColorPicker.vue";

const onRandomColor = (type: "background" | "fontColor" | "color") => {
  const color = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  };
  onColorPicked(type, color);
};

const onColorPicked = (
  type: "background" | "fontColor" | "color",
  color: any,
) => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  const payload = {
    id: scene.id,
  };
  if (type === "fontColor") {
    payload[type] = `rgb(${color.r}, ${color.g}, ${color.b})`;
  } else {
    payload[type] = new Vector4(color.r / 255, color.g / 255, color.b / 255);
  }
  sceneStore.storeScene(payload);
};
</script>

<style lang="scss" scoped>
.colors-picker {
  width: 100%;
  padding: 16px 20px;
}
</style>
