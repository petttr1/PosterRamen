<template>
  <div
    class="subtitle"
    :style="{
      width: maxWidthString,
    }"
  >
    <div
      v-if="exporting"
      class="subtitle__text"
      :style="{
        color: scene.fontColor,
      }"
    >
      {{ title }}
    </div>
    <span
      v-if="!exporting"
      ref="hiddenSubtitleRef"
      class="subtitle__hidden"
    >{{ title }}</span><input
      v-if="!exporting"
      ref="subtitleRef"
      v-model="title"
      placeholder="Your Additional Text"
      class="subtitle__text"
      :style="{
        color: scene.fontColor,
        caretColor: scene.fontColor,
      }"
      @input="onTitleInput"
    >
  </div>
</template>
<script setup lang="ts">
import {useSceneStore} from "~/store/scene";

const subtitleRef = ref<HTMLInputElement | null>(null);
const hiddenSubtitleRef = ref<HTMLSpanElement | null>(null);

const title = ref<string>('Make Posters Instantly');

const sceneStore = useSceneStore();
const scene = computed(() => sceneStore.scene(sceneStore.activeScene!));

const sceneId = computed(() => scene.value.id);
const horizontalFlow = computed(() => scene.value.horizontalFlow === 'row' ? 'left' : 'right');
const font = computed(() => scene.value.font);
watch(font, () => {
  fontSize.value = maxFontSize;
  setTimeout(() => {
    recalculateTitle();
  }, 150);
});
watch(sceneId, () => {
  fontSize.value = maxFontSize;
  setTimeout(() => {
    recalculateTitle();
  }, 150);
});

const props = defineProps({
  exporting: {type: Boolean, default: false},
});

const maxWidth = 960;
const maxWidthString = computed(() => `${maxWidth}px`);

const maxFontSize = 96;
const minFontSize = 16;
const fontSize = ref<number>(maxFontSize);
const fontSizeString = computed(() => `${fontSize.value}px`);

const recalculateTitle = () => {
  subtitleRef.value!.style.width = hiddenSubtitleRef.value!.offsetWidth + "px";
  adjustTitleFontSize();
}

const adjustTitleFontSize = () => {
  const currentWidth = hiddenSubtitleRef.value!.offsetWidth;

  fontSize.value = Math.min(
      maxFontSize,
      Math.max(
          minFontSize,
          fontSize.value * (maxWidth / currentWidth)
      )
  );
}

const onTitleInput = (e: any) => {
  const value = e.target.value;
  sceneStore.storeScene({id: sceneId.value!, subtitle: value});
  nextTick(() => {
    recalculateTitle();
  });
}

onMounted(() => {
  setTimeout(() => {
    recalculateTitle();
  }, 150);
});
</script>
<style lang="scss" scoped>
.subtitle {
  font-size: v-bind(fontSizeString);
  font-weight: 400;
  overflow: hidden;
  white-space: pre;
  text-align: v-bind(horizontalFlow);

  input, div {
    outline: none;
    caret-color: black;
    color: black;
    overflow: hidden;
    pointer-events: all;
    width: 100%;
  }

  &__text {
    min-width: 320px;
  }

  &__hidden {
    min-width: 320px;
    position: absolute;
    margin: 0;
    padding: 0;
    visibility: hidden;
  }
}
</style>