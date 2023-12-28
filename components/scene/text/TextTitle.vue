<template>
  <div class="title">
    <div
      v-if="exporting"
      class="title__text"
      :style="{
        color: scene.fontColor,
      }"
    >
      {{ title }}
    </div>
    <DraggableResizableVue
      v-if="!exporting"
      v-model:w="text.width"
      v-model:h="text.height"
      v-model:x="text.x"
      v-model:y="text.y"
      :min-width="100"
      :min-height="200"
      parent="#render"
      handles-type="borders"
      @resizing="adjustFontSize"
    >
      <textarea
        ref="titleRef"
        v-model="title"
        placeholder="Your Title"
        :style="{
          color: scene.fontColor,
          caretColor: scene.fontColor,
        }"
        @input="onTitleInput"
      />
    </DraggableResizableVue>
  </div>
</template>
<script setup lang="ts">
import { useSceneStore } from "~/store/scene";
import DraggableResizableVue from "draggable-resizable-vue3";
import { TITLE_DEFAULT } from "~/constants";

const maxFontSize = 192;
const minFontSize = 32;

const props = defineProps({
  exporting: { type: Boolean, default: false },
});

const titleRef = ref<HTMLInputElement | null>(null);
const title = ref<string>(TITLE_DEFAULT);
const text = ref({
  x: 0,
  y: 0,
  width: 1600,
  height: 800,
});
const fontSize = ref<number>(maxFontSize);

const sceneStore = useSceneStore();
const scene = computed(() => sceneStore.scene(sceneStore.activeScene!));
const sceneId = computed(() => scene.value.id);
const font = computed(() => scene.value.font);
const fontSizeString = computed(() => `${fontSize.value}px`);
const x = computed(() => text.value.x + "px");
const y = computed(() => text.value.y + "px");
const width = computed(() => text.value.width + "px");
const height = computed(() => text.value.height + "px");

watch(sceneId, () => {
  fontSize.value = maxFontSize;
  setTimeout(() => {
    recalculateTitle();
  }, 150);
});

watch(font, () => {
  fontSize.value = maxFontSize;
  setTimeout(() => {
    recalculateTitle();
  }, 150);
});

const adjustFontSize = () => {
  const maxHeight = text.value.height;
  const scrollHeight = titleRef.value!.scrollHeight;

  fontSize.value = Math.min(
    maxFontSize,
    Math.max(minFontSize, fontSize.value * (maxHeight / scrollHeight)),
  );
};

const recalculateTitle = () => {
  adjustFontSize();
};

const onTitleInput = (e: any) => {
  const value = e.target.value;
  sceneStore.storeScene({ id: sceneId.value!, title: value });
  nextTick(() => {
    recalculateTitle();
  });
};

onMounted(() => {
  titleRef.value!.focus();
  recalculateTitle();
});
</script>
<style lang="scss" scoped>
.title {
  font-family: "Helvetica Neue", Inter, Arial, sans-serif;
  font-size: v-bind(fontSizeString);
  font-weight: 400;

  &__text {
    position: absolute;
    outline: none;
    overflow: hidden;
    white-space: normal;
    text-align: justify;
    top: v-bind(y);
    left: v-bind(x);
    width: v-bind(width);
    height: v-bind(height);
  }

  textarea {
    outline: none;
    overflow: hidden;
    pointer-events: all;
    width: 100%;
    height: 100%;
    resize: none;
    white-space: normal;
    text-align: justify;
  }

  :deep(.drv) {
    border: 6px dashed gray;
  }
}
</style>
