<template>
  <div
    class="text-wrapper"
    :style="{ width: constantWidth }"
  >
    <div
      v-if="exporting"
      class="text-wrapper__title"
      :style="{
        color: scene.fontColor,
        'text-align': scene.textAlign
      }"
    >
      {{ title }}
    </div>
    <div
      v-if="exporting"
      class="text-wrapper__title-wrapper"
    >
      <div
        class="text-wrapper__subtitle"
        :style="{
          color: scene.fontColor,
          'text-align': scene.textAlign
        }"
      >
        {{ subtitle }}
      </div>
      <div
        class="text-wrapper__paragraph"
        :style="{
          color: scene.fontColor,
          'text-align': scene.textAlign
        }"
      >
        {{ paragraph }}
      </div>
    </div>
    <span
      ref="hiddenTitleRef"
      class="text-wrapper__title-hidden"
    >{{ title }}</span><input
      v-if="!exporting"
      ref="titleRef"
      :value="title"
      placeholder="Your Title"
      class="text-wrapper__title"
      :style="{
        color: scene.fontColor,
        caretColor: scene.fontColor,
        'text-align': scene.textAlign
      }"
      @input="onTitleInput"
    >
    <div
      v-if="!exporting"
      class="text-wrapper__title-wrapper"
    >
      <input
        ref="subtitleRef"
        :value="subtitle"
        :disabled="exporting"
        placeholder="Your Additional Text"
        class="text-wrapper__subtitle"
        :style="{
          color: scene.fontColor,
          caretColor: scene.fontColor,
          'text-align': scene.textAlign
        }"
        @input="onSubtitleInput"
      >
      <input
        ref="paragraphRef"
        :value="paragraph"
        :disabled="exporting"
        placeholder="Some more text"
        class="text-wrapper__paragraph"
        :style="{
          color: scene.fontColor,
          caretColor: scene.fontColor,
          'text-align': scene.textAlign
        }"
        @input="onParagraphInput"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import {WIDTH} from "~/constants";
import {useSceneStore} from "~/store/scene";

const titleRef = ref<HTMLInputElement | null>(null);
const hiddenTitleRef = ref<HTMLSpanElement | null>(null);
const subtitleRef = ref<HTMLInputElement | null>(null);
const paragraphRef = ref<HTMLInputElement | null>(null);

const sceneStore = useSceneStore();
const scene = computed(() => sceneStore.scene(sceneStore.activeScene!));
const selectedFont = computed(() => scene.value.font);

const props = defineProps({
  exporting: {type: Boolean, default: false},
  title: {type: String, required: true },
  subtitle: {type: String, required: true },
  paragraph: {type: String, required: true },
});

const emit = defineEmits(['titleInput', 'subtitleInput', 'paragraphInput'])

const constantWidth = computed(() =>{
  return `${WIDTH - 64}px`;
});

const onTitleInput = (e: any) => {
  console.log('title input', e.target.value);
  emit('titleInput', e.target.value);
  nextTick(() => {
    titleRef.value!.style.width = hiddenTitleRef.value!.offsetWidth + "px";
  })
}

const onSubtitleInput = (e: any) => {
  emit('subtitleInput', e.target.value);
}

const onParagraphInput = (e: any) => {
  emit('paragraphInput', e.target.value);
}


onMounted(() => {
  titleRef.value!.focus();
});
</script>
<style lang="scss" scoped>
.text-wrapper {
  position: absolute;
  cursor: default;
  user-select: none;
  bottom: 0;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  font-family: v-bind(selectedFont);
  font-weight: 400;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;

  &.top {
    flex-direction: column-reverse;
  }

  &__title-wrapper {
    display: flex;
    align-items: baseline;
    gap: 32px;
    flex-direction: row;
    justify-content: space-between;

    &.left {
      flex-direction: row-reverse;
    }
  }

  input, div {
    outline: none;
    caret-color: black;
    color: black;
    overflow-x: hidden;
    pointer-events: all;
    width: 100%;
  }

  &__title-hidden {
    font-weight: 600;
    font-size: 6rem;
    line-height: 7rem;
    margin: 0;
    padding: 0;
    position: absolute;
    height: 0;
    overflow: hidden;
    white-space: pre;
    min-width: 100px;
  }

  &__title {
    font-weight: 600;
    font-size: 6rem;
    line-height: 7rem;
    white-space: nowrap;
    overflow-y: hidden;
    min-width: 100px;
  }

  &__subtitle {
    font-weight: 400;
    font-size: 3rem;
    line-height: 4rem;
    overflow-y: hidden;
  }

  &__paragraph {
    font-weight: 400;
    font-size: 2rem;
    line-height: 3rem;
    overflow-y: hidden;
  }
}
</style>