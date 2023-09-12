<template>
  <div
    class="title"
    :style="{
      width: maxWidthString,
      'text-align': scene.textAlign,
    }"
  >
    <div
      v-if="exporting"
      class="title__text"
      :style="{
        color: scene.fontColor,
      }"
    >
      {{ title }}
    </div>
    <span
      v-if="!exporting"
      ref="hiddenTitleRef"
      class="title__hidden"
    >{{ title }}</span><input
      v-if="!exporting"
      ref="titleRef"
      v-model="title"
      placeholder="Your Title"
      class="title__text"
      :style="{
        color: scene.fontColor,
        caretColor: scene.fontColor,

      }"
      @input="onTitleInput"
    >
  </div>
</template>
<script setup lang="ts">
import {WIDTH} from "~/constants";
import {useSceneStore} from "~/store/scene";

const titleRef = ref<HTMLInputElement | null>(null);
const hiddenTitleRef = ref<HTMLSpanElement | null>(null);

const title = ref<string>('Poster Ramen');

const sceneStore = useSceneStore();
const scene = computed(() => sceneStore.scene(sceneStore.activeScene!));
const sceneId = computed(() => scene.value.id);
const font = computed(() => scene.value.font);

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

const props = defineProps({
  exporting: {type: Boolean, default: false},
});

const emit = defineEmits(['titleInput']);

const maxWidth = WIDTH - 64;
const maxWidthString = computed(() => `${maxWidth}px`);
const maxFontSize = 192;
const minFontSize = 32;
const fontSize = ref<number>(maxFontSize);
const fontSizeString = computed(() => `${fontSize.value}px`);

const recalculateTitle = () => {
    titleRef.value!.style.width = hiddenTitleRef.value!.offsetWidth + "px";
    adjustTitleFontSize();
}

const adjustTitleFontSize = () => {
  const currentWidth = hiddenTitleRef.value!.offsetWidth;

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
  sceneStore.storeScene({id: sceneId.value!, title: value});
  nextTick(() => {
    recalculateTitle();
  });
}

onMounted(() => {
  titleRef.value!.focus();
  setTimeout(() => {
    recalculateTitle();
  }, 150);

});
</script>
<style lang="scss" scoped>
.title {
  font-size: v-bind(fontSizeString);
  font-weight: 600;
  white-space: pre;
  overflow: hidden;


  input, div {
    outline: none;
    caret-color: black;
    color: black;
    overflow: hidden;
    pointer-events: all;
    width: 100%;
  }

  &__text {
    min-width: 500px;
  }

  &__hidden {
      min-width: 500px;
      position: absolute;
      margin: 0;
      padding: 0;
      visibility: hidden;
  }
}
</style>