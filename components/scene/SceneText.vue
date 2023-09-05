<template>
  <div
    class="text-wrapper"
    :style="{ width: constantWidth }"
  >
    <TextTitle :exporting="exporting" />
    <div
      class="text-wrapper__title-wrapper"
    >
      <TextSubtitle :exporting="exporting" />
      <TextParagraph :exporting="exporting" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {WIDTH} from "~/constants";
import {useSceneStore} from "~/store/scene";
import TextTitle from "~/components/scene/text/TextTitle.vue";
import TextSubtitle from "~/components/scene/text/TextSubtitle.vue";
import TextParagraph from "~/components/scene/text/TextParagraph.vue";


const sceneStore = useSceneStore();
const scene = computed(() => sceneStore.scene(sceneStore.activeScene!));
const selectedFont = computed(() => scene.value.font);
const textAlign = computed(() => scene.value.textAlign === 'left'
    ? 'flex-start'
    : scene.value.textAlign === 'right'
        ? 'flex-end'
        : 'center'
);
const verticalFlow = computed(() => scene.value.verticalFlow);
const horizontalFlow = computed(() => scene.value.horizontalFlow);

const props = defineProps({
  exporting: {type: Boolean, default: false},
});

const constantWidth = computed(() =>{
  return `${WIDTH - 128}px`;
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
  padding: 32px 0;
  display: flex;
  flex-direction: v-bind(verticalFlow);
  justify-content: space-between;
  align-items: v-bind(textAlign);
  pointer-events: none;
  font-size: 32px;

  &__title-wrapper {
    display: flex;
    align-items: baseline;
    gap: 32px;
    flex-direction:v-bind(horizontalFlow);
    justify-content: space-between;
    width: 100%;
  }
}
</style>