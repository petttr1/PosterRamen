<template>
  <div
    class="paragraph"
    :style="{
      width: maxWidthString,
    }"
  >
    <div
      v-if="exporting"
      class="paragraph__text"
      :style="{
        color: scene.fontColor,

      }"
    >
      {{ title }}
    </div>
    <span
      v-if="!exporting"
      ref="hiddenParagraphRef"
      class="paragraph__hidden"
    >{{ title }}</span><input
      v-if="!exporting"
      ref="paragraphRef"
      v-model="title"
      placeholder="Some More Text"
      class="paragraph__text"
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

const paragraphRef = ref<HTMLInputElement | null>(null);
const hiddenParagraphRef = ref<HTMLSpanElement | null>(null);

const title = ref<string>(new Date().toLocaleDateString());

const sceneStore = useSceneStore();
const scene = computed(() => sceneStore.scene(sceneStore.activeScene!));

const sceneId = computed(() => scene.value.id);
const horizontalFlow = computed(() => scene.value.horizontalFlow === 'row' ? 'right' : 'left');
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
})

const props = defineProps({
  exporting: {type: Boolean, default: false},
});

const maxWidth = 640;
const maxWidthString = computed(() => `${maxWidth}px`);

const maxFontSize = 64;
const minFontSize = 8;
const fontSize = ref<number>(maxFontSize);
const fontSizeString = computed(() => `${fontSize.value}px`);

const recalculateTitle = () => {
  paragraphRef.value!.style.width = hiddenParagraphRef.value!.offsetWidth + "px";
  adjustTitleFontSize();
}

const adjustTitleFontSize = () => {
  const currentWidth = hiddenParagraphRef.value!.offsetWidth;
  fontSize.value = Math.min(
      fontSize.value!,
      Math.max(
          minFontSize,
          fontSize.value! * (maxWidth / currentWidth)
      )
  );
}

const onTitleInput = (e: any) => {
  const value = e.target.value;
  sceneStore.storeScene({id: sceneId.value!, paragraph: value});
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
.paragraph {
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
    min-width: 240px;
  }

  &__hidden {
    min-width: 240px;
    position: absolute;
    margin: 0;
    padding: 0;
    visibility: hidden;
  }
}
</style>