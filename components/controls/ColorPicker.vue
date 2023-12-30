<template>
  <div class="color-picker">
    <button class="color-picker__random" @click="selectRandom">
      <Icon name="fad:random-2dice" class="random-icon" />
    </button>
    <span class="color-picker__text">{{ text }}</span>
    <div class="color-picker__picker">
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
  @include level3;
  display: grid;
  grid-template-columns: 50px 1fr 32px;
  grid-template-areas: "random text picker";
  gap: 20px;
  align-items: center;
  overflow: hidden;
  margin-bottom: 4px;
  width: 100%;

  @media (max-width: 769px) {
    grid-template-columns: 1fr 50px 42px;
    grid-template-areas: "text random picker";
    border-bottom: 2px solid $text;
  }

  &__random {
    grid-area: random;

    @media (max-width: 769px) {
      border-left: 2px solid $text;
    }
  }

  &__text {
    grid-area: text;
  }

  &__picker {
    grid-area: picker;

    @media (max-width: 769px) {
      padding: 0 4px;
      border-left: 2px solid $text;
    }
  }

  button {
    .random-icon {
      transition: transform 0.2s cubic-bezier(0, -0.3, 1, 1.3);
      transform: rotate(50deg);
      transform-origin: 45% 50%;
    }

    &:hover {
      .random-icon {
        transform: rotate(50deg) scale(-1, -1);
      }
    }
  }

  :deep(.vc-color-wrap.round) {
    width: 32px;
    height: 32px;
    border: none;
    box-shadow: none;
  }
}
</style>
