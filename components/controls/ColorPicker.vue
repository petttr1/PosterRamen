<template>
  <div class="color-picker">
    <button @click="selectRandom">
      <Icon name="ion:dice-sharp" size="22" />
    </button>
    {{ text }}
    <ColorPicker
      :pure-color="pureColor"
      format="rgb"
      shape="circle"
      lang="En"
      picker-type="fk"
      use-type="pure"
      :disable-alpha="true"
      @pureColorChange="onColorChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { useSceneStore } from "~/store/scene";

const props = defineProps({
  type: { type: String, required: true },
});

const pureColor = computed(() => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return "rgb(0, 0, 0)";
  if (typeof scene[props.type] === "string") {
    return scene[props.type];
  }
  const color = scene[props.type];
  if (!color) return "rgb(0, 0, 0)";
  return `rgb(${color.x * 255}, ${color.y * 255}, ${color.z * 255})`;
});

const emit = defineEmits(["pick", "random"]);

const text = computed(() => {
  if (props.type === "background") {
    return "Background";
  } else if (props.type === "color") {
    return "Color";
  } else if (props.type === "fontColor") {
    return "Text Color";
  }
});

const selectRandom = () => {
  emit("random");
};

const onColorChanged = (newValue: any) => {
  const rgb = newValue.replace(/[^\d,]/g, "").split(",");
  const payload = {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a: rgb[3] ?? 1,
  };
  emit("pick", payload);
};
</script>

<style lang="scss" scoped>
.color-picker {
  display: grid;
  grid-template-columns: 30px 1fr 24px;
  gap: 12px;
  align-items: center;
  overflow: hidden;
  color: $white;
  margin-bottom: 4px;

  button {
    @include button(4px, 4px, 8px);
  }
}
</style>
