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
label {
  @include label;
}
.colors-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;

  &__colors {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 12px;
    background: $white-30;
    max-width: 100%;
    overflow-x: auto;

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
